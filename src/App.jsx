import React, { useState, useEffect, useMemo } from 'react';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { useWorkout } from './hooks/useWorkout';
import { DAYS, getTargetDateStr } from './utils/dateHelpers';
import { logSetToSheet } from './services/googleSheets';
import WorkoutBlock from './components/WorkoutBlock';
import './App.css';

const CLIENT_ID =
  '674439380543-atvndeqpa9tpli755h879qabar53jneo.apps.googleusercontent.com';
const SHEET_ID = '10ApiDRmdFru5giLImN_FYTBvAUUopjU0RpvTPHPvmrg';

function App() {
  const { token, status, login } = useGoogleAuth(CLIENT_ID);
  const [program, setProgram] = useState(null);
  const [currentDay, setCurrentDay] = useState(DAYS[new Date().getDay()]);
  const [isDeload, setIsDeload] = useState(false);

  const { sessionLog, setSessionLog, loading } = useWorkout(
    token,
    SHEET_ID,
    currentDay,
    program,
  );

  useEffect(() => {
    fetch('./program.json')
      .then((r) => r.json())
      .then(setProgram);
  }, []);

  const dateStr = getTargetDateStr(currentDay);
  const dayBlocks = program
    ? [...(program.daily || []), ...(program.weekly[currentDay] || [])]
    : [];

  // In App.jsx, update the handleLog to be resilient to the Flow ID
  const handleLog = async (ex, setIdx, weight, rpe, done) => {
    if (!token) return;
    const exId = ex.id; // This will handle "eb1" or "flow-core_warmup"

    const newLog = { ...sessionLog };
    if (!newLog[dateStr]) newLog[dateStr] = {};
    if (!newLog[dateStr][exId]) newLog[dateStr][exId] = { sets: [] };
    newLog[dateStr][exId].sets[setIdx] = { done, rpe };
    setSessionLog(newLog);

    const rowData = [
      dateStr,
      currentDay,
      'N/A',
      isDeload ? 'yes' : 'no',
      'Workout',
      exId,
      ex.name,
      setIdx,
      weight,
      rpe,
      done ? 'yes' : 'no',
    ];
    await logSetToSheet(token, SHEET_ID, rowData, currentDay, exId, setIdx);
  };

  const progress = useMemo(() => {
    if (!program || !sessionLog[dateStr]) return 0;
    let total = 0,
      done = 0;
    dayBlocks.forEach((bkId) => {
      const block = program.blocks[bkId];
      block?.exercises?.forEach((ex) => {
        total++;
        if (sessionLog[dateStr][ex.id]?.sets?.some((s) => s?.done)) done++;
      });
    });
    return total === 0 ? 0 : (done / total) * 100;
  }, [program, sessionLog, dateStr, dayBlocks]);

  if (!program) return <div className='loading'>Loading program...</div>;

  return (
    <div className='app'>
      <header className='header'>
        <div className='header-row'>
          <h1 className='wordmark'>workout/</h1>
          <button
            onClick={() => setIsDeload(!isDeload)}
            style={{
              background: 'none',
              border: `1px solid ${isDeload ? 'var(--accent2)' : 'var(--border)'}`,
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '10px',
              color: isDeload ? 'var(--accent2)' : 'var(--muted)',
              cursor: 'pointer',
            }}
          >
            deload {isDeload ? '✓' : ''}
          </button>
          <div className='auth-status'>
            <div
              className={`auth-dot ${status === 'ok' ? 'connected' : ''}`}
            ></div>
            {status === 'ok' ? (
              'connected'
            ) : (
              <span onClick={login} className='login-link'>
                sign in
              </span>
            )}
          </div>
        </div>
        <div className='day-tabs'>
          {DAYS.map((d) => (
            <button
              key={d}
              className={`tab ${currentDay === d ? 'active' : ''}`}
              onClick={() => setCurrentDay(d)}
            >
              {d.slice(0, 3)}
            </button>
          ))}
        </div>
      </header>

      <main className='content'>
        <div
          className='progress-wrap'
          style={{
            height: '2px',
            background: 'var(--border)',
            marginBottom: '20px',
          }}
        >
          <div
            className='progress-fill'
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'var(--accent)',
              transition: 'width 0.3s',
            }}
          ></div>
        </div>

        <div className='day-title'>{currentDay}</div>
        <div className='day-meta'>{dateStr}</div>

        {dayBlocks.map((bkId) => (
          <WorkoutBlock
            key={bkId}
            block={program.blocks[bkId]}
            state={sessionLog[dateStr]}
            onLog={handleLog}
            isDeload={isDeload}
          />
        ))}
      </main>
    </div>
  );
}

export default App;

import React from 'react';
import { getSetWeight } from '../utils/workoutMath';

const SetRow = ({ ex, setIdx, isDeload, onLog, state }) => {
  const totalSets = (ex.warmup_weight != null ? (ex.sets || 1) + 1 : (ex.sets || 1));
  const weight = getSetWeight(ex, setIdx, totalSets, isDeload);
  const isDone = state?.done || false;
  const currentRpe = state?.rpe || null;
  return (
    <div className="set-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderTop: '1px solid var(--border)' }}>
      <div style={{ width: '50px', fontSize: '10px', fontFamily: 'Syne Mono', color: 'var(--sub)' }}>
        <div>{ex.warmup_weight != null && setIdx === 0 ? 'W/U' : `Set ${ex.warmup_weight != null ? setIdx : setIdx + 1}`}</div>
        {weight && <div style={{ color: 'var(--accent2)', fontSize: '11px' }}>{weight}lb</div>}
      </div>
      <div onClick={() => onLog(setIdx, weight, currentRpe, !isDone)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--muted)', background: isDone ? 'var(--accent)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontWeight: 'bold' }}>
        {isDone ? '✓' : ''}
      </div>
      <div style={{ display: 'flex', gap: '3px', flex: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
          <button key={n} onClick={() => onLog(setIdx, weight, n, true)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid var(--border)', background: currentRpe === n ? (n < 7 ? '#2a4a00' : n < 9 ? '#4a3a00' : '#4a1a1a') : 'var(--bg)', color: currentRpe === n ? 'white' : 'var(--muted)', fontSize: '10px', cursor: 'pointer' }}>{n}</button>
        ))}
      </div>
    </div>
  );
};
export default SetRow;

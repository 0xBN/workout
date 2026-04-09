import React, { useState } from 'react';
import SetRow from './SetRow';

const TIMER_BASE = 'https://0xbn.github.io/interval-timer/';

const ExerciseCard = ({ ex, state, onLog, isDeload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const numSets = ex.warmup_weight != null ? (ex.sets || 1) + 1 : ex.sets || 1;

  const openTimer = (e) => {
    e.stopPropagation();
    const routine = ex.timer_routine || {
      name: 'Rest',
      sets: 1,
      blocks: [{ type: 'rest', duration: 120 }],
    };
    window.open(
      `${TIMER_BASE}?r=${encodeURIComponent(JSON.stringify(routine))}`,
      '_blank',
    );
  };

  return (
    <div
      className='ex-card'
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r)',
        marginBottom: '8px',
      }}
    >
      <div
        className='ex-header'
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '12px 14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '700', fontSize: '15px' }}>{ex.name}</div>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--accent)',
              fontFamily: 'Syne Mono',
            }}
          >
            {ex.sets}×{ex.reps || ex.duration + 's'}
          </div>
        </div>

        {/* WEIGHT ELEMENT (Now correctly to the right of timer) */}
        {ex.working_weight && (
          <div
            style={{
              background: 'var(--bg)',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              border: '1px solid var(--border)',
              color: 'var(--accent2)',
              minWidth: '45px',
              textAlign: 'center',
            }}
          >
            {ex.working_weight}lb
          </div>
        )}

        {/* TIMER ELEMENT */}
        <button
          onClick={openTimer}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '4px 8px',
            color: 'var(--sub)',
            fontSize: '10px',
            fontFamily: 'Syne Mono',
            cursor: 'pointer',
          }}
        >
          ▶ timer
        </button>
      </div>

      {isOpen && (
        <div className='ex-details'>
          {[...Array(numSets)].map((_, i) => (
            <SetRow
              key={i}
              ex={ex}
              setIdx={i}
              isDeload={isDeload}
              state={state?.sets?.[i]}
              onLog={(idx, w, r, d) => onLog(ex, idx, w, r, d)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;

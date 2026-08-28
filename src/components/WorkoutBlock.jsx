import React, { useState } from 'react';
import ExerciseCard from './ExerciseCard';
import FlowRow from './FlowRow';
import BlockInfoModal from './BlockInfoModal';

const WorkoutBlock = ({ blockId, block, state, onLog, isDeload }) => {
  const [infoOpen, setInfoOpen] = useState(false);
  if (!block) return null;

  return (
    <div className='workout-block' style={{ marginBottom: '24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: 'var(--sub)',
          }}
        >
          {block.name}
        </div>
        {block.info && (
          <button
            type='button'
            className='info-btn'
            onClick={() => setInfoOpen(true)}
            aria-label={`Instructions for ${block.name}`}
          >
            i
          </button>
        )}
      </div>
      {block.type === 'flow' ? (
        <FlowRow
          blockId={blockId}
          block={block}
          state={state}
          onLog={onLog}
        />
      ) : (
        block.exercises?.map((ex) => (
          <ExerciseCard
            key={ex.id}
            blockName={block.name}
            ex={ex}
            state={state?.[ex.id]}
            onLog={onLog}
            isDeload={isDeload}
          />
        ))
      )}
      {infoOpen && (
        <BlockInfoModal info={block.info} onClose={() => setInfoOpen(false)} />
      )}
    </div>
  );
};
export default WorkoutBlock;

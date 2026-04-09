import React from 'react';
import ExerciseCard from './ExerciseCard';
import FlowRow from './FlowRow';

const WorkoutBlock = ({ blockId, block, state, onLog, isDeload }) => {
  if (!block) return null;
  return (
    <div className="workout-block" style={{ marginBottom: '24px' }}>
      <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--sub)', marginBottom: '10px' }}>
        {block.name}
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
    </div>
  );
};
export default WorkoutBlock;

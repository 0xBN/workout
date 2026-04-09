import React from 'react';
const TIMER_BASE = 'https://0xbn.github.io/interval-timer/';

const FlowRow = ({ blockId, block, state, onLog }) => {
  const flowId = `flow-${blockId}`;
  const isDone = state?.[flowId]?.sets?.[0]?.done || false;
  const openTimer = (e) => {
    e.stopPropagation();
    if (block.timer_routine) window.open(`${TIMER_BASE}?r=${encodeURIComponent(JSON.stringify(block.timer_routine))}`, '_blank');
  };
  return (
    <div className={`flow-row ${isDone ? 'done' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', marginBottom: '6px' }}>
      <div onClick={() => onLog({ id: flowId, name: block.name }, 0, '', null, !isDone, block.name)} style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid var(--muted)', background: isDone ? 'var(--accent)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111' }}>
        {isDone ? '✓' : ''}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '700', fontSize: '15px', color: isDone ? 'var(--muted)' : 'var(--text)', textDecoration: isDone ? 'line-through' : 'none' }}>{block.flow_label || block.name}</div>
        <div style={{ fontFamily: 'Syne Mono', fontSize: '11px', color: 'var(--sub)', marginTop: '3px' }}>{block.flow_sub}</div>
      </div>
      {block.timer_routine && <button onClick={openTimer} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '6px', padding: '4px 8px', color: 'var(--sub)', fontSize: '10px', fontFamily: 'Syne Mono', cursor: 'pointer' }}>▶ timer</button>}
    </div>
  );
};
export default FlowRow;

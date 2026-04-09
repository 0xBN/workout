export const getSetWeight = (ex, setIdx, totalSets, isDeload) => {
  const mult = isDeload ? 0.5 : 1.0; // Using your 0.5 multiplier
  const isWarmup = ex.warmup_weight != null && setIdx === 0;
  
  if (isWarmup) return Math.round((ex.warmup_weight * mult) / 5) * 5;
  
  const workingSets = ex.warmup_weight != null ? totalSets - 1 : totalSets;
  const wIdx = ex.warmup_weight != null ? setIdx - 1 : setIdx;
  
  if (!ex.working_weight) {
    return ex.prescribed_weight != null ? Math.round((ex.prescribed_weight * mult) / 5) * 5 : null;
  }
  
  const prog = ex.progression || [1.0];
  const offset = prog.length - workingSets;
  const adjIdx = Math.max(0, offset + wIdx);
  const pct = prog[Math.min(adjIdx, prog.length - 1)];
  
  return Math.round((ex.working_weight * pct * mult) / 5) * 5;
};

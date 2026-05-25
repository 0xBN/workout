const TIMER_BASE = 'https://0xbn.github.io/interval-timer/';

function buildLabel(workLabel, prepareLabel) {
  if (!prepareLabel || prepareLabel === workLabel) return workLabel;
  return `${workLabel}^${prepareLabel}`;
}

function tokenForBlock(block, forceType) {
  const type = forceType || block.type;
  const prefix = type === 'prepare' ? 'p' : type === 'work' ? 'w' : 'r';
  const countdown = block.countdown_last ? `@${block.countdown_last}` : '';
  const suffix = block.skip_on_last ? '!' : '';
  return `${prefix}${block.duration}${countdown}${suffix}`;
}

function toCompactRoutine(routine) {
  const sections = [routine.name || 'Timer'];
  const blocks = routine.blocks || [];

  if (blocks.length === 1 && blocks[0].type === 'rest') {
    sections.push(blocks[0].label || 'Rest');
    sections.push(tokenForBlock(blocks[0]));
    return sections.join('~');
  }

  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type !== 'work') {
      i += 1;
      continue;
    }

    const previous = blocks[i - 1];
    const hasPrepCandidate =
      previous &&
      (previous.type === 'prepare' || previous.type === 'rest') &&
      (i - 1 === 0 || blocks[i - 2]?.type !== 'work');

    const prepareLabel = hasPrepCandidate ? previous.label : null;
    const pattern = [];

    if (hasPrepCandidate) {
      pattern.push(tokenForBlock(previous, 'prepare'));
    }

    pattern.push(tokenForBlock(block));

    let j = i + 1;
    while (j + 1 < blocks.length) {
      const rest = blocks[j];
      const nextWork = blocks[j + 1];

      if (
        rest.type !== 'rest' ||
        nextWork.type !== 'work' ||
        nextWork.label !== block.label
      ) {
        break;
      }

      pattern.push(tokenForBlock(rest));
      pattern.push(tokenForBlock(nextWork));
      j += 2;
    }

    sections.push(buildLabel(block.label, prepareLabel));
    sections.push(pattern.join(','));
    i = j;
  }

  return sections.join('~');
}

export function buildTimerUrl(routine) {
  const params = new URLSearchParams({ x: toCompactRoutine(routine) });

  return `${TIMER_BASE}?${params.toString()}`;
}

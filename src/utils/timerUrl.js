const TIMER_BASE = 'https://0xbn.github.io/interval-timer/';

// Compact format reserved characters — must not appear raw in labels.
// Rest labels are strictest: , breaks token splitting.
// All labels: ~ breaks section splitting, ^ breaks label splitting.
const RESERVED_IN_REST_LABELS = /[~^,@!]/;
const RESERVED_IN_ALL_LABELS = /[~^]/;

function assertLabel(label, context) {
  if (!label) return;
  if (context === 'rest' && RESERVED_IN_REST_LABELS.test(label)) {
    throw new Error(
      `Rest label contains reserved character: "${label}"\n` +
      `Reserved in rest labels: ~ ^ , @ !\n` +
      `Replace commas with "and" or ". ", and avoid other reserved chars.`
    );
  }
  if (RESERVED_IN_ALL_LABELS.test(label)) {
    throw new Error(
      `Label contains reserved character: "${label}"\n` +
      `Reserved in all labels: ~ ^`
    );
  }
}

function buildLabel(workLabel, prepareLabel) {
  if (!prepareLabel || prepareLabel === workLabel) return workLabel;
  return `${workLabel}^${prepareLabel}`;
}

function tokenForBlock(block, forceType) {
  const type = forceType || block.type;
  const prefix = type === 'prepare' ? 'p' : type === 'work' ? 'w' : 'r';
  const countdown = block.countdown_last ? `@${block.countdown_last}` : '';
  if (type === 'rest') assertLabel(block.label, 'rest');
  else assertLabel(block.label, 'other');
  const restLabel =
    type === 'rest' && block.label ? `^${block.label}` : '';
  const suffix = block.skip_on_last ? '!' : '';
  return `${prefix}${block.duration}${countdown}${restLabel}${suffix}`;
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
      previous.type === 'prepare' &&
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

    // Include trailing rest (transition cue to the next exercise) even when
    // the following work block has a different label and wouldn't be grouped here.
    if (j < blocks.length && blocks[j]?.type === 'rest') {
      pattern.push(tokenForBlock(blocks[j]));
      j += 1;
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

// Deterministic, participant-ID-driven assignment so re-entering the same ID
// always reproduces the same condition order.

export const GAZE_MODES = ['off', 'timing', 'mirror']

// All 6 orderings of the 3 exposure-phase modes.
export const MODE_PERMUTATIONS = [
  ['off', 'timing', 'mirror'],
  ['off', 'mirror', 'timing'],
  ['timing', 'off', 'mirror'],
  ['timing', 'mirror', 'off'],
  ['mirror', 'off', 'timing'],
  ['mirror', 'timing', 'off'],
]

export function hashParticipantId(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0
  }
  return h
}

export function getAssignment(participantId) {
  const h = hashParticipantId(participantId.trim())
  return {
    exposureOrder: MODE_PERMUTATIONS[h % MODE_PERMUTATIONS.length],
    // Free-choice phase only ever starts in Off or Timing — Mirror is opt-in later.
    freeStartMode: h % 2 === 0 ? 'off' : 'timing',
  }
}

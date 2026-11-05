const DIFFICULTY_STYLES = {
  Easy: 'bg-green-100 text-green-700 border border-green-300',
  Medium: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  Hard: 'bg-red-100 text-red-700 border border-red-300',
}

const MODE_LABELS = { off: 'Off', timing: 'Timing', mirror: 'Mirror' }

export default function ProblemNav({ problem, phaseLabel, indexInPhase, totalInPhase, mode, onPrev, onNext, nextLabel }) {
  const progress = ((indexInPhase + 1) / totalInPhase) * 100

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Navigation row */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onPrev}
          disabled={indexInPhase === 0}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-gray-50 enabled:text-gray-600 transition-colors"
        >
          ‹ Previous
        </button>

        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-semibold text-gray-800 truncate">
            {problem.topic}
          </span>
          <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${DIFFICULTY_STYLES[problem.difficulty] ?? 'bg-gray-100 text-gray-600'}`}>
            {problem.difficulty}
          </span>
          {mode && (
            <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-300">
              Mode: {MODE_LABELS[mode] ?? mode}
            </span>
          )}
        </div>

        <button
          onClick={onNext}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {nextLabel ?? 'Next ›'}
        </button>
      </div>

      {/* Problem counter */}
      <p className="text-center text-xs text-gray-400 mt-3">
        {phaseLabel} — Problem {indexInPhase + 1} of {totalInPhase}
      </p>

      {/* Progress bar */}
      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

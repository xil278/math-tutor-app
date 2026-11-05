const BulbIcon = ({ large }) => (
  <svg
    className={large ? 'w-12 h-12 text-gray-300' : 'w-4 h-4'}
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

export default function HintsPanel({ hints, hintsLoaded, shownHints, onLoadHints, onNextHint }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-700">Hints</h2>
        <button
          onClick={onLoadHints}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-sm font-medium transition-colors"
        >
          💡 Load Hints
        </button>
      </div>

      {/* Content */}
      {!hintsLoaded ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
          <BulbIcon large />
          <p className="text-gray-500 font-medium mt-2">Need help? Click "Load Hints" above</p>
          <p className="text-gray-400 text-sm">Progressive hints will guide you to the solution</p>
        </div>
      ) : (
        <div className="space-y-3">
          {hints.slice(0, shownHints).map((hint, i) => (
            <div
              key={i}
              className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 animate-fade-in"
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-amber-400 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-amber-700 text-xs font-semibold mb-0.5">Hint {i + 1}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{hint}</p>
              </div>
            </div>
          ))}

          {shownHints < hints.length && (
            <button
              onClick={onNextHint}
              className="w-full py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Show Hint {shownHints + 1} of {hints.length}
            </button>
          )}

          {shownHints >= hints.length && (
            <p className="text-center text-xs text-gray-400 pt-1">
              All hints revealed — you've got this! ✨
            </p>
          )}
        </div>
      )}
    </div>
  )
}

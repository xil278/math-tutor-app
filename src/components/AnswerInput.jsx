import { useState } from 'react'

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, '').replace(/×/g, '*')
}

export default function AnswerInput({ answers, onCorrect }) {
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'incorrect'

  const handleCheck = () => {
    if (!value.trim()) return
    const isCorrect = answers.some(a => normalize(a) === normalize(value))
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    if (isCorrect && onCorrect) onCorrect()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCheck()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Your Answer</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => { setValue(e.target.value); setFeedback(null) }}
          onKeyDown={handleKeyDown}
          placeholder="Enter your answer..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
        />
        <button
          onClick={handleCheck}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          Check Answer
        </button>
      </div>

      {/* Feedback */}
      {feedback === 'correct' && (
        <div className="mt-3 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
          <span className="text-xl">🎉</span>
          <div>
            <p className="text-green-700 font-semibold text-sm">Yay! You got it right!</p>
            <p className="text-green-600 text-xs">Excellent work — move on to the next problem.</p>
          </div>
        </div>
      )}

      {feedback === 'incorrect' && (
        <div className="mt-3 flex items-center gap-2 px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl">
          <span className="text-xl">🤔</span>
          <div>
            <p className="text-orange-700 font-semibold text-sm">Hmm… So close, try again!</p>
            <p className="text-orange-600 text-xs">Try to think with the hints this time — you've got it!</p>
          </div>
        </div>
      )}
    </div>
  )
}

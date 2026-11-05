import { useState } from 'react'

const DIFFICULTY_OPTIONS = ['Easy', 'Standard']

export default function SetupScreen({ onStart }) {
  const [participantId, setParticipantId] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')
  const [error, setError] = useState('')

  const handleStart = () => {
    const id = participantId.trim()
    if (!id) {
      setError('Please enter a Participant ID.')
      return
    }
    onStart({ participantId: id, difficulty })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleStart()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 mb-1">Math Tutoring Study</h1>
        <p className="text-sm text-gray-500 mb-6">Researcher setup — enter session details to begin.</p>

        <label className="block text-sm font-medium text-gray-700 mb-1.5">Participant ID</label>
        <input
          type="text"
          value={participantId}
          onChange={e => { setParticipantId(e.target.value); setError('') }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. P01"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
        <div className="flex gap-2 mb-6">
          {DIFFICULTY_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setDifficulty(opt)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                difficulty === opt
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          onClick={handleStart}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          Start Session
        </button>
      </div>
    </div>
  )
}

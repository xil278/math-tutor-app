import { useState, useMemo, useCallback } from 'react'
import problems from './data/problems.json'
import Header from './components/Header'
import Footer from './components/Footer'
import ProblemNav from './components/ProblemNav'
import ProblemDisplay from './components/ProblemDisplay'
import Scratchpad from './components/Scratchpad'
import HintsPanel from './components/HintsPanel'
import AnswerInput from './components/AnswerInput'
import EyeTrackingPanel from './components/EyeTrackingPanel'
import SetupScreen from './components/SetupScreen'
import OnboardingScreen from './components/OnboardingScreen'
import EndScreen from './components/EndScreen'
import { getAssignment } from './utils/assignment'

const PHASE_ORDER = ['pre', 'onboarding', 'exposure', 'free', 'post', 'end']
const PHASE_LABELS = { pre: 'Pre-test', exposure: 'Exposure', free: 'Free Choice', post: 'Post-test' }

export default function App() {
  const [session, setSession] = useState(null) // { participantId, difficulty, assignment }
  const [phase, setPhase] = useState('setup')
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [freeMode, setFreeMode] = useState(null)

  const [hintsLoaded, setHintsLoaded] = useState(false)
  const [shownHints, setShownHints] = useState(0)
  const [isTracking, setIsTracking] = useState(false)
  const [gazeData, setGazeData] = useState({ x: 0.000, y: 0.000, pupil: 'N/A' })

  const problemsByPhase = useMemo(() => {
    const grouped = { pre: [], exposure: [], free: [], post: [] }
    for (const p of problems) {
      if (grouped[p.phase]) grouped[p.phase].push(p)
    }
    return grouped
  }, [])

  const resetProblemState = () => {
    setHintsLoaded(false)
    setShownHints(0)
  }

  const handleStartSession = ({ participantId, difficulty }) => {
    const assignment = getAssignment(participantId)
    setSession({ participantId, difficulty, assignment })
    setPhase('pre')
    setPhaseIndex(0)
    resetProblemState()
  }

  const advancePhase = useCallback(() => {
    const idx = PHASE_ORDER.indexOf(phase)
    const next = PHASE_ORDER[idx + 1]
    if (next === 'free') {
      setFreeMode(session.assignment.freeStartMode)
    }
    setPhase(next)
    setPhaseIndex(0)
    resetProblemState()
  }, [phase, session])

  const currentList = problemsByPhase[phase] || []

  const goPrev = () => {
    if (phaseIndex > 0) {
      setPhaseIndex(i => i - 1)
      resetProblemState()
    }
  }

  const goNext = () => {
    if (phaseIndex < currentList.length - 1) {
      setPhaseIndex(i => i + 1)
      resetProblemState()
    } else {
      advancePhase()
    }
  }

  const handleLoadHints = () => {
    setHintsLoaded(true)
    if (shownHints === 0) setShownHints(1)
  }

  const handleNextHint = () => {
    setShownHints(n => Math.min(n + 1, problem.hints.length))
  }

  const handleToggleTracking = () => {
    setIsTracking(prev => {
      const next = !prev
      if (next) {
        setGazeData({ x: 0.512, y: 0.387, pupil: 'Center' })
      } else {
        setGazeData({ x: 0.000, y: 0.000, pupil: 'N/A' })
      }
      return next
    })
  }

  if (phase === 'setup') {
    return <SetupScreen onStart={handleStartSession} />
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onContinue={advancePhase} />
  }

  if (phase === 'end') {
    return <EndScreen participantId={session.participantId} />
  }

  const problem = currentList[phaseIndex]
  const mode = phase === 'exposure' ? session.assignment.exposureOrder[phaseIndex] : phase === 'free' ? freeMode : null
  const showSidePanels = phase === 'exposure' || phase === 'free'
  const isLastProblemInPhase = phaseIndex === currentList.length - 1
  const nextLabel = isLastProblemInPhase
    ? (phase === 'post' ? 'Finish ›' : 'Continue ›')
    : 'Next ›'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <p className="text-xs text-gray-400 mb-3">
          Participant: <span className="font-medium text-gray-500">{session.participantId}</span>
          {' · '}Difficulty: <span className="font-medium text-gray-500">{session.difficulty}</span>
        </p>

        <div className="flex gap-6 items-start">
          {/* Left column */}
          <div className={`min-w-0 flex flex-col gap-5 ${showSidePanels ? 'flex-[2]' : 'flex-1'}`}>
            <ProblemNav
              problem={problem}
              phaseLabel={PHASE_LABELS[phase]}
              indexInPhase={phaseIndex}
              totalInPhase={currentList.length}
              mode={mode}
              onPrev={goPrev}
              onNext={goNext}
              nextLabel={nextLabel}
            />

            <ProblemDisplay problem={problem} />

            <Scratchpad key={`${phase}-${phaseIndex}`} />

            {showSidePanels && (
              <HintsPanel
                hints={problem.hints}
                hintsLoaded={hintsLoaded}
                shownHints={shownHints}
                onLoadHints={handleLoadHints}
                onNextHint={handleNextHint}
              />
            )}

            <AnswerInput
              key={`answer-${phase}-${phaseIndex}`}
              answers={problem.answer}
            />
          </div>

          {/* Right column */}
          {showSidePanels && (
            <div className="flex-[1] min-w-0">
              <EyeTrackingPanel
                gazeData={gazeData}
                isTracking={isTracking}
                onToggleTracking={handleToggleTracking}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

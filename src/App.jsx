import { useState, useCallback } from 'react'
import problems from './data/problems.json'
import Header from './components/Header'
import Footer from './components/Footer'
import ProblemNav from './components/ProblemNav'
import ProblemDisplay from './components/ProblemDisplay'
import Scratchpad from './components/Scratchpad'
import HintsPanel from './components/HintsPanel'
import AnswerInput from './components/AnswerInput'
import EyeTrackingPanel from './components/EyeTrackingPanel'

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hintsLoaded, setHintsLoaded] = useState(false)
  const [shownHints, setShownHints] = useState(0)
  const [isTracking, setIsTracking] = useState(false)
  const [gazeData, setGazeData] = useState({ x: 0.000, y: 0.000, pupil: 'N/A' })

  const problem = problems[currentIndex]

  const resetProblemState = () => {
    setHintsLoaded(false)
    setShownHints(0)
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1)
      resetProblemState()
    }
  }

  const goToNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(i => i + 1)
      resetProblemState()
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
        // Simulate gaze data ticking when tracking is on
        setGazeData({ x: 0.512, y: 0.387, pupil: 'Center' })
      } else {
        setGazeData({ x: 0.000, y: 0.000, pupil: 'N/A' })
      }
      return next
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="flex gap-6 items-start">
          {/* Left column — 2/3 width */}
          <div className="flex-[2] min-w-0 flex flex-col gap-5">
            <ProblemNav
              problem={problem}
              currentIndex={currentIndex}
              total={problems.length}
              onPrev={goToPrev}
              onNext={goToNext}
            />

            <ProblemDisplay problem={problem} />

            <Scratchpad key={currentIndex} />

            <HintsPanel
              hints={problem.hints}
              hintsLoaded={hintsLoaded}
              shownHints={shownHints}
              onLoadHints={handleLoadHints}
              onNextHint={handleNextHint}
            />

            <AnswerInput
              key={`answer-${currentIndex}`}
              answers={problem.answer}
            />
          </div>

          {/* Right column — 1/3 width */}
          <div className="flex-[1] min-w-0">
            <EyeTrackingPanel
              gazeData={gazeData}
              isTracking={isTracking}
              onToggleTracking={handleToggleTracking}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function OnboardingScreen({ onContinue }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Onboarding</h1>
        <p className="text-sm text-gray-500 mb-6">
          Full onboarding content (mode introduction cards + comprehension check) will be added in Step 5.
        </p>
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          Continue to Exposure
        </button>
      </div>
    </div>
  )
}

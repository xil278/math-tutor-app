export default function EndScreen({ participantId }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Session Complete</h1>
        <p className="text-sm text-gray-500 mb-1">Thank you, {participantId}.</p>
        <p className="text-sm text-gray-400">
          Logging and the "Download log" button will be added in Step 4.
        </p>
      </div>
    </div>
  )
}

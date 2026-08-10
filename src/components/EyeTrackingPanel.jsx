import { useState } from 'react'

export default function EyeTrackingPanel({ gazeData, isTracking, onToggleTracking }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-5 sticky top-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-700">Aria Eye Tracking</h2>
        <button
          onClick={onToggleTracking}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            isTracking
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
        >
          👁 {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </button>
      </div>

      {/* Gaze data */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-3 space-y-2 font-mono text-sm">
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Gaze X</span>
          <span className={isTracking ? 'text-blue-600' : ''}>{gazeData.x.toFixed(3)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Gaze Y</span>
          <span className={isTracking ? 'text-blue-600' : ''}>{gazeData.y.toFixed(3)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Pupil Position</span>
          <span className={isTracking ? 'text-blue-600' : 'text-gray-400'}>{gazeData.pupil}</span>
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`} />
        <span className="text-xs text-gray-500">{isTracking ? 'Tracking active' : 'Not tracking'}</span>
      </div>

      {/* Instructions / placeholder */}
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          Wear Meta Aria glasses and click "Start Eye Tracking" to begin
        </p>
        {/* Camera preview placeholder */}
        <div className="mt-3 w-full h-28 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
          {isTracking ? (
            <span className="text-xs text-gray-400 animate-pulse">📷 Camera feed</span>
          ) : (
            <span className="text-xs text-gray-300">Preview area</span>
          )}
        </div>
      </div>

      {/* How to use */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">How to use:</p>
        <ol className="list-decimal list-inside space-y-1.5 text-xs text-gray-500 leading-relaxed">
          <li>Put on Meta Aria glasses</li>
          <li>Click "Start Eye Tracking"</li>
          <li>Look at the problem to focus</li>
          <li>Your gaze helps personalize hints</li>
        </ol>
      </div>
    </div>
  )
}

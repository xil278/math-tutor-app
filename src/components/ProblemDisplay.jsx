const images = import.meta.glob('../assets/problem-images/*.png', { eager: true, import: 'default' })

function getImageUrl(filename) {
  return images[`../assets/problem-images/${filename}`]
}

export default function ProblemDisplay({ problem }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Current Problem</h2>

      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl px-5 py-4">
        <p className="text-gray-700 font-medium">{problem.prompt}</p>
      </div>

      {problem.image && (
        <div className="mt-4 flex justify-center">
          <img
            src={getImageUrl(problem.image)}
            alt={problem.topic}
            className="max-w-full rounded-xl border border-gray-100"
          />
        </div>
      )}
    </div>
  )
}

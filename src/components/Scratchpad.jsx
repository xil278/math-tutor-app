import { useRef, useState, useEffect, useCallback } from 'react'

const PenIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-3 1 1-3a4 4 0 01.828-1.414z" />
  </svg>
)

const EraserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M6 18L17.586 6.414A2 2 0 0120.414 9.242L8.828 20.828A4 4 0 016 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h16" />
  </svg>
)

const UndoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 10h10a8 8 0 018 8v2M3 10l6 6M3 10l6-6" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 01-1-1V5a1 1 0 011-1h8a1 1 0 011 1v1a1 1 0 01-1 1H9z" />
  </svg>
)

export default function Scratchpad() {
  const canvasRef = useRef(null)
  const [tool, setTool] = useState('pen')
  const [size, setSize] = useState(4)
  const [isDrawing, setIsDrawing] = useState(false)
  const [history, setHistory] = useState([])
  const lastPos = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }, [])

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return {
      x: src.clientX - rect.left,
      y: src.clientY - rect.top,
    }
  }, [])

  const applyContext = useCallback((ctx) => {
    ctx.lineWidth = tool === 'eraser' ? size * 3 : size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = '#1e293b'
    }
  }, [tool, size])

  const startDrawing = useCallback((e) => {
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e)

    setHistory(h => [...h, ctx.getImageData(0, 0, canvas.width, canvas.height)])

    applyContext(ctx)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    lastPos.current = pos
    setIsDrawing(true)
  }, [getPos, applyContext])

  const draw = useCallback((e) => {
    if (!isDrawing) return
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const pos = getPos(e)

    applyContext(ctx)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    lastPos.current = pos
  }, [isDrawing, getPos, applyContext])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    lastPos.current = null
  }, [])

  const undo = () => {
    if (history.length === 0) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prev = history[history.length - 1]
    ctx.putImageData(prev, 0, 0)
    setHistory(h => h.slice(0, -1))
  }

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    setHistory(h => [...h, ctx.getImageData(0, 0, canvas.width, canvas.height)])
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const toolBtn = (id, label, icon) => (
    <button
      key={id}
      onClick={() => setTool(id)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        tool === id
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {icon}
      {label}
    </button>
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Scratchpad / Sketch Canvas</h2>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {toolBtn('pen', 'Pen', <PenIcon />)}
        {toolBtn('eraser', 'Eraser', <EraserIcon />)}

        <button
          onClick={undo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <UndoIcon /> Undo
        </button>

        <button
          onClick={clear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <TrashIcon /> Clear
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-gray-500">Size</span>
          <input
            type="range"
            min={1}
            max={20}
            value={size}
            onChange={e => setSize(Number(e.target.value))}
            className="w-24 accent-blue-500"
          />
          <span className="text-xs font-mono w-5 text-gray-600">{size}</span>
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative w-full h-72 rounded-xl overflow-hidden checkerboard border border-gray-200">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          style={{ touchAction: 'none' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  )
}

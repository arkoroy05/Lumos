"use client"
import { useEffect, useState } from "react"

export default function AIPrediction() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(87), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-md p-6 rounded-lg bg-black/90 border border-cyan-500/20 shadow-2xl">
      {/* Main Prediction */}
      <div className="text-center mb-8">
        <h2 className="text-sm uppercase tracking-widest text-cyan-400 mb-2 font-mono">Our AI Predicts</h2>
        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
          BULLISH
        </div>
      </div>

      {/* Description */}
      <div className="mb-8 p-4 rounded bg-cyan-950/30 border border-cyan-500/10">
        <p className="text-cyan-100 font-mono text-sm leading-relaxed">
          Market sentiment indicates strong upward momentum with increasing buy pressure and volume metrics.
        </p>
      </div>

      {/* Confidence Meter */}
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-cyan-950"
            />
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
              className="text-cyan-400 transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-2xl font-bold text-cyan-400 font-mono">{progress}%</span>
          </div>
        </div>
        <p className="text-cyan-300 font-mono text-sm">Confidence Level</p>
      </div>
    </div>
  )
}


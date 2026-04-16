'use client'

import { ScoreImpact, SCORE_CATEGORIES } from '@/types/scenario'
import { cn } from '@/lib/utils'

interface ScoreRadarProps {
  scores: ScoreImpact
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
}

export function ScoreRadar({ scores, size = 'md', showLabels = true }: ScoreRadarProps) {
  const dimensions = {
    sm: { width: 200, height: 200, radius: 70 },
    md: { width: 300, height: 300, radius: 110 },
    lg: { width: 400, height: 400, radius: 150 }
  }
  
  const { width, height, radius } = dimensions[size]
  const centerX = width / 2
  const centerY = height / 2
  
  const categories = SCORE_CATEGORIES
  const angleStep = (2 * Math.PI) / categories.length

  const getPoint = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2
    const r = (value / 100) * radius
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    }
  }

  const getLabelPoint = (index: number) => {
    const angle = index * angleStep - Math.PI / 2
    const r = radius + 25
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    }
  }

  const gridLevels = [25, 50, 75, 100]
  
  const dataPoints = categories.map((cat, i) => 
    getPoint(i, scores[cat.id] ?? 50)
  )
  
  const polygonPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height} className="overflow-visible">
        {gridLevels.map(level => {
          const points = categories.map((_, i) => {
            const p = getPoint(i, level)
            return `${p.x},${p.y}`
          }).join(' ')
          
          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="1"
            />
          )
        })}

        {categories.map((_, i) => {
          const end = getPoint(i, 100)
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={end.x}
              y2={end.y}
              stroke="#e5e5e5"
              strokeWidth="1"
            />
          )
        })}

        <polygon
          points={polygonPoints}
          fill="rgba(0, 105, 175, 0.2)"
          stroke="#0069AF"
          strokeWidth="2"
        />

        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="6"
            fill="#0069AF"
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {showLabels && categories.map((cat, i) => {
          const label = getLabelPoint(i)
          const score = scores[cat.id] ?? 50
          
          return (
            <g key={cat.id}>
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-bosch-gray-700"
              >
                {cat.label}
              </text>
              <text
                x={label.x}
                y={label.y + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn(
                  'text-sm font-bold',
                  score >= 70 ? 'fill-green-600' : score >= 50 ? 'fill-yellow-600' : 'fill-red-600'
                )}
              >
                {score}
              </text>
            </g>
          )
        })}
      </svg>

      {!showLabels && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {categories.map(cat => {
            const score = scores[cat.id] ?? 50
            return (
              <div key={cat.id} className="flex items-center gap-2">
                <div className={cn(
                  'w-3 h-3 rounded-full',
                  score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                )} />
                <span className="text-sm text-bosch-gray-600">{cat.label}</span>
                <span className="text-sm font-bold text-bosch-gray-900 ml-auto">{score}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

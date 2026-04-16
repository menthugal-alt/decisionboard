'use client'

import { ScoreImpact, SCORE_CATEGORIES } from '@/types/scenario'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface ProgressTrackerProps {
  currentScores: ScoreImpact
  initialScores: ScoreImpact
  compact?: boolean
}

export function ProgressTracker({ currentScores, initialScores, compact = false }: ProgressTrackerProps) {
  const getChange = (current: number, initial: number) => {
    const diff = current - initial
    if (diff > 0) return { trend: 'up', value: diff, icon: TrendingUp, color: 'text-green-600' }
    if (diff < 0) return { trend: 'down', value: Math.abs(diff), icon: TrendingDown, color: 'text-red-600' }
    return { trend: 'neutral', value: 0, icon: Minus, color: 'text-gray-400' }
  }

  if (compact) {
    return (
      <div className="flex items-center gap-4 p-3 bg-bosch-gray-50 rounded-lg">
        {SCORE_CATEGORIES.slice(0, 4).map(cat => {
          const current = currentScores[cat.id] ?? 50
          const initial = initialScores[cat.id] ?? 50
          const change = getChange(current, initial)
          
          return (
            <div key={cat.id} className="flex items-center gap-1">
              <span className="text-xs text-bosch-gray-500 hidden sm:inline">
                {cat.label.split(' ')[0]}
              </span>
              <span className="text-sm font-bold text-bosch-gray-900">{current}</span>
              {change.value > 0 && (
                <span className={cn('text-xs font-medium', change.color)}>
                  {change.trend === 'up' ? '+' : '-'}{change.value}
                </span>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-bosch-gray-200 p-4">
      <h3 className="text-sm font-semibold text-bosch-gray-900 mb-4">Performance Metrics</h3>
      
      <div className="space-y-4">
        {SCORE_CATEGORIES.map(cat => {
          const current = currentScores[cat.id] ?? 50
          const initial = initialScores[cat.id] ?? 50
          const change = getChange(current, initial)
          const TrendIcon = change.icon

          return (
            <div key={cat.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-bosch-gray-600">{cat.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-bosch-gray-900">{current}</span>
                  {change.value > 0 && (
                    <div className={cn('flex items-center gap-0.5 text-xs', change.color)}>
                      <TrendIcon className="w-3 h-3" />
                      <span>{change.trend === 'up' ? '+' : '-'}{change.value}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="relative h-2 bg-bosch-gray-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'absolute top-0 left-0 h-full rounded-full transition-all duration-500',
                    current >= 70 ? 'bg-green-500' : current >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  )}
                  style={{ width: `${current}%` }}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-bosch-gray-400"
                  style={{ left: `${initial}%` }}
                  title={`Started at ${initial}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import { Decision } from '@/types/scenario'
import { cn } from '@/lib/utils'
import { 
  DollarSign, 
  Clock, 
  Heart, 
  Users, 
  Shield,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import { useState } from 'react'

interface DecisionButtonProps {
  decision: Decision
  index: number
  onSelect: (decision: Decision) => void
  disabled?: boolean
}

const IMPACT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  budget: DollarSign,
  timeline: Clock,
  morale: Heart,
  stakeholder: Users,
  risk: Shield
}

export function DecisionButton({ decision, index, onSelect, disabled }: DecisionButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const sentimentStyles = {
    positive: 'border-green-300 bg-green-50/50',
    negative: 'border-red-300 bg-red-50/50',
    neutral: 'border-bosch-gray-200 bg-bosch-gray-50/50',
    mixed: 'border-yellow-300 bg-yellow-50/50'
  }

  const SentimentIcon = decision.impactPreview.sentiment === 'positive' 
    ? TrendingUp 
    : decision.impactPreview.sentiment === 'negative'
    ? TrendingDown
    : Minus

  const letters = ['A', 'B', 'C', 'D', 'E', 'F']

  return (
    <button
      onClick={() => onSelect(decision)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
        'hover:shadow-md hover:border-bosch-blue-400',
        'focus:outline-none focus:ring-2 focus:ring-bosch-blue-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isHovered ? sentimentStyles[decision.impactPreview.sentiment] : 'border-bosch-gray-200 bg-white'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm',
          'bg-bosch-blue-600 text-white'
        )}>
          {letters[index]}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-medium text-bosch-gray-900">
              {decision.shortText}
            </h4>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsExpanded(!isExpanded)
                }
              }}
              className="text-xs text-bosch-blue-600 hover:text-bosch-blue-700 font-medium cursor-pointer"
            >
              {isExpanded ? 'Less' : 'More'}
            </span>
          </div>
          
          {isExpanded && (
            <p className="text-sm text-bosch-gray-600 mb-3 leading-relaxed">
              {decision.text}
            </p>
          )}

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {decision.impactPreview.areas.map(area => {
                const Icon = IMPACT_ICONS[area]
                return Icon ? (
                  <div
                    key={area}
                    className="w-6 h-6 rounded bg-bosch-gray-100 flex items-center justify-center"
                    title={area.charAt(0).toUpperCase() + area.slice(1)}
                  >
                    <Icon className="w-3.5 h-3.5 text-bosch-gray-600" />
                  </div>
                ) : null
              })}
            </div>
            
            <div className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
              decision.impactPreview.sentiment === 'positive' && 'text-green-700 bg-green-100',
              decision.impactPreview.sentiment === 'negative' && 'text-red-700 bg-red-100',
              decision.impactPreview.sentiment === 'neutral' && 'text-gray-700 bg-gray-100',
              decision.impactPreview.sentiment === 'mixed' && 'text-yellow-700 bg-yellow-100'
            )}>
              <SentimentIcon className="w-3 h-3" />
              <span className="capitalize">{decision.impactPreview.sentiment}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

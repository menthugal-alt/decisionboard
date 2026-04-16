'use client'

import { ScenarioNode, ScoreImpact } from '@/types/scenario'
import { getEndingTypeStyles, calculateFinalScore, getScoreGrade } from '@/lib/scenario-engine'
import { cn } from '@/lib/utils'
import { 
  Trophy, 
  AlertTriangle, 
  XCircle, 
  ArrowRight,
  RotateCcw,
  Home,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface OutcomeDisplayProps {
  node: ScenarioNode
  scores: ScoreImpact
  onContinue?: () => void
  onRestart?: () => void
  onHome?: () => void
}

const EndingIcons = {
  success: Trophy,
  partial: AlertTriangle,
  failure: XCircle
}

export function OutcomeDisplay({ 
  node, 
  scores, 
  onContinue, 
  onRestart, 
  onHome 
}: OutcomeDisplayProps) {
  const isEnding = node.isEnding
  const styles = getEndingTypeStyles(node.endingType)
  const EndingIcon = node.endingType ? EndingIcons[node.endingType] : null
  
  const finalScore = calculateFinalScore(scores)
  const grade = getScoreGrade(finalScore)

  const scoreChanges = node.impacts ? Object.entries(node.impacts).filter(([_, v]) => v !== 0) : []

  return (
    <div className={cn(
      'rounded-2xl border-2 overflow-hidden',
      isEnding ? styles.border : 'border-bosch-gray-200',
      isEnding ? styles.bg : 'bg-white'
    )}>
      {isEnding && (
        <div className={cn(
          'px-6 py-4 border-b',
          node.endingType === 'success' && 'bg-emerald-100 border-emerald-200',
          node.endingType === 'partial' && 'bg-yellow-100 border-yellow-200',
          node.endingType === 'failure' && 'bg-red-100 border-red-200'
        )}>
          <div className="flex items-center gap-3">
            {EndingIcon && (
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center',
                node.endingType === 'success' && 'bg-emerald-200 text-emerald-700',
                node.endingType === 'partial' && 'bg-yellow-200 text-yellow-700',
                node.endingType === 'failure' && 'bg-red-200 text-red-700'
              )}>
                <EndingIcon className="w-6 h-6" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-bosch-gray-900">{node.title}</h2>
              <p className={cn(
                'text-sm font-medium',
                node.endingType === 'success' && 'text-emerald-700',
                node.endingType === 'partial' && 'text-yellow-700',
                node.endingType === 'failure' && 'text-red-700'
              )}>
                Scenario Complete
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {!isEnding && (
          <h3 className="text-lg font-semibold text-bosch-gray-900 mb-3">{node.title}</h3>
        )}
        
        <div className="prose prose-sm max-w-none text-bosch-gray-700 leading-relaxed mb-4">
          {node.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-3 last:mb-0">{paragraph}</p>
          ))}
        </div>

        {scoreChanges.length > 0 && (
          <div className="bg-bosch-gray-50 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-medium text-bosch-gray-500 mb-2">Impact</h4>
            <div className="flex flex-wrap gap-2">
              {scoreChanges.map(([key, value]) => (
                <div
                  key={key}
                  className={cn(
                    'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
                    Number(value) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  )}
                >
                  {Number(value) > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span>{Number(value) > 0 ? '+' : ''}{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {node.feedback && (
          <div className="bg-bosch-blue-50 border border-bosch-blue-200 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold text-bosch-blue-800 mb-1">Feedback</h4>
            <p className="text-sm text-bosch-blue-700 leading-relaxed">{node.feedback}</p>
          </div>
        )}

        {isEnding && (
          <div className="bg-white border border-bosch-gray-200 rounded-lg p-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-bosch-gray-900 mb-1">
                {finalScore}%
              </div>
              <div className={cn('text-lg font-semibold', grade.color)}>
                {grade.grade} - {grade.label}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {!isEnding && onContinue && (
            <button
              onClick={onContinue}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          
          {isEnding && (
            <>
              {onRestart && (
                <button
                  onClick={onRestart}
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
              )}
              {onHome && (
                <button
                  onClick={onHome}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Modules
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

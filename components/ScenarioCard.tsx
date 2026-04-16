'use client'

import { ScenarioNode, Stakeholder } from '@/types/scenario'
import { getPressureLevelColor } from '@/lib/scenario-engine'
import { Clock, AlertTriangle, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScenarioCardProps {
  node: ScenarioNode
  stakeholders?: Stakeholder[]
  children?: React.ReactNode
}

export function ScenarioCard({ node, stakeholders, children }: ScenarioCardProps) {
  const pressureStyles = getPressureLevelColor(node.pressureLevel)

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-bosch-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-bosch-blue-600 to-bosch-blue-700 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">{node.title}</h2>
        
        <div className="flex items-center gap-4 mt-3">
          {node.pressureLevel && (
            <div className={cn(
              'flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border',
              pressureStyles
            )}>
              <AlertTriangle className="w-4 h-4" />
              <span className="capitalize">{node.pressureLevel} Pressure</span>
            </div>
          )}
          
          {node.timeRemaining && (
            <div className="flex items-center gap-1.5 text-white/90 text-sm">
              <Clock className="w-4 h-4" />
              <span>{node.timeRemaining}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {stakeholders && stakeholders.length > 0 && (
          <div className="mb-4 pb-4 border-b border-bosch-gray-100">
            <div className="flex items-center gap-2 text-sm text-bosch-gray-500 mb-2">
              <Users className="w-4 h-4" />
              <span>Key Stakeholders</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stakeholders.map(stakeholder => (
                <div
                  key={stakeholder.id}
                  className="flex items-center gap-2 bg-bosch-gray-50 px-3 py-1.5 rounded-full"
                >
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    stakeholder.initialMood === 'positive' && 'bg-green-500',
                    stakeholder.initialMood === 'neutral' && 'bg-yellow-500',
                    stakeholder.initialMood === 'negative' && 'bg-red-500'
                  )} />
                  <span className="text-sm font-medium text-bosch-gray-700">
                    {stakeholder.name}
                  </span>
                  <span className="text-xs text-bosch-gray-500">
                    {stakeholder.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="prose prose-sm max-w-none text-bosch-gray-700 leading-relaxed">
          {node.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-3 last:mb-0">{paragraph}</p>
          ))}
        </div>

        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

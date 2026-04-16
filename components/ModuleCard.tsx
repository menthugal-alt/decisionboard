'use client'

import { ScenarioModule } from '@/types/scenario'
import { cn } from '@/lib/utils'
import { 
  PieChart, 
  Users, 
  AlertTriangle, 
  Crown, 
  Compass,
  Clock,
  ChevronRight,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

interface ModuleCardProps {
  module: ScenarioModule
  completedScenarios?: number
  isLocked?: boolean
}

const MODULE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'pie-chart': PieChart,
  'users': Users,
  'alert-triangle': AlertTriangle,
  'crown': Crown,
  'compass': Compass
}

const DIFFICULTY_STYLES = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700'
}

export function ModuleCard({ module, completedScenarios = 0, isLocked = false }: ModuleCardProps) {
  const Icon = MODULE_ICONS[module.icon] ?? PieChart
  const totalScenarios = module.scenarios.length
  const isComplete = completedScenarios >= totalScenarios

  const cardClassName = cn(
    'block bg-white rounded-xl border-2 p-6 transition-all duration-200',
    isLocked 
      ? 'border-bosch-gray-200 opacity-60 cursor-not-allowed' 
      : 'border-bosch-gray-200 hover:border-bosch-blue-400 hover:shadow-lg cursor-pointer'
  )

  const cardContent = (
    <div className="flex items-start gap-4">
      <div className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0',
        isComplete ? 'bg-green-100' : 'bg-bosch-blue-100'
      )}>
        {isComplete ? (
          <CheckCircle className="w-7 h-7 text-green-600" />
        ) : (
          <Icon className="w-7 h-7 text-bosch-blue-600" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-semibold text-bosch-gray-900">
            {module.title}
          </h3>
          {isLocked && (
            <span className="text-xs bg-bosch-gray-100 text-bosch-gray-500 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          )}
        </div>

        <p className="text-sm text-bosch-gray-600 mb-3 line-clamp-2">
          {module.description}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full capitalize',
            DIFFICULTY_STYLES[module.difficulty]
          )}>
            {module.difficulty}
          </span>

          <div className="flex items-center gap-1 text-xs text-bosch-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{module.estimatedTime} min</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-bosch-gray-500">
            <span>{completedScenarios}/{totalScenarios} scenarios</span>
          </div>
        </div>

        {module.competencies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {module.competencies.slice(0, 3).map(comp => (
              <span
                key={comp}
                className="text-xs bg-bosch-gray-100 text-bosch-gray-600 px-2 py-0.5 rounded"
              >
                {comp}
              </span>
            ))}
            {module.competencies.length > 3 && (
              <span className="text-xs text-bosch-gray-400">
                +{module.competencies.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {!isLocked && (
        <ChevronRight className="w-5 h-5 text-bosch-gray-400 flex-shrink-0" />
      )}
    </div>
  )

  if (isLocked) {
    return <div className={cardClassName}>{cardContent}</div>
  }

  return (
    <Link href={`/scenarios/${module.id}`} className={cardClassName}>
      {cardContent}
    </Link>
  )
}

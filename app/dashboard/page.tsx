'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadProgress, calculateAverageScore, getOverallPerformance } from '@/lib/scoring'
import { scenarioModules } from '@/data/scenarios'
import { UserProgress, initialScores } from '@/types/scenario'
import { ScoreRadar } from '@/components/ScoreRadar'
import { 
  ArrowLeft, 
  GraduationCap,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  ChevronRight,
  RotateCcw,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getScoreGrade } from '@/lib/scenario-engine'

export default function DashboardPage() {
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setProgress(loadProgress())
    setIsLoading(false)
  }, [])

  const completedProgress = progress.filter(p => p.completed)
  const averageScore = calculateAverageScore(completedProgress)
  const performance = getOverallPerformance(averageScore)
  const grade = getScoreGrade(averageScore)

  const aggregateScores = completedProgress.length > 0 
    ? {
        leadershipStyle: Math.round(completedProgress.reduce((acc, p) => acc + (p.scores.leadershipStyle ?? 50), 0) / completedProgress.length),
        businessImpact: Math.round(completedProgress.reduce((acc, p) => acc + (p.scores.businessImpact ?? 50), 0) / completedProgress.length),
        teamHealth: Math.round(completedProgress.reduce((acc, p) => acc + (p.scores.teamHealth ?? 50), 0) / completedProgress.length),
        riskManagement: Math.round(completedProgress.reduce((acc, p) => acc + (p.scores.riskManagement ?? 50), 0) / completedProgress.length),
      }
    : initialScores

  const getModuleProgress = (moduleId: string) => {
    return progress.filter(p => p.moduleId === moduleId && p.completed)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-bosch-blue-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bosch-gray-50 to-white">
      <header className="bg-white border-b border-bosch-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-bosch-gray-600 hover:text-bosch-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-8 h-8 bg-bosch-red rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-bosch-gray-900">Progress Dashboard</h1>
                <p className="text-xs text-bosch-gray-500">Track your learning journey</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {completedProgress.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-bosch-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-bosch-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-bosch-gray-900 mb-2">No Progress Yet</h2>
            <p className="text-bosch-gray-500 mb-6 max-w-md mx-auto">
              Complete your first scenario to start tracking your progress and see your competency scores.
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              Start Training
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-bosch-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-bosch-blue-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-bosch-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-bosch-gray-500">Average Score</p>
                    <p className="text-2xl font-bold text-bosch-gray-900">{averageScore}%</p>
                  </div>
                </div>
                <div className={cn('text-sm font-medium', grade.color)}>
                  {grade.grade} - {grade.label}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-bosch-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-bosch-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-bosch-gray-900">{completedProgress.length}</p>
                  </div>
                </div>
                <p className="text-sm text-bosch-gray-500">scenarios finished</p>
              </div>

              <div className="bg-white rounded-xl border border-bosch-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-bosch-gray-500">Top Strength</p>
                    <p className="text-lg font-bold text-bosch-gray-900">
                      {Object.entries(aggregateScores)
                        .filter(([key]) => ['leadershipStyle', 'businessImpact', 'teamHealth', 'riskManagement'].includes(key))
                        .sort(([,a], [,b]) => (b ?? 0) - (a ?? 0))[0]?.[0]
                        ?.replace(/([A-Z])/g, ' $1').trim() ?? 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-bosch-gray-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-bosch-gray-500">Growth Area</p>
                    <p className="text-lg font-bold text-bosch-gray-900">
                      {Object.entries(aggregateScores)
                        .filter(([key]) => ['leadershipStyle', 'businessImpact', 'teamHealth', 'riskManagement'].includes(key))
                        .sort(([,a], [,b]) => (a ?? 0) - (b ?? 0))[0]?.[0]
                        ?.replace(/([A-Z])/g, ' $1').trim() ?? 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl border border-bosch-gray-200 p-6">
                <h2 className="text-lg font-semibold text-bosch-gray-900 mb-6">Competency Overview</h2>
                <div className="flex justify-center">
                  <ScoreRadar scores={aggregateScores} size="md" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-bosch-gray-200 p-6">
                <h2 className="text-lg font-semibold text-bosch-gray-900 mb-4">Performance Summary</h2>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-bosch-gray-900">{performance.title}</h3>
                  <p className="text-bosch-gray-600 mt-2">{performance.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-bosch-gray-700 mb-2">Recommendations</h4>
                  <ul className="space-y-2">
                    {performance.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-bosch-gray-600">
                        <span className="w-5 h-5 rounded-full bg-bosch-blue-100 text-bosch-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-medium mt-0.5">
                          {index + 1}
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-bosch-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-bosch-gray-900 mb-4">Module Progress</h2>
              <div className="space-y-4">
                {scenarioModules.map(module => {
                  const moduleProgress = getModuleProgress(module.id)
                  const totalScenarios = module.scenarios.length
                  const completionRate = Math.round((moduleProgress.length / totalScenarios) * 100)

                  return (
                    <div key={module.id} className="border border-bosch-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-bosch-gray-900">{module.title}</h3>
                        <span className="text-sm text-bosch-gray-500">
                          {moduleProgress.length}/{totalScenarios} completed
                        </span>
                      </div>
                      <div className="h-2 bg-bosch-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-bosch-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-bosch-gray-200 p-6">
              <h2 className="text-lg font-semibold text-bosch-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {completedProgress
                  .sort((a, b) => new Date(b.completedAt ?? 0).getTime() - new Date(a.completedAt ?? 0).getTime())
                  .slice(0, 5)
                  .map((p, index) => {
                    const scenarioModule = scenarioModules.find(m => m.id === p.moduleId)
                    const scenario = scenarioModule?.scenarios.find(s => s.id === p.scenarioId)
                    const score = Math.round(
                      ((p.scores.leadershipStyle ?? 50) + 
                       (p.scores.businessImpact ?? 50) + 
                       (p.scores.teamHealth ?? 50) + 
                       (p.scores.riskManagement ?? 50)) / 4
                    )
                    const scoreGrade = getScoreGrade(score)

                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-bosch-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-bosch-gray-200">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-bosch-gray-900">
                              {scenario?.title ?? 'Unknown Scenario'}
                            </p>
                            <p className="text-sm text-bosch-gray-500">
                              {scenarioModule?.title ?? 'Unknown Module'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn('font-bold', scoreGrade.color)}>{score}%</p>
                          <p className="text-xs text-bosch-gray-500">
                            {p.completedAt ? formatDate(p.completedAt) : 'N/A'}
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>

              {completedProgress.length > 5 && (
                <p className="text-sm text-bosch-gray-500 text-center mt-4">
                  Showing 5 of {completedProgress.length} completed scenarios
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

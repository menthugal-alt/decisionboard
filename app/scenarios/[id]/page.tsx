'use client'

import { useReducer, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getModuleById } from '@/data/scenarios'
import { 
  scenarioReducer, 
  initialState, 
  getCurrentNode, 
  calculateFinalScore 
} from '@/lib/scenario-engine'
import { saveProgress } from '@/lib/scoring'
import { initialScores, UserProgress, Scenario, Decision } from '@/types/scenario'
import { ScenarioCard } from '@/components/ScenarioCard'
import { DecisionButton } from '@/components/DecisionButton'
import { OutcomeDisplay } from '@/components/OutcomeDisplay'
import { ProgressTracker } from '@/components/ProgressTracker'
import { 
  ArrowLeft, 
  GraduationCap, 
  Play,
  BookOpen,
  Clock
} from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: { id: string }
}

export default function ScenarioPage({ params }: PageProps) {
  const { id: moduleId } = params
  const router = useRouter()
  const [state, dispatch] = useReducer(scenarioReducer, initialState)
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const scenarioModule = getModuleById(moduleId)
  const currentNode = getCurrentNode(state)

  useEffect(() => {
    if (state.isComplete && state.currentScenario) {
      const progress: UserProgress = {
        moduleId: moduleId,
        scenarioId: state.currentScenario.id,
        completed: true,
        scores: state.scores,
        decisionsPath: state.decisionsPath,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      }
      saveProgress(progress)
    }
  }, [state.isComplete, state.currentScenario, state.scores, state.decisionsPath, moduleId])

  useEffect(() => {
    if (currentNode?.isEnding && !state.isComplete) {
      dispatch({ type: 'COMPLETE_SCENARIO' })
    }
  }, [currentNode, state.isComplete])

  const handleStartScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario)
    dispatch({ type: 'START_SCENARIO', payload: scenario })
  }

  const handleDecision = (decision: Decision) => {
    setIsTransitioning(true)
    
    setTimeout(() => {
      dispatch({
        type: 'MAKE_DECISION',
        payload: {
          decisionId: decision.id,
          nextNode: decision.nextNode,
          impacts: decision.impacts
        }
      })
      setIsTransitioning(false)
    }, 300)
  }

  const handleContinue = () => {
    if (currentNode?.nextNode) {
      setIsTransitioning(true)
      setTimeout(() => {
        dispatch({ type: 'ADVANCE_NODE', payload: currentNode.nextNode! })
        setIsTransitioning(false)
      }, 300)
    }
  }

  const handleNodeTransition = () => {
    if (currentNode?.isEnding) {
      dispatch({ type: 'COMPLETE_SCENARIO' })
    } else if (currentNode?.nextNode && currentNode.type !== 'decision') {
      handleContinue()
    }
  }

  if (!scenarioModule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-bosch-gray-900 mb-2">Module Not Found</h1>
          <p className="text-bosch-gray-500 mb-4">The requested training module could not be found.</p>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  const handleRestart = () => {
    if (selectedScenario) {
      dispatch({ type: 'START_SCENARIO', payload: selectedScenario })
    }
  }

  const handleBackToModules = () => {
    dispatch({ type: 'RESET' })
    setSelectedScenario(null)
  }

  const handleHome = () => {
    router.push('/')
  }

  if (!selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bosch-gray-50 to-white">
        <header className="bg-white border-b border-bosch-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link
                href="/"
                className="flex items-center gap-2 text-bosch-gray-600 hover:text-bosch-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Modules</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-bosch-gray-900 mb-2">{scenarioModule.title}</h1>
            <p className="text-lg text-bosch-gray-600">{scenarioModule.description}</p>
            
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm text-bosch-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {scenarioModule.estimatedTime} min
              </span>
              <span className="text-sm text-bosch-gray-500 flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {scenarioModule.scenarios.length} scenario{scenarioModule.scenarios.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-bosch-gray-900">Available Scenarios</h2>
            
            {scenarioModule.scenarios.map((scenario, index) => (
              <div
                key={scenario.id}
                className="bg-white rounded-xl border border-bosch-gray-200 p-6 hover:border-bosch-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-bosch-blue-100 text-bosch-blue-600 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-bosch-gray-900">
                        {scenario.title}
                      </h3>
                    </div>
                    <p className="text-bosch-gray-600 mb-4 ml-11">
                      {scenario.context.slice(0, 200)}...
                    </p>
                    <div className="ml-11 flex flex-wrap gap-2">
                      {scenario.stakeholders.map(s => (
                        <span
                          key={s.id}
                          className="text-xs bg-bosch-gray-100 text-bosch-gray-600 px-2 py-1 rounded"
                        >
                          {s.name} - {s.role}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleStartScenario(scenario)}
                    className="btn-primary flex items-center gap-2 ml-4 flex-shrink-0"
                  >
                    <Play className="w-4 h-4" />
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bosch-gray-50 to-white">
      <header className="bg-white border-b border-bosch-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToModules}
                className="flex items-center gap-2 text-bosch-gray-600 hover:text-bosch-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-bosch-red rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-bosch-gray-900">{selectedScenario.title}</h1>
                <p className="text-xs text-bosch-gray-500">{scenarioModule.title}</p>
              </div>
            </div>

            <div className="hidden sm:block">
              <ProgressTracker 
                currentScores={state.scores} 
                initialScores={initialScores}
                compact={true}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentNode && (
              <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                {currentNode.type === 'decision' ? (
                  <ScenarioCard 
                    node={currentNode} 
                    stakeholders={selectedScenario.stakeholders}
                  >
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-bosch-gray-500 uppercase tracking-wide">
                        What do you do?
                      </h3>
                      {currentNode.decisions?.map((decision, index) => (
                        <DecisionButton
                          key={decision.id}
                          decision={decision}
                          index={index}
                          onSelect={handleDecision}
                          disabled={isTransitioning}
                        />
                      ))}
                    </div>
                  </ScenarioCard>
                ) : currentNode.type === 'narrative' ? (
                  <ScenarioCard 
                    node={currentNode}
                    stakeholders={selectedScenario.stakeholders}
                  >
                    <button
                      onClick={handleContinue}
                      disabled={isTransitioning}
                      className="btn-primary w-full"
                    >
                      Continue
                    </button>
                  </ScenarioCard>
                ) : (
                  <OutcomeDisplay
                    node={currentNode}
                    scores={state.scores}
                    onContinue={currentNode.nextNode && !currentNode.isEnding ? handleContinue : undefined}
                    onRestart={currentNode.isEnding ? handleRestart : undefined}
                    onHome={currentNode.isEnding ? handleHome : undefined}
                  />
                )}
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ProgressTracker 
                currentScores={state.scores} 
                initialScores={initialScores}
              />
              
              <div className="mt-6 bg-white rounded-xl border border-bosch-gray-200 p-4">
                <h3 className="text-sm font-semibold text-bosch-gray-900 mb-3">
                  Decisions Made
                </h3>
                {state.decisionsPath.length > 0 ? (
                  <div className="space-y-2">
                    {state.decisionsPath.map((decisionId, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-bosch-gray-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-bosch-blue-100 text-bosch-blue-600 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="truncate">{decisionId}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-bosch-gray-400">No decisions yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

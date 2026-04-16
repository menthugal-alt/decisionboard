import { 
  Scenario, 
  ScenarioState, 
  ScenarioAction, 
  ScoreImpact, 
  initialScores,
  ScenarioNode 
} from '@/types/scenario'

export const initialState: ScenarioState = {
  currentScenario: null,
  currentNodeId: null,
  scores: { ...initialScores },
  decisionsPath: [],
  isComplete: false
}

export function scenarioReducer(state: ScenarioState, action: ScenarioAction): ScenarioState {
  switch (action.type) {
    case 'START_SCENARIO':
      return {
        currentScenario: action.payload,
        currentNodeId: action.payload.initialNode,
        scores: { ...initialScores },
        decisionsPath: [],
        isComplete: false
      }

    case 'MAKE_DECISION':
      const newScores = applyImpacts(state.scores, action.payload.impacts)
      return {
        ...state,
        currentNodeId: action.payload.nextNode,
        scores: newScores,
        decisionsPath: [...state.decisionsPath, action.payload.decisionId]
      }

    case 'ADVANCE_NODE':
      return {
        ...state,
        currentNodeId: action.payload
      }

    case 'COMPLETE_SCENARIO':
      return {
        ...state,
        isComplete: true
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

export function applyImpacts(currentScores: ScoreImpact, impacts: ScoreImpact): ScoreImpact {
  const newScores = { ...currentScores }
  
  for (const [key, value] of Object.entries(impacts)) {
    if (value !== undefined && key in newScores) {
      const currentValue = newScores[key as keyof ScoreImpact] ?? 50
      const newValue = Math.max(0, Math.min(100, currentValue + value))
      newScores[key as keyof ScoreImpact] = newValue
    }
  }
  
  return newScores
}

export function getCurrentNode(state: ScenarioState): ScenarioNode | null {
  if (!state.currentScenario || !state.currentNodeId) return null
  return state.currentScenario.nodes[state.currentNodeId] ?? null
}

export function calculateFinalScore(scores: ScoreImpact): number {
  const primaryScores = [
    scores.leadershipStyle ?? 50,
    scores.businessImpact ?? 50,
    scores.teamHealth ?? 50,
    scores.riskManagement ?? 50
  ]
  return Math.round(primaryScores.reduce((a, b) => a + b, 0) / primaryScores.length)
}

export function getScoreGrade(score: number): { grade: string; label: string; color: string } {
  if (score >= 90) return { grade: 'A+', label: 'Exceptional', color: 'text-emerald-600' }
  if (score >= 80) return { grade: 'A', label: 'Excellent', color: 'text-emerald-500' }
  if (score >= 70) return { grade: 'B', label: 'Good', color: 'text-blue-500' }
  if (score >= 60) return { grade: 'C', label: 'Satisfactory', color: 'text-yellow-500' }
  if (score >= 50) return { grade: 'D', label: 'Needs Improvement', color: 'text-orange-500' }
  return { grade: 'F', label: 'Unsatisfactory', color: 'text-red-500' }
}

export function getPressureLevelColor(level: string | undefined): string {
  switch (level) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-300'
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-300'
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'low': return 'bg-green-100 text-green-800 border-green-300'
    default: return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

export function getEndingTypeStyles(type: string | undefined): { bg: string; border: string; icon: string } {
  switch (type) {
    case 'success':
      return { bg: 'bg-emerald-50', border: 'border-emerald-300', icon: 'trophy' }
    case 'partial':
      return { bg: 'bg-yellow-50', border: 'border-yellow-300', icon: 'alert-triangle' }
    case 'failure':
      return { bg: 'bg-red-50', border: 'border-red-300', icon: 'x-circle' }
    default:
      return { bg: 'bg-gray-50', border: 'border-gray-300', icon: 'circle' }
  }
}

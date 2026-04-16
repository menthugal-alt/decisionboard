export interface ScenarioModule {
  id: string
  title: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  competencies: string[]
  scenarios: Scenario[]
}

export interface Scenario {
  id: string
  title: string
  context: string
  backgroundImage?: string
  stakeholders: Stakeholder[]
  initialNode: string
  nodes: Record<string, ScenarioNode>
}

export interface Stakeholder {
  id: string
  name: string
  role: string
  avatar?: string
  initialMood: 'positive' | 'neutral' | 'negative'
}

export interface ScenarioNode {
  id: string
  type: 'decision' | 'outcome' | 'narrative' | 'ending'
  title: string
  content: string
  speakerId?: string
  pressureLevel?: 'low' | 'medium' | 'high' | 'critical'
  timeRemaining?: string
  decisions?: Decision[]
  nextNode?: string
  impacts?: ScoreImpact
  feedback?: string
  isEnding?: boolean
  endingType?: 'success' | 'partial' | 'failure'
}

export interface Decision {
  id: string
  text: string
  shortText: string
  impactPreview: ImpactPreview
  nextNode: string
  impacts: ScoreImpact
}

export interface ImpactPreview {
  areas: ('budget' | 'timeline' | 'morale' | 'stakeholder' | 'risk')[]
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed'
}

export interface ScoreImpact {
  leadershipStyle?: number
  businessImpact?: number
  teamHealth?: number
  riskManagement?: number
  budget?: number
  timeline?: number
  morale?: number
  stakeholderSatisfaction?: number
}

export interface ScoreCategory {
  id: keyof ScoreImpact
  label: string
  description: string
  icon: string
  color: string
}

export const SCORE_CATEGORIES: ScoreCategory[] = [
  {
    id: 'leadershipStyle',
    label: 'Leadership Style',
    description: 'How effectively you demonstrate leadership qualities',
    icon: 'crown',
    color: 'blue'
  },
  {
    id: 'businessImpact',
    label: 'Business Impact',
    description: 'Your decisions\' effect on business outcomes',
    icon: 'trending-up',
    color: 'green'
  },
  {
    id: 'teamHealth',
    label: 'Team Health',
    description: 'How your choices affect team morale and wellbeing',
    icon: 'users',
    color: 'purple'
  },
  {
    id: 'riskManagement',
    label: 'Risk Management',
    description: 'Your ability to identify and mitigate risks',
    icon: 'shield',
    color: 'orange'
  }
]

export interface UserProgress {
  moduleId: string
  scenarioId: string
  completed: boolean
  scores: ScoreImpact
  decisionsPath: string[]
  startedAt: string
  completedAt?: string
}

export interface UserProfile {
  id: string
  name: string
  department?: string
  completedScenarios: UserProgress[]
  totalScore: ScoreImpact
  badges: Badge[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
}

export interface ScenarioState {
  currentScenario: Scenario | null
  currentNodeId: string | null
  scores: ScoreImpact
  decisionsPath: string[]
  isComplete: boolean
}

export const initialScores: ScoreImpact = {
  leadershipStyle: 50,
  businessImpact: 50,
  teamHealth: 50,
  riskManagement: 50,
  budget: 100,
  timeline: 100,
  morale: 75,
  stakeholderSatisfaction: 75
}

export type ScenarioAction =
  | { type: 'START_SCENARIO'; payload: Scenario }
  | { type: 'MAKE_DECISION'; payload: { decisionId: string; nextNode: string; impacts: ScoreImpact } }
  | { type: 'ADVANCE_NODE'; payload: string }
  | { type: 'COMPLETE_SCENARIO' }
  | { type: 'RESET' }

import { ScoreImpact, SCORE_CATEGORIES, UserProgress } from '@/types/scenario'
import { loadUser } from './auth'

export interface ScoreBreakdown {
  category: string
  label: string
  score: number
  change: number
  color: string
}

interface StoredProgress extends UserProgress {
  userId?: string
}

export function calculateScoreBreakdown(
  finalScores: ScoreImpact,
  initialScores: ScoreImpact
): ScoreBreakdown[] {
  return SCORE_CATEGORIES.map(category => {
    const final = finalScores[category.id] ?? 50
    const initial = initialScores[category.id] ?? 50
    const change = final - initial

    return {
      category: category.id,
      label: category.label,
      score: final,
      change,
      color: category.color
    }
  })
}

export function getOverallPerformance(finalScore: number): {
  title: string
  description: string
  recommendations: string[]
} {
  if (finalScore >= 85) {
    return {
      title: 'Outstanding Leadership',
      description: 'You demonstrated exceptional decision-making skills, balancing business needs with team wellbeing while managing risk effectively.',
      recommendations: [
        'Consider mentoring other project managers',
        'Document your decision frameworks for knowledge sharing',
        'Take on more complex, strategic initiatives'
      ]
    }
  }
  
  if (finalScore >= 70) {
    return {
      title: 'Strong Performance',
      description: 'You showed solid leadership and made good decisions under pressure. There are opportunities to further develop your skills.',
      recommendations: [
        'Reflect on moments of hesitation - what additional information would have helped?',
        'Practice stakeholder communication scenarios',
        'Study risk assessment frameworks'
      ]
    }
  }
  
  if (finalScore >= 55) {
    return {
      title: 'Developing Skills',
      description: 'You navigated a challenging situation with mixed results. Focus on building consistency in your decision-making approach.',
      recommendations: [
        'Review the feedback on each decision carefully',
        'Consider alternative approaches you could have taken',
        'Practice similar scenarios to build confidence',
        'Seek feedback from experienced project managers'
      ]
    }
  }
  
  return {
    title: 'Learning Opportunity',
    description: 'This scenario highlighted areas for significant growth. Use this as a learning experience to develop your leadership skills.',
    recommendations: [
      'Retry the scenario and experiment with different approaches',
      'Focus on understanding stakeholder perspectives',
      'Study change management and communication best practices',
      'Consider formal project management training'
    ]
  }
}

export function generateCertificate(
  userName: string,
  moduleName: string,
  score: number,
  completedAt: Date
): string {
  const grade = getGradeFromScore(score)
  return `
BOSCH DECISION LAB
Certificate of Completion

This certifies that
${userName}

has successfully completed the
${moduleName}
training module

with a score of ${score}% (Grade: ${grade})

Completed on: ${completedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
  `
}

function getGradeFromScore(score: number): string {
  if (score >= 90) return 'A+'
  if (score >= 85) return 'A'
  if (score >= 80) return 'A-'
  if (score >= 75) return 'B+'
  if (score >= 70) return 'B'
  if (score >= 65) return 'B-'
  if (score >= 60) return 'C+'
  if (score >= 55) return 'C'
  if (score >= 50) return 'C-'
  return 'D'
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  
  const currentUser = loadUser()
  if (!currentUser) return
  
  const existing = localStorage.getItem('bosch-decision-lab-progress')
  const allProgress: StoredProgress[] = existing ? JSON.parse(existing) : []
  
  const progressWithUser: StoredProgress = {
    ...progress,
    userId: currentUser.id
  }
  
  const existingIndex = allProgress.findIndex(
    p => p.userId === currentUser.id && 
         p.moduleId === progress.moduleId && 
         p.scenarioId === progress.scenarioId
  )
  
  if (existingIndex >= 0) {
    allProgress[existingIndex] = progressWithUser
  } else {
    allProgress.push(progressWithUser)
  }
  
  localStorage.setItem('bosch-decision-lab-progress', JSON.stringify(allProgress))
}

export function loadProgress(): UserProgress[] {
  if (typeof window === 'undefined') return []
  
  const currentUser = loadUser()
  if (!currentUser) return []
  
  const existing = localStorage.getItem('bosch-decision-lab-progress')
  if (!existing) return []
  
  const allProgress: StoredProgress[] = JSON.parse(existing)
  return allProgress.filter(p => p.userId === currentUser.id)
}

export function getModuleProgress(moduleId: string): UserProgress[] {
  return loadProgress().filter(p => p.moduleId === moduleId)
}

export function calculateAverageScore(progress: UserProgress[]): number {
  if (progress.length === 0) return 0
  
  const totalScores = progress.map(p => {
    const scores = [
      p.scores.leadershipStyle ?? 50,
      p.scores.businessImpact ?? 50,
      p.scores.teamHealth ?? 50,
      p.scores.riskManagement ?? 50
    ]
    return scores.reduce((a, b) => a + b, 0) / scores.length
  })
  
  return Math.round(totalScores.reduce((a, b) => a + b, 0) / totalScores.length)
}

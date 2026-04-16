import { ScenarioModule } from '@/types/scenario'
import { resourceAllocationModule } from './resource-allocation'
import { stakeholderManagementModule } from './stakeholder-management'
import { crisisResponseModule } from './crisis-response'
import { teamLeadershipModule } from './team-leadership'
import { strategicDecisionsModule } from './strategic-decisions'

export const scenarioModules: ScenarioModule[] = [
  resourceAllocationModule,
  stakeholderManagementModule,
  crisisResponseModule,
  teamLeadershipModule,
  strategicDecisionsModule
]

export function getModuleById(id: string): ScenarioModule | undefined {
  return scenarioModules.find(m => m.id === id)
}

export function getScenarioById(moduleId: string, scenarioId: string) {
  const module = getModuleById(moduleId)
  if (!module) return undefined
  return module.scenarios.find(s => s.id === scenarioId)
}

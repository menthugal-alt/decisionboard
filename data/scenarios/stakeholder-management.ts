import { ScenarioModule } from '@/types/scenario'

export const stakeholderManagementModule: ScenarioModule = {
  id: 'stakeholder-management',
  title: 'Stakeholder Management',
  description: 'Master executive communication, client expectations, and cross-department alignment in complex organizational dynamics.',
  icon: 'users',
  difficulty: 'advanced',
  estimatedTime: 30,
  competencies: ['Communication', 'Negotiation', 'Influence', 'Political Acumen'],
  scenarios: [
    {
      id: 'conflicting-priorities',
      title: 'Conflicting Priorities',
      context: 'You are leading a cross-functional initiative to implement a new IoT platform at Bosch. Three different business units have competing visions for the platform, and the executive sponsor is growing impatient with the lack of alignment.',
      stakeholders: [
        {
          id: 'sponsor',
          name: 'Klaus Richter',
          role: 'Executive Sponsor (SVP)',
          initialMood: 'negative'
        },
        {
          id: 'bu1',
          name: 'Elena Petrova',
          role: 'Automotive BU Lead',
          initialMood: 'neutral'
        },
        {
          id: 'bu2',
          name: 'Hans Becker',
          role: 'Industrial BU Lead',
          initialMood: 'neutral'
        },
        {
          id: 'bu3',
          name: 'Yuki Tanaka',
          role: 'Consumer BU Lead',
          initialMood: 'positive'
        }
      ],
      initialNode: 'intro',
      nodes: {
        'intro': {
          id: 'intro',
          type: 'narrative',
          title: 'The Alignment Challenge',
          content: 'Klaus calls you into his office. "I\'ve invested significant political capital in this initiative, and we\'re three months in with no clear direction. The board wants to see results. Elena wants automotive-first features, Hans is pushing for industrial protocols, and Yuki needs consumer-friendly interfaces. They\'re all right in their own way, but we can\'t build three platforms."',
          pressureLevel: 'high',
          timeRemaining: '2 weeks until board review',
          nextNode: 'decision-1'
        },
        'decision-1': {
          id: 'decision-1',
          type: 'decision',
          title: 'Initial Approach',
          content: 'Klaus wants a recommendation by end of week. You need to find a way to align three powerful business unit leaders, each with legitimate needs and their own agendas. How do you approach this?',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd1-individual',
              text: 'Schedule individual meetings with each BU lead to understand their true priorities and concerns. Look for hidden common ground before bringing them together.',
              shortText: 'One-on-one discovery',
              impactPreview: { areas: ['stakeholder', 'timeline'], sentiment: 'positive' },
              nextNode: 'outcome-individual',
              impacts: { leadershipStyle: 15, stakeholderSatisfaction: 10, riskManagement: 10 }
            },
            {
              id: 'd1-workshop',
              text: 'Facilitate a workshop with all three BU leads to hash out priorities together. Transparency and direct dialogue will surface the real issues.',
              shortText: 'Group alignment workshop',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'mixed' },
              nextNode: 'outcome-workshop',
              impacts: { leadershipStyle: 5, stakeholderSatisfaction: -5, riskManagement: -5 }
            },
            {
              id: 'd1-data',
              text: 'Conduct a rapid market analysis to let data drive the decision. Present ROI projections for each approach and let the numbers decide.',
              shortText: 'Data-driven decision',
              impactPreview: { areas: ['budget', 'stakeholder'], sentiment: 'neutral' },
              nextNode: 'outcome-data',
              impacts: { businessImpact: 10, leadershipStyle: 5, stakeholderSatisfaction: -10 }
            },
            {
              id: 'd1-escalate',
              text: 'Go back to Klaus and recommend he make the call. This is above your pay grade - the executive sponsor should decide between business units.',
              shortText: 'Escalate to sponsor',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'negative' },
              nextNode: 'outcome-escalate',
              impacts: { leadershipStyle: -20, businessImpact: -10, stakeholderSatisfaction: -15 }
            }
          ]
        },
        'outcome-individual': {
          id: 'outcome-individual',
          type: 'narrative',
          title: 'Discovery Conversations',
          content: 'Your individual meetings reveal surprising insights. Elena\'s automotive focus is driven by a major OEM contract renewal. Hans is under pressure from a competitor\'s industrial IoT launch. Yuki, interestingly, is most flexible - her real concern is time-to-market, not specific features. You identify that automotive and industrial share 70% of core requirements.',
          impacts: { leadershipStyle: 5, riskManagement: 5 },
          nextNode: 'decision-2-individual'
        },
        'decision-2-individual': {
          id: 'decision-2-individual',
          type: 'decision',
          title: 'Building the Coalition',
          content: 'You have valuable intelligence. Now you need to translate this into alignment. Elena and Hans\'s requirements overlap significantly, and Yuki is time-sensitive. How do you proceed?',
          decisions: [
            {
              id: 'd2i-coalition',
              text: 'Meet with Elena first to propose a joint automotive-industrial core platform. If she agrees, approach Hans together. Present Yuki with a fast-track consumer layer built on the shared core.',
              shortText: 'Build sequential coalition',
              impactPreview: { areas: ['stakeholder'], sentiment: 'positive' },
              nextNode: 'ending-coalition',
              impacts: { leadershipStyle: 25, businessImpact: 20, stakeholderSatisfaction: 20, riskManagement: 15 }
            },
            {
              id: 'd2i-present',
              text: 'Present your findings to Klaus first and get his backing before approaching the BU leads with your proposed platform architecture.',
              shortText: 'Secure executive backing first',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'mixed' },
              nextNode: 'ending-backed',
              impacts: { leadershipStyle: 10, businessImpact: 15, stakeholderSatisfaction: 5, riskManagement: 10 }
            }
          ]
        },
        'outcome-workshop': {
          id: 'outcome-workshop',
          type: 'narrative',
          title: 'The Tense Workshop',
          content: 'The workshop starts productively but quickly becomes contentious. Elena and Hans clash over protocol standards. Yuki feels sidelined. The session ends without resolution, and you sense the BU leads are now more entrenched in their positions. Klaus emails asking what went wrong.',
          impacts: { stakeholderSatisfaction: -10, leadershipStyle: -5 },
          nextNode: 'decision-2-workshop'
        },
        'decision-2-workshop': {
          id: 'decision-2-workshop',
          type: 'decision',
          title: 'Damage Control',
          content: 'The workshop didn\'t go as planned. You need to recover the situation before the board review. Klaus is watching closely.',
          decisions: [
            {
              id: 'd2w-apologize',
              text: 'Reach out to each BU lead individually, acknowledge the workshop didn\'t work, and ask for their input on a better path forward.',
              shortText: 'Individual outreach and reset',
              impactPreview: { areas: ['stakeholder', 'morale'], sentiment: 'positive' },
              nextNode: 'ending-recovery',
              impacts: { leadershipStyle: 15, stakeholderSatisfaction: 10, teamHealth: 5 }
            },
            {
              id: 'd2w-force',
              text: 'Use the workshop conflict as evidence that executive decision is needed. Present Klaus with your recommended platform and ask him to mandate it.',
              shortText: 'Leverage conflict for decision',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'negative' },
              nextNode: 'ending-mandate',
              impacts: { leadershipStyle: -10, businessImpact: 5, stakeholderSatisfaction: -20, riskManagement: -10 }
            }
          ]
        },
        'outcome-data': {
          id: 'outcome-data',
          type: 'narrative',
          title: 'The Numbers Game',
          content: 'Your analysis shows automotive has the highest immediate ROI, but industrial has better long-term growth potential. Consumer is a mixed picture. When you present to the group, each BU lead cherry-picks data supporting their position. The analysis becomes ammunition rather than alignment.',
          impacts: { businessImpact: 5, stakeholderSatisfaction: -5 },
          nextNode: 'decision-2-data'
        },
        'decision-2-data': {
          id: 'decision-2-data',
          type: 'decision',
          title: 'Beyond the Numbers',
          content: 'Data alone isn\'t resolving the conflict. You need a different approach.',
          decisions: [
            {
              id: 'd2d-pivot',
              text: 'Acknowledge that data can\'t decide everything. Shift to understanding each leader\'s strategic vision and find alignment on shared goals.',
              shortText: 'Pivot to vision alignment',
              impactPreview: { areas: ['stakeholder'], sentiment: 'positive' },
              nextNode: 'ending-vision',
              impacts: { leadershipStyle: 20, stakeholderSatisfaction: 15, businessImpact: 10 }
            },
            {
              id: 'd2d-hybrid',
              text: 'Propose a phased approach: start with the highest-ROI use case, then expand. Everyone gets their turn.',
              shortText: 'Phased rollout proposal',
              impactPreview: { areas: ['timeline', 'stakeholder'], sentiment: 'mixed' },
              nextNode: 'ending-phased',
              impacts: { businessImpact: 10, stakeholderSatisfaction: 0, riskManagement: 5 }
            }
          ]
        },
        'outcome-escalate': {
          id: 'outcome-escalate',
          type: 'narrative',
          title: 'The Disappointed Sponsor',
          content: 'Klaus is clearly disappointed. "I hired you to solve problems, not bring them back to me. I could have asked the BU leads to vote if that\'s all we needed." He makes a unilateral decision favoring automotive, damaging your credibility and creating resentment in the other BUs.',
          impacts: { leadershipStyle: -15, stakeholderSatisfaction: -15 },
          nextNode: 'ending-escalate'
        },
        'ending-coalition': {
          id: 'ending-coalition',
          type: 'ending',
          title: 'The Aligned Platform',
          content: 'Your coalition-building approach succeeds. Elena and Hans jointly present the shared platform concept to Klaus, with Yuki supporting the consumer fast-track. Klaus is impressed - not just by the solution, but by how you achieved alignment without his intervention. "This is exactly the kind of leadership we need," he says. The board review goes smoothly.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Exceptional stakeholder management. By understanding individual motivations and building coalitions sequentially, you created genuine buy-in rather than forced compliance. This approach scales to larger organizational challenges.',
          impacts: { leadershipStyle: 30, businessImpact: 25, stakeholderSatisfaction: 25, riskManagement: 20 }
        },
        'ending-backed': {
          id: 'ending-backed',
          type: 'ending',
          title: 'Executive-Supported Alignment',
          content: 'Klaus appreciates your analysis and backs your platform proposal. The BU leads accept the direction, though with varying enthusiasm. The project moves forward, but you sense Elena feels bypassed. Future collaboration may require extra attention.',
          isEnding: true,
          endingType: 'partial',
          feedback: 'Good use of executive sponsorship, but top-down decisions can create compliance without commitment. Consider how direct coalition-building might have created stronger buy-in.',
          impacts: { leadershipStyle: 10, businessImpact: 15, stakeholderSatisfaction: 5, riskManagement: 10 }
        },
        'ending-recovery': {
          id: 'ending-recovery',
          type: 'ending',
          title: 'The Reset',
          content: 'Your humility in acknowledging the workshop failure earns respect. The individual conversations that follow are more productive. You eventually achieve alignment, though it takes longer than planned. Klaus notes that "sometimes the longer path is the right one."',
          isEnding: true,
          endingType: 'success',
          feedback: 'Strong recovery. Acknowledging mistakes and adjusting approach shows emotional intelligence. The willingness to reset rather than force a failed approach preserved relationships and ultimately achieved the goal.',
          impacts: { leadershipStyle: 20, stakeholderSatisfaction: 15, teamHealth: 10, riskManagement: 5 }
        },
        'ending-mandate': {
          id: 'ending-mandate',
          type: 'ending',
          title: 'The Forced Decision',
          content: 'Klaus mandates the platform direction. The project proceeds, but Hans\'s team drags their feet and Elena is openly skeptical. Six months later, adoption is poor and the initiative is quietly deprioritized. The technical solution was sound, but the organizational solution failed.',
          isEnding: true,
          endingType: 'failure',
          feedback: 'Mandates can end debates but rarely create commitment. Stakeholder management is about building genuine alignment, not forcing compliance. Consider how earlier relationship-building might have led to a more sustainable outcome.',
          impacts: { leadershipStyle: -15, businessImpact: -10, stakeholderSatisfaction: -25, riskManagement: -15 }
        },
        'ending-vision': {
          id: 'ending-vision',
          type: 'ending',
          title: 'Shared Vision',
          content: 'Shifting from data to vision unlocks the conversation. You help the BU leads see beyond their immediate needs to a shared platform that serves all markets. The discussion becomes collaborative rather than competitive. Klaus is pleased with both the outcome and your facilitation approach.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Excellent pivot. Recognizing when data isn\'t the answer shows wisdom. Vision alignment creates sustainable commitment that data-driven decisions alone cannot achieve.',
          impacts: { leadershipStyle: 25, businessImpact: 20, stakeholderSatisfaction: 20, riskManagement: 15 }
        },
        'ending-phased': {
          id: 'ending-phased',
          type: 'ending',
          title: 'The Phased Approach',
          content: 'The phased rollout is accepted as a reasonable compromise. It\'s not elegant, but it keeps everyone invested. Klaus approves but notes, "I hope we\'re not just delaying the hard decisions." The project proceeds with moderate success.',
          isEnding: true,
          endingType: 'partial',
          feedback: 'Phased approaches can work but may just postpone conflict. True alignment would have been stronger than sequential compromise. Consider whether deeper stakeholder work might have found a more integrated solution.',
          impacts: { businessImpact: 10, leadershipStyle: 5, stakeholderSatisfaction: 5, riskManagement: 0 }
        },
        'ending-escalate': {
          id: 'ending-escalate',
          type: 'ending',
          title: 'Credibility Lost',
          content: 'Your escalation damaged your reputation with Klaus and created resentment in the organization. The automotive-first decision proceeds, but you\'re gradually moved off the project. A valuable learning experience, though a painful one.',
          isEnding: true,
          endingType: 'failure',
          feedback: 'Leaders are expected to solve problems, not just identify them. Escalating without a recommendation or attempted solution signals inability to handle complexity. Stakeholder management often means finding paths that sponsors can\'t see.',
          impacts: { leadershipStyle: -25, businessImpact: -15, stakeholderSatisfaction: -20, riskManagement: -10 }
        }
      }
    }
  ]
}

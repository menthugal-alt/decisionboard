import { ScenarioModule } from '@/types/scenario'

export const crisisResponseModule: ScenarioModule = {
  id: 'crisis-response',
  title: 'Crisis Response',
  description: 'Navigate production delays, quality issues, team conflicts, and scope creep under pressure.',
  icon: 'alert-triangle',
  difficulty: 'advanced',
  estimatedTime: 35,
  competencies: ['Crisis Management', 'Decision Making', 'Resilience', 'Communication'],
  scenarios: [
    {
      id: 'quality-crisis',
      title: 'The Quality Crisis',
      context: 'You are the PM for Bosch\'s new electric vehicle battery management system. Three weeks before production launch, your quality team discovers a firmware bug that could cause incorrect state-of-charge readings in extreme temperatures. The bug affects safety-critical systems.',
      stakeholders: [
        {
          id: 'quality',
          name: 'Dr. Maria Santos',
          role: 'Quality Director',
          initialMood: 'negative'
        },
        {
          id: 'production',
          name: 'Karl Hoffman',
          role: 'Production Manager',
          initialMood: 'neutral'
        },
        {
          id: 'customer',
          name: 'Jennifer Walsh',
          role: 'OEM Account Manager',
          initialMood: 'neutral'
        },
        {
          id: 'engineering',
          name: 'Raj Patel',
          role: 'Lead Systems Engineer',
          initialMood: 'negative'
        }
      ],
      initialNode: 'intro',
      nodes: {
        'intro': {
          id: 'intro',
          type: 'narrative',
          title: 'The Discovery',
          content: 'Dr. Santos calls an emergency meeting. "We found it during extended thermal testing. At temperatures below -20°C, the firmware can misreport battery charge by up to 15%. In an EV, that could leave drivers stranded or, worse, cause unexpected shutdowns." Raj looks shaken - his team wrote the firmware. Karl is already calculating the production line impact.',
          pressureLevel: 'critical',
          timeRemaining: '21 days to launch',
          nextNode: 'decision-1'
        },
        'decision-1': {
          id: 'decision-1',
          type: 'decision',
          title: 'First Response',
          content: 'The room is tense. Everyone is looking to you for direction. You have a customer committed to this launch date, a production line ready to go, and a potentially safety-critical bug. What\'s your first move?',
          pressureLevel: 'critical',
          decisions: [
            {
              id: 'd1-stop',
              text: 'Call an immediate halt to all launch preparations. Safety is non-negotiable. We need to understand the full scope before any other decisions.',
              shortText: 'Full stop - safety first',
              impactPreview: { areas: ['timeline', 'stakeholder', 'risk'], sentiment: 'mixed' },
              nextNode: 'outcome-stop',
              impacts: { riskManagement: 25, businessImpact: -10, stakeholderSatisfaction: -5, leadershipStyle: 15 }
            },
            {
              id: 'd1-assess',
              text: 'Before any announcements, get Raj\'s team to do a 48-hour deep dive on the bug. We need to know exactly what we\'re dealing with before making big decisions.',
              shortText: 'Assess before acting',
              impactPreview: { areas: ['timeline', 'risk'], sentiment: 'neutral' },
              nextNode: 'outcome-assess',
              impacts: { riskManagement: 10, businessImpact: 5, leadershipStyle: 5 }
            },
            {
              id: 'd1-workaround',
              text: 'Ask Raj if there\'s a software workaround we can implement quickly. Maybe we can patch this without delaying the launch.',
              shortText: 'Seek quick fix',
              impactPreview: { areas: ['timeline', 'risk'], sentiment: 'negative' },
              nextNode: 'outcome-workaround',
              impacts: { riskManagement: -15, businessImpact: 5, leadershipStyle: -10 }
            },
            {
              id: 'd1-inform',
              text: 'Immediately inform the customer. They need to know about this risk so they can make informed decisions about their launch timeline.',
              shortText: 'Customer transparency first',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'mixed' },
              nextNode: 'outcome-inform',
              impacts: { stakeholderSatisfaction: 5, riskManagement: 15, businessImpact: -5, leadershipStyle: 10 }
            }
          ]
        },
        'outcome-stop': {
          id: 'outcome-stop',
          type: 'narrative',
          title: 'Full Stop Protocol',
          content: 'You invoke the quality hold procedure. Within hours, you have a cross-functional tiger team investigating the issue. Maria appreciates the decisive action. Karl is frustrated but understands. Raj\'s team works through the night and identifies the root cause: a temperature compensation algorithm that wasn\'t tested at extreme ranges.',
          pressureLevel: 'high',
          impacts: { riskManagement: 10, teamHealth: -5 },
          nextNode: 'decision-2-stop'
        },
        'decision-2-stop': {
          id: 'decision-2-stop',
          type: 'decision',
          title: 'The Fix Assessment',
          content: 'Raj reports: "We can fix this properly, but it needs 4-6 weeks of development and validation. Or we can implement a conservative workaround that limits functionality in extreme cold - it\'s safe but not optimal. That takes 2 weeks." The customer launch is in 3 weeks.',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd2s-proper',
              text: 'Go with the proper fix. Negotiate a launch delay with the customer - they\'ll appreciate getting a better product.',
              shortText: 'Proper fix, delayed launch',
              impactPreview: { areas: ['timeline', 'stakeholder', 'risk'], sentiment: 'positive' },
              nextNode: 'ending-proper-fix',
              impacts: { riskManagement: 25, businessImpact: 15, stakeholderSatisfaction: 10, leadershipStyle: 20 }
            },
            {
              id: 'd2s-workaround',
              text: 'Implement the safe workaround for launch, then push a firmware update with the full fix later. Meets the timeline with acceptable limitations.',
              shortText: 'Workaround now, fix later',
              impactPreview: { areas: ['timeline', 'risk'], sentiment: 'mixed' },
              nextNode: 'ending-workaround-launch',
              impacts: { riskManagement: 10, businessImpact: 10, stakeholderSatisfaction: 5, leadershipStyle: 10 }
            }
          ]
        },
        'outcome-assess': {
          id: 'outcome-assess',
          type: 'narrative',
          title: 'The Analysis',
          content: 'Raj\'s team confirms the bug scope: it affects 100% of units in conditions below -20°C. The good news: it\'s reproducible and fixable. The bad news: proper testing will take at least 3 weeks after the fix. Jennifer has been asking for a status update - she senses something is wrong.',
          pressureLevel: 'high',
          impacts: { riskManagement: 5 },
          nextNode: 'decision-2-assess'
        },
        'decision-2-assess': {
          id: 'decision-2-assess',
          type: 'decision',
          title: 'Communication Decision',
          content: 'You now have clarity on the problem. How do you communicate this to stakeholders?',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd2a-full',
              text: 'Schedule a joint call with the customer and internal leadership. Present the full picture: the bug, the options, the timelines. Recommend the proper fix path.',
              shortText: 'Full transparency call',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'positive' },
              nextNode: 'ending-transparent',
              impacts: { leadershipStyle: 25, stakeholderSatisfaction: 15, riskManagement: 20, businessImpact: 10 }
            },
            {
              id: 'd2a-internal',
              text: 'Brief internal leadership first to align on our position, then present a unified message to the customer.',
              shortText: 'Internal alignment first',
              impactPreview: { areas: ['stakeholder'], sentiment: 'neutral' },
              nextNode: 'ending-aligned-message',
              impacts: { leadershipStyle: 15, stakeholderSatisfaction: 10, riskManagement: 15, businessImpact: 5 }
            }
          ]
        },
        'outcome-workaround': {
          id: 'outcome-workaround',
          type: 'narrative',
          title: 'The Quick Fix Attempt',
          content: 'Raj looks uncomfortable. "We can try to patch it, but without proper validation, I can\'t guarantee it\'s safe." Maria interjects: "I won\'t sign off on a safety-critical system with an unvalidated patch. This isn\'t negotiable." The quick fix path is closing.',
          pressureLevel: 'critical',
          impacts: { teamHealth: -10, riskManagement: -10 },
          nextNode: 'decision-2-workaround'
        },
        'decision-2-workaround': {
          id: 'decision-2-workaround',
          type: 'decision',
          title: 'Quality Pushback',
          content: 'Maria is firm: no unvalidated patches on safety systems. You need to reconsider your approach.',
          pressureLevel: 'critical',
          decisions: [
            {
              id: 'd2w-accept',
              text: 'Accept Maria\'s position. Shift to a proper assessment and fix process. This will delay the launch but ensures quality.',
              shortText: 'Accept and reset',
              impactPreview: { areas: ['timeline', 'risk'], sentiment: 'positive' },
              nextNode: 'ending-reset',
              impacts: { leadershipStyle: 10, riskManagement: 20, stakeholderSatisfaction: -5, teamHealth: 5 }
            },
            {
              id: 'd2w-override',
              text: 'Escalate to get Maria\'s decision overridden. Business needs require we find a way to launch on time.',
              shortText: 'Escalate to override',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'negative' },
              nextNode: 'ending-override',
              impacts: { leadershipStyle: -25, riskManagement: -30, stakeholderSatisfaction: -15, teamHealth: -20 }
            }
          ]
        },
        'outcome-inform': {
          id: 'outcome-inform',
          type: 'narrative',
          title: 'Customer First',
          content: 'Jennifer appreciates the early heads-up and arranges an immediate call with the OEM\'s technical team. They ask pointed questions and request your full test data. Their reaction is measured: "We appreciate the transparency. We need to discuss internally and get back to you."',
          pressureLevel: 'high',
          impacts: { stakeholderSatisfaction: 10 },
          nextNode: 'decision-2-inform'
        },
        'decision-2-inform': {
          id: 'decision-2-inform',
          type: 'decision',
          title: 'Customer Response',
          content: 'The customer comes back with two questions: "What\'s your recommended fix timeline?" and "Can you guarantee this won\'t happen again?" How do you respond?',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd2i-honest',
              text: 'Be honest: 4-6 weeks for a proper fix, and commit to enhanced testing protocols for future releases. No false promises.',
              shortText: 'Honest timeline and process',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'positive' },
              nextNode: 'ending-partnership',
              impacts: { leadershipStyle: 25, stakeholderSatisfaction: 20, riskManagement: 25, businessImpact: 15 }
            },
            {
              id: 'd2i-optimistic',
              text: 'Present an aggressive timeline of 2-3 weeks with a confidence level of 80%. Show them we\'re doing everything possible to minimize delay.',
              shortText: 'Aggressive but risky timeline',
              impactPreview: { areas: ['timeline', 'risk'], sentiment: 'negative' },
              nextNode: 'ending-overpromise',
              impacts: { leadershipStyle: -10, stakeholderSatisfaction: -15, riskManagement: -20, businessImpact: -10 }
            }
          ]
        },
        'ending-proper-fix': {
          id: 'ending-proper-fix',
          type: 'ending',
          title: 'Quality Victory',
          content: 'The customer initially pushes back on the delay but ultimately accepts your reasoning. Six weeks later, you launch with a fully validated system. The OEM\'s technical team compliments your handling of the situation. "Most suppliers would have tried to hide this. You showed integrity." Your relationship strengthens.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Exemplary crisis leadership. Prioritizing safety, communicating clearly, and delivering a quality solution built long-term trust that exceeds the short-term cost of delay.',
          impacts: { leadershipStyle: 30, businessImpact: 25, stakeholderSatisfaction: 25, riskManagement: 30 }
        },
        'ending-workaround-launch': {
          id: 'ending-workaround-launch',
          type: 'ending',
          title: 'Managed Launch',
          content: 'The workaround launches on time with clear documentation of limitations. The customer accepts the constraint for northern markets. Two months later, the full fix is deployed via firmware update. It\'s not perfect, but you balanced safety, timeline, and customer needs.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Good pragmatic decision-making. The safe workaround approach maintained safety while meeting business needs. Clear communication about limitations was key to customer acceptance.',
          impacts: { leadershipStyle: 15, businessImpact: 15, stakeholderSatisfaction: 10, riskManagement: 15 }
        },
        'ending-transparent': {
          id: 'ending-transparent',
          type: 'ending',
          title: 'Trusted Partner',
          content: 'Your transparency impresses both internal leadership and the customer. The joint problem-solving session leads to a creative solution: staged launch in temperate markets first while completing the fix for cold-climate markets. Everyone feels invested in the outcome.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Outstanding crisis communication. Bringing stakeholders together to solve problems rather than presenting problems creates shared ownership and often surfaces better solutions.',
          impacts: { leadershipStyle: 30, businessImpact: 20, stakeholderSatisfaction: 25, riskManagement: 25 }
        },
        'ending-aligned-message': {
          id: 'ending-aligned-message',
          type: 'ending',
          title: 'Coordinated Response',
          content: 'Internal alignment helps present a cohesive message to the customer. The negotiation for timeline extension goes smoothly because you speak with one voice. The project launches successfully with a 3-week delay.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Good stakeholder management. Internal alignment before external communication ensures consistent messaging and prevents the customer from exploiting internal disagreements.',
          impacts: { leadershipStyle: 20, businessImpact: 15, stakeholderSatisfaction: 15, riskManagement: 20 }
        },
        'ending-reset': {
          id: 'ending-reset',
          type: 'ending',
          title: 'The Right Call',
          content: 'Accepting Maria\'s position was difficult but correct. The proper fix takes 5 weeks. The customer is frustrated by the delay but respects the quality commitment. Your team appreciates that you didn\'t force them into an unsafe situation.',
          isEnding: true,
          endingType: 'partial',
          feedback: 'Good recovery from a challenging position. Recognizing when to step back and reset shows maturity. The initial quick-fix approach cost time, but accepting expert pushback limited the damage.',
          impacts: { leadershipStyle: 10, businessImpact: 5, stakeholderSatisfaction: 0, riskManagement: 15, teamHealth: 10 }
        },
        'ending-override': {
          id: 'ending-override',
          type: 'ending',
          title: 'Disaster Avoided - Barely',
          content: 'Leadership backs Maria, not you. The escalation damages your relationship with quality, and word spreads that you tried to push unsafe product. The project launches late anyway, but now with a trust deficit internally. A hard lesson in why quality leadership exists.',
          isEnding: true,
          endingType: 'failure',
          feedback: 'Attempting to override safety decisions is career-limiting and potentially dangerous. Quality and safety leaders have veto power for good reason. Crisis management requires working within safety constraints, not around them.',
          impacts: { leadershipStyle: -30, businessImpact: -20, stakeholderSatisfaction: -20, riskManagement: -35, teamHealth: -25 }
        },
        'ending-partnership': {
          id: 'ending-partnership',
          type: 'ending',
          title: 'Strengthened Partnership',
          content: 'Your honesty transforms a crisis into a relationship-building opportunity. The customer\'s technical team respects your integrity. They agree to the extended timeline and even offer to share test resources. The launch succeeds, and you\'re invited to present your quality processes at their supplier summit.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Exceptional crisis leadership through transparency. Honest communication about timelines and processes builds trust that lasts far beyond any single project. This approach creates advocates, not just customers.',
          impacts: { leadershipStyle: 30, businessImpact: 25, stakeholderSatisfaction: 30, riskManagement: 30 }
        },
        'ending-overpromise': {
          id: 'ending-overpromise',
          type: 'ending',
          title: 'Promise Broken',
          content: 'Your aggressive timeline fails. At week 3, you\'re only 60% complete. The customer is furious - they rearranged their entire launch based on your commitment. Trust is severely damaged. "We can\'t rely on your timelines anymore," they say. Rebuilding this relationship will take years.',
          isEnding: true,
          endingType: 'failure',
          feedback: 'Overpromising in a crisis compounds the damage. The initial transparency was good, but aggressive timelines without confidence destroy the trust you built. Under-promise and over-deliver, especially in crisis recovery.',
          impacts: { leadershipStyle: -25, businessImpact: -25, stakeholderSatisfaction: -30, riskManagement: -25 }
        }
      }
    }
  ]
}

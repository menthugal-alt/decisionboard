import { ScenarioModule } from '@/types/scenario'

export const teamLeadershipModule: ScenarioModule = {
  id: 'team-leadership',
  title: 'Team Leadership',
  description: 'Handle performance conversations, motivation, delegation, and remote team management effectively.',
  icon: 'crown',
  difficulty: 'intermediate',
  estimatedTime: 25,
  competencies: ['Coaching', 'Motivation', 'Delegation', 'Emotional Intelligence'],
  scenarios: [
    {
      id: 'performance-conversation',
      title: 'The Difficult Conversation',
      context: 'You manage a team of 6 engineers on a connected mobility project at Bosch. One of your senior engineers, Lisa, has been underperforming for the past two months. Her code quality has dropped, she misses meetings, and other team members are starting to complain about picking up her slack.',
      stakeholders: [
        {
          id: 'lisa',
          name: 'Lisa Mueller',
          role: 'Senior Software Engineer',
          initialMood: 'negative'
        },
        {
          id: 'hr',
          name: 'Thomas Braun',
          role: 'HR Business Partner',
          initialMood: 'neutral'
        },
        {
          id: 'teammate',
          name: 'Alex Kim',
          role: 'Software Engineer',
          initialMood: 'negative'
        },
        {
          id: 'director',
          name: 'Sabine Fischer',
          role: 'Engineering Director',
          initialMood: 'neutral'
        }
      ],
      initialNode: 'intro',
      nodes: {
        'intro': {
          id: 'intro',
          type: 'narrative',
          title: 'Growing Concerns',
          content: 'Alex pulls you aside after the standup. "I need to talk to you about Lisa. I\'ve been covering for her for weeks now. She\'s missing deadlines, her code reviews are superficial, and yesterday she missed a critical integration meeting. I\'m burning out trying to keep the project on track." You\'ve noticed the issues but haven\'t addressed them directly yet.',
          pressureLevel: 'medium',
          nextNode: 'decision-1'
        },
        'decision-1': {
          id: 'decision-1',
          type: 'decision',
          title: 'First Steps',
          content: 'You need to address this situation before it affects the whole team. How do you start?',
          pressureLevel: 'medium',
          decisions: [
            {
              id: 'd1-private',
              text: 'Schedule a private one-on-one with Lisa for this afternoon. Ask open-ended questions to understand what\'s happening before making any judgments.',
              shortText: 'Private conversation with Lisa',
              impactPreview: { areas: ['morale', 'stakeholder'], sentiment: 'positive' },
              nextNode: 'outcome-private',
              impacts: { leadershipStyle: 15, teamHealth: 5, morale: 5 }
            },
            {
              id: 'd1-hr',
              text: 'Consult with HR first. This seems like a potential performance issue, and you want to handle it correctly from a process standpoint.',
              shortText: 'HR consultation first',
              impactPreview: { areas: ['risk', 'stakeholder'], sentiment: 'neutral' },
              nextNode: 'outcome-hr',
              impacts: { riskManagement: 10, leadershipStyle: -5, teamHealth: -5 }
            },
            {
              id: 'd1-document',
              text: 'Start documenting Lisa\'s performance issues formally. Review her recent code commits, meeting attendance, and get specific examples from the team.',
              shortText: 'Build documentation first',
              impactPreview: { areas: ['risk', 'morale'], sentiment: 'negative' },
              nextNode: 'outcome-document',
              impacts: { riskManagement: 5, leadershipStyle: -10, teamHealth: -10, morale: -10 }
            },
            {
              id: 'd1-redistribute',
              text: 'For now, redistribute Lisa\'s critical work to protect the project. Deal with the performance issue after the current sprint.',
              shortText: 'Protect project first',
              impactPreview: { areas: ['timeline', 'morale'], sentiment: 'negative' },
              nextNode: 'outcome-redistribute',
              impacts: { businessImpact: 5, teamHealth: -15, morale: -15, leadershipStyle: -10 }
            }
          ]
        },
        'outcome-private': {
          id: 'outcome-private',
          type: 'narrative',
          title: 'The One-on-One',
          content: 'You sit down with Lisa in a quiet meeting room. She looks tired and tense. When you ask how things are going, she hesitates, then says: "I\'ve been dealing with some personal stuff. My mother was diagnosed with early-onset dementia last month. I\'m her only family nearby, and I\'ve been handling doctor appointments and trying to find care options. I should have told you sooner, but I thought I could handle it."',
          pressureLevel: 'medium',
          impacts: { leadershipStyle: 5, teamHealth: 5 },
          nextNode: 'decision-2-private'
        },
        'decision-2-private': {
          id: 'decision-2-private',
          type: 'decision',
          title: 'Supporting Lisa',
          content: 'Lisa is dealing with a significant personal crisis. She\'s clearly struggling to balance work and caregiving. How do you respond?',
          pressureLevel: 'medium',
          decisions: [
            {
              id: 'd2p-support',
              text: 'Express genuine empathy first. Then work together to create a realistic plan - explore flexible hours, reduced scope, and FMLA/caregiver leave options. Make it clear the team will support her.',
              shortText: 'Comprehensive support plan',
              impactPreview: { areas: ['morale', 'stakeholder'], sentiment: 'positive' },
              nextNode: 'ending-supported',
              impacts: { leadershipStyle: 30, teamHealth: 25, morale: 20, stakeholderSatisfaction: 10 }
            },
            {
              id: 'd2p-balance',
              text: 'Be understanding but also clear about project needs. Offer some flexibility, but set specific expectations for what she needs to deliver and by when.',
              shortText: 'Empathy with clear expectations',
              impactPreview: { areas: ['morale', 'timeline'], sentiment: 'mixed' },
              nextNode: 'ending-balanced',
              impacts: { leadershipStyle: 15, teamHealth: 10, morale: 5, businessImpact: 10 }
            },
            {
              id: 'd2p-formal',
              text: 'Acknowledge her situation, but explain that you need to bring HR into this. There are proper channels for these situations that need to be followed.',
              shortText: 'Formal HR process',
              impactPreview: { areas: ['risk', 'morale'], sentiment: 'negative' },
              nextNode: 'ending-formal',
              impacts: { leadershipStyle: -5, teamHealth: -5, morale: -10, riskManagement: 10 }
            }
          ]
        },
        'outcome-hr': {
          id: 'outcome-hr',
          type: 'narrative',
          title: 'HR Guidance',
          content: 'Thomas from HR listens to your description. "It\'s good you\'re thinking about process, but have you talked to Lisa directly yet? Often these situations have context that changes how we should approach them. I\'d recommend a conversation first - we can always formalize later if needed."',
          pressureLevel: 'low',
          impacts: { riskManagement: 5 },
          nextNode: 'decision-2-hr'
        },
        'decision-2-hr': {
          id: 'decision-2-hr',
          type: 'decision',
          title: 'Taking HR\'s Advice',
          content: 'Thomas suggests talking to Lisa first. What do you do?',
          pressureLevel: 'medium',
          decisions: [
            {
              id: 'd2h-follow',
              text: 'Follow Thomas\'s advice and schedule a private conversation with Lisa. Come with empathy first, process second.',
              shortText: 'Private conversation approach',
              impactPreview: { areas: ['morale', 'stakeholder'], sentiment: 'positive' },
              nextNode: 'outcome-private',
              impacts: { leadershipStyle: 10, teamHealth: 5 }
            },
            {
              id: 'd2h-proceed',
              text: 'Ask Thomas to join the conversation with Lisa. Having HR present ensures the discussion is properly documented.',
              shortText: 'Include HR in meeting',
              impactPreview: { areas: ['risk', 'morale'], sentiment: 'negative' },
              nextNode: 'ending-hr-present',
              impacts: { riskManagement: 5, leadershipStyle: -15, teamHealth: -15, morale: -20 }
            }
          ]
        },
        'outcome-document': {
          id: 'outcome-document',
          type: 'narrative',
          title: 'Building the File',
          content: 'You spend the day gathering documentation. Code review stats, meeting attendance logs, Jira ticket history. The data confirms Lisa\'s decline. Meanwhile, Alex asks if you talked to Lisa. "Not yet, I want to have all the facts first." Alex looks disappointed: "She seems really stressed. I think something\'s wrong."',
          pressureLevel: 'medium',
          impacts: { teamHealth: -10, leadershipStyle: -5 },
          nextNode: 'decision-2-document'
        },
        'decision-2-document': {
          id: 'decision-2-document',
          type: 'decision',
          title: 'Armed with Data',
          content: 'You have comprehensive documentation of Lisa\'s performance issues. Now what?',
          pressureLevel: 'medium',
          decisions: [
            {
              id: 'd2d-confront',
              text: 'Present Lisa with the documented issues and set a formal Performance Improvement Plan. Be clear about consequences of not improving.',
              shortText: 'Formal PIP approach',
              impactPreview: { areas: ['morale', 'risk'], sentiment: 'negative' },
              nextNode: 'ending-pip-cold',
              impacts: { leadershipStyle: -20, teamHealth: -20, morale: -25, riskManagement: -5 }
            },
            {
              id: 'd2d-soften',
              text: 'Put the documentation aside for now. Start with a caring conversation first - you realize you jumped to the wrong approach.',
              shortText: 'Reset to conversation first',
              impactPreview: { areas: ['morale'], sentiment: 'positive' },
              nextNode: 'outcome-private',
              impacts: { leadershipStyle: 5, teamHealth: 5 }
            }
          ]
        },
        'outcome-redistribute': {
          id: 'outcome-redistribute',
          type: 'narrative',
          title: 'Team Impact',
          content: 'You quietly reassign Lisa\'s critical tasks to Alex and other team members. The project stays on track, but Lisa notices and becomes more withdrawn. Alex is now clearly overloaded and resentful. Other team members are watching to see what happens. Morale is dropping visibly.',
          pressureLevel: 'high',
          impacts: { teamHealth: -15, morale: -15 },
          nextNode: 'decision-2-redistribute'
        },
        'decision-2-redistribute': {
          id: 'decision-2-redistribute',
          type: 'decision',
          title: 'Escalating Tensions',
          content: 'The situation is getting worse. Lisa is isolated, Alex is burning out, and the team is losing trust in your leadership. What now?',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd2r-address',
              text: 'Stop avoiding and have the conversation with Lisa. Acknowledge you should have done this sooner.',
              shortText: 'Face the issue directly',
              impactPreview: { areas: ['morale', 'stakeholder'], sentiment: 'mixed' },
              nextNode: 'ending-late-conversation',
              impacts: { leadershipStyle: 5, teamHealth: 0, morale: -5 }
            },
            {
              id: 'd2r-escalate',
              text: 'Escalate to Sabine. This is beyond what you can handle - you need leadership support.',
              shortText: 'Escalate to director',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'negative' },
              nextNode: 'ending-escalated',
              impacts: { leadershipStyle: -15, teamHealth: -10, stakeholderSatisfaction: -10 }
            }
          ]
        },
        'ending-supported': {
          id: 'ending-supported',
          type: 'ending',
          title: 'Team Comes Through',
          content: 'Lisa is moved by your response. Together, you create a flexible arrangement that accommodates her caregiving needs while keeping her engaged. You share (with her permission) that she\'s dealing with a family health crisis. The team rallies around her. Three months later, with care arrangements stabilized, Lisa returns to full productivity and becomes one of your strongest advocates.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Outstanding people leadership. By leading with empathy and creating comprehensive support, you retained a valuable employee and built deep team loyalty. This approach requires more effort but yields lasting benefits.',
          impacts: { leadershipStyle: 35, teamHealth: 30, morale: 25, stakeholderSatisfaction: 15 }
        },
        'ending-balanced': {
          id: 'ending-balanced',
          type: 'ending',
          title: 'Finding Middle Ground',
          content: 'Lisa appreciates your understanding and commits to meeting adjusted expectations. The balance isn\'t perfect - some deadlines slip, and she takes occasional urgent leave - but the team understands and adapts. Lisa recovers over time and expresses gratitude for your flexibility.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Good pragmatic leadership. Balancing empathy with accountability is challenging but sustainable. Clear expectations combined with flexibility builds trust while maintaining team performance.',
          impacts: { leadershipStyle: 20, teamHealth: 15, morale: 10, businessImpact: 10 }
        },
        'ending-formal': {
          id: 'ending-formal',
          type: 'ending',
          title: 'Process Over Person',
          content: 'Lisa feels hurt by being "handed off to HR" after sharing something personal. She takes FMLA leave but doesn\'t return after it ends - she found another job. Alex tells you privately: "She felt like you didn\'t care. You just followed the process." The team\'s trust in you diminishes.',
          isEnding: true,
          endingType: 'failure',
          feedback: 'While HR processes exist for good reasons, invoking them immediately after someone shares personal struggles signals that process matters more than people. Consider how building trust first might have led to the same protections with better outcomes.',
          impacts: { leadershipStyle: -15, teamHealth: -20, morale: -25, riskManagement: 0 }
        },
        'ending-hr-present': {
          id: 'ending-hr-present',
          type: 'ending',
          title: 'Trust Broken',
          content: 'Lisa walks into the meeting room, sees HR, and immediately becomes defensive. "Am I being fired?" The conversation never recovers. Even after learning about her situation, the presence of HR made it feel like an ambush. Lisa requests a transfer. The team watches nervously - is this how you handle people problems?',
          isEnding: true,
          endingType: 'failure',
          feedback: 'Including HR in initial conversations signals formality and potential discipline. This destroys the psychological safety needed for honest dialogue. HR involvement should come after you\'ve built understanding, not before.',
          impacts: { leadershipStyle: -20, teamHealth: -25, morale: -25, stakeholderSatisfaction: -15 }
        },
        'ending-pip-cold': {
          id: 'ending-pip-cold',
          type: 'ending',
          title: 'Cold Process',
          content: 'Lisa is blindsided by the formal PIP. "Why didn\'t you just ask me what was wrong?" she asks, tears in her eyes. When the team learns what happened, morale plummets. Alex tells you this feels "cold and corporate." Lisa eventually shares her situation but feels the relationship is damaged. She meets the PIP requirements but starts looking for other jobs.',
          isEnding: true,
          endingType: 'failure',
          feedback: 'Documentation and formal processes have their place, but leading with them dehumanizes people and destroys trust. The best managers use formal tools as last resorts, not first responses.',
          impacts: { leadershipStyle: -25, teamHealth: -25, morale: -30, riskManagement: -10 }
        },
        'ending-late-conversation': {
          id: 'ending-late-conversation',
          type: 'ending',
          title: 'Delayed but Delivered',
          content: 'You finally have the conversation with Lisa and learn about her mother. You work out a support plan, but the delay caused damage. Lisa appreciates the eventual response but feels you avoided her. Alex is still burnt out. The team recovers, but you\'ve learned that avoiding hard conversations makes them harder.',
          isEnding: true,
          endingType: 'partial',
          feedback: 'Better late than never, but early intervention would have prevented much of the team damage. The instinct to protect the project by avoiding the people issue actually hurt both the project and the people.',
          impacts: { leadershipStyle: 5, teamHealth: -5, morale: -10, businessImpact: 0 }
        },
        'ending-escalated': {
          id: 'ending-escalated',
          type: 'ending',
          title: 'Leadership Gap Exposed',
          content: 'Sabine is surprised you haven\'t talked to Lisa directly. "This is a people management issue. I need you to handle your team." She helps you reset, but your credibility is damaged. You eventually work things out with Lisa, but Sabine notes in your review that you need to develop "direct people leadership skills."',
          isEnding: true,
          endingType: 'failure',
          feedback: 'Escalating people issues without attempting to resolve them first signals inability to handle management responsibilities. Directors expect managers to manage - escalation should come with analysis and recommendations, not just problems.',
          impacts: { leadershipStyle: -20, teamHealth: -15, morale: -15, stakeholderSatisfaction: -20 }
        }
      }
    }
  ]
}

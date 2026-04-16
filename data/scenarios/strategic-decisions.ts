import { ScenarioModule } from '@/types/scenario'

export const strategicDecisionsModule: ScenarioModule = {
  id: 'strategic-decisions',
  title: 'Strategic Decisions',
  description: 'Make build vs buy decisions, manage timeline trade-offs, and assess risks in complex business situations.',
  icon: 'compass',
  difficulty: 'advanced',
  estimatedTime: 40,
  competencies: ['Strategic Thinking', 'Risk Assessment', 'Business Acumen', 'Decision Analysis'],
  scenarios: [
    {
      id: 'build-vs-buy',
      title: 'Build vs Buy',
      context: 'You are leading Bosch\'s smart factory initiative. The project needs a real-time analytics platform. You can build a custom solution tailored to Bosch\'s needs, or integrate a commercial platform. The decision will affect the next 5+ years of manufacturing digitization.',
      stakeholders: [
        {
          id: 'cto',
          name: 'Dr. Friedrich Weber',
          role: 'CTO',
          initialMood: 'neutral'
        },
        {
          id: 'cfo',
          name: 'Andrea Schulz',
          role: 'CFO',
          initialMood: 'neutral'
        },
        {
          id: 'ops',
          name: 'Michael Braun',
          role: 'VP Operations',
          initialMood: 'positive'
        },
        {
          id: 'vendor',
          name: 'Sarah Mitchell',
          role: 'Platform Vendor (DataCore)',
          initialMood: 'positive'
        }
      ],
      initialNode: 'intro',
      nodes: {
        'intro': {
          id: 'intro',
          type: 'narrative',
          title: 'The Strategic Choice',
          content: 'Dr. Weber has called a strategy meeting. "We\'re at a crossroads. Building our own platform gives us complete control and competitive differentiation. Buying means faster time-to-value but vendor dependency. Both paths have merit. I need your recommendation by the board meeting in two weeks."',
          pressureLevel: 'high',
          timeRemaining: '14 days to board meeting',
          nextNode: 'decision-1'
        },
        'decision-1': {
          id: 'decision-1',
          type: 'decision',
          title: 'Analysis Approach',
          content: 'This is a multi-million dollar decision with long-term implications. How do you approach the analysis?',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd1-comprehensive',
              text: 'Conduct a comprehensive total cost of ownership analysis over 7 years, including build costs, maintenance, opportunity costs, and strategic value. Engage both internal engineering and the vendor for detailed proposals.',
              shortText: 'Full TCO analysis',
              impactPreview: { areas: ['budget', 'risk'], sentiment: 'positive' },
              nextNode: 'outcome-comprehensive',
              impacts: { riskManagement: 15, businessImpact: 10, leadershipStyle: 10 }
            },
            {
              id: 'd1-poc',
              text: 'Run parallel proof-of-concept projects: a small build team exploring custom architecture while evaluating the vendor platform hands-on. Let practical experience inform the decision.',
              shortText: 'Parallel POC approach',
              impactPreview: { areas: ['timeline', 'budget'], sentiment: 'mixed' },
              nextNode: 'outcome-poc',
              impacts: { riskManagement: 20, businessImpact: 5, leadershipStyle: 15 }
            },
            {
              id: 'd1-recommend',
              text: 'Based on your experience and industry trends, make a clear recommendation for the vendor solution. Speed to market matters more than customization in this competitive landscape.',
              shortText: 'Quick vendor recommendation',
              impactPreview: { areas: ['timeline', 'risk'], sentiment: 'mixed' },
              nextNode: 'outcome-recommend',
              impacts: { leadershipStyle: 5, businessImpact: 5, riskManagement: -10 }
            },
            {
              id: 'd1-delay',
              text: 'Request more time from Dr. Weber. A two-week timeline isn\'t sufficient for a decision of this magnitude. Pushing for quality analysis is the responsible approach.',
              shortText: 'Request timeline extension',
              impactPreview: { areas: ['timeline', 'stakeholder'], sentiment: 'negative' },
              nextNode: 'outcome-delay',
              impacts: { leadershipStyle: -5, stakeholderSatisfaction: -10, riskManagement: 5 }
            }
          ]
        },
        'outcome-comprehensive': {
          id: 'outcome-comprehensive',
          type: 'narrative',
          title: 'Deep Analysis',
          content: 'Your analysis reveals interesting findings. Build: €3.5M over 7 years, 18-month delivery, full control, requires 12 FTE ongoing team. Buy (DataCore): €4.2M over 7 years, 6-month delivery, 85% feature fit, vendor lock-in risk. The numbers are closer than expected. Michael from Operations strongly prefers the faster deployment.',
          pressureLevel: 'medium',
          impacts: { riskManagement: 5 },
          nextNode: 'decision-2-comprehensive'
        },
        'decision-2-comprehensive': {
          id: 'decision-2-comprehensive',
          type: 'decision',
          title: 'The Recommendation',
          content: 'Your analysis is complete. Both options are viable. The board needs a clear recommendation. Which way do you lean?',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd2c-build',
              text: 'Recommend build. The lower long-term cost and strategic control justify the longer timeline. Bosch\'s manufacturing expertise is a core competency we should own.',
              shortText: 'Recommend build',
              impactPreview: { areas: ['timeline', 'risk'], sentiment: 'mixed' },
              nextNode: 'ending-build-strategic',
              impacts: { leadershipStyle: 15, businessImpact: 15, riskManagement: 10, stakeholderSatisfaction: 5 }
            },
            {
              id: 'd2c-buy',
              text: 'Recommend buy with negotiated exit clauses. Speed to market and proven technology outweigh the premium. We can always build later if the vendor relationship fails.',
              shortText: 'Recommend buy with protections',
              impactPreview: { areas: ['timeline', 'stakeholder'], sentiment: 'positive' },
              nextNode: 'ending-buy-protected',
              impacts: { leadershipStyle: 15, businessImpact: 20, riskManagement: 15, stakeholderSatisfaction: 15 }
            },
            {
              id: 'd2c-hybrid',
              text: 'Recommend a hybrid: buy the vendor platform for immediate needs, but build a proprietary analytics layer on top. Best of both worlds, though more complex.',
              shortText: 'Recommend hybrid approach',
              impactPreview: { areas: ['budget', 'risk'], sentiment: 'mixed' },
              nextNode: 'ending-hybrid',
              impacts: { leadershipStyle: 10, businessImpact: 10, riskManagement: 5, stakeholderSatisfaction: 10 }
            }
          ]
        },
        'outcome-poc': {
          id: 'outcome-poc',
          type: 'narrative',
          title: 'Proof of Concept Results',
          content: 'After 10 days of parallel work, the POCs reveal critical insights. The build team created an impressive prototype but identified 3 months of additional work for production readiness. The vendor POC integrated smoothly, though Operations found the UI less intuitive than hoped. Real-world experience beats theoretical analysis.',
          pressureLevel: 'medium',
          impacts: { riskManagement: 10 },
          nextNode: 'decision-2-poc'
        },
        'decision-2-poc': {
          id: 'decision-2-poc',
          type: 'decision',
          title: 'POC Insights',
          content: 'The POCs provided valuable data. How do you translate these findings into a recommendation?',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd2p-build-confidence',
              text: 'The build POC proved our team can deliver. Recommend building with the POC team as the nucleus. Their momentum is valuable.',
              shortText: 'Build on POC momentum',
              impactPreview: { areas: ['morale', 'timeline'], sentiment: 'positive' },
              nextNode: 'ending-build-momentum',
              impacts: { leadershipStyle: 20, teamHealth: 15, businessImpact: 10, riskManagement: 10 }
            },
            {
              id: 'd2p-vendor-optimize',
              text: 'Go with the vendor but invest in UX customization. The core platform is solid; Operations\' UI concerns are solvable.',
              shortText: 'Vendor with UX investment',
              impactPreview: { areas: ['budget', 'stakeholder'], sentiment: 'positive' },
              nextNode: 'ending-vendor-optimized',
              impacts: { leadershipStyle: 15, businessImpact: 20, stakeholderSatisfaction: 15, riskManagement: 10 }
            }
          ]
        },
        'outcome-recommend': {
          id: 'outcome-recommend',
          type: 'narrative',
          title: 'Quick Call',
          content: 'You present your vendor recommendation to Dr. Weber. He appreciates the decisiveness but asks: "Have you considered the long-term implications? Andrea will want to see numbers. Michael has concerns about customization." You realize you may have moved too fast.',
          pressureLevel: 'high',
          impacts: { leadershipStyle: -5, stakeholderSatisfaction: -5 },
          nextNode: 'decision-2-recommend'
        },
        'decision-2-recommend': {
          id: 'decision-2-recommend',
          type: 'decision',
          title: 'Justifying the Call',
          content: 'Dr. Weber needs more substance behind your recommendation. How do you proceed?',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd2r-backfill',
              text: 'Quickly develop a supporting analysis that justifies the vendor choice. Get numbers from DataCore and industry benchmarks.',
              shortText: 'Build supporting case',
              impactPreview: { areas: ['risk', 'stakeholder'], sentiment: 'mixed' },
              nextNode: 'ending-backfilled',
              impacts: { leadershipStyle: -5, businessImpact: 5, riskManagement: -10, stakeholderSatisfaction: -5 }
            },
            {
              id: 'd2r-pivot',
              text: 'Acknowledge you moved too fast. Ask for a few more days to do a proper comparative analysis before the board meeting.',
              shortText: 'Acknowledge and reset',
              impactPreview: { areas: ['stakeholder', 'risk'], sentiment: 'positive' },
              nextNode: 'ending-reset-analysis',
              impacts: { leadershipStyle: 10, riskManagement: 15, stakeholderSatisfaction: 5 }
            }
          ]
        },
        'outcome-delay': {
          id: 'outcome-delay',
          type: 'narrative',
          title: 'Timeline Pressure',
          content: 'Dr. Weber frowns. "The board meeting is fixed. Other divisions are moving fast on digital transformation. We need to show progress." He gives you one extra week but makes clear that indecision is also a decision - one that puts us behind competitors.',
          pressureLevel: 'high',
          impacts: { stakeholderSatisfaction: -10 },
          nextNode: 'decision-2-delay'
        },
        'decision-2-delay': {
          id: 'decision-2-delay',
          type: 'decision',
          title: 'Using the Extension',
          content: 'You have one extra week. How do you make the most of it?',
          pressureLevel: 'high',
          decisions: [
            {
              id: 'd2d-focused',
              text: 'Focus the extra time on the three most critical decision factors: total cost, time to value, and strategic flexibility. Don\'t try to analyze everything.',
              shortText: 'Focused analysis',
              impactPreview: { areas: ['risk', 'stakeholder'], sentiment: 'positive' },
              nextNode: 'ending-focused-analysis',
              impacts: { leadershipStyle: 15, businessImpact: 15, riskManagement: 20, stakeholderSatisfaction: 10 }
            },
            {
              id: 'd2d-comprehensive',
              text: 'Use the time to be thorough. Engage consultants, run vendor negotiations, survey manufacturing peers at other companies.',
              shortText: 'Comprehensive but rushed',
              impactPreview: { areas: ['budget', 'timeline'], sentiment: 'negative' },
              nextNode: 'ending-overwhelmed',
              impacts: { leadershipStyle: -10, businessImpact: 0, riskManagement: -5, stakeholderSatisfaction: -5 }
            }
          ]
        },
        'ending-build-strategic': {
          id: 'ending-build-strategic',
          type: 'ending',
          title: 'Strategic Ownership',
          content: 'The board approves the build decision. Dr. Weber appreciates the thorough analysis and strategic framing. Michael is initially frustrated by the timeline but becomes engaged when he\'s included in requirements. 18 months later, the platform launches successfully and becomes a competitive advantage. Other divisions request access.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Excellent strategic decision-making. Your thorough analysis gave the board confidence, and framing build as strategic investment rather than cost center was effective. The patience paid off with a differentiated capability.',
          impacts: { leadershipStyle: 25, businessImpact: 30, riskManagement: 20, stakeholderSatisfaction: 15 }
        },
        'ending-buy-protected': {
          id: 'ending-buy-protected',
          type: 'ending',
          title: 'Smart Partnership',
          content: 'The vendor deal closes with strong exit clauses and data portability requirements. Operations gets their fast deployment; finance appreciates the predictable costs; engineering gets API access for customization. Three years later, you renegotiate favorable terms because you have real options.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Outstanding strategic procurement. Negotiating exit protections transformed a vendor dependency into a genuine partnership. The analysis showed you understood both the value and the risks. This is sophisticated build-vs-buy thinking.',
          impacts: { leadershipStyle: 25, businessImpact: 30, riskManagement: 25, stakeholderSatisfaction: 25 }
        },
        'ending-hybrid': {
          id: 'ending-hybrid',
          type: 'ending',
          title: 'Complex Solution',
          content: 'The hybrid approach is approved but proves challenging to execute. Integration takes longer than expected, and maintaining two codebases strains the team. Eventually it works, but the "best of both worlds" approach delivered more complexity than value. It\'s not a failure, but it\'s not the elegant solution you envisioned.',
          isEnding: true,
          endingType: 'partial',
          feedback: 'Hybrid approaches can seem appealing but often deliver the complexity of both options without the full benefits of either. Sometimes a clean choice - even an imperfect one - is better than trying to satisfy everyone.',
          impacts: { leadershipStyle: 5, businessImpact: 5, riskManagement: 0, stakeholderSatisfaction: 5 }
        },
        'ending-build-momentum': {
          id: 'ending-build-momentum',
          type: 'ending',
          title: 'Team-Driven Success',
          content: 'The POC team\'s enthusiasm carries into full development. They felt heard and invested. The platform delivers on time with creative solutions that emerged from hands-on experience. Dr. Weber notes: "The POC approach validated both the technical path and the team. Well played."',
          isEnding: true,
          endingType: 'success',
          feedback: 'Excellent use of POC as a decision tool. The hands-on experience created organizational buy-in and technical confidence that pure analysis couldn\'t achieve. Building on momentum is a powerful strategy.',
          impacts: { leadershipStyle: 25, businessImpact: 25, teamHealth: 20, riskManagement: 20 }
        },
        'ending-vendor-optimized': {
          id: 'ending-vendor-optimized',
          type: 'ending',
          title: 'Optimized Partnership',
          content: 'The vendor platform launches quickly. The UX investment addresses Operations\' concerns and creates a competitive advantage - your customized interface is actually better than the vendor\'s default. DataCore asks to feature your implementation in their case studies.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Smart vendor strategy. Using POC insights to identify specific improvements rather than generic concerns led to targeted investment. The result is vendor speed with meaningful differentiation.',
          impacts: { leadershipStyle: 20, businessImpact: 25, stakeholderSatisfaction: 20, riskManagement: 15 }
        },
        'ending-backfilled': {
          id: 'ending-backfilled',
          type: 'ending',
          title: 'Shakier Ground',
          content: 'Your backfilled analysis supports the vendor choice, but Andrea\'s financial team pokes holes in some assumptions. The board approves with conditions, but your credibility is slightly damaged. The vendor relationship works out, but you\'re not the hero of this story.',
          isEnding: true,
          endingType: 'partial',
          feedback: 'Analysis that justifies a predetermined conclusion is visible to experienced leaders. Better to acknowledge uncertainty and do the work upfront than to rationalize backward. The outcome was acceptable but the process raised questions.',
          impacts: { leadershipStyle: -5, businessImpact: 10, riskManagement: -5, stakeholderSatisfaction: 0 }
        },
        'ending-reset-analysis': {
          id: 'ending-reset-analysis',
          type: 'ending',
          title: 'Earned Respect',
          content: 'Dr. Weber appreciates your honesty about moving too fast. The additional analysis time produces a solid recommendation that withstands board scrutiny. More importantly, you demonstrated the judgment to know when you\'re not ready - a leadership quality Weber values.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Admitting you moved too fast and resetting shows confidence and good judgment. Leaders who can course-correct quickly are more valuable than those who appear to never make mistakes. Authenticity builds trust.',
          impacts: { leadershipStyle: 20, businessImpact: 15, riskManagement: 20, stakeholderSatisfaction: 15 }
        },
        'ending-focused-analysis': {
          id: 'ending-focused-analysis',
          type: 'ending',
          title: 'Sharp Focus',
          content: 'Your focused analysis on the three critical factors provides exactly what the board needs to decide. You didn\'t try to answer every question - you answered the right questions well. The decision passes cleanly. Andrea compliments your financial discipline. Michael respects the time-to-value focus.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Excellent prioritization under pressure. Knowing what matters most and analyzing that deeply beats shallow analysis of everything. This focus is a hallmark of experienced strategic thinking.',
          impacts: { leadershipStyle: 25, businessImpact: 25, riskManagement: 25, stakeholderSatisfaction: 20 }
        },
        'ending-overwhelmed': {
          id: 'ending-overwhelmed',
          type: 'ending',
          title: 'Analysis Paralysis',
          content: 'Your comprehensive approach runs out of runway. At the board meeting, you have too much data and not enough synthesis. Andrea asks: "What\'s your recommendation?" and you hesitate. The board postpones the decision. Dr. Weber is visibly disappointed. "Sometimes done is better than perfect."',
          isEnding: true,
          endingType: 'failure',
          feedback: 'Analysis paralysis is real. More time doesn\'t always lead to better decisions - it can lead to over-complication. The goal is sufficient confidence to act, not certainty. Learn to recognize when you have enough information.',
          impacts: { leadershipStyle: -15, businessImpact: -10, riskManagement: -10, stakeholderSatisfaction: -15 }
        }
      }
    }
  ]
}

import { ScenarioModule } from '@/types/scenario'

export const resourceAllocationModule: ScenarioModule = {
  id: 'resource-allocation',
  title: 'Resource Allocation',
  description: 'Master the art of managing competing priorities, team bandwidth, and budget constraints in complex engineering projects.',
  icon: 'pie-chart',
  difficulty: 'intermediate',
  estimatedTime: 25,
  competencies: ['Strategic Planning', 'Budget Management', 'Team Leadership', 'Prioritization'],
  scenarios: [
    {
      id: 'critical-deadline',
      title: 'The Critical Deadline',
      context: 'You are the Project Manager for the ABS-X sensor development project at Bosch Automotive. Your team of 8 engineers has been working on a next-generation braking sensor for a major automotive OEM. The project was on track until last week when critical integration issues were discovered.',
      stakeholders: [
        {
          id: 'sarah',
          name: 'Dr. Sarah Chen',
          role: 'VP of Engineering',
          initialMood: 'neutral'
        },
        {
          id: 'marcus',
          name: 'Marcus Weber',
          role: 'Lead Engineer',
          initialMood: 'negative'
        },
        {
          id: 'client',
          name: 'Thomas Müller',
          role: 'Client Technical Director',
          initialMood: 'neutral'
        },
        {
          id: 'hr',
          name: 'Anna Schmidt',
          role: 'HR Business Partner',
          initialMood: 'positive'
        }
      ],
      initialNode: 'intro',
      nodes: {
        'intro': {
          id: 'intro',
          type: 'narrative',
          title: 'Monday Morning',
          content: 'You arrive at the office to find an urgent email from your Lead Engineer, Marcus Weber. The integration tests over the weekend revealed critical firmware issues that will require significant rework. Your team is already stretched thin, and the client demo is scheduled for next Friday.',
          pressureLevel: 'high',
          timeRemaining: '9 days until client demo',
          nextNode: 'decision-1'
        },
        'decision-1': {
          id: 'decision-1',
          type: 'decision',
          title: 'Immediate Response',
          content: 'Marcus is waiting outside your office. The team is anxious and looking to you for direction. You have a steering committee meeting in 2 hours where Dr. Chen will expect a status update. How do you want to handle this situation?',
          pressureLevel: 'high',
          timeRemaining: '9 days until client demo',
          decisions: [
            {
              id: 'd1-overtime',
              text: 'Call an emergency team meeting and ask everyone to commit to overtime this week. The deadline is critical and we need all hands on deck. We\'ll compensate with time off after the demo.',
              shortText: 'Request team overtime',
              impactPreview: {
                areas: ['morale', 'timeline'],
                sentiment: 'mixed'
              },
              nextNode: 'outcome-overtime',
              impacts: {
                teamHealth: -15,
                timeline: 10,
                leadershipStyle: -5,
                morale: -20
              }
            },
            {
              id: 'd1-scope',
              text: 'Analyze the integration issues with Marcus first. Let\'s identify which features are truly critical for the demo and consider reducing scope while maintaining core functionality.',
              shortText: 'Analyze and reduce scope',
              impactPreview: {
                areas: ['stakeholder', 'risk'],
                sentiment: 'neutral'
              },
              nextNode: 'outcome-scope',
              impacts: {
                riskManagement: 10,
                businessImpact: -5,
                leadershipStyle: 10,
                stakeholderSatisfaction: -10
              }
            },
            {
              id: 'd1-delay',
              text: 'Contact the client proactively to discuss the situation. Request a 2-week extension with a clear remediation plan. Transparency builds trust.',
              shortText: 'Request deadline extension',
              impactPreview: {
                areas: ['stakeholder', 'timeline'],
                sentiment: 'negative'
              },
              nextNode: 'outcome-delay',
              impacts: {
                stakeholderSatisfaction: -20,
                riskManagement: 15,
                leadershipStyle: 5,
                businessImpact: -15
              }
            },
            {
              id: 'd1-contractors',
              text: 'Contact our preferred contractor agency to bring in 2-3 senior firmware specialists. The budget hit is worth it if we can save the timeline.',
              shortText: 'Hire contractors',
              impactPreview: {
                areas: ['budget', 'timeline'],
                sentiment: 'mixed'
              },
              nextNode: 'outcome-contractors',
              impacts: {
                budget: -25,
                timeline: 5,
                riskManagement: -5,
                businessImpact: 5
              }
            }
          ]
        },
        'outcome-overtime': {
          id: 'outcome-overtime',
          type: 'narrative',
          title: 'The Overtime Decision',
          content: 'The team meeting is tense. While some engineers understand the urgency, you notice Marcus and two senior developers exchange frustrated looks. "This is the third time this quarter," Marcus mutters. The team reluctantly agrees to the overtime, but morale is visibly low. Sarah from HR sends you a concerned message about upcoming team engagement scores.',
          pressureLevel: 'high',
          timeRemaining: '9 days until client demo',
          impacts: {
            morale: -10
          },
          nextNode: 'decision-2-overtime'
        },
        'decision-2-overtime': {
          id: 'decision-2-overtime',
          type: 'decision',
          title: 'Managing the Fallout',
          content: 'It\'s Wednesday. The overtime is taking its toll. Two team members have called in sick, and you overheard Marcus updating his LinkedIn profile during lunch. However, the integration issues are 60% resolved. Dr. Chen wants to know if the demo will happen.',
          pressureLevel: 'critical',
          timeRemaining: '6 days until client demo',
          decisions: [
            {
              id: 'd2o-push',
              text: 'Stay the course. We\'re making progress and can\'t change strategy now. Schedule one-on-ones with frustrated team members for next week.',
              shortText: 'Continue with overtime',
              impactPreview: {
                areas: ['morale', 'timeline'],
                sentiment: 'negative'
              },
              nextNode: 'ending-burnout',
              impacts: {
                teamHealth: -20,
                timeline: 15,
                leadershipStyle: -15,
                morale: -25
              }
            },
            {
              id: 'd2o-pivot',
              text: 'Call off the remaining overtime. Switch to a hybrid approach - reduce demo scope to critical features only and give the team breathing room.',
              shortText: 'Pivot to scope reduction',
              impactPreview: {
                areas: ['morale', 'stakeholder'],
                sentiment: 'mixed'
              },
              nextNode: 'ending-balanced',
              impacts: {
                teamHealth: 10,
                stakeholderSatisfaction: -15,
                leadershipStyle: 15,
                riskManagement: 10
              }
            },
            {
              id: 'd2o-incentive',
              text: 'Acknowledge the team\'s sacrifice publicly. Arrange immediate spot bonuses, guaranteed comp time, and a team dinner. Make them feel valued.',
              shortText: 'Recognize and reward',
              impactPreview: {
                areas: ['morale', 'budget'],
                sentiment: 'positive'
              },
              nextNode: 'ending-recovery',
              impacts: {
                teamHealth: 15,
                budget: -10,
                leadershipStyle: 20,
                morale: 20
              }
            }
          ]
        },
        'outcome-scope': {
          id: 'outcome-scope',
          type: 'narrative',
          title: 'The Analysis Session',
          content: 'You spend 3 hours with Marcus analyzing the integration issues. You identify that 3 of the 7 firmware modules have critical bugs, but 2 of them are for "nice-to-have" features that weren\'t in the original requirements. Marcus seems relieved that you\'re taking a thoughtful approach. "I was worried you\'d just ask for more overtime," he admits.',
          pressureLevel: 'medium',
          timeRemaining: '8 days until client demo',
          impacts: {
            leadershipStyle: 5,
            morale: 5
          },
          nextNode: 'decision-2-scope'
        },
        'decision-2-scope': {
          id: 'decision-2-scope',
          type: 'decision',
          title: 'Presenting to Stakeholders',
          content: 'You need to present your scope reduction proposal to Dr. Chen and get client buy-in. The proposal removes 2 features from the demo but ensures core safety-critical functionality works flawlessly. How do you frame this?',
          pressureLevel: 'high',
          timeRemaining: '8 days until client demo',
          decisions: [
            {
              id: 'd2s-honest',
              text: 'Be completely transparent about the issues and present the scope reduction as a quality-focused decision. Emphasize that safety-critical systems demand this approach.',
              shortText: 'Full transparency approach',
              impactPreview: {
                areas: ['stakeholder', 'risk'],
                sentiment: 'positive'
              },
              nextNode: 'ending-trust',
              impacts: {
                stakeholderSatisfaction: 5,
                riskManagement: 20,
                leadershipStyle: 25,
                businessImpact: 10
              }
            },
            {
              id: 'd2s-spin',
              text: 'Position it as a "phased delivery approach" - demo the core features now, with the additional features ready for the production release. Don\'t emphasize the bugs.',
              shortText: 'Strategic positioning',
              impactPreview: {
                areas: ['stakeholder', 'risk'],
                sentiment: 'mixed'
              },
              nextNode: 'ending-spin',
              impacts: {
                stakeholderSatisfaction: -5,
                riskManagement: -10,
                leadershipStyle: -5,
                businessImpact: 5
              }
            },
            {
              id: 'd2s-partial',
              text: 'Present to Dr. Chen first privately to get internal alignment, then approach the client together with a united front.',
              shortText: 'Build internal alignment first',
              impactPreview: {
                areas: ['stakeholder', 'risk'],
                sentiment: 'positive'
              },
              nextNode: 'ending-aligned',
              impacts: {
                stakeholderSatisfaction: 10,
                riskManagement: 15,
                leadershipStyle: 20,
                businessImpact: 5
              }
            }
          ]
        },
        'outcome-delay': {
          id: 'outcome-delay',
          type: 'narrative',
          title: 'The Difficult Conversation',
          content: 'You call Thomas Müller at the client company. He\'s initially frustrated - "We\'ve already scheduled our internal stakeholders for the demo." However, as you explain the specific technical challenges and your remediation plan, his tone softens. "I appreciate the heads-up. Let me discuss internally and get back to you."',
          pressureLevel: 'medium',
          timeRemaining: 'TBD',
          impacts: {
            stakeholderSatisfaction: -5
          },
          nextNode: 'decision-2-delay'
        },
        'decision-2-delay': {
          id: 'decision-2-delay',
          type: 'decision',
          title: 'Client Response',
          content: 'Thomas calls back. The client will accept a 1-week delay, but they want a written commitment that the extended timeline will be met, with penalty clauses for further delays. Dr. Chen is concerned about setting this precedent. How do you proceed?',
          pressureLevel: 'high',
          timeRemaining: '16 days until new demo date',
          decisions: [
            {
              id: 'd2d-accept',
              text: 'Accept the penalty clause. Use it as motivation for the team and a commitment to quality. Ensure we have buffer in our internal timeline.',
              shortText: 'Accept penalty terms',
              impactPreview: {
                areas: ['risk', 'timeline'],
                sentiment: 'mixed'
              },
              nextNode: 'ending-commitment',
              impacts: {
                riskManagement: 5,
                businessImpact: -5,
                leadershipStyle: 10,
                stakeholderSatisfaction: 15
              }
            },
            {
              id: 'd2d-negotiate',
              text: 'Counter-propose: no penalty clause, but offer bi-weekly progress demos and full transparency on development status.',
              shortText: 'Negotiate alternative terms',
              impactPreview: {
                areas: ['stakeholder', 'risk'],
                sentiment: 'positive'
              },
              nextNode: 'ending-partnership',
              impacts: {
                riskManagement: 15,
                businessImpact: 10,
                leadershipStyle: 20,
                stakeholderSatisfaction: 20
              }
            },
            {
              id: 'd2d-reject',
              text: 'Reject the delay offer. Go back to the original plan and find another way to meet the original deadline.',
              shortText: 'Reject and find alternatives',
              impactPreview: {
                areas: ['timeline', 'morale'],
                sentiment: 'negative'
              },
              nextNode: 'ending-pressure',
              impacts: {
                riskManagement: -15,
                teamHealth: -20,
                leadershipStyle: -10,
                stakeholderSatisfaction: -10
              }
            }
          ]
        },
        'outcome-contractors': {
          id: 'outcome-contractors',
          type: 'narrative',
          title: 'The Contractor Gamble',
          content: 'The contractor agency can provide 2 senior firmware engineers by Wednesday. However, at €180/hour each, this will add €28,800 to the project budget. Marcus is skeptical: "They\'ll need at least 2 days to get up to speed on our codebase." Dr. Chen asks about the budget impact in the steering committee.',
          pressureLevel: 'high',
          timeRemaining: '9 days until client demo',
          impacts: {
            budget: -15
          },
          nextNode: 'decision-2-contractors'
        },
        'decision-2-contractors': {
          id: 'decision-2-contractors',
          type: 'decision',
          title: 'Defending the Decision',
          content: 'Dr. Chen questions the contractor spend: "We\'re already at 95% of budget. Can you guarantee this will work?" The finance team wants to see the ROI justification. Meanwhile, Marcus reports that one internal engineer volunteered for overtime anyway.',
          pressureLevel: 'high',
          timeRemaining: '9 days until client demo',
          decisions: [
            {
              id: 'd2c-full',
              text: 'Proceed with both contractors. Present a detailed ROI showing that missing the deadline costs more than the contractor fees.',
              shortText: 'Full contractor investment',
              impactPreview: {
                areas: ['budget', 'timeline'],
                sentiment: 'mixed'
              },
              nextNode: 'ending-investment',
              impacts: {
                budget: -20,
                timeline: 20,
                businessImpact: 15,
                leadershipStyle: 10
              }
            },
            {
              id: 'd2c-one',
              text: 'Compromise - bring in one contractor for the most critical firmware module, and accept the internal volunteer\'s overtime offer.',
              shortText: 'Hybrid approach',
              impactPreview: {
                areas: ['budget', 'morale'],
                sentiment: 'mixed'
              },
              nextNode: 'ending-hybrid',
              impacts: {
                budget: -10,
                timeline: 10,
                teamHealth: -5,
                riskManagement: 10
              }
            },
            {
              id: 'd2c-internal',
              text: 'Cancel the contractors. Work with the volunteer and restructure tasks to focus the team on critical path items only.',
              shortText: 'Go internal only',
              impactPreview: {
                areas: ['budget', 'morale', 'timeline'],
                sentiment: 'mixed'
              },
              nextNode: 'ending-internal',
              impacts: {
                budget: 10,
                timeline: -10,
                teamHealth: 5,
                leadershipStyle: 5
              }
            }
          ]
        },
        'ending-burnout': {
          id: 'ending-burnout',
          type: 'ending',
          title: 'Demo Day: Pyrrhic Victory',
          content: 'The demo succeeds - barely. The core functionality works, but the client notices the tension in the room. After the demo, Marcus submits his resignation, and two other team members request transfers. Dr. Chen calls you in: "We won the battle but may have lost the war. We need to talk about sustainable project management."',
          isEnding: true,
          endingType: 'partial',
          feedback: 'While you showed determination, pushing a team beyond their limits leads to burnout and attrition. The cost of replacing experienced engineers often exceeds any short-term gains. Consider how early intervention and scope management could have prevented this situation.',
          impacts: {
            leadershipStyle: -20,
            businessImpact: 5,
            teamHealth: -30,
            riskManagement: -15
          }
        },
        'ending-balanced': {
          id: 'ending-balanced',
          type: 'ending',
          title: 'Demo Day: Solid Foundation',
          content: 'The demo covers core functionality flawlessly. When Thomas asks about the additional features, you confidently explain they\'re in final testing and will be delivered next week. The client appreciates the quality focus. Marcus thanks you privately: "I was ready to leave. This made me reconsider." The team feels valued.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Excellent course correction. Recognizing when a strategy isn\'t working and pivoting shows adaptive leadership. You balanced business needs with team wellbeing and maintained credibility with the client through honest communication.',
          impacts: {
            leadershipStyle: 20,
            businessImpact: 10,
            teamHealth: 15,
            riskManagement: 15
          }
        },
        'ending-recovery': {
          id: 'ending-recovery',
          type: 'ending',
          title: 'Demo Day: Team Triumph',
          content: 'The demo is a success. More importantly, the team feels recognized and valued. The immediate rewards combined with the promised comp time transformed the overtime from a burden into a shared mission. Marcus leads the demo with enthusiasm. The client is impressed by both the product and the team dynamics.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Strong emotional intelligence. When overtime is unavoidable, acknowledging the sacrifice and providing immediate, tangible recognition can maintain morale. The key is ensuring this doesn\'t become a pattern - your team trusted you because this felt exceptional, not routine.',
          impacts: {
            leadershipStyle: 25,
            businessImpact: 15,
            teamHealth: 10,
            riskManagement: 5
          }
        },
        'ending-trust': {
          id: 'ending-trust',
          type: 'ending',
          title: 'Demo Day: Building Trust',
          content: 'Your transparent approach pays off. Dr. Chen initially worried about showing vulnerability, but the client respects your honesty. "I\'d rather have a partner who tells me about problems than one who hides them," Thomas says. The reduced-scope demo exceeds expectations. A follow-up meeting is scheduled to discuss expanding the partnership.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Outstanding leadership. Transparency with stakeholders, especially about problems, builds long-term trust. Framing scope reduction around quality and safety resonated because it aligned with the client\'s core values. This approach established you as a trustworthy partner.',
          impacts: {
            leadershipStyle: 30,
            businessImpact: 20,
            teamHealth: 15,
            riskManagement: 25
          }
        },
        'ending-spin': {
          id: 'ending-spin',
          type: 'ending',
          title: 'Demo Day: Short-term Win',
          content: 'The demo goes well. The client accepts the "phased delivery" framing. However, during a hallway conversation, one of your engineers accidentally mentions the firmware bugs to the client\'s technical team. Thomas confronts you later: "I thought this was strategic, not damage control." Trust is damaged.',
          isEnding: true,
          endingType: 'partial',
          feedback: 'While strategic framing has its place, obscuring significant issues can backfire. Technical teams often communicate across company boundaries. A half-truth that\'s discovered becomes worse than the original problem. Consider how full transparency might have led to the same outcome with preserved trust.',
          impacts: {
            leadershipStyle: -10,
            businessImpact: -5,
            teamHealth: -5,
            riskManagement: -15
          }
        },
        'ending-aligned': {
          id: 'ending-aligned',
          type: 'ending',
          title: 'Demo Day: United Front',
          content: 'By aligning with Dr. Chen first, you present a unified message to the client. Dr. Chen backs you up during tough questions and adds executive gravitas to the scope discussion. The client appreciates dealing with a cohesive team. The demo succeeds, and Dr. Chen mentions you positively in the next leadership meeting.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Excellent stakeholder management. Building internal alignment before external communication shows political acumen. You gave Dr. Chen the information she needed to support you, and approached the client as a unified team rather than exposing internal disagreements.',
          impacts: {
            leadershipStyle: 25,
            businessImpact: 15,
            teamHealth: 10,
            riskManagement: 20
          }
        },
        'ending-commitment': {
          id: 'ending-commitment',
          type: 'ending',
          title: 'New Demo Day: Under Pressure',
          content: 'The penalty clause creates urgency but also anxiety. The extra week helps technically, but the team works under visible stress. The demo succeeds, avoiding penalties, but the client relationship feels more transactional. Dr. Chen notes: "We delivered, but at what cost to the partnership dynamic?"',
          isEnding: true,
          endingType: 'partial',
          feedback: 'Accepting penalty clauses can work but changes the relationship dynamic. It signals that external pressure is needed for accountability. Consider whether building intrinsic motivation and trust might have achieved the same result without the adversarial undertone.',
          impacts: {
            leadershipStyle: 5,
            businessImpact: 5,
            teamHealth: -10,
            riskManagement: 0
          }
        },
        'ending-partnership': {
          id: 'ending-partnership',
          type: 'ending',
          title: 'New Demo Day: Partnership Model',
          content: 'Your counter-proposal transforms the relationship. The bi-weekly demos become valuable feedback loops. By the main demo, the client has been part of the journey and feels invested in the outcome. Thomas tells Dr. Chen: "This is how all our vendor relationships should work." You\'re asked to lead the next major initiative.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Exceptional negotiation and relationship building. By offering transparency as an alternative to punitive measures, you transformed a potential conflict into a partnership opportunity. This approach builds lasting business relationships based on trust rather than fear.',
          impacts: {
            leadershipStyle: 30,
            businessImpact: 25,
            teamHealth: 10,
            riskManagement: 20
          }
        },
        'ending-pressure': {
          id: 'ending-pressure',
          type: 'ending',
          title: 'Original Demo Day: Crisis Mode',
          content: 'Rejecting the delay puts everyone back under the original pressure. Despite heroic efforts, the demo has visible glitches. The client is polite but clearly disappointed. Dr. Chen is frustrated: "We had an out and didn\'t take it." The project continues but with damaged credibility.',
          isEnding: true,
          endingType: 'failure',
          feedback: 'Sometimes accepting help or an extension is the stronger move. Rejecting reasonable accommodations to prove a point often backfires. The client offered an olive branch that could have been a win-win. Consider how ego and pride might influence decisions in high-pressure situations.',
          impacts: {
            leadershipStyle: -20,
            businessImpact: -20,
            teamHealth: -15,
            riskManagement: -25
          }
        },
        'ending-investment': {
          id: 'ending-investment',
          type: 'ending',
          title: 'Demo Day: Resource Win',
          content: 'The contractor investment pays off. Both engineers integrate faster than expected - Marcus\'s initial skepticism turns to appreciation when they solve a tricky race condition on day two. The demo succeeds with all features. Dr. Chen approves: "Good call. You made a business case and delivered on it."',
          isEnding: true,
          endingType: 'success',
          feedback: 'Strong business acumen. You recognized that missing the deadline had costs exceeding the contractor fees and made a compelling ROI argument. The key was following through - contractors are a tool, not a magic solution. Your integration planning made the difference.',
          impacts: {
            leadershipStyle: 20,
            businessImpact: 25,
            teamHealth: 5,
            riskManagement: 15
          }
        },
        'ending-hybrid': {
          id: 'ending-hybrid',
          type: 'ending',
          title: 'Demo Day: Balanced Approach',
          content: 'The hybrid approach works. One contractor tackles the hardest module while your volunteer handles the second-priority item. Budget impact is manageable. The demo succeeds with core features. The volunteer feels recognized, though tired. A sustainable middle ground.',
          isEnding: true,
          endingType: 'success',
          feedback: 'Good pragmatic leadership. Finding the middle path that addresses the critical constraint (time) while managing secondary concerns (budget, morale) shows balanced judgment. Not every decision needs to be all-or-nothing.',
          impacts: {
            leadershipStyle: 15,
            businessImpact: 15,
            teamHealth: 5,
            riskManagement: 10
          }
        },
        'ending-internal': {
          id: 'ending-internal',
          type: 'ending',
          title: 'Demo Day: Team Effort',
          content: 'Going internal-only requires creative task restructuring. The team rallies around the challenge. The demo covers core features solidly, though two secondary features are cut. The volunteer is exhausted but proud. Dr. Chen notes: "You kept the budget but took a risk. It worked this time."',
          isEnding: true,
          endingType: 'partial',
          feedback: 'Your decision preserved budget and team autonomy, but relied on goodwill that can\'t be repeatedly spent. The warning from Dr. Chen is worth noting - this approach worked, but barely. Consider whether the risk was appropriate for the situation.',
          impacts: {
            leadershipStyle: 10,
            businessImpact: 5,
            teamHealth: 0,
            riskManagement: -5
          }
        }
      }
    }
  ]
}

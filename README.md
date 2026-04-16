# Decision Lab - Bosch PM Training Simulator

An interactive web-based training simulator for Bosch Project Managers. Navigate realistic management scenarios, make critical decisions, and receive immediate feedback on your leadership approach.

## Features

- **5 Training Modules**: Resource Allocation, Stakeholder Management, Crisis Response, Team Leadership, and Strategic Decisions
- **Branching Narratives**: Each decision leads to different outcomes based on your choices
- **Multi-dimensional Scoring**: Track your performance across Leadership Style, Business Impact, Team Health, and Risk Management
- **Progress Dashboard**: Monitor your learning journey with visual competency charts
- **Realistic Scenarios**: Based on real-world engineering and project management challenges

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd bosch-decision-lab
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
bosch-decision-lab/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page with module selection
│   ├── dashboard/         # Progress dashboard
│   └── scenarios/[id]/    # Scenario player
├── components/            # React components
│   ├── ScenarioCard.tsx   # Main scenario display
│   ├── DecisionButton.tsx # Decision option buttons
│   ├── OutcomeDisplay.tsx # Outcome and ending displays
│   ├── ScoreRadar.tsx     # Radar chart for scores
│   └── ProgressTracker.tsx # Score tracking sidebar
├── data/scenarios/        # Scenario content
│   ├── resource-allocation.ts
│   ├── stakeholder-management.ts
│   ├── crisis-response.ts
│   ├── team-leadership.ts
│   └── strategic-decisions.ts
├── lib/                   # Utilities and engine
│   ├── scenario-engine.ts # State machine for scenarios
│   ├── scoring.ts         # Scoring and progress logic
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript definitions
    └── scenario.ts        # Type definitions
```

## Training Modules

### 1. Resource Allocation
Master the art of managing competing priorities, team bandwidth, and budget constraints in complex engineering projects.

### 2. Stakeholder Management
Navigate executive communication, client expectations, and cross-department alignment in complex organizational dynamics.

### 3. Crisis Response
Handle production delays, quality issues, team conflicts, and scope creep under pressure.

### 4. Team Leadership
Manage performance conversations, motivation, delegation, and remote team challenges effectively.

### 5. Strategic Decisions
Make build vs buy decisions, manage timeline trade-offs, and assess risks in complex business situations.

## Competency Framework

Your performance is evaluated across four key dimensions:

- **Leadership Style**: How effectively you demonstrate leadership qualities
- **Business Impact**: Your decisions' effect on project outcomes
- **Team Health**: How your choices affect team morale and wellbeing
- **Risk Management**: Your ability to identify and mitigate risks

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useReducer

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## License

Internal Bosch training tool - For demonstration purposes only.

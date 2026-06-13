# OrbitIQ: AI-Powered Multi-Agent Workforce Capacity & Upskilling Intelligence Platform

🏆 **Microsoft Agents League Hackathon 2026 Submission**
Built during **Microsoft AI Skills Fest 2026**

---

## 🔗 Project Links

### Live Demo

https://ai.studio/apps/fde5fe00-92fe-4dbe-b5b6-6fba2b88252d?fullscreenApplet=true

### Hackathon Submission

https://innovationstudio.microsoft.com/hackathons/Agents-League-Hackathon/project/123638

### Challenge Track

**💼 Enterprise Agents – Microsoft Agents League Hackathon 2026**

---

# 🚀 Overview

OrbitIQ is a multi-agent workforce intelligence platform designed to help engineering organizations balance employee upskilling initiatives with real-world operational demands.

Modern technical teams are expected to continuously learn new technologies, prepare for certifications, and develop advanced skills while simultaneously supporting production systems, responding to incidents, attending meetings, and delivering business-critical projects.

OrbitIQ addresses this challenge through a coordinated network of specialized AI agents that evaluate learning objectives alongside operational capacity signals. The platform dynamically adjusts workforce development recommendations based on changing workload conditions, helping organizations align employee growth with operational realities.

Rather than treating learning as an isolated activity, OrbitIQ treats workforce development as a continuously adaptive process informed by organizational context.

---

# 🏆 Microsoft Agents League Hackathon 2026

OrbitIQ was developed for the **Enterprise Agents** challenge track during **Microsoft AI Skills Fest 2026**.

The project demonstrates how specialized AI agents can collaborate through a structured state-graph architecture to support enterprise workforce planning, employee development, workload awareness, and management intelligence.

The solution aligns with key themes of the challenge:

* Enterprise-ready AI agents
* Multi-agent orchestration
* Context-aware decision making
* Workforce intelligence
* Responsible AI practices
* Business-focused automation

---

# 🎯 The Business Challenge

Engineering organizations increasingly invest in certification programs, cloud training, platform engineering initiatives, and continuous learning. At the same time, engineers remain responsible for production support, incident response, operational maintenance, meetings, and project delivery.

These competing priorities create a workforce planning challenge:

> How can organizations continuously upskill employees without overwhelming individuals who are already operating in high-pressure production environments?

Most learning platforms operate independently of operational context. Learning plans are often created once and remain static regardless of changing workloads, incident severity, or team capacity.

As a result:

* Learning schedules become unrealistic during operational spikes.
* Engineers struggle to balance development goals with delivery commitments.
* Managers lack visibility into workforce readiness and capacity risks.
* Upskilling initiatives become disconnected from day-to-day operational realities.

OrbitIQ addresses this challenge through a coordinated multi-agent system that continuously evaluates learning objectives alongside operational signals and adapts recommendations accordingly.

---

# 💡 Enterprise Intelligence Layer

OrbitIQ is designed around enterprise workplace intelligence and operational awareness.

The platform demonstrates how workforce signals and organizational context can be incorporated into agent workflows to produce adaptive recommendations.

Examples of contextual inputs include:

* Meeting commitments
* Learning objectives
* Certification goals
* Operational workload indicators
* Incident severity levels
* Workforce readiness metrics

By combining these signals, OrbitIQ enables agents to reason about workforce capacity before recommending learning activities.

This approach moves beyond static training plans and introduces adaptive workforce development workflows.

---

# 🧠 Why Multi-Agent?

OrbitIQ intentionally separates responsibilities across specialized agents rather than relying on a single general-purpose model.

Each agent owns a specific domain of reasoning and contributes specialized outputs to the overall workflow.

| Agent        | Primary Responsibility                          |
| ------------ | ----------------------------------------------- |
| MATCH IQ     | Skill-gap analysis and certification alignment  |
| PLANNER-EXEC | Learning plan generation and scheduling         |
| SELF-REFLECT | Capacity monitoring and workload protection     |
| VERIFIER     | Assessment generation and readiness validation  |
| ANONYMOUS    | Workforce intelligence and management reporting |

This architecture provides several advantages:

* Clear separation of responsibilities
* More explainable decision making
* Reduced reasoning complexity
* Easier validation of outputs
* Improved maintainability
* Better alignment with enterprise governance requirements

The resulting system behaves as a coordinated workforce intelligence network rather than a standalone chatbot.

---

# 🔄 Multi-Agent State Graph

OrbitIQ uses a structured state-graph workflow where each agent contributes specialized reasoning before passing sanitized state information to the next stage.

```text
┌──────────────┐
│   MATCH IQ   │
│ Skill Gaps   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ PLANNER-EXEC │
│ Study Plans  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ SELF-REFLECT │
│ Capacity &   │
│ Risk Review  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   VERIFIER   │
│ Assessment & │
│ Readiness    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  ANONYMOUS   │
│ Manager      │
│ Insights     │
└──────────────┘
```

### Workflow Sequence

1. Analyze employee skill gaps.
2. Recommend relevant certification pathways.
3. Generate structured learning plans.
4. Evaluate operational workload conditions.
5. Apply workload protection safeguards when necessary.
6. Generate readiness assessments.
7. Produce aggregated management insights.

This creates a self-reflecting feedback loop that continuously balances workforce growth with operational capacity.

---

# 🤖 Agent Architecture

## 1. MATCH IQ — Learning Path Curator

### Purpose

Skill-gap analysis and certification alignment.

### Responsibilities

* Analyze learner profiles
* Identify technical skill gaps
* Recommend certification pathways
* Align learning objectives with certification blueprints

### Example Outputs

* Azure Administrator (AZ-104) recommendations
* Azure DevOps Engineer (AZ-400) recommendations
* Cloud architecture learning paths
* Secure microservices learning tracks

---

## 2. PLANNER-EXEC — Study Plan Generator

### Purpose

Adaptive learning scheduling.

### Responsibilities

* Convert certification objectives into milestones
* Create weekly study schedules
* Generate daily learning activities
* Organize learning priorities

### Outputs

* Weekly learning plans
* Daily study tasks
* Learning milestones
* Structured progression paths

---

## 3. SELF-REFLECT — Capacity Protection Agent

### Purpose

Operational workload awareness and workforce protection.

### Responsibilities

* Monitor workload telemetry
* Evaluate meeting commitments
* Analyze operational pressure
* Assess workforce capacity risk

### Safeguards

When workload thresholds are exceeded:

* Learning intensity can be reduced by up to 50%
* Study plans can be adjusted dynamically
* Capacity risks are surfaced before overload occurs

### Example Triggers

* Meeting commitments exceeding 20 hours per week
* Active critical production incidents
* Elevated operational workload conditions

---

## 4. VERIFIER — Assessment Agent

### Purpose

Learning validation and readiness measurement.

### Responsibilities

* Generate certification-aligned assessments
* Create scenario-based questions
* Evaluate readiness levels
* Identify learning gaps

### Outputs

* Practice assessments
* Readiness indicators
* Knowledge validation exercises
* Learning progress feedback

---

## 5. ANONYMOUS — Manager Intelligence Agent

### Purpose

Aggregated workforce intelligence.

### Responsibilities

* Aggregate workforce metrics
* Produce management insights
* Surface organizational capacity risks
* Generate privacy-conscious reporting

### Outputs

* Workforce readiness dashboards
* Capacity risk summaries
* Team-level insights
* Organizational reporting views

---

# ✨ Key Capabilities

### Adaptive Learning Planning

Generates structured certification-aligned learning plans based on identified skill gaps and workforce objectives.

### Capacity-Aware Scheduling

Evaluates operational workload indicators before recommending learning intensity.

### Workload Protection Logic

Applies workload safeguards when operational pressure exceeds predefined thresholds.

### Certification Readiness Assessment

Generates assessments designed to validate learning progress and readiness.

### Workforce Intelligence

Provides managers with aggregated workforce insights and organizational visibility.

### Privacy-Conscious Reporting

Separates learner-focused workflows from management reporting workflows.

---

# 📈 Operational Outcomes

OrbitIQ currently demonstrates the following platform capabilities:

* Up to **50% learning workload reduction** when workload protection thresholds are triggered.
* Dynamic adaptation of study schedules based on operational conditions.
* Improved visibility into workforce readiness through aggregated reporting.
* Structured certification preparation workflows.
* Capacity-aware learning recommendations.
* Separation of workforce development and management reporting concerns through specialized agents.

These outcomes are driven directly by the platform's multi-agent orchestration model and workload protection mechanisms.

---

# 🔒 Responsible AI & Privacy

OrbitIQ incorporates enterprise-oriented governance principles throughout its architecture.

### Privacy Controls

* Sanitized management reporting
* Aggregated workforce insights
* Separation of learner and manager workflows
* Controlled data sharing between agents

### Responsible AI Principles

* Human-centered decision support
* Transparent recommendation logic
* Explainable agent responsibilities
* Workforce well-being prioritization
* Capacity-aware workload adjustments

---

# 🛠 Technology Stack

## Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Recharts
* Lucide React

## Backend

* Node.js
* Express

## Architecture

* Multi-Agent State Graph
* Adaptive Workflow Routing
* Capacity-Aware Decision Logic
* Workforce Intelligence Engine
* Privacy-Conscious Reporting Pipeline

---

# 📊 Reporting & Export Support

OrbitIQ supports enterprise reporting workflows through:

* JSON telemetry exports
* CSV exports for Microsoft Excel and Google Sheets
* High-fidelity PDF reporting
* Workforce readiness dashboards
* Capacity risk analytics

---

# 🚀 Local Development

## Install Dependencies

```bash
npm install
```

## Start Development Environment

```bash
npm run dev
```

Application runs at:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
```

---

# 🌟 Why OrbitIQ Matters

Organizations do not simply need better learning platforms.

They need systems capable of understanding the relationship between workforce development and operational reality.

OrbitIQ demonstrates how specialized AI agents can coordinate learning recommendations, workload analysis, readiness assessment, and management reporting within a unified enterprise workflow.

By combining adaptive planning, workload-aware decision making, and multi-agent orchestration, OrbitIQ transforms workforce development from a static training process into a continuously adaptive system that aligns employee growth with operational commitments.

The result is a more informed, context-aware approach to workforce development that supports both organizational objectives and employee sustainability.

---

## 🏅 Microsoft Agents League Hackathon 2026

**OrbitIQ** showcases how enterprise-grade multi-agent systems can coordinate workforce development, operational awareness, capacity management, and organizational intelligence through structured agent collaboration and explainable decision-making.

**Built for the Enterprise Agents Challenge Track during Microsoft AI Skills Fest 2026.**

# OrbitIQ: Multi-Agent Upskilling & Operational Capacity Sandbox

Secure corporate upskilling paired with adaptive real-time workload protection, built for managers who lead high-performance engineering squads in live production environments.

---

## ⏳ Hackathon Context
Developed for the **Google AI Studio Multi-Agent hackathon Challenge**, OrbitIQ addresses a critical engineering paradox: **the friction between continuous upskilling and live operational commitments**. It demonstrates how isolated LLM-based reasoning chains can coordinate in a secure state-graph pattern to balance critical training programs directly against real-time telemetry inputs (such as high meeting volumes or urgent on-call incidents) to avoid employee cognitive burnout.

---

## 🎯 Core Mission & Inspiration
Modern engineering managers are often blind to the exact point when intense upskilling (such as preparing for urgent cloud architect certifications) collides with day-to-day operations, triggering severe burnout. 

OrbitIQ's inspiration stems from creating an automated, **"Self-Reflecting" state routing topology** that acts as an advocate for the engineer. It bridges this gap by coordinating 5 isolated specialized agents. They dynamically downscale upskilling tasks when operational telemetry indicators surge (e.g., meeting commitments exceeding 20 hours/week or critical production tickets), keeping team growth optimized and risk-free.

---

## 🚀 Key Actions & Agent Capabilities
OrbitIQ operates a modular state-graph pattern built on **5 distinct specialized reasoning nodes**:

1. **Learning Path Curator Agent (MATCH IQ)**
   - **Capability**: Processes sanitized learner profile states.
   - **Action**: Maps specific skill gaps (e.g., database scaling, secure microservices) directly to targeted exam certifications (such as AZ-104 or AZ-400 blueprints).

2. **Study Plan Generator (PLANNER-EXEC)**
   - **Capability**: Deconstructs heavy blueprints into micro-task sequences.
   - **Action**: Dynamically organizes weekly and day-by-day learning schedules (covering study times on Mondays, Wednesdays, and Fridays) matching macro-level objectives.

3. **Engagement Critic Agent (SELF-REFLECT)**
   - **Capability**: Analyzes real-time workweek metrics, high-intensity call logs, and incident levels.
   - **Action**: Executes capacity-risk safeguards. Triggers automatic **50% upskilling down-scales** if meeting thresholds bypass 20 hours/week, or on critical on-call active production triggers.

4. **Assessment Agent (VERIFIER)**
   - **Capability**: Designs certification-compliant exam items.
   - **Action**: Generates interactive multiple-choice question profiles with accurate paragraph-level citation proofs mapped directly to official blueprints.

5. **Manager Insights Agent (ANONYMOUS)**
   - **Capability**: Synthesizes enterprise-ready team metrics.
   - **Action**: Aggregates squad upskilling readiness scores and potential capacity risks, strictly sanitizing all PII data prior to delivery.

---

## 📦 Built With
OrbitIQ is a full-stack engineering application built with professional tools:
- **Frontend SPA**: React 18 with Vite and TypeScript (TSX).
- **Styling**: Tailwind CSS for high-fidelity dark and light themes.
- **Animations**: Framer Motion (`motion/react`) for smooth route and hover transitions.
- **Charts / Visualizations**: Recharts for dynamic workload bar chart telemetry overlays, custom-styled SVG nodes.
- **Icons**: Lucide React.
- **Backend Service**: Node.js and Express for secure API proxy and file compilation streams.

---

## 🛠️ Unified Installation & Development

### 1. Install Dependencies
Run npm installations:
```bash
npm install
```

### 2. Launch Development Server
Starts Express + Vite simultaneously:
```bash
npm run dev
```
The server will bind to host `0.0.0.0` on port `3000` automatically. Open `http://localhost:3000` to view the sandboxed dashboard.

### 3. Production Compilation
Bundle assets and servers for optimized runtimes:
```bash
npm run build
```

---

## 🧑‍⚖️ Submission
Submit ready for deployment on secure Cloud container layers. Provides full GDPR-compliant telemetry exports (JSON format), Microsoft Excel / Google Sheets workload exports (CSV format), and clean printable reporting vectors (high-fidelity PDF layouts).

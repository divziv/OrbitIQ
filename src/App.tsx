import React, { useState, useEffect } from "react";
import { 
  Cpu, 
  Layers, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  AlertTriangle, 
  Terminal, 
  BookOpen, 
  ShieldCheck, 
  Users, 
  RefreshCw, 
  Code, 
  Info, 
  Copy, 
  Moon, 
  FileText,
  Clock,
  Play,
  ArrowRight,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StudyDay {
  day: string;
  allocatedHours: number;
  modulesCovered: string[];
  tasks: string[];
}

interface WeeklyPlan {
  weekNumber: number;
  focusTopic: string;
  targetHours: number;
  dailyMatrix: StudyDay[];
}

interface SimulatedState {
  employeeId: string;
  fabricIq: {
    employeeId: string;
    currentRole: string;
    targetRole: string;
    identifiedGaps: string[];
    recommendedCert: string;
    assignedTeamId: string;
  };
  telemetryIq: {
    employeeId: string;
    reportingWeek: string;
    meetingHours: number;
    deepWorkHours: number;
    productionDeployWindow: boolean;
    averageIncidentCount: number;
  };
  curatedModuleIds: string[];
  curatedCitations: Array<{
    docId: string;
    title: string;
    paragraphRef: string;
  }>;
  studyTimeline: {
    timelineId: string;
    employeeId: string;
    certificationId: string;
    totalAllocatedWeeks: number;
    weeks: WeeklyPlan[];
    mitigationApplied: boolean;
    mitigationNotes: string;
  };
  capacityWarnings: string[];
  assessments: Array<{
    questionId: string;
    questionText: string;
    options: string[];
    correctOptionIndex: number;
    citationRef: string;
    verified: boolean;
    verifierNotes: string;
  }>;
  systemTrace: string[];
  teamReport: {
    teamId: string;
    scannedMembersCount: number;
    overallReadinessPercentage: number;
    riskLevel: string;
    unmaskedAnonymizedMetrics: Array<{
      anonymizedAlias: string;
      estimatedReadiness: number;
      capacityRiskIndexTriggered: boolean;
      targetCurriculum: string;
    }>;
  };
}

export default function App() {
  // Input simulation state hooks
  const [employeeId, setEmployeeId] = useState<string>("EMP-102");
  const [stressProfile, setStressProfile] = useState<string>("HIGH_STRESS");
  const [meetingHours, setMeetingHours] = useState<number>(24.5);
  const [prodDeploy, setProdDeploy] = useState<boolean>(true);
  
  // Real execution results state
  const [loading, setLoading] = useState<boolean>(false);
  const [simulatedData, setSimulatedData] = useState<SimulatedState | null>(null);
  const [pythonLogs, setPythonLogs] = useState<string>("");
  const [pythonCode, setPythonCode] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"visualizer" | "terminal" | "code" | "schema">("visualizer");
  const [inspectWeek, setInspectWeek] = useState<number>(1);

  // Synchronize meeting hours and prod toggle based on selected stress profile defaults
  useEffect(() => {
    if (stressProfile === "HIGH_STRESS") {
      setMeetingHours(24.5);
      setProdDeploy(true);
    } else {
      setMeetingHours(12.0);
      setProdDeploy(false);
    }
  }, [stressProfile]);

  // Run the core simulation
  const handleRunSimulation = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/run-simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          stressProfile,
          customMeetingHours: meetingHours,
          customProdDeploy: prodDeploy
        })
      });
      const data = await response.json();
      if (data.success) {
        setSimulatedData(data.structuredState);
        setPythonLogs(data.pythonLogs);
      }
    } catch (err) {
      console.error("Simulation request error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch complete production main.py Python Code on load
  const loadPythonCode = async () => {
    try {
      const res = await fetch("/api/python-code");
      const data = await res.json();
      if (data.success) {
        setPythonCode(data.code);
      }
    } catch (e) {
      console.error("Failed to load python source code files", e);
    }
  };

  useEffect(() => {
    handleRunSimulation();
    loadPythonCode();
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-900 relative overflow-hidden">
      
      {/* 🔮 Frosted Mesh gradient background overlays */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* 🚀 Sleek Header */}
      <header id="app-header" className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center transition-all hover:scale-105 duration-300">
            <Cpu className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-300 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">Microsoft Agent Framework V2</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white mt-0.5">
              OrbitIQ <span className="font-light text-slate-400">| Capacity-Aware Orchestration Engine</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1.5 text-xs text-slate-350 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-cyan-200">SYSTEM TIME: 2026-06-09 UTC</span>
          </div>
          <button 
            id="run-trigger-btn"
            onClick={handleRunSimulation} 
            disabled={loading}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 disabled:opacity-50 text-neutral-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{loading ? "Orchestrating..." : "Execute Simulation"}</span>
          </button>
        </div>
      </header>

      {/* 🔮 Dashboard Area */}
      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
        
        {/* Left Column - Form Control Panel & State Graph (4 cols) */}
        <section className="lg:col-span-4 space-y-6">
          
          {/* IQ Inputs Sandbox */}
          <div id="sandbox-controls-card" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-cyan-300" />
                <h3 className="font-semibold text-sm tracking-wide text-white uppercase">Simulation Sandbox Control</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-350 px-2 py-0.5 bg-white/5 border border-white/10 rounded-lg select-none">Static Schemas</span>
            </div>

            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Configure corporate telemetry metrics to test OrbitIQ's capacity critic and multi-agent schedule downscaling behavior.
            </p>

            <div className="space-y-4">
              {/* Profile Presets */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Load & Capacity Profile Preset</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="preset-high-stress"
                    onClick={() => setStressProfile("HIGH_STRESS")}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      stressProfile === "HIGH_STRESS" 
                        ? "bg-rose-500/20 border-rose-500/40 text-rose-200 shadow-[0_0_15px_rgba(239,68,68,0.25)]" 
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    }`}
                  >
                    High Stress (EMP-102)
                  </button>
                  <button
                    id="preset-normal-stress"
                    onClick={() => setStressProfile("NORMAL")}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      stressProfile === "NORMAL" 
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]" 
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    }`}
                  >
                    Normal Load
                  </button>
                </div>
              </div>

              {/* Employee ID Custom Select */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Select Targeted Employee IQ</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="select-emp-102"
                    onClick={() => setEmployeeId("EMP-102")}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                      employeeId === "EMP-102" 
                        ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]" 
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>EMP-102 (Jr. Dev)</span>
                  </button>
                  <button
                    id="select-emp-103"
                    onClick={() => setEmployeeId("EMP-103")}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                      employeeId === "EMP-103" 
                        ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]" 
                        : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>EMP-103 (SysAdmin)</span>
                  </button>
                </div>
              </div>

              <hr className="border-white/10" />

              {/* Slider for Meeting workload */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-medium text-slate-400">Weekly Meeting Commitment</label>
                  <span className={`text-xs font-mono font-bold ${meetingHours > 20 ? "text-rose-400" : "text-emerald-400"}`}>
                    {meetingHours} hrs/week
                  </span>
                </div>
                <input 
                  id="meeting-hours-range"
                  type="range" 
                  min="5" 
                  max="40" 
                  step="0.5"
                  value={meetingHours} 
                  onChange={(e) => setMeetingHours(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>5 Hrs (Nominal)</span>
                  <span className="text-rose-500 font-medium">Critic Limit: 20 Hrs</span>
                  <span>40 Hrs</span>
                </div>
              </div>

              {/* Toggle switch for Production Deployment Window */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-200">Active Live Deploy Window</span>
                  <span className="text-[10px] text-slate-500">Triggers self-reflection emergency back-offs</span>
                </div>
                <button
                  id="prod-deploy-switch"
                  onClick={() => setProdDeploy(!prodDeploy)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    prodDeploy ? "bg-cyan-500" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow ring-0 transition duration-200 ease-in-out ${
                      prodDeploy ? "translate-x-5 bg-white" : "translate-x-0 bg-slate-400"
                    }`}
                  />
                </button>
              </div>

              <button 
                id="dispatch-engine-btn"
                onClick={handleRunSimulation} 
                disabled={loading}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-cyan-200 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 border border-cyan-500/30 hover:border-cyan-500/50 shadow-md cursor-pointer active:scale-95 duration-200"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-400" />}
                <span>Update Telemetry Sensor Stream</span>
              </button>
            </div>
                   {/* Core Multi-Agent Topology State Graph Visualizer */}
          <div id="state-topology-card" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center space-x-2 mb-4">
              <Cpu className="w-5 h-5 text-indigo-300" />
              <h3 className="font-semibold text-sm tracking-wide text-white uppercase">State Routing Topology</h3>
            </div>
            
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              OrbitIQ coordinates five isolated reasoning agents in a state-graph pattern. See trace properties shift when critic triggers overrides.
            </p>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-white/10">
              
              {/* Agent 1 Node */}
              <div id="topology-node-1" className="relative flex items-start space-x-3">
                <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                }`}>1</div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 shadow-md transition-all hover:bg-white/10 hover:border-white/20 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">Learning Path Curator Agent</span>
                    <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded">MATCH IQ</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 select-none">Bridges gaps to technical blueprints, outputs citations.</p>
                </div>
              </div>

              {/* Agent 2 Node */}
              <div id="topology-node-2" className="relative flex items-start space-x-3">
                <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                }`}>2</div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 shadow-md transition-all hover:bg-white/10 hover:border-white/20 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">Study Plan Generator</span>
                    <span className="text-[9px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">PLANNER-EXEC</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 select-none">Splits macro-level sequencing and daily training actions.</p>
                </div>
              </div>

              {/* Agent 3 Node */}
              <div id="topology-node-3" className="relative flex items-start space-x-3">
                <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  simulatedData?.studyTimeline?.mitigationApplied 
                    ? "bg-rose-950/80 text-rose-350 border-rose-500" 
                    : simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                }`}>3</div>
                <div className={`flex-1 p-3.5 rounded-xl border transition-all duration-250 ${
                  simulatedData?.studyTimeline?.mitigationApplied 
                    ? "bg-rose-500/15 border-rose-500/35 shadow-inner" 
                    : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">Engagement Critic Agent</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      simulatedData?.studyTimeline?.mitigationApplied
                        ? "text-rose-350 bg-rose-500/20 border border-rose-500/30"
                        : "text-slate-350 bg-white/5 border border-white/10"
                    }`}>SELF-REFLECT</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 select-none">Checks Capacity metrics, scales back study matrix by 50% on strain.</p>
                  {simulatedData?.studyTimeline?.mitigationApplied && (
                    <motion.div 
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-[10px] text-rose-350 flex items-center space-x-1"
                    >
                      <AlertTriangle className="w-3 h-3 text-rose-450 inline" />
                      <span>Critic loop triggered! Backlink mitigation active.</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Agent 4 Node */}
              <div id="topology-node-4" className="relative flex items-start space-x-3">
                <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                }`}>4</div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 shadow-md transition-all hover:bg-white/10 hover:border-white/20 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">Assessment Agent</span>
                    <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded">VERIFIER</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 select-none">Autonomously drafts exams and validates correctness securely.</p>
                </div>
              </div>

              {/* Agent 5 Node */}
              <div id="topology-node-5" className="relative flex items-start space-x-3">
                <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                }`}>5</div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm p-3.5 rounded-xl border border-white/10 shadow-md transition-all hover:bg-white/10 hover:border-white/20 duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">Manager Insights Agent</span>
                    <span className="text-[9px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">ANONYMOUS</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 select-none">Analyzes team progress while completely stripping all employee PII.</p>
                </div>
              </div>

            </div>
          </div>   </div>

        </section>

        {/* Right Column - Results Display Workspace (8 cols) */}
        <section className="lg:col-span-8 flex flex-col space-y-6">
          
          {/* Navigation Tab Bar */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 self-start shadow-xl">
            <button
              id="tab-visualizer"
              onClick={() => setActiveTab("visualizer")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                activeTab === "visualizer" 
                  ? "bg-white/10 text-white shadow-md border border-white/10 backdrop-blur-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Engine Visualizer</span>
            </button>
            <button
              id="tab-terminal"
              onClick={() => setActiveTab("terminal")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                activeTab === "terminal" 
                  ? "bg-white/10 text-white shadow-md border border-white/10 backdrop-blur-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Production stdout Logs</span>
            </button>
            <button
              id="tab-code"
              onClick={() => setActiveTab("code")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                activeTab === "code" 
                  ? "bg-white/10 text-white shadow-md border border-white/10 backdrop-blur-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Code className="w-4 h-4 text-cyan-400" />
              <span>Inspect Python Source</span>
            </button>
            <button
              id="tab-schema"
              onClick={() => setActiveTab("schema")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                activeTab === "schema" 
                  ? "bg-white/10 text-white shadow-md border border-white/10 backdrop-blur-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>IQ Schema Registry</span>
            </button>
          </div>

          {/* ACTIVE CONTENT VIEW - VISUALIZER */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              
              {activeTab === "visualizer" && simulatedData && (
                <motion.div 
                  key="visualizer-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  
                  {/* Executive Alert Warning Section */}
                  {simulatedData.studyTimeline.mitigationApplied && (
                    <motion.div 
                      id="sim-alert-banner"
                      initial={{ scale: 0.98 }}
                      animate={{ scale: 1 }}
                      className="p-5 bg-gradient-to-r from-rose-500/10 to-amber-500/5 backdrop-blur-md border border-rose-500/30 rounded-2xl flex items-start space-x-3.5 shadow-xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
                      <div className="p-2.5 bg-rose-500/20 rounded-xl text-rose-300 border border-rose-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">Self-Reflection Capacity Protection Triggered</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          The **Engagement Critic** analyzed user logs. Since work intensity is active at <span className="font-semibold text-rose-250">{meetingHours} hours</span> and/or production deployment is on-call, study timeline workloads have been reduced by <span className="font-bold text-rose-250 font-mono">50%</span> to avoid employee burnout.
                        </p>
                        <div className="mt-2.5 text-[11px] font-mono text-rose-300 bg-rose-950/40 px-2.5 py-1 rounded-lg inline-block border border-rose-500/20">
                          LOG: {simulatedData.studyTimeline.mitigationNotes}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Top Dashboard Grid (FabricIQ & TelemetryIQ summary) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fabric IQ Segment Summary */}
                    <div id="fabric-ontology-card" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">FabricIQ Ontology: Learner Profile</h4>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-pink-300 bg-pink-700/10 border border-pink-500/20 px-1.5 py-0.5 rounded-lg">IDENTITY SANITIZED</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Target Employee / Team</span>
                          <span className="font-mono text-white font-semibold">{simulatedData.employeeId} / {simulatedData.fabricIq.assignedTeamId}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Current Corporate Assignment</span>
                          <span className="text-slate-200">{simulatedData.fabricIq.currentRole}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Upskilling Target Role</span>
                          <span className="text-cyan-300 font-medium">{simulatedData.fabricIq.targetRole}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Recommended Certification</span>
                          <span className="font-mono text-indigo-300 px-1.5 py-0.5 bg-white/5 rounded-lg border border-white/10">{simulatedData.fabricIq.recommendedCert}</span>
                        </div>

                        <div>
                          <span className="text-xs text-slate-400 block mb-2 font-medium">Bridges Identified Skill Gaps</span>
                          <div className="flex flex-wrap gap-1.5">
                            {simulatedData.fabricIq.identifiedGaps.map((gap, i) => (
                              <span key={i} className="text-[10.5px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-lg border border-cyan-500/15 font-mono">
                                {gap}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Work IQ Weekly Workload Telemetry */}
                    <div id="work-telemetry-card" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">WorkIQ: Live Telemetry Sensors</h4>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-300 bg-indigo-700/10 border border-indigo-500/20 px-1.5 py-0.5 rounded-lg">WEEKLY METRIC</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Simulated Reporting ISO Week</span>
                          <span className="font-mono text-slate-300">{simulatedData.telemetryIq.reportingWeek}</span>
                        </div>

                        {/* Meeting Meter bar */}
                        <div>
                          <div className="flex justify-between items-center text-xs mb-1.5">
                            <span className="text-slate-400">Meeting Hours Threshold</span>
                            <span className={`font-mono text-xs ${meetingHours > 20 ? "text-rose-400 font-bold" : "text-emerald-400"}`}>
                              {meetingHours}h / 40h workweek
                            </span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden border border-white/10">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${meetingHours > 20 ? "bg-rose-500" : "bg-emerald-500"}`} 
                              style={{ width: `${(meetingHours / 40) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Capacity Stats */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className="p-2.5 bg-black/20 rounded-xl border border-white/10">
                            <span className="text-[10px] text-slate-400 uppercase font-mono block">Deep Work Focus</span>
                            <span className="text-lg font-mono font-bold text-slate-100">{simulatedData.telemetryIq.deepWorkHours} hrs</span>
                          </div>
                          <div className="p-2.5 bg-black/20 rounded-xl border border-white/10">
                            <span className="text-[10px] text-slate-400 uppercase font-mono block">Deploy Windows</span>
                            <span className={`text-xs font-bold leading-6 ${prodDeploy ? "text-rose-455 font-bold" : "text-slate-500"}`}>
                              {prodDeploy ? "CRITICAL ON-CALL" : "NONE ACTIVE"}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between text-xs pt-1">
                          <span className="text-slate-400">Assigned Incident Counter</span>
                          <span className={`font-mono ${prodDeploy ? "text-rose-450 font-bold" : "text-slate-400"}`}>
                            {simulatedData.telemetryIq.averageIncidentCount} Open Tickets
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Dynamic Study Timeline View */}
                  <div id="study-timeline-card" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 mb-5 font-sans">
                      <div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Generated Capacity-Aware Study Plan</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 select-none">Weekly and Day-by-Day training program built with subchannel dependencies</p>
                      </div>
                      
                      <div className="flex items-center space-x-1.5 mt-3 md:mt-0">
                        {simulatedData.studyTimeline.weeks.map((week) => (
                          <button
                            id={`week-tab-btn-${week.weekNumber}`}
                            key={week.weekNumber}
                            onClick={() => setInspectWeek(week.weekNumber)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                              inspectWeek === week.weekNumber
                                ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                                : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            Week {week.weekNumber}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Inspected Week Details */}
                    <div>
                      {simulatedData.studyTimeline.weeks.map((week) => {
                        if (week.weekNumber !== inspectWeek) return null;
                        return (
                          <div key={week.weekNumber} className="space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                              <div>
                                <span className="text-[10px] font-bold text-slate-450 font-mono">WEEK {week.weekNumber} IN FOCUS BLUEPRINT</span>
                                <h5 className="text-sm font-semibold text-slate-100 mt-0.5">{week.focusTopic}</h5>
                              </div>
                              <div className="text-left mt-2 md:mt-0">
                                <span className="text-[10px] text-slate-400 uppercase font-mono block">Allocated Practice</span>
                                <span className="text-md font-mono font-bold text-cyan-300">{week.targetHours} hours this week</span>
                              </div>
                            </div>

                            {/* Daily Matrices */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {week.dailyMatrix.map((day, idx) => (
                                <div key={idx} className="bg-white/5 shadow-lg p-4 border border-white/10 rounded-xl flex flex-col justify-between hover:border-white/15 hover:bg-white/10 transition-all duration-205">
                                  <div>
                                    <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-3">
                                      <span className="text-sm font-semibold text-white">{day.day}</span>
                                      <span className="text-xs font-mono text-cyan-300 bg-white/5 px-1.5 py-0.5 rounded-lg border border-white/10">{day.allocatedHours} hrs</span>
                                    </div>
                                    <ul className="space-y-2">
                                      {day.tasks.map((task, tIdx) => (
                                        <li key={tIdx} className="text-xs text-slate-350 flex items-start space-x-1.5 leading-relaxed">
                                          <span className="text-cyan-400 text-xs mt-0.5 select-none">•</span>
                                          <span>{task}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                                    <span className="font-mono">Sub-Module COVERED:</span>
                                    <span className="bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-cyan-300 font-mono font-medium">{day.modulesCovered[0]}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Grounded Assessments & Manager reports panel side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Assessments Creator (Verifier Pattern) */}
                    <div id="assessment-creator-card" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 font-sans font-medium">
                          <div className="flex items-center space-x-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Assessment Agent (Verifier Pattern)</h4>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-lg font-semibold">VERIFIED</span>
                        </div>

                        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                          The **Primary Assessment Creator** drafted this test based on verified certifications, and the **Audit Verifier Node** dynamically audited correctness:
                        </p>

                        {simulatedData.assessments.map((qa, i) => (
                          <div key={i} className="bg-white/5 p-4 border border-white/10 rounded-xl space-y-3.5 shadow-sm">
                            <div className="text-xs text-slate-200 mt-1 leading-relaxed font-sans">
                              <span className="font-bold text-emerald-300 uppercase font-mono mr-1.5">QUESTION 1:</span>
                              {qa.questionText}
                            </div>
                            
                            <div className="space-y-1.5">
                              {qa.options.map((opt, oIdx) => (
                                <div 
                                  key={oIdx} 
                                  className={`p-2.5 rounded-lg text-xs flex items-center justify-between transition-all duration-200 ${
                                    oIdx === qa.correctOptionIndex 
                                      ? "bg-white/5 border border-emerald-500/30 text-emerald-300 font-medium shadow-[0_0_12px_rgba(16,185,129,0.15)]" 
                                      : "bg-black/10 border border-white/5 text-slate-400"
                                  }`}
                                >
                                  <span>{oIdx + 1}. {opt}</span>
                                  {oIdx === qa.correctOptionIndex && (
                                    <span className="text-[10px] uppercase font-mono bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-450 font-semibold">Correct Selection</span>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-[11px] text-slate-400 flex items-start space-x-2 leading-relaxed">
                              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-emerald-300 font-sans">Auditor Report: </span>
                                {qa.verifierNotes}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Citation Ref:</span>
                        <span className="bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-emerald-300 font-mono font-medium">{simulatedData.assessments[0]?.citationRef}</span>
                      </div>
                    </div>

                    {/* Manager Aggregate Reports (Anonymized analytics) */}
                    <div id="manager-aggregate-card" className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-indigo-400" />
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Manager Insights: Compliance Exports</h4>
                          </div>
                          <span className="text-[10px] font-mono text-indigo-300 bg-indigo-750/10 border border-indigo-500/20 px-1.5 py-0.5 rounded-lg font-semibold">NO PII IN MEMORY</span>
                        </div>

                        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                          The **Insights Reporter Agent** aggregates progress tracking data across Team boundaries while strictly masking individual identities (PII Compliance rule):
                        </p>

                        <div className="space-y-3.5">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-black/10 rounded-xl border border-white/10">
                              <span className="text-[10px] text-slate-450 uppercase font-mono block">Overall Team Readiness</span>
                              <span className="text-xl font-mono font-bold text-slate-100">{simulatedData.teamReport.overallReadinessPercentage}%</span>
                            </div>
                            <div className="p-3 bg-black/10 rounded-xl border border-white/10">
                              <span className="text-[10px] text-slate-450 uppercase font-mono block">Scanned Team Code</span>
                              <span className="text-xs font-mono font-bold text-indigo-300 leading-6">{simulatedData.teamReport.teamId} (Team B)</span>
                            </div>
                          </div>

                          <div className="p-3 bg-black/10 rounded-xl border border-white/10 space-y-1.5">
                            <span className="text-[10px] text-slate-450 uppercase font-mono block mb-1">Operational Threat Level</span>
                            <div className="flex items-center space-x-2 text-xs">
                              <span className={`w-2.5 h-2.5 rounded-full ${simulatedData.studyTimeline.mitigationApplied ? "bg-rose-500 animate-ping" : "bg-emerald-500"}`} />
                              <span className={`font-semibold ${simulatedData.studyTimeline.mitigationApplied ? "text-rose-300" : "text-emerald-300"}`}>
                                {simulatedData.teamReport.riskLevel}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase font-mono block">Anonymized Team Records:</span>
                            {simulatedData.teamReport.unmaskedAnonymizedMetrics.map((record, i) => (
                              <div key={i} className="p-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-400">{record.anonymizedAlias}</span>
                                <div className="flex items-center space-x-3 text-slate-300">
                                  <span>Readiness: <strong className="text-white">{record.estimatedReadiness}%</strong></span>
                                  <span className={`text-[10px] px-1.5 py-0.2 select-none border rounded ${
                                    record.capacityRiskIndexTriggered 
                                      ? "text-rose-300 bg-rose-500/10 border-rose-500/20" 
                                      : "text-slate-500 bg-black/10 border-white/10"
                                  }`}>
                                    {record.capacityRiskIndexTriggered ? "ON-CALL BURNOUT RISK" : "Normal Load"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Privacy Standard:</span>
                        <span className="text-indigo-400 font-mono font-medium text-[10px] bg-indigo-500/10 border border-white/10 px-2.5 py-0.5 rounded-lg">GDPR / MS Foundational Core</span>
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}
                     {/* ACTIVE CONTENT VIEW - stdout LOGS */}
              {activeTab === "terminal" && (
                <motion.div 
                  key="terminal-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl font-mono text-xs overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs uppercase font-mono text-slate-200">Standard Out Terminal Trace</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                  </div>

                  <p className="text-slate-400 select-none text-[11px] mb-4 leading-relaxed">
                    Below is the live execution outputs generated sequentially by Python's `sys.stdout` stream, demonstrating real token trace statements, tool transitions, and self-reflection.
                  </p>

                  <div className="p-4 bg-black/40 rounded-xl border border-white/10 h-[480px] overflow-y-auto space-y-2 select-text font-mono text-cyan-200/90 leading-relaxed scrollbar-thin">
                    {pythonLogs ? pythonLogs.split("\n").map((line, i) => (
                      <div key={i} className="whitespace-pre-wrap">
                        {line.startsWith("---") || line.startsWith("===") ? (
                          <span className="text-indigo-350 font-bold">{line}</span>
                        ) : line.includes("[Core]") ? (
                          <span className="text-teal-350">{line}</span>
                        ) : line.includes("WARNING") ? (
                          <span className="text-rose-400 underline font-semibold">{line}</span>
                        ) : (
                          <span>{line}</span>
                        )}
                      </div>
                    )) : (
                      <div className="text-slate-500 italic">No output logs generated. Click 'Execute Simulation' to run the multi-agent track.</div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ACTIVE CONTENT VIEW - INSPECT IN-DEPTH BLUEPRINTS */}
              {activeTab === "code" && (
                <motion.div 
                  key="code-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl font-mono text-xs overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs uppercase font-mono text-slate-200">OrbitIQ Core Multi-Agent Architecture (main.py)</span>
                    </div>
                    <button
                      id="copy-code-btn"
                      onClick={handleCopyCode}
                      className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-slate-200 hover:text-white rounded-xl flex items-center space-x-2 cursor-pointer transition-all active:scale-95 shadow-md"
                    >
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isCopied ? "Copied!" : "Copy Python Code"}</span>
                    </button>
                  </div>

                  <p className="text-slate-400 text-[11px] mb-4 select-none leading-relaxed font-sans">
                    OrbitIQ features isolated Pydantic schemas mapping corporate roles and telemetry, orchestrating multiple independent agents using micro-critique routines. Check the physical file located at `/main.py`.
                  </p>

                  <div className="p-4 bg-black/40 rounded-xl border border-white/10 h-[480px] overflow-y-auto scrollbar-thin">
                    <pre className="font-mono text-cyan-100 text-xs leading-relaxed select-all">
                      <code>{pythonCode || "Loading main.py program..."}</code>
                    </pre>
                  </div>
                </motion.div>
              )}

              {/* ACTIVE CONTENT VIEW - IQ SCHEMA STRUCTURES */}
              {activeTab === "schema" && (
                <motion.div 
                  key="schema-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl">
                    <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4 font-sans">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">The 3 Structural Microsoft IQ Layers</h4>
                    </div>

                    <p className="text-xs text-slate-405 leading-relaxed mb-6 font-sans">
                      OrbitIQ implements three dedicated schemas (using standard Python `Pydantic` and JSON serialization) to model enterprise capacities, blueprints, and internal ontologies securely.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                      
                      {/* Foundry IQ Section */}
                      <div className="bg-white/5 p-4.5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-all duration-200">
                        <div>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-305 font-semibold inline-block">SYSTEM DATA</span>
                          <h5 className="text-xs font-bold text-slate-100 mt-2">FoundryIQSchema</h5>
                          <p className="text-[11.5px] text-slate-400 mt-1 leading-relaxed">
                            Encapsulates authoritative technical documentation, learning blueprints, and paragraph source-citations for model validation.
                          </p>
                        </div>
                        <div className="mt-4 pt-3.5 border-t border-white/10 text-[10.5px] font-mono text-slate-500">
                          - exam_id (str)<br />
                          - target_role (str)<br />
                          - modules (List[Module])<br />
                          - citations (List[Citation])
                        </div>
                      </div>

                      {/* Fabric IQ Section */}
                      <div className="bg-white/5 p-4.5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-all duration-200">
                        <div>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-305 font-semibold inline-block">ROLE ONTOLOGY</span>
                          <h5 className="text-xs font-bold text-slate-100 mt-2">FabricIQSchema</h5>
                          <p className="text-[11.5px] text-slate-400 mt-1 leading-relaxed">
                            Maps actual employee profiles to target technical competencies, identifying discrete skill gaps against target jobs.
                          </p>
                        </div>
                        <div className="mt-4 pt-3.5 border-t border-white/10 text-[10.5px] font-mono text-slate-500">
                          - employee_id (str)<br />
                          - target_role (str)<br />
                          - identified_gaps (List[str])<br />
                          - assigned_team_id (str)
                        </div>
                      </div>

                      {/* Work IQ Section */}
                      <div className="bg-white/5 p-4.5 rounded-xl border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-all duration-200">
                        <div>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-305 font-semibold inline-block">WORK TELEMETRY</span>
                          <h5 className="text-xs font-bold text-slate-100 mt-2">WorkIQSchema</h5>
                          <p className="text-[11.5px] text-slate-400 mt-1 leading-relaxed">
                            Collects live workspace logs tracking weekly schedules, deep work focus periods, production support pipelines, and ticket loads.
                          </p>
                        </div>
                        <div className="mt-4 pt-3.5 border-t border-white/10 text-[10.5px] font-mono text-slate-500">
                          - reporting_week (str)<br />
                          - meeting_hours (float)<br />
                          - deep_work_hours (float)<br />
                          - production_deploy_window (bool)
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </section>

      </main>

    </div>
  );
}

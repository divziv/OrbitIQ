import React, { useState, useEffect, useMemo } from "react";
import { 
  Cpu, 
  Layers, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Minus,
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
  Sun,
  FileText,
  Clock,
  Play,
  ArrowRight,
  User,
  Download,
  List,
  Share2,
  X,
  ExternalLink,
  Check,
  Printer,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

const MODULE_DETAILS_REGISTRY: Record<string, {
  title: string;
  skills: string[];
  prerequisites: string[];
  citation: string;
  description: string;
}> = {
  "M-401": {
    title: "Design a DevOps Strategy",
    skills: ["Agile Planning", "Source Control Topology", "Incident Mapping"],
    prerequisites: ["None - Foundational Module"],
    citation: "SRC-DEV-01 (Microsoft Agile release frameworks, Sec 4.1)",
    description: "Formulate planning protocols, track system telemetry across pipelines, and deploy isolated testing runtimes."
  },
  "M-402": {
    title: "Implement Continuous Integration with GitHub & Pipelines",
    skills: ["YAML Declarative Blueprints", "Lint Rules", "Static Testing Gates"],
    prerequisites: ["M-401 (Design a DevOps Strategy)"],
    citation: "SRC-DEV-02 (CI Topologies & Build Gate Enforcement, Sec 4.2)",
    description: "Construct build pipelines incorporating lint compliance rules, unit verification models, and automated build agents."
  },
  "M-403": {
    title: "Establish Continuous Delivery / Release Automations",
    skills: ["Environment Isolation", "Canary Gates", "Telemetry Hooks"],
    prerequisites: ["M-402 (Implement Continuous Integration)"],
    citation: "SRC-DEV-03 (CD Architecture & Deployment Windows, Sec 4.5)",
    description: "Configure staging to production pipelines, active canary telemetry gates, and automated rollback thresholds."
  },
  "M-404": {
    title: "Configure Dependency Management & Compliance",
    skills: ["Package Feeds", "Vulnerability Auditing", "License Verification"],
    prerequisites: ["M-401 (Design a DevOps Strategy)"],
    citation: "SRC-DEV-04 (Supply Chain Security Standards, Sec 5.1)",
    description: "Scan third-party software artifacts for vulnerabilities, compliance risks, and dependency freshness."
  },
  "M-301": {
    title: "Configure IAM Protocols",
    skills: ["IAM Protocols", "RBAC Policies"],
    prerequisites: ["None - Foundational Security Module"],
    citation: "SRC-SEC-99 (Identity & Access Control Standard, Sec 1.1)",
    description: "Build robust role-based structures, configure temporal access permissions, and enforce multifactor authentication gateways."
  },
  "M-302": {
    title: "Advance Network Protection & Perimeter Shields",
    skills: ["Network Hardening", "Firewall Topologies"],
    prerequisites: ["M-301 (Configure IAM Protocols)"],
    citation: "SRC-SEC-100 (Perimeter Defense & Perimeter Shields, Sec 2.3)",
    description: "Configure physical boundaries, perimeter threat detection networks, and real-time egress filtering."
  }
};

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
  const [prevMeetingHours, setPrevMeetingHours] = useState<number>(24.5);
  const [prodDeploy, setProdDeploy] = useState<boolean>(true);
  
  // Real execution results state
  const [loading, setLoading] = useState<boolean>(false);
  const [simulatedData, setSimulatedData] = useState<SimulatedState | null>(null);
  const [pythonLogs, setPythonLogs] = useState<string>("");
  const [pythonCode, setPythonCode] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"visualizer" | "terminal" | "code" | "schema">("visualizer");
  const [inspectWeek, setInspectWeek] = useState<number>(1);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [timelineViewMode, setTimelineViewMode] = useState<"list" | "calendar">("list");
  const [compareHistorical, setCompareHistorical] = useState<boolean>(false);
  const [isTelemetryExpanded, setIsTelemetryExpanded] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);

  // Expanded local interactive states
  const [exportHistory, setExportHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("orbitiq_export_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeThinkingNode, setActiveThinkingNode] = useState<number | null>(null);
  const [isSliderHovered, setIsSliderHovered] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [selectedAgentFilter, setSelectedAgentFilter] = useState<number | null>(null);
  const [failedNodes, setFailedNodes] = useState<number[]>([]);
  const [retryingNode, setRetryingNode] = useState<number | null>(null);
  const [retryingNodes, setRetryingNodes] = useState<number[]>([]);
  const [topologyFilter, setTopologyFilter] = useState<"all" | "healthy" | "attention">("all");
  const [isExportingCsv, setIsExportingCsv] = useState<boolean>(false);
  const [hoveredLegendSeries, setHoveredLegendSeries] = useState<"Meeting" | "Deep Work" | null>(null);
  const [timeWindow, setTimeWindow] = useState<"4weeks" | "60days" | "90days">("4weeks");
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);

  const isNodeFilterActive = (nodeId: number) => {
    if (topologyFilter === "all") return true;
    const isAttention = failedNodes.includes(nodeId) || retryingNode === nodeId || retryingNodes.includes(nodeId);
    if (topologyFilter === "healthy") return !isAttention;
    if (topologyFilter === "attention") return isAttention;
    return true;
  };

  // Custom agent parameter states and horizontal full flowchart mode
  const [deepDiveMode, setDeepDiveMode] = useState<boolean>(false);
  const [openSettingsNode, setOpenSettingsNode] = useState<number | null>(null);
  const [agentOverrides, setAgentOverrides] = useState<Record<number, { mode: "Aggressive" | "Passive" | "Adaptive"; latencyLimit: number; priority: "High" | "Medium" | "Low" }>>({
    1: { mode: "Adaptive", latencyLimit: 120, priority: "Medium" },
    2: { mode: "Adaptive", latencyLimit: 150, priority: "Medium" },
    3: { mode: "Aggressive", latencyLimit: 80, priority: "High" },
    4: { mode: "Adaptive", latencyLimit: 140, priority: "Medium" },
    5: { mode: "Passive", latencyLimit: 250, priority: "Low" },
  });

  const agentSyncData: Record<number, { rate: string; trend: "up" | "down" | "stable"; points: number[]; healthy: string; inPipe: string; outPipe: string; registryId: string }> = {
    1: { rate: "99.4%", trend: "up", points: [95, 98, 97, 99, 99.4], healthy: "99.4% Nominal", inPipe: "raw::sanitized_employee_profiles", outPipe: "vetted::certification_blueprint", registryId: "curator.learning_path_v1" },
    2: { rate: "98.1%", trend: "up", points: [91, 93, 96, 95, 98.1], healthy: "98.1% Stable", inPipe: "curr::vetted_certification_blueprint", outPipe: "milestones::week_schedule_matrix", registryId: "planner.study_plan_gen_v1" },
    3: { rate: "99.8%", trend: "stable", points: [100, 100, 99, 100, 99.8], healthy: "99.8% Perfect", inPipe: "commitments::calendar_metrics", outPipe: "load_modifiers::allocation_discount", registryId: "critic.engagement_monitor_v1" },
    4: { rate: "84.2%", trend: "down", points: [94, 91, 88, 85, 84.2], healthy: "Degraded Sync Status", inPipe: "curriculum::active_topic_index", outPipe: "validated::trivia_question_sets", registryId: "verifier.assessment_agent_v1" },
    5: { rate: "97.5%", trend: "up", points: [92, 94, 93, 95, 97.5], healthy: "97.5% Secure", inPipe: "timelines::collective_member_history", outPipe: "anonymized::compliance_review_grid", registryId: "insights.manager_reporter_v1" }
  };

  const handleRetryAgent = (nodeIndex: number) => {
    setRetryingNode(nodeIndex);
    setTimeout(() => {
      setFailedNodes(prev => prev.filter(n => n !== nodeIndex));
      setRetryingNode(null);
    }, 1200);
  };

  const handleResetAllAgents = () => {
    setFailedNodes([]);
    setRetryingNodes([1, 2, 3, 4, 5]);
    setTimeout(() => {
      setRetryingNodes([]);
    }, 1500);
  };

  const renderSparkline = (points: number[]) => {
    const strokeColor = points[4] >= points[0] ? "stroke-emerald-400" : "stroke-rose-450";
    const pathData = points.map((val, idx) => {
      const x = idx * 11 + 2;
      const clamped = Math.max(80, Math.min(100, val));
      const y = 14 - ((clamped - 80) / 20) * 10;
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
      <svg className={`w-12 h-3.5 fill-none ${strokeColor}`} viewBox="0 0 50 14" xmlns="http://www.w3.org/2000/svg">
        <path d={pathData} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const renderTrendIcon = (trend: "up" | "down" | "stable", rate: string) => {
    if (trend === "up") {
      return (
        <span className="flex items-center space-x-0.5 text-emerald-400 font-mono text-[9px] font-bold" title="Success rate increasing over last 5 cycles">
          <TrendingUp className="w-2.5 h-2.5 shrink-0" />
          <span>{rate}</span>
        </span>
      );
    }
    if (trend === "down") {
      return (
        <span className="flex items-center space-x-0.5 text-rose-400 font-mono text-[9px] font-bold" title="Degradation trigger active">
          <TrendingDown className="w-2.5 h-2.5 shrink-0 animate-bounce" />
          <span>{rate}</span>
        </span>
      );
    }
    return (
      <span className="flex items-center space-x-0.5 text-slate-400 font-mono text-[9px]" title="Success rate is constant">
        <Minus className="w-2.5 h-2.5 shrink-0" />
        <span>{rate}</span>
      </span>
    );
  };

  const getHorizontalTitle = (id: number) => {
    switch (id) {
      case 1: return "Curator Agent";
      case 2: return "Study Plan Gen";
      case 3: return "Engagement Critic";
      case 4: return "Assessment Agent";
      case 5: return "Insights Agent";
      default: return "Agent";
    }
  };

  const getNodeDescriptionSummary = (id: number) => {
    switch (id) {
      case 1: return "Bridges gaps to technical blueprints, outputs citations.";
      case 2: return "Splits macro sequencing and daily training actions.";
      case 3: return "Checks Capacity metrics, scales back study matrix by 50% on strain.";
      case 4: return "Autonomously drafts exams and validates correctness.";
      case 5: return "Analyzes team progress while completely stripping all PII.";
      default: return "OrbitIQ autonomous routing node.";
    }
  };

  const getRegistryLabel = (id: number) => {
    switch (id) {
      case 1: return "MATCH IQ";
      case 2: return "PLANNER-EXEC";
      case 3: return "SELF-REFLECT";
      case 4: return "VERIFIER";
      case 5: return "ANONYMOUS";
      default: return "ORBITIQ";
    }
  };

  // Automatically cycle through topological reasoning layers when simulating live inputs
  useEffect(() => {
    if (loading) {
      let current = 1;
      setActiveThinkingNode(current);
      const interval = setInterval(() => {
        current = current < 5 ? current + 1 : 1;
        setActiveThinkingNode(current);
      }, 700);
      return () => clearInterval(interval);
    } else {
      setActiveThinkingNode(null);
    }
  }, [loading]);

  const getNodeStatus = (nodeIndex: number) => {
    if (retryingNode === nodeIndex || retryingNodes.includes(nodeIndex)) {
      return {
        label: "Syncing...",
        dotClass: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)] animate-spin",
        textClass: "text-amber-500 font-bold"
      };
    }
    if (failedNodes.includes(nodeIndex)) {
      return {
        label: "Sync Failed",
        dotClass: "bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse",
        textClass: "text-rose-500 font-bold animate-pulse"
      };
    }
    if (loading) {
      if (activeThinkingNode === nodeIndex) {
        return {
          label: "Thinking",
          dotClass: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)] animate-pulse",
          textClass: "text-amber-500 font-bold"
        };
      }
      return {
        label: "Standby",
        dotClass: "bg-slate-400 opacity-60",
        textClass: "text-slate-400"
      };
    }
    if (simulatedData) {
      if (nodeIndex === 3 && simulatedData?.studyTimeline?.mitigationApplied) {
        return {
          label: "Mitigating",
          dotClass: "bg-rose-500 animate-ping",
          textClass: "text-rose-500 font-bold"
        };
      }
      return {
        label: "Sync Ready",
        dotClass: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
        textClass: "text-emerald-500 font-semibold"
      };
    }
    return {
      label: "Offline",
      dotClass: "bg-slate-500 opacity-45",
      textClass: "text-slate-500"
    };
  };

  const getConfidenceScore = (index: number) => {
    let base = 98.4;
    if (stressProfile === "HIGH_STRESS") base -= 3.2;
    if (meetingHours > 20) base -= (meetingHours - 20) * 0.15;
    if (prodDeploy) base -= 1.8;
    return Number(Math.max(83.5, Math.min(99.9, base + (index * 0.4))).toFixed(1));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const handleDownloadComplianceReport = () => {
    if (!simulatedData) return;
    const payload = {
      exportTimestamp: new Date().toISOString(),
      complianceStandard: "GDPR / MS Foundational Core",
      telemetryAnonymized: true,
      teamReport: simulatedData.teamReport,
      emergencyMitigationsApplied: simulatedData.studyTimeline.mitigationApplied,
      warningsScanned: simulatedData.capacityWarnings
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Team_Compliance_Report_${simulatedData.teamReport.teamId || "TEAM-B"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Save download timestamp log to session list history
    const nowStamp = new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    setExportHistory(prev => {
      const updated = [nowStamp, ...prev].slice(0, 10); // Limit to last 10 exports
      try {
        localStorage.setItem("orbitiq_export_history", JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage write failed", e);
      }
      return updated;
    });
  };

  const handleDownloadWorkIQCsv = () => {
    if (!simulatedData) return;
    setIsExportingCsv(true);
    setTimeout(() => {
      const telemetry = simulatedData.telemetryIq;
      const csvContent = [
        ["Metric", "Value", "Week Reference"],
        ["Reporting Week", telemetry.reportingWeek, "Current"],
        ["Meeting Hours", meetingHours.toString(), "Current"],
        ["Deep Work Hours", telemetry.deepWorkHours.toString(), "Current"],
        ["Incident Tickets Open", telemetry.averageIncidentCount.toString(), "Current"],
        [],
        ["Historical Balancing", "Meeting Hours", "Deep Work Hours"],
        ...rechartData4Weeks.map(item => [item.week, item["Meeting Hours"].toString(), item["Deep Work Hours"].toString()])
      ].map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `WorkIQ_Workload_Telemetry_${telemetry.reportingWeek}.csv`);
      link.click();
      URL.revokeObjectURL(url);
      setIsExportingCsv(false);
    }, 1000);
  };

  const handleExportToPDF = () => {
    setIsPrintMode(true);
    setShowPrintPreview(true);
  };

  const handleQuickReset = () => {
    if (!simulatedData) return;
    
    // Reset Weeks to Baseline Nominal Trajectory
    const baselineWeeks = simulatedData.studyTimeline.weeks.map(week => {
      const isDevOpsCert = simulatedData.fabricIq.recommendedCert === "AZ-400";
      return {
        ...week,
        targetHours: 5.0,
        dailyMatrix: [
          {
            day: "Monday",
            allocatedHours: 2.0,
            modulesCovered: [week.dailyMatrix[0]?.modulesCovered[0] || (isDevOpsCert ? "M-401" : "M-301")],
            tasks: [
              "Core Architecture Video Series",
              "Read Official Blueprint Guidelines"
            ]
          },
          {
            day: "Wednesday",
            allocatedHours: 1.5,
            modulesCovered: [week.dailyMatrix[1]?.modulesCovered[0] || (isDevOpsCert ? "M-402" : "M-302")],
            tasks: [
              "Hands-on practice exercises in sandbox environment"
            ]
          },
          {
            day: "Friday",
            allocatedHours: 1.5,
            modulesCovered: [week.dailyMatrix[2]?.modulesCovered[0] || (isDevOpsCert ? "M-403" : "M-301")],
            tasks: [
              "Weekly Module Knowledge Assessment & Self-Evaluation"
            ]
          }
        ]
      };
    });

    setSimulatedData({
      ...simulatedData,
      studyTimeline: {
        ...simulatedData.studyTimeline,
        weeks: baselineWeeks,
        mitigationApplied: false,
        mitigationNotes: "Baseline unmitigated schedule restored via manual user override."
      },
      capacityWarnings: []
    });
  };

  // Recharts series computed dynamically to react to custom sliders and selected time window
  const rechartData4Weeks = useMemo(() => {
    if (!simulatedData) return [];
    
    const baseWeeks = [
      {
        week: "W13",
        "Meeting Hours": Number((meetingHours * 0.80).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 0.80) - (prodDeploy ? 5 : 0)).toFixed(1)),
        "Hist. Meeting": 26.0,
        "Hist. Deep Work": 14.0,
      },
      {
        week: "W14",
        "Meeting Hours": Number((meetingHours * 1.20).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 1.20) - (prodDeploy ? 10 : 0)).toFixed(1)),
        "Hist. Meeting": 34.0,
        "Hist. Deep Work": 6.0,
      },
      {
        week: "W15",
        "Meeting Hours": Number((meetingHours * 0.70).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 0.70) - (prodDeploy ? 4 : 0)).toFixed(1)),
        "Hist. Meeting": 23.0,
        "Hist. Deep Work": 17.0,
      },
      {
        week: "W16",
        "Meeting Hours": Number((meetingHours * 1.00).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 1.05) - (prodDeploy ? 8 : 0)).toFixed(1)),
        "Hist. Meeting": 29.5,
        "Hist. Deep Work": 10.5,
      },
      {
        week: "W17",
        "Meeting Hours": Number((meetingHours * 0.75).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 0.75) - (prodDeploy ? 5 : 0)).toFixed(1)),
        "Hist. Meeting": 25.0,
        "Hist. Deep Work": 15.0,
      },
      {
        week: "W18",
        "Meeting Hours": Number((meetingHours * 1.10).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 1.10) - (prodDeploy ? 7 : 0)).toFixed(1)),
        "Hist. Meeting": 31.0,
        "Hist. Deep Work": 9.0,
      },
      {
        week: "W19",
        "Meeting Hours": Number((meetingHours * 0.90).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 0.90) - (prodDeploy ? 6 : 0)).toFixed(1)),
        "Hist. Meeting": 27.5,
        "Hist. Deep Work": 12.5,
      },
      {
        week: "W20",
        "Meeting Hours": Number((meetingHours * 1.05).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 1.05) - (prodDeploy ? 10 : 0)).toFixed(1)),
        "Hist. Meeting": 30.0,
        "Hist. Deep Work": 10.0,
      },
      {
        week: "W21",
        "Meeting Hours": Number((meetingHours * 0.85).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 0.85) - (prodDeploy ? 6 : 0)).toFixed(1)),
        "Hist. Meeting": 28.0,
        "Hist. Deep Work": 12.0,
      },
      {
        week: "W22",
        "Meeting Hours": Number((meetingHours * 1.15).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 1.15) - (prodDeploy ? 11 : 0)).toFixed(1)),
        "Hist. Meeting": 32.5,
        "Hist. Deep Work": 7.5,
      },
      {
        week: "W23",
        "Meeting Hours": Number((meetingHours * 0.95).toFixed(1)),
        "Deep Work Hours": Number(Math.max(0, 40 - (meetingHours * 0.95) - (prodDeploy ? 8 : 0)).toFixed(1)),
        "Hist. Meeting": 29.0,
        "Hist. Deep Work": 11.0,
      },
      {
        week: "W24 (Live)",
        "Meeting Hours": meetingHours,
        "Deep Work Hours": simulatedData.telemetryIq.deepWorkHours,
        "Hist. Meeting": 30.5,
        "Hist. Deep Work": 9.5,
      },
    ];

    if (timeWindow === "4weeks") {
      return baseWeeks.slice(-4);
    } else if (timeWindow === "60days") {
      return baseWeeks.slice(-8);
    } else {
      return baseWeeks;
    }
  }, [simulatedData, meetingHours, prodDeploy, timeWindow]);

  // Semantic accessible color combinations mapped perfectly for both dark and high-contrast light formats
  const bgMainClass = theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const headerClass = theme === "dark" ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white/90 text-slate-900 shadow-sm";
  const labelClass = theme === "dark" ? "text-slate-400" : "text-slate-600 font-medium";
  const valueClass = theme === "dark" ? "text-slate-200" : "text-slate-800 font-semibold";
  const titleClass = theme === "dark" ? "text-white" : "text-slate-900 font-bold";
  const cardBorderClass = theme === "dark" ? "border-white/10" : "border-slate-200";
  const cardBgClass = theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-slate-200 shadow-sm";
  const bgPanelClass = theme === "dark" ? "bg-white/5" : "bg-slate-100/80";
  const innerCardClass = theme === "dark" ? "bg-black/20 border-white/5" : "bg-slate-100/50 border-slate-200";

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
    setFailedNodes([]);
    setRetryingNode(null);
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
        setPrevMeetingHours(meetingHours);
        setSimulatedData(data.structuredState);
        setPythonLogs(data.pythonLogs);
        // Automatically inject high-fidelity initial assessment failures for Node 4
        setFailedNodes([4]);
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

  // Keyboard navigation for simulation: 'R' to run, 'T' to toggle theme, left/right arrows to cycle weeks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target && (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable
        )
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === "r") {
        e.preventDefault();
        if (!loading) {
          handleRunSimulation();
        }
      } else if (key === "t") {
        e.preventDefault();
        toggleTheme();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (simulatedData?.studyTimeline?.weeks) {
          const minWeek = 1;
          setInspectWeek(prev => Math.max(minWeek, prev - 1));
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (simulatedData?.studyTimeline?.weeks) {
          const maxWeek = simulatedData.studyTimeline.weeks.length;
          setInspectWeek(prev => Math.min(maxWeek, prev + 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [loading, simulatedData, toggleTheme]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen ${bgMainClass} font-sans antialiased selection:bg-cyan-500 selection:text-slate-900 relative overflow-hidden transition-colors duration-350`}>
      
      {/* 🔮 Frosted Mesh gradient background overlays */}
      <div className={`absolute top-[-200px] left-[-200px] w-[600px] h-[600px] ${theme === "dark" ? "bg-blue-600/10" : "bg-blue-500/5"} rounded-full blur-[150px] pointer-events-none`}></div>
      <div className={`absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] ${theme === "dark" ? "bg-indigo-600/10" : "bg-indigo-500/5"} rounded-full blur-[150px] pointer-events-none`}></div>
      
      {/* 🚀 Sleek Header */}
      <header id="app-header" className={`border-b ${headerClass} backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex items-center justify-between transition-colors duration-350`}>
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center transition-all hover:scale-105 duration-300">
            <Cpu className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] uppercase tracking-widest font-mono font-bold ${theme === "dark" ? "text-cyan-300 bg-white/5 border-white/10" : "text-cyan-600 bg-slate-100 border-slate-200"} px-2 py-0.5 rounded border backdrop-blur-sm`}>Microsoft Agent Framework V2</span>
              {theme === "light" && (
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">High Contrast Active</span>
              )}
            </div>
            <h1 className={`text-lg font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"} mt-0.5`}>
              OrbitIQ <span className={`font-light ${theme === "dark" ? "text-slate-400" : "text-slate-550"}`}>| Capacity-Aware Orchestration Engine</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className={`hidden md:flex items-center space-x-1.5 text-xs ${theme === "dark" ? "text-slate-350 bg-white/5 border-white/10" : "text-slate-600 bg-slate-150/60 border-slate-200"} px-3 py-1.5 rounded-xl border backdrop-blur-sm`}>
            <Clock className="w-3.5 h-3.5 text-cyan-500" />
            <span className="font-mono text-cyan-605">SYSTEM TIME: 2026-06-09 UTC</span>
          </div>

          {/* Theme Toggle Button for Better Accessibility */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-center ${
              theme === "dark" 
                ? "bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10 shadow-sm" 
                : "bg-white border-slate-200 text-amber-500 shadow hover:bg-slate-50"
            }`}
            title={theme === "dark" ? "Switch to High-Contrast Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

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
          <div id="sandbox-controls-card" className={`${cardBgClass} backdrop-blur-md rounded-2xl p-5 relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className={`font-semibold text-sm tracking-wide uppercase ${theme === "dark" ? "text-white" : "text-slate-950"}`}>Simulation Sandbox Control</h3>
              </div>
              <span className={`text-[10px] font-mono ${theme === "dark" ? "text-slate-350 bg-white/5 border-white/10" : "text-slate-655 bg-slate-100 border-slate-200"} px-2 py-0.5 rounded-lg select-none`}>Static Schemas</span>
            </div>

            <p className={`text-xs ${labelClass} mb-5 leading-relaxed`}>
              Configure corporate telemetry metrics to test OrbitIQ's capacity critic and multi-agent schedule downscaling behavior.
            </p>

            <div className="space-y-4">
              {/* Profile Presets */}
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${labelClass}`}>Load & Capacity Profile Preset</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="preset-high-stress"
                    onClick={() => setStressProfile("HIGH_STRESS")}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      stressProfile === "HIGH_STRESS" 
                        ? "bg-rose-500/20 border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(239,68,68,0.25)]" 
                        : theme === "dark" 
                          ? "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                          : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                    }`}
                  >
                    High Stress (EMP-102)
                  </button>
                  <button
                    id="preset-normal-stress"
                    onClick={() => setStressProfile("NORMAL")}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      stressProfile === "NORMAL" 
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]" 
                        : theme === "dark" 
                          ? "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                          : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                    }`}
                  >
                    Normal Load
                  </button>
                </div>
              </div>

              {/* Employee ID Custom Select */}
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${labelClass}`}>Select Targeted Employee IQ</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="select-emp-102"
                    onClick={() => setEmployeeId("EMP-102")}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                      employeeId === "EMP-102" 
                        ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]" 
                        : theme === "dark" 
                          ? "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                          : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
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
                        ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]" 
                        : theme === "dark" 
                          ? "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                          : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>EMP-103 (SysAdmin)</span>
                  </button>
                </div>
              </div>

              <hr className={cardBorderClass} />

              {/* Slider for Meeting workload */}
              <div className="relative group/meeting bg-slate-500/5 p-3.5 rounded-xl border border-dashed border-slate-500/10 transition-colors">
                <div className="flex justify-between items-center mb-1.5">
                  <label className={`text-xs font-semibold mb-0.5 ${labelClass}`}>Weekly Meeting Commitment</label>
                  <span className={`text-xs font-mono font-bold ${meetingHours > 20 ? "text-rose-405 font-bold animate-pulse" : "text-emerald-405"}`}>
                    {meetingHours} hrs/week
                  </span>
                </div>
                
                {/* Tooltip Wrapper */}
                <div className="relative pt-6 pb-2"
                  onMouseEnter={() => setIsSliderHovered(true)}
                  onMouseLeave={() => setIsSliderHovered(false)}
                >
                  <AnimatePresence>
                    {isSliderHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.92 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full mb-1 z-30 pointer-events-none -translate-x-1/2"
                        style={{ left: `${((meetingHours - 5) / 35) * 100}%` }}
                      >
                        <div className={`px-2 py-1 rounded-md text-[10px] font-mono font-black border tracking-wider shadow-lg whitespace-nowrap ${
                          meetingHours <= 15
                            ? "bg-emerald-500 border-emerald-400 text-slate-950"
                            : meetingHours <= 20
                              ? "bg-yellow-500 border-yellow-400 text-slate-950"
                              : meetingHours <= 28
                                ? "bg-orange-500 border-orange-400 text-white"
                                : "bg-rose-600 border-rose-500 text-white animate-bounce"
                        }`}>
                          Capacity Risk: {
                            meetingHours <= 15 ? "LOW" :
                            meetingHours <= 20 ? "MODERATE" :
                            meetingHours <= 28 ? "HIGH" : "CRITICAL"
                          }
                        </div>
                        {/* Caret pointing down */}
                        <div className={`w-1.5 h-1.5 rotate-45 border-r border-b mx-auto -mt-1 border-inherit ${
                          meetingHours <= 15 ? "bg-emerald-500" :
                          meetingHours <= 20 ? "bg-yellow-500" :
                          meetingHours <= 28 ? "bg-orange-500" : "bg-rose-600"
                        }`} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <input 
                    id="meeting-hours-range"
                    type="range" 
                    min="5" 
                    max="40" 
                    step="0.5"
                    value={meetingHours} 
                    onChange={(e) => setMeetingHours(parseFloat(e.target.value))}
                    className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none ${theme === "dark" ? "bg-white/10" : "bg-slate-200"}`}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5 Hrs (Nominal)</span>
                  <span className={`${theme === "dark" ? "text-rose-455" : "text-rose-600 font-bold"}`}>Critic Limit: 20 Hrs</span>
                  <span>40 Hrs</span>
                </div>
              </div>

              {/* Toggle switch for Production Deployment Window */}
              <div className={`flex items-center justify-between p-3 rounded-xl border backdrop-blur-sm ${innerCardClass}`}>
                <div className="flex flex-col">
                  <span className={`text-xs font-semibold ${theme === "dark" ? "text-slate-200" : "text-slate-850"}`}>Active Live Deploy Window</span>
                  <span className="text-[10px] text-slate-500 font-medium">Triggers self-reflection emergency back-offs</span>
                </div>
                <button
                  id="prod-deploy-switch"
                  onClick={() => setProdDeploy(!prodDeploy)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    prodDeploy ? "bg-cyan-500" : theme === "dark" ? "bg-white/10" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out ${
                      prodDeploy ? "translate-x-5 bg-white" : "translate-x-0 bg-slate-400"
                    }`}
                  />
                </button>
              </div>

              <button 
                id="dispatch-engine-btn"
                onClick={handleRunSimulation} 
                disabled={loading}
                className={`w-full py-3 text-cyan-500 hover:text-cyan-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 border border-cyan-500/30 hover:border-cyan-500/50 shadow shadow-cyan-500/10 cursor-pointer active:scale-95 duration-200 ${
                  theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-slate-105 hover:bg-slate-150"
                }`}
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin text-cyan-500" /> : <Play className="w-4 h-4 text-cyan-500" />}
                <span>Update Telemetry Sensor Stream</span>
              </button>
            </div>
          </div>
                            {/* Core Multi-Agent Topology State Graph Visualizer */}
          <div id="state-topology-card" className={`${cardBgClass} backdrop-blur-md rounded-2xl p-5 relative`}>
            <div className="flex items-center justify-between mb-4 border-b border-dashed border-slate-500/10 pb-3 flex-wrap gap-2">
              <div className="flex items-center space-x-2.5 flex-wrap gap-1.5">
                <Cpu className={`w-5 h-5 ${theme === "dark" ? "text-indigo-300" : "text-indigo-600"}`} />
                <h3 className={`font-semibold text-sm tracking-wide uppercase ${theme === "dark" ? "text-white" : "text-slate-900"}`}>State Routing Topology</h3>
                {failedNodes.length > 0 && (
                  <span id="anomaly-alert-badge" className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-rose-500/15 text-rose-450 border border-rose-500/30 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                    <AlertTriangle className="w-2.5 h-2.5 shrink-0 text-rose-500" />
                    <span>Anomaly Alert ({failedNodes.length})</span>
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {/* Reset All Agents Button */}
                <button
                  id="reset-all-agents-btn"
                  onClick={handleResetAllAgents}
                  className={`text-[10px] font-mono font-bold px-3 py-1 rounded-lg border cursor-pointer transition-all flex items-center space-x-1.5 uppercase ${
                    theme === "dark"
                      ? "bg-slate-800 hover:bg-slate-700/80 text-slate-200 border-white/5 hover:border-white/10"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300 hover:border-slate-400"
                  }`}
                  title="Clear failed node list and sync every agent simultaneously"
                >
                  <RefreshCw className={`w-3 h-3 text-emerald-450 ${retryingNodes.length > 0 ? "animate-spin" : ""}`} />
                  <span>Reset All Agents</span>
                </button>

                {/* Deep Dive Mode Toggle */}
                <button
                  onClick={() => setDeepDiveMode(!deepDiveMode)}
                  className={`text-[10px] font-mono font-bold px-3 py-1 rounded-lg border cursor-pointer transition-all flex items-center space-x-1.5 uppercase ${
                    deepDiveMode 
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.25)]" 
                      : "bg-slate-500/5 text-slate-400 border-slate-500/10 hover:border-slate-500/25"
                  }`}
                  title="Toggle horizontal state flowchart view"
                >
                  <Layers className={`w-3 h-3 ${deepDiveMode ? "animate-pulse text-cyan-400" : ""}`} />
                  <span>Deep Dive Mode</span>
                </button>
                {selectedAgentFilter !== null && (
                  <button
                    onClick={() => setSelectedAgentFilter(null)}
                    className="text-[10px] font-mono font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 px-2 py-1 rounded-lg cursor-pointer transition-all uppercase"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
            
            <p className={`text-xs ${labelClass} mb-5 leading-relaxed`}>
              OrbitIQ coordinates five isolated reasoning agents in a state-graph pattern. {deepDiveMode ? "Showing deep-dive pipeline flow with critical routing paths highlighted. Click gear icon to set parameters." : "Click nodes to filter logs, or trigger retries to sync. Hover for registry details."}
            </p>

            {/* Global Node Health Filter Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-dashed border-slate-500/15 pb-4">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-650"}`}>
                Global Topography Filter:
              </span>
              <div className={`p-1 rounded-xl border flex items-center space-x-1 ${
                theme === "dark" ? "bg-black/25 border-white/5" : "bg-slate-100/90 border-slate-205"
              }`}>
                <button
                  id="filter-nodes-all"
                  onClick={() => setTopologyFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all duration-205 cursor-pointer ${
                    topologyFilter === "all"
                      ? "bg-cyan-500 text-slate-950 shadow-md font-extrabold"
                      : `${theme === "dark" ? "text-slate-400 hover:text-slate-100" : "text-slate-600 hover:text-slate-900"}`
                  }`}
                >
                  All (5)
                </button>
                <button
                  id="filter-nodes-healthy"
                  onClick={() => setTopologyFilter("healthy")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all duration-205 cursor-pointer flex items-center space-x-1 ${
                    topologyFilter === "healthy"
                      ? "bg-emerald-500 text-slate-950 shadow-md font-extrabold"
                      : `${theme === "dark" ? "text-slate-400 hover:text-slate-100" : "text-slate-600 hover:text-slate-900"}`
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5 text-current shrink-0" />
                  <span>Healthy ({5 - failedNodes.length})</span>
                </button>
                <button
                  id="filter-nodes-attention"
                  onClick={() => setTopologyFilter("attention")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all duration-300 cursor-pointer flex items-center space-x-1 relative ${
                    topologyFilter === "attention"
                      ? "bg-rose-500 text-slate-950 shadow-md font-extrabold"
                      : `${theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-650 hover:text-rose-600"}`
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-current shrink-0" />
                  <span>Attention ({failedNodes.length})</span>
                  {failedNodes.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {deepDiveMode ? (
              /* HORIZONTAL FLOW CHART VIEW */
              <div className="py-2 overflow-x-auto scrollbar-thin">
                <div className="min-w-[800px] flex items-stretch justify-between relative py-6 px-1 gap-2">
                  {[1, 2, 3, 4, 5].filter(nodeId => isNodeFilterActive(nodeId)).map((nodeId, idx, filteredArr) => {
                    const isThinking = activeThinkingNode === nodeId;
                    const isActiveFilter = selectedAgentFilter === nodeId;
                    const isFailed = failedNodes.includes(nodeId);
                    const isHovered = hoveredNode === nodeId;
                    const isOverrideOpen = openSettingsNode === nodeId;
                    
                    // Connected path indicator: exists if there's a subsequent visible node
                    const isCriticalPathNext = idx < filteredArr.length - 1;

                    return (
                      <React.Fragment key={nodeId}>
                        {/* Agent Horizontal Node Card */}
                        <div 
                          id={`topology-node-${nodeId}`}
                          className="relative flex-1 flex flex-col justify-between"
                          onMouseEnter={() => setHoveredNode(nodeId)}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => {
                            setSelectedAgentFilter(selectedAgentFilter === nodeId ? null : nodeId);
                            setActiveTab("visualizer");
                          }}
                        >
                          {isThinking && (
                            <motion.div
                              layoutId="activeThinkingGlowHorizontal"
                              className="absolute inset-0 rounded-xl border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none z-10"
                              transition={{ type: "spring", stiffness: 180, damping: 20 }}
                            />
                          )}
                          <div className={`h-full flex flex-col justify-between backdrop-blur-sm p-3 rounded-xl shadow-md transition-all duration-200 border cursor-pointer ${
                            isThinking || isHovered
                              ? "border-amber-500/75 bg-amber-500/5 shadow-[0_0_12px_rgba(245,158,11,0.1)]" :
                            isActiveFilter
                              ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_12px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20" :
                            theme === "dark" 
                              ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-205" 
                              : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-850"
                          }`}>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-1.5">
                                  <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center text-[9px] font-bold ${
                                    isThinking ? "bg-amber-500 text-slate-950 border-amber-400 animate-pulse" :
                                    isActiveFilter ? "bg-cyan-500 text-slate-950 border-cyan-400" :
                                    "bg-white/5 text-slate-400"
                                  }`}>{nodeId}</div>
                                  <span className={`w-1.5 h-1.5 rounded-full ${getNodeStatus(nodeId).dotClass}`} />
                                </div>
                                <div className="flex items-center space-x-1">
                                  {/* Sync trend metrics overlay */}
                                  <div className="bg-black/15 px-1.5 py-0.5 rounded border border-white/5 scale-90 origin-right">
                                    {renderTrendIcon(agentSyncData[nodeId].trend, agentSyncData[nodeId].rate)}
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenSettingsNode(openSettingsNode === nodeId ? null : nodeId);
                                    }}
                                    className={`p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-all ${
                                      isOverrideOpen ? "text-cyan-400 animate-spin" : ""
                                    }`}
                                    title="Operational controls"
                                  >
                                    <Settings className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              <h4 className="text-[11px] font-bold truncate tracking-tight text-sans leading-snug">
                                {getHorizontalTitle(nodeId)}
                              </h4>
                              <p className="text-[10px] text-slate-400 leading-tight mt-1 line-clamp-2 select-none">
                                {getNodeDescriptionSummary(nodeId)}
                              </p>
                            </div>

                            <div className="mt-2 pt-2 border-t border-dashed border-slate-500/10 flex items-center justify-between text-[9px] font-mono">
                              <span className="text-[9px] tracking-wide text-cyan-400 font-semibold uppercase">{getRegistryLabel(nodeId)}</span>
                              <span className={`px-1 py-0.1 select-none rounded bg-slate-500/5 ${getNodeStatus(nodeId).textClass}`}>{getNodeStatus(nodeId).label}</span>
                            </div>

                            {/* Inline parameters override inside horizontal block */}
                            <AnimatePresence>
                              {isOverrideOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-2 pt-2 border-t border-slate-500/15 text-[10px] space-y-2 bg-black/20 p-2 rounded text-left"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div>
                                    <span className="text-[9px] text-slate-400 block mb-0.5">Mode:</span>
                                    <select
                                      value={agentOverrides[nodeId].mode}
                                      onChange={(e) => {
                                        setAgentOverrides(prev => ({
                                          ...prev,
                                          [nodeId]: { ...prev[nodeId], mode: e.target.value as any }
                                        }));
                                      }}
                                      className="w-full bg-slate-900 border border-slate-700 rounded p-0.5 text-[10px] font-mono text-slate-100"
                                    >
                                      <option value="Adaptive">Adaptive</option>
                                      <option value="Aggressive">Aggressive</option>
                                      <option value="Passive">Passive</option>
                                    </select>
                                  </div>
                                  <div>
                                    <span className="text-[9px] text-slate-400 block mb-0.5">Priority:</span>
                                    <select
                                      value={agentOverrides[nodeId].priority}
                                      onChange={(e) => {
                                        setAgentOverrides(prev => ({
                                          ...prev,
                                          [nodeId]: { ...prev[nodeId], priority: e.target.value as any }
                                        }));
                                      }}
                                      className="w-full bg-slate-900 border border-slate-700 rounded p-0.5 text-[10px] font-mono text-slate-100"
                                    >
                                      <option value="High">High</option>
                                      <option value="Medium">Medium</option>
                                      <option value="Low">Low</option>
                                    </select>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Floating non-blocking Registry and Health Tooltip modal on hover */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full left-0 right-0 z-[99] mb-3 p-3.5 backdrop-blur-xl bg-slate-95 /95 dark:bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_4px_25px_rgba(6,182,212,0.35)] text-left space-y-2 pointer-events-none text-slate-100"
                              >
                                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                                  <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase truncate max-w-[150px]" title={agentSyncData[nodeId].registryId}>ID: {agentSyncData[nodeId].registryId}</span>
                                  <span className="font-mono text-[8px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1 rounded animate-pulse shrink-0">● HEALTH NOMINAL</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                                  <div>
                                    <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Sync Status</span>
                                    <span className="text-slate-100 font-semibold font-mono">{agentSyncData[nodeId].healthy}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Overrides</span>
                                    <span className="text-slate-100 font-semibold font-mono uppercase text-cyan-300">{agentOverrides[nodeId].mode} mode</span>
                                  </div>
                                </div>
                                <div className="text-[9.5px] bg-white/5 p-1.5 rounded border border-white/5 font-mono text-slate-300">
                                  <div className="mb-0.5 text-[8.5px] text-slate-400 uppercase font-sans font-bold">Active Pipeline</div>
                                  <div className="truncate"><strong className="text-cyan-400">IN:</strong> {agentSyncData[nodeId].inPipe}</div>
                                  <div className="truncate"><strong className="text-indigo-400">OUT:</strong> {agentSyncData[nodeId].outPipe}</div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Connecting indicators for timeline directionality */}
                        {isCriticalPathNext && (
                          <div className="flex items-center justify-center pointer-events-none self-center shrink-0 w-4">
                            <div className="relative flex flex-col items-center">
                              <ArrowRight className={`w-4 h-4 shrink-0 transition-colors ${
                                isThinking || loading ? "text-cyan-400 animate-pulse" : "text-slate-200 dark:text-white/10"
                              }`} />
                              {/* Pulse flow trace particle */}
                              {(isThinking || loading) && (
                                <span className="absolute h-1.5 w-1.5 bg-yellow-400 rounded-full animate-[ping_1.5s_infinite]" />
                              )}
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* STANDARD VERTICAL NODE LIST VIEW */
              <div className="relative pl-6 space-y-5">
                {/* Subtle path connector vertical line with ongoing flow animation */}
                <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  {/* When loading / executing, show a cascading neon thread pulse running down */}
                  {loading && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent w-full"
                      style={{ height: "60px" }}
                      animate={{
                        y: ["-60px", "450px"]
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}
                  {/* Always show a subtle glowing thread representing information transmission */}
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-indigo-500/20 via-cyan-500/25 to-indigo-500/20"
                    animate={{
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Dynamic traveling data packet particle along the vertical track */}
                  {activeThinkingNode !== null && (
                    <motion.div
                      className="absolute left-0 right-0 w-full bg-gradient-to-b from-transparent via-amber-400 to-transparent blur-[1px] shadow-[0_0_8px_#f59e0b]"
                      style={{ height: "45px" }}
                      animate={{
                        top: 
                          activeThinkingNode === 1 ? "5%" : 
                          activeThinkingNode === 2 ? "25%" : 
                          activeThinkingNode === 3 ? "50%" : 
                          activeThinkingNode === 4 ? "75%" : "93%"
                      }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    />
                  )}
                </div>
                
                {/* Agent 1 Node */}
                {isNodeFilterActive(1) && (
                  <div 
                    id="topology-node-1" 
                    className="relative flex items-start space-x-3 cursor-pointer select-none"
                    onMouseEnter={() => setHoveredNode(1)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => {
                      setSelectedAgentFilter(selectedAgentFilter === 1 ? null : 1);
                      setActiveTab("visualizer");
                    }}
                  >
                    <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-10 ${
                      activeThinkingNode === 1 ? "bg-amber-500 text-slate-955 border-amber-400 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.5)]" :
                      selectedAgentFilter === 1 ? "bg-cyan-500 text-slate-955 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)] animate-pulse" :
                      simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                    }`}>1</div>
                    <div className={`flex-1 backdrop-blur-sm p-3.5 rounded-xl shadow-md transition-all duration-205 border relative ${
                      activeThinkingNode === 1 || hoveredNode === 1 
                        ? "border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)]" :
                      selectedAgentFilter === 1
                        ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/30" :
                      theme === "dark" 
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200" 
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-850"
                    }`}>
                      {activeThinkingNode === 1 && (
                        <motion.div
                          layoutId="activeThinkingGlowVertical"
                          className="absolute inset-0 rounded-xl border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none z-10"
                          transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        />
                      )}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getNodeStatus(1).dotClass}`} />
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className={`text-xs font-bold transition-colors ${
                          activeThinkingNode === 1 || hoveredNode === 1 ? "text-amber-500 font-extrabold" : 
                          selectedAgentFilter === 1 ? "text-cyan-400 font-extrabold" :
                          theme === "dark" ? "text-slate-200" : "text-slate-800"
                        }`}>Learning Path Curator Agent</span>
                        
                        {/* Sparkline & Success Rate */}
                        <div className="flex items-center space-x-1 ml-2 bg-black/10 px-1.5 py-0.5 rounded border border-white/5 shrink-0 scale-95">
                          {renderTrendIcon(agentSyncData[1].trend, agentSyncData[1].rate)}
                          {renderSparkline(agentSyncData[1].points)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 ml-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSettingsNode(openSettingsNode === 1 ? null : 1);
                          }}
                          className={`p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-all ${
                            openSettingsNode === 1 ? "text-cyan-400 animate-spin" : ""
                          }`}
                          title="Override operational parameters"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        {hoveredNode === 1 && (
                          <span className="text-[9px] font-mono text-cyan-400 animate-pulse bg-cyan-950/50 px-1 py-0.2 rounded border border-cyan-500/20">
                            {selectedAgentFilter === 1 ? "Click to clear filter" : "Click to filter traces"}
                          </span>
                        )}
                        <span className="text-[9px] font-mono font-bold text-cyan-550 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded">MATCH IQ</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1 gap-2 flex-wrap">
                      <p className={`text-[11px] ${labelClass} select-none leading-tight flex-1`}>Bridges gaps to technical blueprints, outputs citations.</p>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <span className={`text-[9px] font-mono font-bold uppercase px-1 py-0.2 rounded bg-slate-500/5 ${getNodeStatus(1).textClass}`}>{getNodeStatus(1).label}</span>
                        {failedNodes.includes(1) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetryAgent(1);
                            }}
                            disabled={retryingNode === 1}
                            className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500 text-rose-350 hover:text-white rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 shadow-sm shrink-0"
                          >
                            <RefreshCw className={`w-2.5 h-2.5 ${retryingNode === 1 ? "animate-spin" : ""}`} />
                            <span>RETRY SYNC</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline parameters overrides panel */}
                    <AnimatePresence>
                      {openSettingsNode === 1 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-500/20 text-xs space-y-3 bg-black/20 p-2.5 rounded-lg text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-cyan-300">Manager Parameter Override</span>
                            <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-1 py-0.2 rounded font-bold uppercase">System Active</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Execution Mode</label>
                              <select
                                value={agentOverrides[1].mode}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    1: { ...prev[1], mode: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="Adaptive">Adaptive Sync</option>
                                <option value="Aggressive">Aggressive Focus</option>
                                <option value="Passive">Passive Telemetry</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Sync Priority</label>
                              <select
                                value={agentOverrides[1].priority}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    1: { ...prev[1], priority: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                              <span className="uppercase tracking-wider font-sans">Telemetry Heartbeat Override:</span>
                              <span className="font-mono text-cyan-400 font-bold">{agentOverrides[1].latencyLimit}ms</span>
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="500"
                              step="10"
                              value={agentOverrides[1].latencyLimit}
                              onChange={(e) => {
                                setAgentOverrides(prev => ({
                                  ...prev,
                                  1: { ...prev[1], latencyLimit: parseInt(e.target.value) }
                                }));
                              }}
                              className="w-full accent-cyan-500 bg-slate-800 rounded h-1 cursor-pointer"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Non-blocking hover floating info-modal */}
                    <AnimatePresence>
                      {hoveredNode === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-4 right-4 z-[99] mb-3 p-3.5 backdrop-blur-xl bg-slate-90/95 dark:bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_4px_25px_rgba(6,182,212,0.35)] text-left space-y-2 pointer-events-none text-slate-100"
                        >
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                            <span className="font-mono text-[9px] text-cyan-400 font-bold tracking-widest uppercase">Registry ID: {agentSyncData[1].registryId}</span>
                            <span className="font-mono text-[8px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1 rounded animate-pulse">● HEALTH NOMINAL</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Current Node Health</span>
                              <span className="text-slate-100 font-semibold font-mono">{agentSyncData[1].healthy}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Operational Mode</span>
                              <span className="text-slate-100 font-semibold font-mono uppercase text-cyan-300">{agentOverrides[1].mode} Mode</span>
                            </div>
                          </div>
                          <div className="text-[9.5px] bg-white/5 p-1.5 rounded border border-white/5 font-mono text-slate-300">
                            <div className="mb-0.5 text-[8.5px] text-slate-400 uppercase font-sans font-bold">Active Input-Output Pipeline</div>
                            <div className="line-clamp-1"><strong className="text-cyan-400">IN:</strong> {agentSyncData[1].inPipe}</div>
                            <div className="line-clamp-1"><strong className="text-indigo-400">OUT:</strong> {agentSyncData[1].outPipe}</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                )}

                {/* Agent 2 Node */}
                {isNodeFilterActive(2) && (
                  <div 
                    id="topology-node-2" 
                    className="relative flex items-start space-x-3 cursor-pointer select-none"
                    onMouseEnter={() => setHoveredNode(2)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => {
                      setSelectedAgentFilter(selectedAgentFilter === 2 ? null : 2);
                      setActiveTab("visualizer");
                    }}
                  >
                    <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-10 ${
                      activeThinkingNode === 2 ? "bg-amber-500 text-slate-955 border-amber-400 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.5)]" :
                      selectedAgentFilter === 2 ? "bg-cyan-500 text-slate-955 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)] animate-pulse" :
                      simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                    }`}>2</div>
                    <div className={`flex-1 backdrop-blur-sm p-3.5 rounded-xl shadow-md transition-all duration-205 border relative ${
                      activeThinkingNode === 2 || hoveredNode === 2
                        ? "border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)]" :
                      selectedAgentFilter === 2
                        ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/30" :
                      theme === "dark" 
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200" 
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-850"
                    }`}>
                      {activeThinkingNode === 2 && (
                        <motion.div
                          layoutId="activeThinkingGlowVertical"
                          className="absolute inset-0 rounded-xl border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none z-10"
                          transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        />
                      )}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getNodeStatus(2).dotClass}`} />
                        <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className={`text-xs font-bold transition-colors ${
                          activeThinkingNode === 2 || hoveredNode === 2 ? "text-amber-500 font-extrabold" : 
                          selectedAgentFilter === 2 ? "text-cyan-400 font-extrabold animate-pulse" :
                          theme === "dark" ? "text-slate-200" : "text-slate-800"
                        }`}>Study Plan Generator</span>
                        
                        {/* Sparkline & Success Rate */}
                        <div className="flex items-center space-x-1 ml-2 bg-black/10 px-1.5 py-0.5 rounded border border-white/5 shrink-0 scale-95">
                          {renderTrendIcon(agentSyncData[2].trend, agentSyncData[2].rate)}
                          {renderSparkline(agentSyncData[2].points)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 ml-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSettingsNode(openSettingsNode === 2 ? null : 2);
                          }}
                          className={`p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-all ${
                            openSettingsNode === 2 ? "text-cyan-400 animate-spin" : ""
                          }`}
                          title="Override operational parameters"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        {hoveredNode === 2 && (
                          <span className="text-[9px] font-mono text-cyan-400 animate-pulse bg-cyan-950/50 px-1 py-0.2 rounded border border-cyan-500/20">
                            {selectedAgentFilter === 2 ? "Click to clear filter" : "Click to filter traces"}
                          </span>
                        )}
                        <span className="text-[9px] font-mono font-bold text-indigo-550 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">PLANNER-EXEC</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1 gap-2 flex-wrap">
                      <p className={`text-[11px] ${labelClass} select-none leading-tight flex-1`}>Splits macro-level sequencing and daily training actions.</p>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <span className={`text-[9px] font-mono font-bold uppercase px-1 py-0.2 rounded bg-slate-500/5 ${getNodeStatus(2).textClass}`}>{getNodeStatus(2).label}</span>
                        {failedNodes.includes(2) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetryAgent(2);
                            }}
                            disabled={retryingNode === 2}
                            className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500 text-rose-350 hover:text-white rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 shadow-sm shrink-0"
                          >
                            <RefreshCw className={`w-2.5 h-2.5 ${retryingNode === 2 ? "animate-spin" : ""}`} />
                            <span>RETRY SYNC</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline parameters overrides panel */}
                    <AnimatePresence>
                      {openSettingsNode === 2 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-500/20 text-xs space-y-3 bg-black/20 p-2.5 rounded-lg text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-cyan-300">Manager Parameter Override</span>
                            <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-1 py-0.2 rounded font-bold uppercase">System Active</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Execution Mode</label>
                              <select
                                value={agentOverrides[2].mode}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    2: { ...prev[2], mode: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="Adaptive">Adaptive Sync</option>
                                <option value="Aggressive">Aggressive Focus</option>
                                <option value="Passive">Passive Telemetry</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Sync Priority</label>
                              <select
                                value={agentOverrides[2].priority}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    2: { ...prev[2], priority: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                              <span className="uppercase tracking-wider font-sans">Telemetry Heartbeat Override:</span>
                              <span className="font-mono text-cyan-400 font-bold">{agentOverrides[2].latencyLimit}ms</span>
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="500"
                              step="10"
                              value={agentOverrides[2].latencyLimit}
                              onChange={(e) => {
                                setAgentOverrides(prev => ({
                                  ...prev,
                                  2: { ...prev[2], latencyLimit: parseInt(e.target.value) }
                                }));
                              }}
                              className="w-full accent-cyan-500 bg-slate-800 rounded h-1 cursor-pointer"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Non-blocking hover floating info-modal */}
                    <AnimatePresence>
                      {hoveredNode === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-4 right-4 z-[99] mb-3 p-3.5 backdrop-blur-xl bg-slate-90/95 dark:bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_4px_25px_rgba(6,182,212,0.35)] text-left space-y-2 pointer-events-none text-slate-100"
                        >
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                            <span className="font-mono text-[9px] text-cyan-400 font-bold tracking-widest uppercase">Registry ID: {agentSyncData[2].registryId}</span>
                            <span className="font-mono text-[8px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1 rounded animate-pulse">● HEALTH nominal</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Current Node Health</span>
                              <span className="text-slate-100 font-semibold font-mono">{agentSyncData[2].healthy}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Operational Mode</span>
                              <span className="text-slate-100 font-semibold font-mono uppercase text-cyan-300">{agentOverrides[2].mode} Mode</span>
                            </div>
                          </div>
                          <div className="text-[9.5px] bg-white/5 p-1.5 rounded border border-white/5 font-mono text-slate-300">
                            <div className="mb-0.5 text-[8.5px] text-slate-400 uppercase font-sans font-bold">Active Input-Output Pipeline</div>
                            <div className="line-clamp-1"><strong className="text-cyan-400">IN:</strong> {agentSyncData[2].inPipe}</div>
                            <div className="line-clamp-1"><strong className="text-indigo-400">OUT:</strong> {agentSyncData[2].outPipe}</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                )}

                {/* Agent 3 Node */}
                {isNodeFilterActive(3) && (
                  <div 
                    id="topology-node-3" 
                    className="relative flex items-start space-x-3 cursor-pointer select-none"
                    onMouseEnter={() => setHoveredNode(3)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => {
                      setSelectedAgentFilter(selectedAgentFilter === 3 ? null : 3);
                      setActiveTab("visualizer");
                    }}
                  >
                    <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-10 ${
                      activeThinkingNode === 3 ? "bg-amber-500 text-slate-955 border-amber-400 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.5)]" :
                      selectedAgentFilter === 3 ? "bg-cyan-500 text-slate-955 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)] animate-pulse" :
                      simulatedData?.studyTimeline?.mitigationApplied 
                        ? "bg-rose-955/80 text-rose-350 border-rose-500" 
                        : simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                    }`}>3</div>
                    <div className={`flex-1 p-3.5 rounded-xl border transition-all duration-250 shadow-md relative ${
                      activeThinkingNode === 3 || hoveredNode === 3 ? "border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-slate-205" :
                      selectedAgentFilter === 3
                        ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/30 text-slate-200" :
                      simulatedData?.studyTimeline?.mitigationApplied 
                        ? "bg-rose-500/15 border-rose-500/35 shadow-inner" 
                        : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200"
                    }`}>
                      {activeThinkingNode === 3 && (
                        <motion.div
                          layoutId="activeThinkingGlowVertical"
                          className="absolute inset-0 rounded-xl border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none z-10"
                          transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        />
                      )}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getNodeStatus(3).dotClass}`} />
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-455 shrink-0" />
                        <span className={`text-xs font-semibold transition-colors ${
                          activeThinkingNode === 3 || hoveredNode === 3 ? "text-amber-500 font-extrabold animate-pulse" : 
                          selectedAgentFilter === 3 ? "text-cyan-400 font-extrabold" :
                          "text-slate-200"
                        }`}>Engagement Critic Agent</span>
                        
                        {/* Sparkline & Success Rate */}
                        <div className="flex items-center space-x-1 ml-2 bg-black/10 px-1.5 py-0.5 rounded border border-white/5 shrink-0 scale-95">
                          {renderTrendIcon(agentSyncData[3].trend, agentSyncData[3].rate)}
                          {renderSparkline(agentSyncData[3].points)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 ml-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSettingsNode(openSettingsNode === 3 ? null : 3);
                          }}
                          className={`p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-all ${
                            openSettingsNode === 3 ? "text-cyan-400 animate-spin" : ""
                          }`}
                          title="Override operational parameters"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        {hoveredNode === 3 && (
                          <span className="text-[9px] font-mono text-cyan-400 animate-pulse bg-cyan-955/50 px-1 py-0.2 rounded border border-cyan-500/20">
                            {selectedAgentFilter === 3 ? "Click to clear filter" : "Click to filter traces"}
                          </span>
                        )}
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          simulatedData?.studyTimeline?.mitigationApplied
                            ? "text-rose-355 bg-rose-500/20 border border-rose-500/30 font-bold animate-pulse"
                            : "text-slate-350 bg-white/5 border border-white/10"
                        }`}>SELF-REFLECT</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1 gap-2 flex-wrap">
                      <p className="text-[11px] text-slate-400 select-none leading-tight flex-1">Checks Capacity metrics, scales back study matrix by 50% on strain.</p>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <span className={`text-[9px] font-mono font-bold uppercase px-1 py-0.2 rounded bg-slate-500/5 ${getNodeStatus(3).textClass}`}>{getNodeStatus(3).label}</span>
                        {failedNodes.includes(3) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetryAgent(3);
                            }}
                            disabled={retryingNode === 3}
                            className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500 text-rose-350 hover:text-white rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 shadow-sm shrink-0"
                          >
                            <RefreshCw className={`w-2.5 h-2.5 ${retryingNode === 3 ? "animate-spin" : ""}`} />
                            <span>RETRY SYNC</span>
                          </button>
                        )}
                      </div>
                    </div>
                    {simulatedData?.studyTimeline?.mitigationApplied && !loading && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-[10px] text-rose-355 flex items-center space-x-1 animate-pulse"
                      >
                        <AlertTriangle className="w-3 h-3 text-rose-500 inline shrink-0 animate-bounce" />
                        <span>Critic loop triggered! Backlink mitigation active.</span>
                      </motion.div>
                    )}

                    {/* Inline parameters overrides panel */}
                    <AnimatePresence>
                      {openSettingsNode === 3 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-500/20 text-xs space-y-3 bg-black/20 p-2.5 rounded-lg text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-cyan-300">Manager Parameter Override</span>
                            <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-1 py-0.2 rounded font-bold uppercase">System Active</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Execution Mode</label>
                              <select
                                value={agentOverrides[3].mode}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    3: { ...prev[3], mode: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="Adaptive">Adaptive Sync</option>
                                <option value="Aggressive">Aggressive Focus</option>
                                <option value="Passive">Passive Telemetry</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Sync Priority</label>
                              <select
                                value={agentOverrides[3].priority}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    3: { ...prev[3], priority: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                              <span className="uppercase tracking-wider font-sans">Telemetry Heartbeat Override:</span>
                              <span className="font-mono text-cyan-400 font-bold">{agentOverrides[3].latencyLimit}ms</span>
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="500"
                              step="10"
                              value={agentOverrides[3].latencyLimit}
                              onChange={(e) => {
                                setAgentOverrides(prev => ({
                                  ...prev,
                                  3: { ...prev[3], latencyLimit: parseInt(e.target.value) }
                                }));
                              }}
                              className="w-full accent-cyan-500 bg-slate-800 rounded h-1 cursor-pointer"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Non-blocking hover floating info-modal */}
                    <AnimatePresence>
                      {hoveredNode === 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-4 right-4 z-[99] mb-3 p-3.5 backdrop-blur-xl bg-slate-90/95 dark:bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_4px_25px_rgba(6,182,212,0.35)] text-left space-y-2 pointer-events-none text-slate-100"
                        >
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                            <span className="font-mono text-[9px] text-cyan-400 font-bold tracking-widest uppercase">Registry ID: {agentSyncData[3].registryId}</span>
                            <span className="font-mono text-[8px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1 rounded animate-pulse">● HEALTH nominal</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Current Node Health</span>
                              <span className="text-slate-100 font-semibold font-mono">{agentSyncData[3].healthy}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Operational Mode</span>
                              <span className="text-slate-100 font-semibold font-mono uppercase text-cyan-300">{agentOverrides[3].mode} Mode</span>
                            </div>
                          </div>
                          <div className="text-[9.5px] bg-white/5 p-1.5 rounded border border-white/5 font-mono text-slate-300">
                            <div className="mb-0.5 text-[8.5px] text-slate-400 uppercase font-sans font-bold">Active Input-Output Pipeline</div>
                            <div className="line-clamp-1"><strong className="text-cyan-400">IN:</strong> {agentSyncData[3].inPipe}</div>
                            <div className="line-clamp-1"><strong className="text-indigo-400">OUT:</strong> {agentSyncData[3].outPipe}</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                )}

                {/* Agent 4 Node */}
                {isNodeFilterActive(4) && (
                  <div 
                    id="topology-node-4" 
                    className="relative flex items-start space-x-3 cursor-pointer select-none"
                    onMouseEnter={() => setHoveredNode(4)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => {
                      setSelectedAgentFilter(selectedAgentFilter === 4 ? null : 4);
                      setActiveTab("visualizer");
                    }}
                  >
                    <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-10 ${
                      activeThinkingNode === 4 ? "bg-amber-500 text-slate-955 border-amber-400 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.5)]" :
                      selectedAgentFilter === 4 ? "bg-cyan-500 text-slate-955 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)] animate-pulse" :
                      failedNodes.includes(4) ? "bg-rose-950/80 text-rose-350 border-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" :
                      simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                    }`}>4</div>
                    <div className={`flex-1 p-3.5 rounded-xl border transition-all duration-200 shadow-md relative ${
                      activeThinkingNode === 4 || hoveredNode === 4
                        ? "border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-slate-200" :
                      selectedAgentFilter === 4
                        ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/30 text-slate-200" :
                      failedNodes.includes(4) && !loading
                        ? "border-rose-500/35 bg-rose-500/5 text-slate-205" :
                      theme === "dark" 
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200" 
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-850"
                    }`}>
                      {activeThinkingNode === 4 && (
                        <motion.div
                          layoutId="activeThinkingGlowVertical"
                          className="absolute inset-0 rounded-xl border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none z-10"
                          transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        />
                      )}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getNodeStatus(4).dotClass}`} />
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-455 shrink-0" />
                        <span className={`text-xs font-semibold transition-colors ${
                          activeThinkingNode === 4 || hoveredNode === 4 ? "text-amber-500 font-extrabold animate-pulse" : 
                          selectedAgentFilter === 4 ? "text-cyan-400 font-extrabold" :
                          "text-inherit"
                        }`}>Assessment Agent</span>
                        
                        {/* Sparkline & Success Rate */}
                        <div className="flex items-center space-x-1 ml-2 bg-black/10 px-1.5 py-0.5 rounded border border-white/5 shrink-0 scale-95">
                          {renderTrendIcon(agentSyncData[4].trend, agentSyncData[4].rate)}
                          {renderSparkline(agentSyncData[4].points)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 ml-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSettingsNode(openSettingsNode === 4 ? null : 4);
                          }}
                          className={`p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-all ${
                            openSettingsNode === 4 ? "text-cyan-400 animate-spin" : ""
                          }`}
                          title="Override operational parameters"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        {hoveredNode === 4 && (
                          <span className="text-[9px] font-mono text-cyan-400 animate-pulse bg-cyan-950/50 px-1 py-0.2 rounded border border-cyan-500/20">
                            {selectedAgentFilter === 4 ? "Click to clear filter" : "Click to filter traces"}
                          </span>
                        )}
                        <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded font-bold">VERIFIER</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1 gap-2 flex-wrap">
                      <p className="text-[11px] text-slate-400 select-none leading-tight flex-1">Autonomously drafts exams and validates correctness securely.</p>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <span className={`text-[9px] font-mono font-bold uppercase px-1 py-0.2 rounded bg-slate-500/5 ${getNodeStatus(4).textClass}`}>{getNodeStatus(4).label}</span>
                        {failedNodes.includes(4) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetryAgent(4);
                            }}
                            disabled={retryingNode === 4}
                            className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/20 border border-rose-500/45 hover:bg-rose-500/30 text-rose-300 hover:text-white rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 shadow-sm shrink-0 animate-bounce"
                            title="Click to resolve and sync agent manually"
                          >
                            <RefreshCw className={`w-2 h-2.5 ${retryingNode === 4 ? "animate-spin" : ""}`} />
                            <span>RETRY SYNC</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline parameters overrides panel */}
                    <AnimatePresence>
                      {openSettingsNode === 4 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-500/20 text-xs space-y-3 bg-black/20 p-2.5 rounded-lg text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-cyan-300">Manager Parameter Override</span>
                            <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-1 py-0.2 rounded font-bold uppercase">System Active</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Execution Mode</label>
                              <select
                                value={agentOverrides[4].mode}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    4: { ...prev[4], mode: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="Adaptive">Adaptive Sync</option>
                                <option value="Aggressive">Aggressive Focus</option>
                                <option value="Passive">Passive Telemetry</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Sync Priority</label>
                              <select
                                value={agentOverrides[4].priority}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    4: { ...prev[4], priority: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                              <span className="uppercase tracking-wider font-sans">Telemetry Heartbeat Override:</span>
                              <span className="font-mono text-cyan-400 font-bold">{agentOverrides[4].latencyLimit}ms</span>
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="500"
                              step="10"
                              value={agentOverrides[4].latencyLimit}
                              onChange={(e) => {
                                setAgentOverrides(prev => ({
                                  ...prev,
                                  4: { ...prev[4], latencyLimit: parseInt(e.target.value) }
                                }));
                              }}
                              className="w-full accent-cyan-500 bg-slate-800 rounded h-1 cursor-pointer"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Non-blocking hover floating info-modal */}
                    <AnimatePresence>
                      {hoveredNode === 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-4 right-4 z-[99] mb-3 p-3.5 backdrop-blur-xl bg-slate-90/95 dark:bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_4px_25px_rgba(6,182,212,0.35)] text-left space-y-2 pointer-events-none text-slate-100"
                        >
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                            <span className="font-mono text-[9px] text-cyan-400 font-bold tracking-widest uppercase">Registry ID: {agentSyncData[4].registryId}</span>
                            <span className="font-mono text-[8px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1 rounded animate-pulse">● HEALTH nominal</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Current Node Health</span>
                              <span className="text-slate-100 font-semibold font-mono">{agentSyncData[4].healthy}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Operational Mode</span>
                              <span className="text-slate-100 font-semibold font-mono uppercase text-cyan-300">{agentOverrides[4].mode} Mode</span>
                            </div>
                          </div>
                          <div className="text-[9.5px] bg-white/5 p-1.5 rounded border border-white/5 font-mono text-slate-300">
                            <div className="mb-0.5 text-[8.5px] text-slate-400 uppercase font-sans font-bold">Active Input-Output Pipeline</div>
                            <div className="line-clamp-1"><strong className="text-cyan-400">IN:</strong> {agentSyncData[4].inPipe}</div>
                            <div className="line-clamp-1"><strong className="text-indigo-400">OUT:</strong> {agentSyncData[4].outPipe}</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                )}

                {/* Agent 5 Node */}
                {isNodeFilterActive(5) && (
                  <div 
                    id="topology-node-5" 
                    className="relative flex items-start space-x-3 cursor-pointer select-none"
                    onMouseEnter={() => setHoveredNode(5)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => {
                      setSelectedAgentFilter(selectedAgentFilter === 5 ? null : 5);
                      setActiveTab("visualizer");
                    }}
                  >
                    <div className={`absolute -left-5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-10 ${
                      activeThinkingNode === 5 ? "bg-amber-500 text-slate-955 border-amber-400 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.5)]" :
                      selectedAgentFilter === 5 ? "bg-cyan-500 text-slate-955 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)] animate-pulse" :
                      simulatedData ? "bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-white/5 border-white/10 text-slate-500"
                    }`}>5</div>
                    <div className={`flex-1 p-3.5 rounded-xl border transition-all duration-200 shadow-md relative ${
                      activeThinkingNode === 5 || hoveredNode === 5
                        ? "border-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-slate-205 animate-none" :
                      selectedAgentFilter === 5
                        ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/30 text-slate-200" :
                      theme === "dark" 
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200" 
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-850"
                    }`}>
                      {activeThinkingNode === 5 && (
                        <motion.div
                          layoutId="activeThinkingGlowVertical"
                          className="absolute inset-0 rounded-xl border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] pointer-events-none z-10"
                          transition={{ type: "spring", stiffness: 180, damping: 20 }}
                        />
                      )}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getNodeStatus(5).dotClass}`} />
                        <Users className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                        <span className={`text-xs font-bold transition-colors ${
                          activeThinkingNode === 5 || hoveredNode === 5 ? "text-amber-500 font-extrabold" : 
                          selectedAgentFilter === 5 ? "text-cyan-400 font-extrabold" :
                          theme === "dark" ? "text-slate-200" : "text-slate-800"
                        }`}>Manager Insights Agent</span>
                        
                        {/* Sparkline & Success Rate */}
                        <div className="flex items-center space-x-1 ml-2 bg-black/10 px-1.5 py-0.5 rounded border border-white/5 shrink-0 scale-95">
                          {renderTrendIcon(agentSyncData[5].trend, agentSyncData[5].rate)}
                          {renderSparkline(agentSyncData[5].points)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 ml-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSettingsNode(openSettingsNode === 5 ? null : 5);
                          }}
                          className={`p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-all ${
                            openSettingsNode === 5 ? "text-cyan-400 animate-spin" : ""
                          }`}
                          title="Override operational parameters"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        {hoveredNode === 5 && (
                          <span className="text-[9px] font-mono text-cyan-400 animate-pulse bg-cyan-950/50 px-1 py-0.2 rounded border border-cyan-500/20">
                            {selectedAgentFilter === 5 ? "Click to clear filter" : "Click to filter traces"}
                          </span>
                        )}
                        <span className="text-[9px] font-mono font-bold text-indigo-405 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">ANONYMOUS</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1 gap-2 flex-wrap">
                      <p className={`text-[11px] ${labelClass} select-none leading-tight flex-1`}>Analyzes team progress while completely stripping all employee PII.</p>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <span className={`text-[9px] font-mono font-bold uppercase px-1 py-0.2 rounded bg-slate-500/5 ${getNodeStatus(5).textClass}`}>{getNodeStatus(5).label}</span>
                        {failedNodes.includes(5) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRetryAgent(5);
                            }}
                            disabled={retryingNode === 5}
                            className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500 text-rose-350 hover:text-white rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 shadow-sm shrink-0"
                          >
                            <RefreshCw className={`w-2.5 h-2.5 ${retryingNode === 5 ? "animate-spin" : ""}`} />
                            <span>RETRY SYNC</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline parameters overrides panel */}
                    <AnimatePresence>
                      {openSettingsNode === 5 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-500/20 text-xs space-y-3 bg-black/20 p-2.5 rounded-lg text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-cyan-300">Manager Parameter Override</span>
                            <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-1 py-0.2 rounded font-bold uppercase">System Active</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Execution Mode</label>
                              <select
                                value={agentOverrides[5].mode}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    5: { ...prev[5], mode: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="Adaptive">Adaptive Sync</option>
                                <option value="Aggressive">Aggressive Focus</option>
                                <option value="Passive">Passive Telemetry</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">Sync Priority</label>
                              <select
                                value={agentOverrides[5].priority}
                                onChange={(e) => {
                                  setAgentOverrides(prev => ({
                                    ...prev,
                                    5: { ...prev[5], priority: e.target.value as any }
                                  }));
                                }}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-[11px] font-mono text-slate-205 focus:outline-none focus:border-cyan-500"
                              >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                              <span className="uppercase tracking-wider font-sans">Telemetry Heartbeat Override:</span>
                              <span className="font-mono text-cyan-400 font-bold">{agentOverrides[5].latencyLimit}ms</span>
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="500"
                              step="10"
                              value={agentOverrides[5].latencyLimit}
                              onChange={(e) => {
                                setAgentOverrides(prev => ({
                                  ...prev,
                                  5: { ...prev[5], latencyLimit: parseInt(e.target.value) }
                                }));
                              }}
                              className="w-full accent-cyan-500 bg-slate-800 rounded h-1 cursor-pointer"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Non-blocking hover floating info-modal */}
                    <AnimatePresence>
                      {hoveredNode === 5 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-4 right-4 z-[99] mb-3 p-3.5 backdrop-blur-xl bg-slate-90/95 dark:bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_4px_25px_rgba(6,182,212,0.35)] text-left space-y-2 pointer-events-none text-slate-100"
                        >
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                            <span className="font-mono text-[9px] text-cyan-400 font-bold tracking-widest uppercase">Registry ID: {agentSyncData[5].registryId}</span>
                            <span className="font-mono text-[8px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1 rounded animate-pulse">● HEALTH nominal</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Current Node Health</span>
                              <span className="text-slate-100 font-semibold font-mono">{agentSyncData[5].healthy}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-sans text-[8.5px] block font-medium uppercase tracking-wider">Operational Mode</span>
                              <span className="text-slate-100 font-semibold font-mono uppercase text-cyan-300">{agentOverrides[5].mode} Mode</span>
                            </div>
                          </div>
                          <div className="text-[9.5px] bg-white/5 p-1.5 rounded border border-white/5 font-mono text-slate-300">
                            <div className="mb-0.5 text-[8.5px] text-slate-400 uppercase font-sans font-bold">Active Input-Output Pipeline</div>
                            <div className="line-clamp-1"><strong className="text-cyan-400">IN:</strong> {agentSyncData[5].inPipe}</div>
                            <div className="line-clamp-1"><strong className="text-indigo-400">OUT:</strong> {agentSyncData[5].outPipe}</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                )}
              </div>
            )}
          </div>

        </section>

        {/* Right Column - Results Display Workspace (8 cols) */}
        <section className="lg:col-span-8 flex flex-col space-y-6">
          
          {/* Navigation Tab Bar */}
          <div className={`flex flex-wrap items-center gap-1.5 backdrop-blur-md rounded-2xl p-1.5 self-start shadow-xl border ${
            theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
          }`}>
            <button
              id="tab-visualizer"
              onClick={() => setActiveTab("visualizer")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                activeTab === "visualizer" 
                  ? theme === "dark"
                    ? "bg-white/10 text-white shadow-md border border-white/10 backdrop-blur-sm" 
                    : "bg-slate-100 text-slate-900 shadow border border-slate-200"
                  : theme === "dark"
                    ? "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    : "text-slate-605 hover:text-slate-850 hover:bg-slate-50"
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-500" />
              <span>Engine Visualizer</span>
            </button>
            <button
              id="tab-terminal"
              onClick={() => setActiveTab("terminal")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                activeTab === "terminal" 
                  ? theme === "dark"
                    ? "bg-white/10 text-white shadow-md border border-white/10 backdrop-blur-sm" 
                    : "bg-slate-100 text-slate-900 shadow border border-slate-200"
                  : theme === "dark"
                    ? "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    : "text-slate-605 hover:text-slate-850 hover:bg-slate-50"
              }`}
            >
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span>Production stdout Logs</span>
            </button>
            <button
              id="tab-code"
              onClick={() => setActiveTab("code")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                activeTab === "code" 
                  ? theme === "dark"
                    ? "bg-white/10 text-white shadow-md border border-white/10 backdrop-blur-sm" 
                    : "bg-slate-100 text-slate-900 shadow border border-slate-200"
                  : theme === "dark"
                    ? "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    : "text-slate-605 hover:text-slate-850 hover:bg-slate-50"
              }`}
            >
              <Code className="w-4 h-4 text-cyan-500" />
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
                  
                  {/* Real-time Agent Reasoning Transitions Overlay Log */}
                  <div id="agent-thinking-logs-overlay" className={`p-4 rounded-2xl border transition-all duration-300 relative ${
                    theme === "dark" 
                      ? "bg-slate-950/70 backdrop-blur-md border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]" 
                      : "bg-slate-100/90 backdrop-blur-md border-slate-300 shadow-md"
                  }`}>
                    <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-3">
                      <div className="flex items-center space-x-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-455 animate-pulse" />
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-205" : "text-slate-805"}`}>Live OrbitIQ Agent Reasoning Monitor</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="flex h-2 w-2 relative">
                          <span className={`${loading ? "animate-ping bg-amber-400" : "bg-emerald-500"} absolute inline-flex h-full w-full rounded-full opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${loading ? "bg-amber-500" : "bg-emerald-500"}`}></span>
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 uppercase select-none">{loading ? "Simulating Transitions..." : "System Idle"}</span>
                      </div>
                    </div>

                    <div className="font-mono text-[10.5px] space-y-1.5 h-[110px] overflow-y-auto scrollbar-thin select-text">
                      {loading ? (
                        <>
                          <div className="text-slate-500">▶ T-0: Multi-Agent Engine Sandbox Started...</div>
                          {activeThinkingNode >= 1 && (
                            <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-cyan-400">
                              🧠 [Curator Node 1] Reading and matches {employeeId}'s profile details & team skill gaps...
                            </motion.div>
                          )}
                          {activeThinkingNode >= 2 && (
                            <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-indigo-400">
                              📅 [Planner Node 2] Generating micro-task calendar vectors for certification blueprint coverages...
                            </motion.div>
                          )}
                          {activeThinkingNode >= 3 && (
                            <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className={meetingHours > 20 ? "text-rose-455 font-semibold" : "text-emerald-455"}>
                              🛡️ [Critic Node 3] Auditor analyzing workload stress: meeting rate is {meetingHours} hrs/week. {meetingHours > 20 ? "ALERT: Capacity threshold bypassed! Implementing 50% scale-down overrides!" : "NOMINAL: Workload constraints normal."}
                            </motion.div>
                          )}
                          {activeThinkingNode >= 4 && (
                            <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-cyan-301">
                              🧪 [Verifier Node 4] Assembling exam questions with matched blueprint documentation citation proofs...
                            </motion.div>
                          )}
                          {activeThinkingNode >= 5 && (
                            <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-pink-400 animate-pulse">
                              📊 [Insights Node 5] Stripping PII. Bundling team reports into anonymized Executive manager indicators...
                            </motion.div>
                          )}
                        </>
                      ) : (
                        <div className="space-y-1 text-left">
                          <div className="text-emerald-500 flex items-center space-x-1">
                            <span>✔ multi_agent_simulation_run COMPLETE. State converged.</span>
                          </div>
                          <div className="text-slate-400">⚡ State Graph converged successfully. Applied stress profile: <span className="text-amber-400 font-bold">{stressProfile}</span></div>
                          <div className="text-slate-400">📉 Engagement Critic overrides: <span className={simulatedData.studyTimeline.mitigationApplied ? "text-rose-455 font-black animate-pulse" : "text-emerald-500 font-bold"}>{simulatedData.studyTimeline.mitigationApplied ? "ACTIVE (50% scale-down)" : "INACTIVE (Fully allocated)"}</span></div>
                          <div className="text-slate-400">🔍 Curriculum Blueprints mapped successfully for target exam: <span className="text-cyan-400 font-mono underline">{simulatedData.fabricIq.recommendedCert}</span></div>
                        </div>
                      )}
                    </div>
                  </div>

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
                    <div 
                      id="work-telemetry-card" 
                      className={`${
                        isPrintMode 
                          ? "bg-white border-2 border-slate-900 text-slate-950 shadow-md" 
                          : cardBgClass
                      } backdrop-blur-md rounded-2xl p-5 relative overflow-hidden transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 flex-wrap gap-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className={`w-4 h-4 ${isPrintMode ? "text-slate-900" : theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`} />
                          <h4 className={`text-xs font-semibold uppercase tracking-wider ${isPrintMode ? "text-slate-900" : theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>WorkIQ: Live Telemetry Sensors</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {/* Print Mode Preview Toggle */}
                          <button
                            id="btn-toggle-print-mode"
                            onClick={() => setIsPrintMode(!isPrintMode)}
                            className={`px-2 py-0.5 text-[9px] font-bold rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 border ${
                              isPrintMode 
                                ? "bg-slate-900 border-slate-905 text-white" 
                                : theme === "dark"
                                  ? "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                                  : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-250"
                            }`}
                            title="Simulate monochrome physical print styles directly in the dashboard"
                          >
                            <FileText className="w-2.5 h-2.5" />
                            <span>{isPrintMode ? "Print Style On" : "Print Preview"}</span>
                          </button>

                          {/* Period-over-Period Compare Toggle */}
                          <button
                            id="btn-toggle-compare-historical"
                            onClick={() => setCompareHistorical(!compareHistorical)}
                            className={`px-2 py-0.5 text-[9px] font-bold rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 border ${
                              compareHistorical 
                                ? "bg-amber-500/20 border-amber-500/50 text-amber-300" 
                                : theme === "dark"
                                  ? "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                                  : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                            }`}
                            title="Overlay unmitigated previous month cycle baseline telemetry"
                          >
                            <Layers className="w-2.5 h-2.5" />
                            <span>{compareHistorical ? "Compare On" : "Compare"}</span>
                          </button>

                          {/* Fullscreen Expand Button */}
                          <button
                            id="btn-expand-telemetry-view"
                            onClick={() => setIsTelemetryExpanded(true)}
                            className={`px-2 py-0.5 text-[9px] font-bold rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 border ${
                              theme === "dark"
                                ? "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                            }`}
                            title="Open granular high-fidelity period inspection viewer"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            <span>Expand</span>
                          </button>

                          {/* Share Report Button */}
                          <button
                            id="btn-share-telemetry"
                            onClick={() => {
                              setShowShareModal(true);
                              setShareCopied(false);
                            }}
                            className={`px-2 py-0.5 text-[9px] font-bold rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 border ${
                              theme === "dark"
                                ? "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                            }`}
                            title="Get a shareable snapshot link for this workload trajectory"
                          >
                            <Share2 className="w-2.5 h-2.5" />
                            <span>Share</span>
                          </button>

                          {/* Download CSV */}
                          <button
                            id="btn-download-telemetry-csv"
                            onClick={handleDownloadWorkIQCsv}
                            disabled={isExportingCsv}
                            className={`px-2 py-0.5 text-[9px] font-bold text-white rounded flex items-center space-x-1 cursor-pointer transition-all active:scale-95 shadow ${
                              isExportingCsv ? "bg-cyan-700 cursor-not-allowed opacity-80" : "bg-cyan-600 hover:bg-cyan-550"
                            }`}
                            title="Export raw workload telemetry to Microsoft Excel, Google Sheets, or any CSV reader"
                          >
                            {isExportingCsv ? (
                              <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                            ) : (
                              <Download className="w-2.5 h-2.5" />
                            )}
                            <span>{isExportingCsv ? "Exporting..." : "CSV"}</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className={labelClass}>Simulated Reporting ISO Week</span>
                          <span className={`font-mono ${valueClass}`}>{simulatedData.telemetryIq.reportingWeek}</span>
                        </div>

                        {/* Meeting Meter bar */}
                        <div>
                          <div className="flex justify-between items-center text-xs mb-1.5">
                            <span className={labelClass}>Meeting Hours Threshold</span>
                            <div className="flex items-center space-x-1.5">
                              <span className={`font-mono text-xs ${meetingHours > 20 ? "text-rose-455 font-bold" : "text-emerald-405 font-semibold"}`}>
                                {meetingHours}h / 40h workweek
                              </span>
                              
                              {/* Dynamic Trend Indicator relative to previous simulated state */}
                              <span className="flex items-center shrink-0 select-none">
                                {meetingHours > prevMeetingHours && (
                                  <span className="inline-flex items-center text-rose-400 font-bold text-[10px]" title={`Increasing pressure: +${(meetingHours - prevMeetingHours).toFixed(1)}h higher than previous configuration (${prevMeetingHours}h)`}>
                                    <TrendingUp className="w-3 h-3 mr-0.5 text-rose-500 animate-pulse" />
                                    <span>+{(meetingHours - prevMeetingHours).toFixed(1)}h</span>
                                  </span>
                                )}
                                {meetingHours < prevMeetingHours && (
                                  <span className="inline-flex items-center text-emerald-400 font-bold text-[10px]" title={`Decreased pressure: ${(prevMeetingHours - meetingHours).toFixed(1)}h lower than previous configuration (${prevMeetingHours}h)`}>
                                    <TrendingDown className="w-3 h-3 mr-0.5 text-emerald-500" />
                                    <span>-${(prevMeetingHours - meetingHours).toFixed(1)}h</span>
                                  </span>
                                )}
                                {meetingHours === prevMeetingHours && (
                                  <span className="inline-flex items-center text-slate-400 text-[10px]" title="Workload is stable relative to last simulated load state">
                                    <Minus className="w-3 h-3 mr-0.5" />
                                    <span>Stable</span>
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                          <div className={`w-full rounded-full h-2 overflow-hidden border ${theme === "dark" ? "bg-black/30 border-white/10" : "bg-slate-200 border-slate-300"}`}>
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${meetingHours > 20 ? "bg-rose-500" : "bg-emerald-500"}`} 
                              style={{ width: `${(meetingHours / 40) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Capacity Stats */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className={`p-2.5 rounded-xl border ${theme === "dark" ? "bg-black/20 border-white/10" : "bg-slate-50 border-slate-200"}`}>
                            <span className="text-[10px] text-slate-500 uppercase font-mono block">Deep Work Focus</span>
                            <span className={`text-lg font-mono font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>{simulatedData.telemetryIq.deepWorkHours} hrs</span>
                          </div>
                          <div className={`p-2.5 rounded-xl border ${theme === "dark" ? "bg-black/20 border-white/10" : "bg-slate-50 border-slate-200"}`}>
                            <span className="text-[10px] text-slate-500 uppercase font-mono block">Deploy Windows</span>
                            <span className={`text-xs font-bold leading-6 ${prodDeploy ? "text-rose-505 font-bold animate-pulse" : "text-slate-505"}`}>
                              {prodDeploy ? "CRITICAL ON-CALL" : "NONE ACTIVE"}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between text-xs pt-1 border-b border-black/5 pb-2.5">
                          <span className={labelClass}>Assigned Incident Counter</span>
                          <span className={`font-mono ${prodDeploy ? "text-rose-505 font-black" : theme === "dark" ? "text-slate-400 font-semibold" : "text-slate-600 font-semibold"}`}>
                            {simulatedData.telemetryIq.averageIncidentCount} Open Tickets
                          </span>
                        </div>

                        {/* Date Custom Range Selector */}
                        <div className="flex justify-between items-center text-xs py-2 border-b border-black/5">
                          <span className={labelClass}>Workspace Analytics Window</span>
                          <div className="flex items-center bg-black/15 dark:bg-black/45 p-0.5 rounded-lg border border-white/5 shadow-inner">
                            {(["4weeks", "60days", "90days"] as const).map((r) => (
                              <button
                                key={r}
                                onClick={() => setTimeWindow(r)}
                                className={`px-2 py-0.5 text-[8.5px] font-bold rounded-md font-mono uppercase transition-all duration-150 cursor-pointer ${
                                  timeWindow === r
                                    ? "bg-cyan-500 text-slate-950 font-black shadow"
                                    : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                {r === "4weeks" ? "4 Weeks" : r === "60days" ? "60 Days" : "90 Days"}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Recharts Bar Chart: Weekly Meeting vs. Deep Work Dynamic Balance */}
                        <div className="pt-2">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[11px] font-bold uppercase text-indigo-405 flex items-center gap-1.5">
                              {timeWindow === "4weeks" ? "4-Week" : timeWindow === "60days" ? "60-Day" : "90-Day"} Balance Telemetry
                              {rechartData4Weeks.some(w => w["Meeting Hours"] > 20) && (
                                <span className="bg-rose-500/10 text-rose-405 border border-rose-500/20 text-[8.5px] px-1 py-0.1 rounded uppercase animate-pulse select-none" title="Anomalous meeting coordinate loads detected (>20h threshold)">
                                  Anomaly Detected
                                </span>
                              )}
                            </span>
                            <div className="flex items-center space-x-2 text-[9px] font-mono select-none">
                              <span 
                                className={`flex items-center space-x-1 cursor-pointer transition-all duration-200 px-1 py-0.5 rounded ${
                                  hoveredLegendSeries === "Meeting" 
                                    ? "bg-cyan-500/10 scale-105" 
                                    : hoveredLegendSeries && hoveredLegendSeries !== "Meeting" 
                                      ? "opacity-40" 
                                      : "hover:bg-slate-500/10 hover:scale-105"
                                }`}
                                onMouseEnter={() => setHoveredLegendSeries("Meeting")}
                                onMouseLeave={() => setHoveredLegendSeries(null)}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                                <span className={`${labelClass} font-semibold`}>Meeting</span>
                              </span>
                              <span 
                                className={`flex items-center space-x-1 cursor-pointer transition-all duration-200 px-1 py-0.5 rounded ${
                                  hoveredLegendSeries === "Deep Work" 
                                    ? "bg-emerald-500/10 scale-105" 
                                    : hoveredLegendSeries && hoveredLegendSeries !== "Deep Work" 
                                      ? "opacity-40" 
                                      : "hover:bg-slate-500/10 hover:scale-105"
                                }`}
                                onMouseEnter={() => setHoveredLegendSeries("Deep Work")}
                                onMouseLeave={() => setHoveredLegendSeries(null)}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-405 inline-block" />
                                <span className={`${labelClass} font-semibold`}>Deep Work</span>
                              </span>
                            </div>
                          </div>
                          
                          <motion.div 
                            key={`chart_reveal_${simulatedData.telemetryIq.reportingWeek}_${meetingHours}_${prodDeploy}_${compareHistorical}_${timeWindow}_${isPrintMode}`}
                            initial={{ opacity: 0, scale: 0.98, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className={`h-[140px] w-full rounded-xl p-2 relative ${
                              isPrintMode 
                                ? "bg-slate-100 border-2 border-slate-900 text-slate-950 font-bold" 
                                : theme === "dark" 
                                  ? "bg-black/25 border border-white/5" 
                                  : "bg-slate-50 border border-slate-200"
                            }`}
                          >
                            {isPrintMode && (
                              <div className="absolute top-1.5 right-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-1.5 py-0.5 text-[8px] font-mono font-black border border-current rounded uppercase tracking-wider select-none z-20 shadow-[0_2px_4px_rgba(0,0,0,0.15)] opacity-95">
                                📊 REPORT MODE ACTIVE
                              </div>
                            )}
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={rechartData4Weeks} margin={{ top: 5, right: 5, left: -28, bottom: -5 }}>
                                <defs>
                                  <filter id="anomaly-glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                                    <feColorMatrix type="matrix" values="1 0 0 0 1  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                  </filter>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={isPrintMode ? "#cbd5e1" : theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"} />
                                <XAxis 
                                  dataKey="week" 
                                  tick={{ fill: isPrintMode ? "#000000" : (theme === "dark" ? "#94a3b8" : "#475569"), fontSize: 9, fontWeight: isPrintMode ? 700 : 500 }} 
                                  axisLine={isPrintMode ? { stroke: "#000000", strokeWidth: 1.5 } : false} 
                                  tickLine={isPrintMode ? { stroke: "#000000" } : false} 
                                />
                                <YAxis 
                                  tick={{ fill: isPrintMode ? "#000000" : (theme === "dark" ? "#94a3b8" : "#475569"), fontSize: 9, fontWeight: isPrintMode ? 700 : 500 }} 
                                  axisLine={isPrintMode ? { stroke: "#000000", strokeWidth: 1.5 } : false} 
                                  tickLine={isPrintMode ? { stroke: "#000000" } : false} 
                                />
                                <Tooltip 
                                  cursor={{ fill: "transparent" }}
                                  content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className={`p-2.5 rounded-lg border text-[10px] font-mono shadow-xl ${
                                          isPrintMode 
                                            ? "bg-white border-2 border-slate-900 text-slate-950"
                                            : theme === "dark" 
                                              ? "bg-slate-900 border-white/10 text-slate-100" 
                                              : "bg-white border-slate-200 text-slate-900"
                                        }`}>
                                          <p className="font-bold border-b border-black/10 pb-0.5 mb-1 text-inherit">{label}</p>
                                          <p className={isPrintMode ? "text-slate-900 font-bold" : "text-cyan-400"}>Meeting: {payload[0]?.value}h</p>
                                          <p className={isPrintMode ? "text-slate-600 font-semibold" : "text-emerald-400"}>Deep Work: {payload[1]?.value}h</p>
                                          {payload.length > 2 && (
                                            <>
                                              <p className="text-amber-600 border-t border-black/10 mt-1 pt-0.5">Hist. Meeting: {payload[2]?.value}h</p>
                                              <p className="text-green-700">Hist. Deep Work: {payload[3]?.value}h</p>
                                            </>
                                          )}
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                                
                                {/* Meetings Bar Series with Anomaly Glow and High-Fidelity highlight */}
                                <Bar 
                                  dataKey="Meeting Hours" 
                                  radius={[3, 3, 0, 0]} 
                                  isAnimationActive={true} 
                                  animationDuration={950}
                                  opacity={hoveredLegendSeries === "Deep Work" ? 0.2 : 1}
                                >
                                  {rechartData4Weeks.map((entry, index) => {
                                    const isAnomaly = entry["Meeting Hours"] > 20;
                                    const baseColor = isPrintMode 
                                      ? "#000000" 
                                      : (theme === "dark" ? "#22d3ee" : "#0284c7");
                                    const anomalyColor = isPrintMode ? "#000000" : "#f43f5e";
                                    return (
                                      <Cell 
                                        key={`cell-meet-${index}`} 
                                        fill={isAnomaly ? anomalyColor : baseColor}
                                        filter={isAnomaly && !isPrintMode ? "url(#anomaly-glow)" : undefined}
                                        className={isAnomaly && !isPrintMode ? "animate-pulse" : ""}
                                      />
                                    );
                                  })}
                                </Bar>
                                
                                <Bar 
                                  dataKey="Deep Work Hours" 
                                  fill={isPrintMode ? "#64748b" : (theme === "dark" ? "#10b981" : "#16a34a")} 
                                  radius={[3, 3, 0, 0]} 
                                  isAnimationActive={true} 
                                  animationDuration={950}
                                  opacity={hoveredLegendSeries === "Meeting" ? 0.2 : 1}
                                />
                                
                                {/* Historical Data Overlay */}
                                {compareHistorical && (
                                  <>
                                    <Bar 
                                      dataKey="Hist. Meeting" 
                                      fill={theme === "dark" ? "#1e293b" : "#f1f5f9"} 
                                      stroke={theme === "dark" ? "#06b6d4" : "#0284c7"} 
                                      strokeWidth={1} 
                                      strokeDasharray="3 3" 
                                      radius={[3, 3, 0, 0]} 
                                      opacity={hoveredLegendSeries === "Deep Work" ? 0.2 : 1}
                                    />
                                    <Bar 
                                      dataKey="Hist. Deep Work" 
                                      fill={theme === "dark" ? "#0f172a" : "#f0fdf4"} 
                                      stroke={theme === "dark" ? "#10b981" : "#16a34a"} 
                                      strokeWidth={1} 
                                      strokeDasharray="3 3" 
                                      radius={[3, 3, 0, 0]} 
                                      opacity={hoveredLegendSeries === "Meeting" ? 0.2 : 1}
                                    />
                                  </>
                                )}
                              </BarChart>
                            </ResponsiveContainer>
                          </motion.div>

                          {/* Non-Technical Manager Legend & Tooltip Guidance */}
                          <div className={`mt-3 p-2.5 rounded-xl border text-[10px] leading-relaxed flex items-start space-x-2 transition-all ${
                            theme === "dark" 
                              ? "bg-indigo-500/5 border-indigo-500/10 text-slate-400" 
                              : "bg-indigo-50/50 border-indigo-100 text-slate-650"
                          }`}>
                            <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-indigo-400 font-sans">Manager Playbook Guide: </span>
                              The bars represent cognitive block distribution. 
                              <span className="text-cyan-400 font-semibold font-mono"> Meeting (Cyan)</span> represents real-time coordination cost, while 
                              <span className="text-emerald-400 font-semibold font-mono"> Deep Work (Green)</span> is focus allocated for curriculum upskilling.
                              {rechartData4Weeks.some(w => w["Meeting Hours"] > 20) && (
                                <p className="mt-1 text-[#f43f5e] font-extrabold font-mono">
                                  ⚠️ Red-glowing bars highlight anomalous weeks exceeding 20h of meetings!
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Interactive Dynamic Study Timeline View */}
                  <div id="study-timeline-card" className={`${cardBgClass} backdrop-blur-md rounded-2xl p-5 relative overflow-hidden transition-colors duration-300`}>
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between pb-4 border-b border-white/10 mb-5 font-sans gap-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-cyan-400" />
                          <h4 className={`text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>Generated Capacity-Aware Study Plan</h4>
                        </div>
                        <p className={`text-[11px] ${labelClass} mt-1 select-none`}>Weekly and Day-by-Day training program built with subchannel dependencies</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-2 xl:mt-0">
                        {/* Selector Switch for List vs Calendar */}
                        <div className={`p-0.5 rounded-lg border flex items-center ${
                          theme === "dark" ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
                        }`}>
                          <button
                            id="btn-view-mode-list"
                            onClick={() => setTimelineViewMode("list")}
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
                              timelineViewMode === "list"
                                ? "bg-cyan-550 text-slate-950 font-bold shadow-sm"
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <List className="w-3 h-3" />
                            <span>List</span>
                          </button>
                          <button
                            id="btn-view-mode-calendar"
                            onClick={() => setTimelineViewMode("calendar")}
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
                              timelineViewMode === "calendar"
                                ? "bg-cyan-550 text-slate-950 font-bold shadow-sm"
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Calendar</span>
                          </button>
                        </div>

                        {/* Week tabs list */}
                        <div className="flex items-center space-x-1">
                          {simulatedData.studyTimeline.weeks.map((week) => (
                            <button
                              id={`week-tab-btn-${week.weekNumber}`}
                              key={week.weekNumber}
                              onClick={() => setInspectWeek(week.weekNumber)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                                inspectWeek === week.weekNumber
                                  ? "bg-cyan-505 text-slate-95 /deep/ bg-cyan-500 text-slate-950 font-bold shadow-md"
                                  : theme === "dark"
                                    ? "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                                    : "bg-slate-100 border border-slate-250 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              Week {week.weekNumber}
                            </button>
                          ))}
                        </div>

                        {/* Quick Reset baseline button */}
                        <button
                          id="btn-timeline-quick-reset"
                          onClick={handleQuickReset}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center space-x-1 ${
                            theme === "dark"
                              ? "bg-rose-500/10 border border-rose-500/25 text-rose-455 hover:bg-rose-500/20 hover:text-rose-350"
                              : "bg-rose-50 border border-rose-250 text-rose-700 hover:bg-rose-100"
                          }`}
                          title="Restore schedule to standard baseline plan"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Quick Reset</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Inspected Week Details with Slide-Fade Animations */}
                    <div className="relative">
                      <AnimatePresence mode="wait">
                        {simulatedData.studyTimeline.weeks
                          .filter((w) => w.weekNumber === inspectWeek)
                          .map((week) => (
                            <motion.div
                              key={week.weekNumber}
                              initial={{ opacity: 0, y: 12, scale: 0.995 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -12, scale: 0.995 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="space-y-4"
                            >
                              <div className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border backdrop-blur-sm ${innerCardClass}`}>
                                <div>
                                  <span className="text-[10px] font-bold text-slate-500 font-mono">WEEK {week.weekNumber} IN FOCUS BLUEPRINT</span>
                                  <h5 className={`text-sm font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"} mt-0.5`}>{week.focusTopic}</h5>
                                </div>
                                <div className="text-left mt-2 md:mt-0">
                                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Allocated Practice</span>
                                  <span className="text-md font-mono font-bold text-cyan-500">{week.targetHours} hours this week</span>
                                </div>
                              </div>

                              {timelineViewMode === "list" ? (
                                /* Standard Grid List View */
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {week.dailyMatrix.map((day, idx) => (
                                    <div key={idx} className={`shadow-lg p-4 rounded-xl flex flex-col justify-between transition-all duration-205 border ${
                                      theme === "dark"
                                        ? "bg-white/5 border-white/10 hover:border-white/15 hover:bg-white/10 text-slate-100"
                                        : "bg-slate-50/50 border-slate-200 hover:border-slate-350 hover:bg-slate-100/50 text-slate-900"
                                    }`}>
                                      <div>
                                        <div className="flex justify-between items-center pb-2 border-b border-black/10 mb-3">
                                          <span className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-slate-955"}`}>{day.day}</span>
                                          <span className={`text-xs font-mono px-1.5 py-0.5 rounded-lg border ${
                                            theme === "dark" ? "text-cyan-300 bg-white/5 border-white/10" : "text-cyan-700 bg-white border-slate-205"
                                          }`}>{day.allocatedHours} hrs</span>
                                        </div>
                                        <ul className="space-y-2">
                                          {day.tasks.map((task, tIdx) => (
                                            <li key={tIdx} className={`text-xs flex items-start space-x-1.5 leading-relaxed ${theme === "dark" ? "text-slate-350" : "text-slate-650"}`}>
                                              <span className="text-cyan-500 text-xs mt-0.5 select-none">•</span>
                                              <span>{task}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      
                                      <div className="mt-4 pt-2.5 border-t border-black/10 flex items-center justify-between text-[11px] text-slate-400">
                                        <span className="font-mono">Sub-Module COVERED:</span>
                                        <button
                                          id={`sub-module-btn-${day.modulesCovered[0]}`}
                                          onClick={() => setSelectedModuleId(day.modulesCovered[0])}
                                          className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-2 py-0.5 text-cyan-500 hover:text-white hover:bg-cyan-500 hover:border-cyan-600 transition-all font-mono font-bold cursor-pointer inline-flex items-center space-x-1 active:scale-95 shadow-sm"
                                          title="Click to view detailed skill prerequisites & official citations"
                                        >
                                          <span>{day.modulesCovered[0]}</span>
                                          <Info className="w-2.5 h-2.5 text-cyan-500 shrink-0" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                /* Beautiful High-Fidelity Calendar View Builder */
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((dayName, idx) => {
                                    const dayData = week.dailyMatrix.find(d => d.day === dayName);
                                    const isStudyDay = !!dayData;
                                    
                                    return (
                                      <div 
                                        key={dayName} 
                                        className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all min-h-[225px] ${
                                          isStudyDay 
                                            ? theme === "dark"
                                              ? "bg-cyan-950/20 border-cyan-500/20 hover:border-cyan-500/40 text-slate-100 shadow-[0_4px_12px_rgba(6,182,212,0.05)]"
                                              : "bg-cyan-50/30 border-cyan-200 hover:border-cyan-300 text-slate-900 shadow-sm"
                                            : theme === "dark"
                                              ? "bg-white/2 border-dashed border-white/5 text-slate-500 bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.01)_50%,rgba(255,255,255,0.01)_75%,transparent_75%,transparent)] bg-[length:12px_12px]"
                                              : "bg-slate-50 border-dashed border-slate-200 text-slate-400 bg-[linear-gradient(45deg,rgba(0,0,0,0.01)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.01)_50%,rgba(0,0,0,0.01)_75%,transparent_75%,transparent)] bg-[length:12px_12px]"
                                        }`}
                                      >
                                        <div>
                                          {/* Day Header with indicator tabs */}
                                          <div className="flex items-center justify-between pb-1.5 border-b border-black/10 mb-2.5">
                                            <span className="text-xs font-black uppercase tracking-wider">{dayName.slice(0, 3)}</span>
                                            {isStudyDay ? (
                                              <span className="text-[9px] font-mono font-bold bg-cyan-500/15 border border-cyan-400/20 text-cyan-400 px-1.5 py-0.2 rounded uppercase">
                                                {dayData.allocatedHours} hr block
                                              </span>
                                            ) : (
                                              <span className="text-[8px] font-mono opacity-50 uppercase tracking-widest">Off-slot</span>
                                            )}
                                          </div>

                                          {isStudyDay ? (
                                            <ul className="space-y-2">
                                              {dayData.tasks.map((task, tIdx) => (
                                                <li key={tIdx} className={`text-[10px] leading-snug flex items-start space-x-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                                                  <span className="text-cyan-500 text-[10px] mt-0.5 select-none">•</span>
                                                  <span>{task}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          ) : (
                                            <div className="flex flex-col items-center justify-center py-6 text-center space-y-1 opacity-60">
                                              <Clock className="w-4 h-4 text-slate-500" />
                                              <p className="text-[9px] font-semibold leading-snug">
                                                {dayName === "Saturday" || dayName === "Sunday"
                                                  ? "Rest & Reset"
                                                  : "Job Focus Slot"}
                                              </p>
                                            </div>
                                          )}
                                        </div>

                                        {isStudyDay && (
                                          <div className="mt-4 pt-2 border-t border-black/10 flex flex-col gap-0.5 items-start">
                                            <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Curriculum Code:</span>
                                            <button
                                              id={`cal-sub-module-btn-${dayData.modulesCovered[0]}`}
                                              onClick={() => setSelectedModuleId(dayData.modulesCovered[0])}
                                              className="bg-cyan-500/10 border border-cyan-500/20 rounded-md px-1.5 py-0.2 text-[9px] text-cyan-450 hover:text-white hover:bg-cyan-500 transition-all font-mono font-black cursor-pointer inline-flex items-center space-x-0.5 active:scale-95 shadow-sm"
                                            >
                                              <span>{dayData.modulesCovered[0]}</span>
                                              <Info className="w-2.5 h-2.5 text-cyan-500 shrink-0" />
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Grounded Assessments & Manager reports panel side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div id="assessment-creator-card" className={`${cardBgClass} backdrop-blur-md rounded-2xl p-5 shadow-2xl flex flex-col justify-between border ${theme === "dark" ? "border-white/10" : "border-slate-200"}`}>
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 font-sans font-medium">
                          <div className="flex items-center space-x-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <h4 className={`text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>Assessment Agent (Verifier Pattern)</h4>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-450 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-lg font-bold">VERIFIED</span>
                        </div>

                        <p className={`text-xs ${labelClass} mb-4 leading-relaxed`}>
                          The **Primary Assessment Creator** drafted this test based on verified certifications, and the **Audit Verifier Node** dynamically audited correctness:
                        </p>

                        {simulatedData.assessments.map((qa, i) => {
                          const conf = getConfidenceScore(i);
                          const confBadgeBg = conf >= 96 
                            ? "bg-emerald-500/10 text-emerald-350 border-emerald-500/20" 
                            : conf >= 92 
                              ? "bg-amber-500/10 text-amber-350 border-amber-500/20" 
                              : "bg-rose-500/10 text-rose-350 border-rose-500/20";
                          return (
                            <div key={i} className={`p-4 rounded-xl space-y-3.5 shadow-sm border ${innerCardClass}`}>
                              
                              {/* QA Pair Header & Auditor Certainty Badge */}
                              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="font-extrabold text-[10px] text-emerald-500 tracking-wider font-mono">ASSESS ITEM #{i+1}</span>
                                <span className={`text-[10px] font-mono font-black border px-2 py-0.5 rounded-full flex items-center space-x-1 ${confBadgeBg}`}>
                                  <span>CERTAINTY:</span>
                                  <span className="font-extrabold animate-pulse">{conf}%</span>
                                </span>
                              </div>

                              <div className={`text-xs mt-1 leading-relaxed font-sans font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                                <span className="font-extrabold text-emerald-500 uppercase font-mono mr-1.5">QUESTION:</span>
                                {qa.questionText}
                              </div>
                              
                              <div className="space-y-1.5">
                                {qa.options.map((opt, oIdx) => (
                                  <div 
                                    key={oIdx} 
                                    className={`p-2.5 rounded-lg text-xs flex items-center justify-between transition-all duration-200 ${
                                      oIdx === qa.correctOptionIndex 
                                        ? "bg-emerald-500/5 border border-emerald-500/30 text-emerald-500 font-bold shadow-[0_0_12px_rgba(16,185,129,0.15)]" 
                                        : "bg-black/5 border border-black/5 text-slate-500"
                                    }`}
                                  >
                                    <span>{oIdx + 1}. {opt}</span>
                                    {oIdx === qa.correctOptionIndex && (
                                      <span className="text-[10px] uppercase font-mono bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-500 font-bold">Correct Selection</span>
                                    )}
                                  </div>
                                ))}
                              </div>

                              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-[11px] text-slate-400 flex items-start space-x-2 leading-relaxed">
                                <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-emerald-500 font-sans">Auditor Report: </span>
                                  {qa.verifierNotes}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Citation Ref:</span>
                        <span className={`rounded-lg px-2 py-0.5 font-mono font-medium border ${
                          theme === "dark" ? "bg-white/5 border-white/10 text-emerald-305" : "bg-slate-50 border-slate-200 text-emerald-600"
                        }`}>{simulatedData.assessments[0]?.citationRef}</span>
                      </div>
                    </div>

                    {/* Manager Aggregate Reports (Anonymized analytics) */}
                    <div id="manager-aggregate-card" className={`${cardBgClass} backdrop-blur-md rounded-2xl p-5 shadow-2xl flex flex-col justify-between border ${theme === "dark" ? "border-white/10" : "border-slate-200"}`}>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-black/10 mb-4 gap-2">
                          <div className="flex items-center space-x-2">
                            <Users className={`w-4 h-4 ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                            <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>Manager Insights & Exports</h4>
                          </div>
                          <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap gap-1">
                            <button
                              id="btn-download-json-compliance"
                              onClick={handleDownloadComplianceReport}
                              className="px-2.5 py-1 text-[10px] font-semibold bg-indigo-600 text-white rounded-lg flex items-center space-x-1.5 cursor-pointer shadow hover:bg-indigo-550 active:scale-95 transition-all shrink-0"
                            >
                              <Download className="w-3 h-3" />
                              <span>Export JSON</span>
                            </button>
                            <button
                              id="btn-export-pdf-report"
                              onClick={handleExportToPDF}
                              className="px-2.5 py-1 text-[10px] font-semibold bg-emerald-600 text-white rounded-lg flex items-center space-x-1.5 cursor-pointer shadow hover:bg-emerald-550 active:scale-95 transition-all shrink-0"
                              title="Generate a high-fidelity printable PDF report of the active training blueprint"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Export PDF</span>
                            </button>
                            <span className="text-[10px] font-mono text-indigo-350 bg-indigo-500/10 border border-indigo-500/25 px-1.5 py-0.5 rounded font-bold select-none whitespace-nowrap">SANITIZED</span>
                          </div>
                        </div>

                        <p className={`text-xs ${labelClass} mb-4 leading-relaxed`}>
                          The **Insights Reporter Agent** aggregates progress tracking data across Team boundaries while strictly masking individual identities (PII Compliance rule):
                        </p>

                        <div className="space-y-3.5">
                          <div className="grid grid-cols-2 gap-3">
                            <div className={`p-3 rounded-xl border ${theme === "dark" ? "bg-black/10 border-white/10" : "bg-slate-50 border-slate-200"}`}>
                              <span className="text-[10px] text-slate-500 uppercase font-mono block">Overall Team Readiness</span>
                              <span className={`text-xl font-mono font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>{simulatedData.teamReport.overallReadinessPercentage}%</span>
                            </div>
                            <div className={`p-3 rounded-xl border ${theme === "dark" ? "bg-black/10 border-white/10" : "bg-slate-50 border-slate-200"}`}>
                              <span className="text-[10px] text-slate-500 uppercase font-mono block">Scanned Team Code</span>
                              <span className="text-xs font-mono font-bold text-indigo-500 leading-6">{simulatedData.teamReport.teamId} (Team B)</span>
                            </div>
                          </div>

                          <div className={`p-3 rounded-xl border ${
                            simulatedData.studyTimeline.mitigationApplied
                              ? "bg-rose-500/5 border-rose-500/20"
                              : theme === "dark" ? "bg-black/10 border-white/10" : "bg-slate-50 border-slate-200"
                          } space-y-1.5`}>
                            <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Operational Threat Level</span>
                            <div className="flex items-center space-x-2 text-xs">
                              <span className={`w-2.5 h-2.5 rounded-full ${simulatedData.studyTimeline.mitigationApplied ? "bg-rose-500 animate-ping" : "bg-emerald-500"}`} />
                              <span className={`font-semibold ${simulatedData.studyTimeline.mitigationApplied ? "text-rose-505" : "text-emerald-505"}`}>
                                {simulatedData.teamReport.riskLevel}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase font-mono block">Anonymized Team Records:</span>
                            {simulatedData.teamReport.unmaskedAnonymizedMetrics.map((record, i) => (
                              <div key={i} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono ${
                                theme === "dark" ? "bg-white/5 border-white/10 text-slate-300" : "bg-slate-50/50 border-slate-200 text-slate-700"
                              }`}>
                                <span className={labelClass}>{record.anonymizedAlias}</span>
                                <div className="flex items-center space-x-3 text-inherit">
                                  <span>Readiness: <strong className={theme === "dark" ? "text-white" : "text-slate-900"}>{record.estimatedReadiness}%</strong></span>
                                  <span className={`text-[10px] px-1.5 py-0.2 select-none border rounded ${
                                    record.capacityRiskIndexTriggered 
                                      ? "text-rose-350 bg-rose-550/10 border-rose-500/20" 
                                      : theme === "dark"
                                        ? "text-slate-400 bg-black/10 border-white/10"
                                        : "text-slate-600 bg-white border-slate-200"
                                  }`}>
                                    {record.capacityRiskIndexTriggered ? "ON-CALL BURNOUT RISK" : "Normal Load"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Export History Log List */}
                          <div className="pt-4 border-t border-dashed border-slate-500/15 mt-4">
                            <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1.5 flex items-center justify-between">
                              <span>Session Export Log History:</span>
                              <span className="text-[9px] text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-1.5 py-0.2 rounded font-mono uppercase">
                                {exportHistory.length} downloads
                              </span>
                            </span>
                            {exportHistory.length === 0 ? (
                              <p className="text-[10px] text-slate-500 italic">No JSON reports exported in current browser session yet.</p>
                            ) : (
                              <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1 font-mono text-[9px]">
                                {exportHistory.map((timestamp, index) => (
                                  <div 
                                    key={index}
                                    className={`p-1.5 rounded flex items-center justify-between border ${
                                      theme === "dark" 
                                        ? "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10" 
                                        : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                      <span>Team_Compliance_Report_{simulatedData.teamReport.teamId || "TEAM-B"}.json</span>
                                    </div>
                                    <span className="font-semibold shrink-0 text-slate-550">{timestamp}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                        </div>
                      </div>

                      <div className="pt-4 border-t border-black/10 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Privacy Standard:</span>
                        <span className="text-indigo-500 font-mono font-medium text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-lg select-none">GDPR / MS Foundational Core</span>
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

                  {selectedAgentFilter !== null && (
                    <div className="flex items-center space-x-2 text-[10.5px] mb-3 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>Filtered standard outputs for <strong>Agent {selectedAgentFilter}</strong>. Click "Clear Trace Filter" to see full graph outputs.</span>
                      <button 
                        onClick={() => setSelectedAgentFilter(null)}
                        className="ml-auto underline font-bold cursor-pointer hover:text-cyan-205 transition"
                      >
                        Clear Trace Filter
                      </button>
                    </div>
                  )}

                  <div className="p-4 bg-black/40 rounded-xl border border-white/10 h-[480px] overflow-y-auto space-y-2 select-text font-mono text-cyan-200/90 leading-relaxed scrollbar-thin">
                    {(() => {
                      if (!pythonLogs) {
                        return <div className="text-slate-500 italic">No output logs generated. Click 'Execute Simulation' to run the multi-agent track.</div>;
                      }

                      const lines = pythonLogs.split("\n");
                      const filteredLines = lines.filter(line => {
                        if (selectedAgentFilter === null) return true;
                        if (line.startsWith("---") || line.startsWith("===") || line.trim() === "") return true;
                        
                        const lowerLine = line.toLowerCase();
                        switch (selectedAgentFilter) {
                          case 1:
                            return lowerLine.includes("pathcurator") || lowerLine.includes("curator") || lowerLine.includes("foundry") || lowerLine.includes("match iq");
                          case 2:
                            return lowerLine.includes("studyplangen") || lowerLine.includes("planner") || lowerLine.includes("timeline") || lowerLine.includes("studyday") || lowerLine.includes("calendar");
                          case 3:
                            return lowerLine.includes("capacitycritic") || lowerLine.includes("critic") || lowerLine.includes("mitigation") || lowerLine.includes("stress") || lowerLine.includes("workload");
                          case 4:
                            return lowerLine.includes("assessmentverifier") || lowerLine.includes("verifier") || lowerLine.includes("question") || lowerLine.includes("assessment");
                          case 5:
                            return lowerLine.includes("managerreporter") || lowerLine.includes("insights") || lowerLine.includes("anonymized") || lowerLine.includes("pii") || lowerLine.includes("team-b");
                          default:
                            return true;
                        }
                      });

                      if (filteredLines.length === 0) {
                        return <div className="text-slate-500 italic p-2">No trace lines matched the selected agent filter.</div>;
                      }

                      return filteredLines.map((line, i) => (
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
                      ));
                    })()}
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

      {/* Skill Prerequisite & Citation Modal Overlay */}
      <AnimatePresence>
        {selectedModuleId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModuleId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              layoutId={`sub-module-modal-${selectedModuleId}`}
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={`relative w-full max-w-lg rounded-2xl p-6 shadow-2xl border backdrop-blur-xl overflow-hidden z-10 ${
                theme === "dark" 
                  ? "bg-slate-900/95 border-white/10 text-white" 
                  : "bg-white/95 border-slate-200 text-slate-900"
              }`}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500" />
              
              <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4 pl-2">
                <div>
                  <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded-md font-bold mb-1 inline-block uppercase select-none">
                    Prereq Analysis
                  </span>
                  <h4 className="text-sm font-extrabold tracking-tight">
                    {selectedModuleId}: {MODULE_DETAILS_REGISTRY[selectedModuleId]?.title || "Advanced Module Trace"}
                  </h4>
                </div>
                <button
                  id="close-prereq-modal"
                  onClick={() => setSelectedModuleId(null)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-mono transition-all font-semibold active:scale-95 cursor-pointer ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-slate-400"
                      : "bg-slate-100 border-slate-200 hover:bg-slate-200 hover:text-slate-900 text-slate-600"
                  }`}
                >
                  ESC
                </button>
              </div>

              <div className="space-y-4 pl-2 font-sans">
                <p className={`text-xs leading-relaxed ${labelClass}`}>
                  {MODULE_DETAILS_REGISTRY[selectedModuleId]?.description || "Deeply integrates into enterprise technical blueprints."}
                </p>

                {/* Core Skills section */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase font-mono block mb-2 select-none">Target Skills Gained:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(MODULE_DETAILS_REGISTRY[selectedModuleId]?.skills || ["Enterprise Architecture", "Micro-Agent Control"]).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10.5px] px-2.5 py-1 rounded-md bg-cyan-505/10 text-cyan-550 border border-cyan-500/15 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prerequisites section */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase font-mono block mb-1.5 select-none">Direct Prerequisites:</span>
                  <ul className="space-y-1">
                    {(MODULE_DETAILS_REGISTRY[selectedModuleId]?.prerequisites || ["M-301 Architect Foundation"]).map((prereq, pIdx) => (
                      <li key={pIdx} className="text-xs flex items-center space-x-2 text-inherit">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className={theme === "dark" ? "text-slate-350" : "text-slate-650"}>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Source Citation */}
                <div className={`p-4 rounded-xl border flex items-start space-x-3.5 ${
                  theme === "dark" ? "bg-white/5 border-white/5 text-slate-300" : "bg-slate-50 border-slate-150 text-slate-755"
                }`}>
                  <FileText className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase font-bold block select-none">Official Citation Source</span>
                    <p className={`text-xs mt-1 leading-relaxed ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                      {MODULE_DETAILS_REGISTRY[selectedModuleId]?.citation || "MS-FOUNDRY-IQ Reference Codebook, Sec 10.4"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Share Simulator Report Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm shadow"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={`relative w-full max-w-md rounded-2xl p-6 shadow-2xl border backdrop-blur-xl overflow-hidden z-10 ${
                theme === "dark" 
                  ? "bg-slate-900/95 border-white/10 text-white" 
                  : "bg-white/95 border-slate-200 text-slate-900"
              }`}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500" />
              
              <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4 pl-2">
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm font-extrabold tracking-tight">
                    Share Simulation Report
                  </h4>
                </div>
                <button
                  id="close-share-modal"
                  onClick={() => setShowShareModal(false)}
                  className={`text-xs p-1.5 rounded-lg border font-mono transition-all font-semibold active:scale-95 cursor-pointer ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-slate-400"
                      : "bg-slate-100 border-slate-200 hover:bg-slate-200 hover:text-slate-900 text-slate-600"
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4 pl-2 font-sans text-xs">
                <p className={theme === "dark" ? "text-slate-300" : "text-slate-605"}>
                  Copy and share this direct access link to distribute this simulated WorkTelemetry & OrbitIQ schema profile configuration.
                </p>

                <div className={`p-3 rounded-xl border font-mono ${
                  theme === "dark" ? "bg-black/30 border-white/15 text-slate-300" : "bg-slate-50 border-slate-250 text-slate-700"
                }`}>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>LAUNCHER TARGET PARAMETERS:</span>
                    <span className="text-emerald-450 uppercase animate-pulse">Ready</span>
                  </div>
                  <div>Employee: {simulatedData?.employeeId || "N/A"}</div>
                  <div>Stress Profile: {stressProfile === "HIGH_STRESS" ? "High Cognitive Stress" : "Normal Capacity"}</div>
                  <div>Reporting week: {simulatedData?.telemetryIq?.reportingWeek || "N/A"}</div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.protocol}//${window.location.host}?simulationId=${simulatedData?.studyTimeline?.timelineId || "OrbitIQ"}&emp=${employeeId}&profile=${stressProfile}`}
                    className={`flex-1 p-2.5 rounded-xl border text-xs font-mono select-all transition-all ${
                      theme === "dark" 
                        ? "bg-black/30 border-white/10 text-cyan-300" 
                        : "bg-slate-100 border-slate-200 text-cyan-800"
                    }`}
                  />
                  <button
                    id="btn-copy-share-url"
                    onClick={() => {
                      const shareUrl = `${window.location.protocol}//${window.location.host}?simulationId=${simulatedData?.studyTimeline?.timelineId || "OrbitIQ"}&emp=${employeeId}&profile=${stressProfile}`;
                      navigator.clipboard.writeText(shareUrl);
                      setShareCopied(true);
                      setTimeout(() => setShareCopied(false), 2000);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer ${
                      shareCopied
                        ? "bg-emerald-600 border-emerald-500 text-white animate-pulse"
                        : "bg-cyan-600 border-cyan-550 text-white hover:bg-cyan-550"
                    }`}
                  >
                    {shareCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 shrink-0" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Print Preview Simulated Document Modal Block */}
        {showPrintPreview && simulatedData && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            <div className="min-h-screen py-8 flex flex-col items-center justify-center w-full max-w-4xl">
              {/* Sticky Controls Panel */}
              <div className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-4 mb-4 flex justify-between items-center shadow-2xl flex-wrap gap-3">
                <div className="flex items-center space-x-2.5">
                  <Printer className="w-5 h-5 text-cyan-405 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-100">Official Report Print Preview</h4>
                    <p className="text-[10px] text-slate-400">Verify high-contrast monochrome coordinates & formatting prior to physical output</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsPrintMode(!isPrintMode)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all active:scale-95 flex items-center space-x-1 cursor-pointer ${
                      isPrintMode 
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold" 
                        : "bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-350"
                    }`}
                    title="Toggle high contrast black and white mockup styles"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isPrintMode ? "Pure Monochrome On" : "Preview Monochrome"}</span>
                  </button>

                  <button
                    id="btn-trigger-print-dialog"
                    onClick={() => {
                      window.print();
                    }}
                    className="px-3.5 py-1.5 text-xs font-extrabold text-slate-950 bg-cyan-405 hover:bg-cyan-350 rounded-lg transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer shadow-md shadow-cyan-400/10"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Page</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowPrintPreview(false);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-450 hover:text-white bg-slate-800 border border-slate-705 rounded-lg transition-all active:scale-95 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 inline mr-1" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              {/* Simulated Paper Draft Document */}
              <div className="w-full max-w-3xl bg-white border border-slate-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg p-8 text-slate-950 font-sans print:shadow-none print:border-none print:p-0">
                {/* Executive Title Block */}
                <div className="border-b-4 border-slate-900 pb-5 mb-6 flex justify-between items-baseline flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-slate-450 block">OrbitIQ Compliance System Document</span>
                    <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight font-sans">
                      WorkIQ Workload Analytics Report
                    </h1>
                  </div>
                  <div className="text-right font-mono text-[9px] text-slate-500">
                    <div>DOC-ID: fde5fe00-92fe-4dbe-b5b6-6fba2b88252d</div>
                    <div>DATE: 2026-06-12 14:12 UTC</div>
                  </div>
                </div>

                {/* Meta Summary Blocks */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-xs bg-slate-50 border border-slate-200 p-4 rounded-lg">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-slate-500 block">EMPLOYEE COGNITIVE ID</span>
                    <span className="font-bold font-mono text-slate-900">{simulatedData.employeeId}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-slate-500 block">STRESS TOLL STATE</span>
                    <span className={`font-extrabold uppercase ${stressProfile === "HIGH_STRESS" ? "text-rose-600" : "text-emerald-700"}`}>
                      {stressProfile === "HIGH_STRESS" ? "HIGH COGNITIVE STRAIN" : "STABLE TOLERANCE"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-slate-500 block">LIVE TELEMETRY CYCLE</span>
                    <span className="font-bold text-slate-900 font-mono">{simulatedData.telemetryIq.reportingWeek}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-slate-500 block">DRAFT CLASSIFICATION</span>
                    <span className="font-bold text-slate-900 uppercase font-mono tracking-wide">CONFIDENTIAL PEER</span>
                  </div>
                </div>

                {/* Sub-text Context block */}
                <div className="text-xs text-slate-705 space-y-2 mb-6">
                  <p>
                    This file serves as an official workload trajectory audit for human cognitive tracking under high-stress deployment scenarios. Historical training models are layered alongside real-time metrics to diagnose bottleneck conditions and ensure operational reliability.
                  </p>
                </div>

                {/* Telemetry Chart Block */}
                <div className="border border-slate-250 p-4 rounded-lg bg-slate-50/50 mb-6 relative">
                  {/* Subtle report watermark indicator overlay on chart in Print Preview */}
                  <div className="absolute top-1.5 right-1.5 bg-slate-900 text-white px-2 py-0.5 text-[8.5px] font-mono font-black border border-slate-950 rounded uppercase tracking-wider select-none z-20 shadow-md">
                    📝 DRAFT PREVIEW COMPLIANCE RECORD
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <h5 className="text-xs font-black uppercase text-slate-800 tracking-wide">
                      {timeWindow === "4weeks" ? "4-WEEK" : timeWindow === "60days" ? "60-DAY" : "90-DAY"} RESOURCE BALANCE METRICS
                    </h5>
                    <span className="text-[8px] font-mono text-slate-500 uppercase">Unit: Cognitive Hours per week</span>
                  </div>

                  <div className="h-[220px] w-full mt-3 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={rechartData4Weeks} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                        <XAxis 
                          dataKey="week" 
                          tick={{ fill: "#000000", fontSize: 9, fontWeight: 700 }}
                          axisLine={{ stroke: "#000000", strokeWidth: 1.5 }}
                          tickLine={{ stroke: "#000000" }}
                        />
                        <YAxis 
                          tick={{ fill: "#000000", fontSize: 9, fontWeight: 700 }}
                          axisLine={{ stroke: "#000000", strokeWidth: 1.5 }}
                          tickLine={{ stroke: "#000000" }}
                        />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Bar dataKey="Meeting Hours" radius={[3, 3, 0, 0]}>
                          {rechartData4Weeks.map((entry, index) => (
                            <Cell key={`cell-preview-meet-${index}`} fill="#000000" />
                          ))}
                        </Bar>
                        <Bar dataKey="Deep Work Hours" fill="#64748b" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex justify-center items-center space-x-6 text-[10px] font-bold uppercase text-slate-800 mt-2 font-mono">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-slate-900 inline-block rounded-sm" />
                      <span>Meeting Hours (Solid Black)</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 bg-slate-500 inline-block rounded-sm" />
                      <span>Deep Work Focus (Slate Grey)</span>
                    </span>
                  </div>
                </div>

                {/* Operational Warning block */}
                {rechartData4Weeks.some(w => w["Meeting Hours"] > 20) && (
                  <div className="border border-red-300 bg-red-50 text-red-900 text-xs p-3.5 rounded-lg mb-6 flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-650 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold uppercase block text-[10px] tracking-wide">Operational Threat Threshold Alert</span>
                      <p className="text-[11px] mt-0.5">
                        Meetings exceeded 20 hours in one or more reporting weeks. This compromises deep-work concentration buffers, prompting high exhaustion probability ratings on current on-call deployment logs.
                      </p>
                    </div>
                  </div>
                )}

                {/* Sub-section: Live blueprint state checklist */}
                <div className="mb-8">
                  <h5 className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-205 pb-1.5">
                    Workspace Qualification & Training Blueprints
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {(simulatedData.assignedBlueprints || []).map((bp: any, idx: number) => {
                      const completedCount = bp.courses?.filter((c: any) => c.status === "COMPLETED")?.length || 0;
                      const totalCount = bp.courses?.length || 0;
                      const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
                      return (
                        <div key={idx} className="border border-slate-200 p-2.5 rounded-lg bg-slate-50/50 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-slate-900 text-[11px]">{bp.name || "Upskilling Block"}</span>
                            <span className="font-mono text-[9px] text-slate-500 uppercase">{percent}% Completed</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1 rounded mt-2">
                            <div className="bg-slate-900 h-1 rounded" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Official Sign-off Bottom Block */}
                <div className="border-t border-slate-400 pt-7 mt-8 grid grid-cols-2 gap-6 text-[10px] text-slate-600 font-mono">
                  <div>
                    <div className="font-extrabold text-slate-900 uppercase">SUBMITTED BY:</div>
                    <div className="mt-8 border-b border-slate-400 pb-1"></div>
                    <div className="mt-1">OrbitIQ automated validation engine</div>
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 uppercase">SUPERINTENDENT ENDORSEMENT:</div>
                    <div className="mt-8 border-b border-slate-400 pb-1"></div>
                    <div className="mt-1">Certified Supervisor Sign-off & Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Expand View Telemetry Modal */}
        {isTelemetryExpanded && simulatedData && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTelemetryExpanded(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />
            
            {/* Large Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={`relative w-full max-w-4xl rounded-2xl p-6 shadow-2xl border backdrop-blur-xl z-10 max-h-[90vh] overflow-y-auto ${
                theme === "dark" 
                  ? "bg-slate-950/95 border-white/10 text-white text-slate-100" 
                  : "bg-white/95 border-slate-200 text-slate-900"
              }`}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500" />
              
              <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-5 pl-2 flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-sm font-extrabold tracking-tight uppercase">
                    WorkIQ Telemetry: Live Period Analytics
                  </h4>
                </div>
                <div className="flex items-center space-x-2 font-sans">
                  {/* Expanded comparative toggle */}
                  <button
                    id="btn-expanded-compare-pop"
                    onClick={() => setCompareHistorical(!compareHistorical)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center space-x-1 border cursor-pointer active:scale-95 transition-all ${
                      compareHistorical 
                        ? "bg-amber-600 border-amber-500 text-white" 
                        : theme === "dark"
                          ? "bg-white/5 border-white/10 text-slate-400 hover:text-slate-100"
                          : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{compareHistorical ? "PoP Overlay Enabled" : "Overlay Historical Cycle"}</span>
                  </button>
                  <button
                    id="btn-modal-download-csv"
                    onClick={handleDownloadWorkIQCsv}
                    disabled={isExportingCsv}
                    className={`px-2.5 py-1.5 text-xs font-bold text-white rounded-lg flex items-center space-x-1 cursor-pointer transition-all active:scale-95 shadow ${
                      isExportingCsv ? "bg-cyan-700 cursor-not-allowed opacity-80" : "bg-cyan-600 hover:bg-cyan-550"
                    }`}
                  >
                    {isExportingCsv ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>{isExportingCsv ? "Exporting..." : "Download CSV"}</span>
                  </button>
                  <button
                    id="close-telemetry-expanded-modal"
                    onClick={() => setIsTelemetryExpanded(false)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border font-mono transition-all font-semibold active:scale-95 cursor-pointer flex items-center space-x-1 ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-slate-400"
                        : "bg-slate-100 border-slate-200 hover:bg-slate-200 hover:text-slate-900 text-slate-600"
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>ESC</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pl-2 font-sans">
                {/* Visualizer Chart Column */}
                <div className="md:col-span-7 space-y-4">
                  <div className={`p-4 rounded-xl border relative ${
                    isPrintMode 
                      ? "bg-white border-2 border-slate-900 text-slate-950"
                      : theme === "dark" 
                        ? "bg-black/35 border-white/10" 
                        : "bg-slate-50 border-slate-205"
                  }`}>
                    {isPrintMode && (
                      <div className="absolute top-1.5 right-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-1.5 py-0.5 text-[8px] font-mono font-black border border-current rounded uppercase tracking-wider select-none z-20 shadow-[0_2px_4px_rgba(0,0,0,0.15)] opacity-95">
                        📊 REPORT MODE ACTIVE
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-black/10 flex-wrap gap-2">
                      <div>
                        <span className={`text-[10px] font-mono uppercase block font-extrabold tracking-wider ${isPrintMode ? "text-slate-800" : "text-cyan-400"}`}>Live Workspace Monitors</span>
                        <h5 className="text-xs font-bold font-sans">
                          {timeWindow === "4weeks" ? "4-Week" : timeWindow === "60days" ? "60-Day" : "90-Day"} Workload Balance Chart
                        </h5>
                      </div>
                      <div className="flex items-center bg-black/15 dark:bg-black/45 p-0.5 rounded-lg border border-white/5 shadow-inner">
                        {(["4weeks", "60days", "90days"] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => setTimeWindow(r)}
                            className={`px-2 py-0.5 text-[8.5px] font-bold rounded-md font-mono uppercase transition-all duration-150 cursor-pointer ${
                              timeWindow === r
                                ? "bg-cyan-500 text-slate-950 font-black shadow"
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            {r === "4weeks" ? "4W" : r === "60days" ? "60D" : "90D"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-[250px] w-full mt-3 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={rechartData4Weeks} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <defs>
                            <filter id="anomaly-glow-modal" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3.5" result="blur" />
                              <feColorMatrix type="matrix" values="1 0 0 0 1  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={isPrintMode ? "#cbd5e1" : theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"} />
                          <XAxis 
                            dataKey="week" 
                            tick={{ fill: isPrintMode ? "#000000" : theme === "dark" ? "#94a3b8" : "#475569", fontSize: 10, fontWeight: isPrintMode ? 700 : 500 }}
                            axisLine={isPrintMode ? { stroke: "#000000", strokeWidth: 1.5 } : false} 
                            tickLine={isPrintMode ? { stroke: "#000000" } : false} 
                          />
                          <YAxis 
                            tick={{ fill: isPrintMode ? "#000000" : theme === "dark" ? "#94a3b8" : "#475569", fontSize: 10, fontWeight: isPrintMode ? 700 : 500 }}
                            axisLine={isPrintMode ? { stroke: "#000000", strokeWidth: 1.5 } : false} 
                            tickLine={isPrintMode ? { stroke: "#000000" } : false} 
                          />
                          <Tooltip 
                            cursor={{ fill: "transparent" }}
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className={`p-3 rounded-xl border text-xs font-mono shadow-2xl ${
                                    isPrintMode 
                                      ? "bg-white border-2 border-slate-900 text-slate-950"
                                      : theme === "dark" 
                                        ? "bg-slate-950 border-white/15 text-slate-100" 
                                        : "bg-white border-slate-250 text-slate-900"
                                  }`}>
                                    <p className="font-extrabold border-b border-black/10 pb-1 mb-1.5 text-inherit">{label}</p>
                                    <p className={isPrintMode ? "text-slate-900 font-bold" : "text-cyan-400 font-bold"}>Meeting: {payload[0]?.value}h</p>
                                    <p className={isPrintMode ? "text-slate-600 font-semibold" : "text-emerald-450 font-bold"}>Deep Work: {payload[1]?.value}h</p>
                                    {payload.length > 2 && (
                                      <>
                                        <p className="text-amber-600 font-extrabold border-t border-black/10 mt-1 pt-1 opacity-90">Hist. Meeting: {payload[2]?.value}h</p>
                                        <p className="text-green-700 font-extrabold">Hist. Deep Work: {payload[3]?.value}h</p>
                                      </>
                                    )}
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          
                          {/* Meetings Bar Series with Anomaly Glow and High-Fidelity highlight */}
                          <Bar 
                            dataKey="Meeting Hours" 
                            radius={[3, 3, 0, 0]}
                            opacity={hoveredLegendSeries === "Deep Work" ? 0.2 : 1}
                          >
                            {rechartData4Weeks.map((entry, index) => {
                              const isAnomaly = entry["Meeting Hours"] > 20;
                              const baseColor = isPrintMode 
                                ? "#000000" 
                                : (theme === "dark" ? "#22d3ee" : "#0284c7");
                              const anomalyColor = isPrintMode ? "#000000" : "#f43f5e";
                              return (
                                <Cell 
                                  key={`cell-modal-meet-${index}`} 
                                  fill={isAnomaly ? anomalyColor : baseColor}
                                  filter={isAnomaly && !isPrintMode ? "url(#anomaly-glow-modal)" : undefined}
                                />
                              );
                            })}
                          </Bar>
                          <Bar 
                            dataKey="Deep Work Hours" 
                            fill={isPrintMode ? "#64748b" : (theme === "dark" ? "#10b981" : "#16a34a")} 
                            radius={[3, 3, 0, 0]} 
                            opacity={hoveredLegendSeries === "Meeting" ? 0.2 : 1}
                          />
                          
                          {/* Historical Series (Overlay Mode) */}
                          {compareHistorical && (
                            <>
                              <Bar 
                                dataKey="Hist. Meeting" 
                                fill={theme === "dark" ? "#1e293b" : "#f1f5f9"} 
                                stroke={theme === "dark" ? "#06b6d4" : "#0284c7"} 
                                strokeWidth={1.5} 
                                strokeDasharray="3 3" 
                                radius={[3, 3, 0, 0]} 
                                opacity={hoveredLegendSeries === "Deep Work" ? 0.2 : 1}
                              />
                              <Bar 
                                dataKey="Hist. Deep Work" 
                                fill={theme === "dark" ? "#0f172a" : "#f0fdf4"} 
                                stroke={theme === "dark" ? "#10b981" : "#16a34a"} 
                                strokeWidth={1.5} 
                                strokeDasharray="3 3" 
                                radius={[3, 3, 0, 0]} 
                                opacity={hoveredLegendSeries === "Meeting" ? 0.2 : 1}
                              />
                            </>
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex items-center space-x-4 text-[10px] font-mono justify-center mt-3.5 flex-wrap gap-2 select-none">
                      <span 
                        className={`flex items-center space-x-1.5 cursor-pointer transition-all duration-200 px-1.5 py-0.5 rounded ${
                          hoveredLegendSeries === "Meeting" 
                            ? "bg-cyan-500/10 scale-105" 
                            : hoveredLegendSeries && hoveredLegendSeries !== "Meeting" 
                              ? "opacity-40" 
                              : "hover:bg-slate-500/10 hover:scale-105"
                        }`}
                        onMouseEnter={() => setHoveredLegendSeries("Meeting")}
                        onMouseLeave={() => setHoveredLegendSeries(null)}
                      >
                        <span className="w-2.5 h-2.5 rounded bg-cyan-400 inline-block" />
                        <span className={`${labelClass} font-semibold`}>Meeting (Current Cycle)</span>
                      </span>
                      <span 
                        className={`flex items-center space-x-1.5 cursor-pointer transition-all duration-200 px-1.5 py-0.5 rounded ${
                          hoveredLegendSeries === "Deep Work" 
                            ? "bg-emerald-500/10 scale-105" 
                            : hoveredLegendSeries && hoveredLegendSeries !== "Deep Work" 
                              ? "opacity-40" 
                              : "hover:bg-slate-500/10 hover:scale-105"
                        }`}
                        onMouseEnter={() => setHoveredLegendSeries("Deep Work")}
                        onMouseLeave={() => setHoveredLegendSeries(null)}
                      >
                        <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
                        <span className={`${labelClass} font-semibold`}>Deep Work (Current Cycle)</span>
                      </span>
                      {compareHistorical && (
                        <>
                          <span 
                            className={`flex items-center space-x-1.5 cursor-pointer transition-all duration-200 px-1.5 py-0.5 rounded ${
                              hoveredLegendSeries === "Meeting" 
                                ? "bg-cyan-500/10 scale-105" 
                                : hoveredLegendSeries && hoveredLegendSeries !== "Meeting" 
                                  ? "opacity-40" 
                                  : "hover:bg-slate-500/10 hover:scale-105"
                            }`}
                            onMouseEnter={() => setHoveredLegendSeries("Meeting")}
                            onMouseLeave={() => setHoveredLegendSeries(null)}
                          >
                            <span className="w-2.5 h-2.5 rounded bg-cyan-900 border-dashed border border-cyan-400 inline-block animate-pulse" />
                            <span className={labelClass}>Hist. Meeting</span>
                          </span>
                          <span 
                            className={`flex items-center space-x-1.5 cursor-pointer transition-all duration-150 px-1.5 py-0.5 rounded ${
                              hoveredLegendSeries === "Deep Work" 
                                ? "bg-emerald-500/10 scale-105" 
                                : hoveredLegendSeries && hoveredLegendSeries !== "Deep Work" 
                                  ? "opacity-40" 
                                  : "hover:bg-slate-500/10 hover:scale-105"
                            }`}
                            onMouseEnter={() => setHoveredLegendSeries("Deep Work")}
                            onMouseLeave={() => setHoveredLegendSeries(null)}
                          >
                            <span className="w-2.5 h-2.5 rounded bg-emerald-950 border-dashed border border-emerald-400 inline-block" />
                            <span className={labelClass}>Hist. Deep Work</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Manager Playbook guide */}
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    theme === "dark" ? "bg-indigo-500/5 border-indigo-500/10 text-slate-300" : "bg-indigo-50/50 border-indigo-100 text-slate-700"
                  }`}>
                    <div className="flex items-center space-x-2 font-bold text-indigo-400 mb-1.5">
                      <Info className="w-4 h-4 shrink-0" />
                      <span>COGNITIVE BALANCE FRAMEWORK</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Continuous research indicates that tech employees subjected to greater than <span className="font-extrabold text-[#f43f5e]">20 hours of weekly meetings</span> suffer extreme cognitive context overheads, dropping Deep Work synthesis by over 60%. OrbitIQ provides dynamic meeting mitigation thresholds enabling healthy upskilling balances.
                    </p>
                  </div>
                </div>

                {/* Audit, Metadata & Anomaly Lists Column */}
                <div className="md:col-span-5 space-y-4">
                  
                  {/* Period-over-period Statistics Table */}
                  <div className={`p-4 rounded-xl border ${
                    theme === "dark" ? "bg-black/20 border-white/10" : "bg-slate-50 border-slate-200"
                  }`}>
                    <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5 font-mono">Telemetry Trajectory Audit</h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-black/10">
                        <span className="text-slate-400">Target Employee / Role ID:</span>
                        <span className="font-mono font-bold">{simulatedData.employeeId}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-black/10">
                        <span className="text-slate-400">Current Assigned Team ID:</span>
                        <span className="font-mono font-bold">{simulatedData.fabricIq.assignedTeamId}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-black/10">
                        <span className="text-slate-400">Dynamic Meeting Config:</span>
                        <span className={`font-mono font-bold ${meetingHours > 20 ? "text-rose-400 animate-pulse" : "text-emerald-400"}`}>{meetingHours} hours/week</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-black/10">
                        <span className="text-slate-400">Simulated Deep Work Ratio:</span>
                        <span className="font-mono font-bold text-cyan-400">{((simulatedData.telemetryIq.deepWorkHours / 40) * 100).toFixed(0)}% focus</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Critical Change Logs:</span>
                        <span className="font-bold flex items-center text-rose-500">{prodDeploy ? "Active Deployment Window" : "None"}</span>
                      </div>
                    </div>
                  </div>

                  {/* HIGH METRICS ALERT - ANOMALY DETECTION LIST */}
                  <div className={`p-4 rounded-xl border ${
                    theme === "dark" ? "bg-rose-500/5 border-rose-500/10 text-slate-200" : "bg-rose-50/50 border-rose-100 text-slate-800"
                  }`}>
                    <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase font-mono tracking-wide mb-3">
                      <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse text-rose-500" />
                      <span>Telemetry Risk Sensors & Anomalies</span>
                    </div>

                    <div className="space-y-2.5">
                      {rechartData4Weeks.map((weekItem, idx) => {
                        const hasAnomaly = weekItem["Meeting Hours"] > 20;
                        return (
                          <div 
                            key={idx} 
                            className={`p-2.5 rounded-lg border text-[11px] flex items-start justify-between ${
                              hasAnomaly 
                                ? theme === "dark"
                                  ? "bg-rose-500/10 border-rose-500/25 red-glow-glow shadow-md shadow-rose-950/20"
                                  : "bg-rose-100/55 border-rose-220 shadow-sm"
                                : theme === "dark"
                                  ? "bg-emerald-500/5 border-emerald-500/10 text-slate-400"
                                  : "bg-emerald-50/50 border-emerald-100 text-slate-655"
                            }`}
                          >
                            <div className="space-y-0.5">
                              <span className="font-extrabold uppercase font-mono">Week {weekItem.week}</span>
                              <div className="opacity-90">
                                Meetings: <span className="font-mono font-bold">{weekItem["Meeting Hours"]}h/W</span> | 
                                Focus: <span className="font-mono font-bold">{weekItem["Deep Work Hours"]}h/W</span>
                              </div>
                            </div>
                            
                            <div>
                              {hasAnomaly ? (
                                <span className="bg-rose-550/15 border border-rose-500/30 text-rose-450 px-1.5 py-0.5 rounded font-mono font-extrabold text-[9px] uppercase animate-pulse">
                                  CRITICAL OVERHEAD
                                </span>
                              ) : (
                                <span className="bg-emerald-555/15 border border-emerald-500/30 text-emerald-450 px-1.5 py-0.5 rounded font-mono font-extrabold text-[9px] uppercase">
                                  COMPLIANT FOCUS
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

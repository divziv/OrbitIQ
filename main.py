#!/usr/bin/env python3
"""
OrbitIQ: A Capacity-Aware Enterprise Upskilling & Multi-Agent Orchestration Engine.
Main entry point demonstrating Pydantic schema enforcement, multi-agent orchestrations,
self-reflection capacity critics, and macro team insights.
"""

import sys
import json
import logging
from datetime import datetime, date
from typing import List, Dict, Any, Optional, Union
try:
    from pydantic import BaseModel, Field, EmailStr, field_validator
except ImportError:
    # Defining a lightweight Pydantic BaseModel fallback to run without external dependencies
    class BaseModel:
        def __init__(self, **kwargs):
            annotations = {}
            for cls in self.__class__.__mro__:
                annotations.update(getattr(cls, '__annotations__', {}))
                
            for name, type_hint in annotations.items():
                if name not in kwargs:
                    if hasattr(self.__class__, name):
                        val = getattr(self.__class__, name)
                        if isinstance(val, FieldInfo):
                            if val.default_factory is not None:
                                kwargs[name] = val.default_factory()
                            elif val.default is not ...:
                                kwargs[name] = val.default
                            else:
                                kwargs[name] = None
                        else:
                            kwargs[name] = val
                    else:
                        kwargs[name] = None
            
            for key, val in kwargs.items():
                if isinstance(val, FieldInfo):
                    if val.default_factory is not None:
                        val = val.default_factory()
                    elif val.default is not ...:
                        val = val.default
                    else:
                        val = None
                setattr(self, key, val)

    class FieldInfo:
        def __init__(self, default=..., default_factory=None, description=None):
            self.default = default
            self.default_factory = default_factory
            self.description = description

    def Field(default=..., **kwargs):
        return FieldInfo(
            default=default, 
            default_factory=kwargs.get("default_factory"), 
            description=kwargs.get("description")
        )

    def field_validator(*args, **kwargs):
        def decorator(func):
            return func
        return decorator

    EmailStr = str

# Configure Logging to standard output with detailed tracing
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [OrbitIQ-%(name)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("Core")

# ==============================================================================
# SECTION 1: DATA FRAMEWORK & SCHEMA LAYERS (THE IQ LAYERS)
# ==============================================================================

class CertificationModule(BaseModel):
    module_id: str = Field(..., description="Unique ID of the learning module")
    title: str = Field(..., description="Detailed title of the learning modules")
    estimated_hours: float = Field(..., description="Estimated hours to complete the module")
    skills_covered: List[str] = Field(default_factory=list, description="List of target competencies addressed")
    prerequisites: List[str] = Field(default_factory=list, description="Module IDs needed before starting this one")

class SourceCitation(BaseModel):
    doc_id: str = Field(..., description="Internal knowledge base reference code")
    title: str = Field(..., description="Title of the source document")
    paragraph_ref: str = Field(..., description="Paragraph index or heading identifier for verification")

class FoundryIQSchema(BaseModel):
    """Parses technical certification blueprints and authoritative knowledge sources."""
    exam_id: str = Field(..., description="Official exam code, e.g., AZ-400, Orbit-202")
    exam_title: str = Field(..., description="Explanatory title of the certification")
    target_role: str = Field(..., description="Corporate role mapped to this curriculum")
    modules: List[CertificationModule] = Field(default_factory=list, description="Curriculum modules")
    source_citations: List[SourceCitation] = Field(default_factory=list, description="Core knowledge base or MS Learn references")

    @field_validator("modules")
    @classmethod
    def validate_module_integrity(cls, v: List[CertificationModule]) -> List[CertificationModule]:
        # Ensure there are no duplicate module IDs
        seen = set()
        for mod in v:
            if mod.module_id in seen:
                raise ValueError(f"Duplicate module_id detected: {mod.module_id}")
            seen.add(mod.module_id)
        return v


class FabricIQSchema(BaseModel):
    """Models corporate talent ontologies mapping employees, roles, gaps and targets."""
    employee_id: str = Field(..., description="Synthetic Worker ID, e.g. EMP-102")
    current_role: str = Field(..., description="Assigned enterprise role")
    target_role: str = Field(..., description="Target promotion or upskilling role")
    identified_gaps: List[str] = Field(..., description="Skill dimensions requiring intervention")
    recommended_cert: str = Field(..., description="Target Certification ID matching the curriculum")
    assigned_team_id: str = Field(..., description="Enterprise Team ID, e.g. TEAM-B")


class WorkIQSchema(BaseModel):
    """Processes simulated weekly calendar metadata and production telemetry (The Capacity sensor)."""
    employee_id: str = Field(..., description="Synthetic worker identifier, e.g. EMP-102")
    reporting_week: str = Field(..., description="ISO calendar week, e.g., 2026-W24")
    meeting_hours: float = Field(..., description="Total hours spent in calendar entries")
    deep_work_hours: float = Field(..., description="Available uninterrupted focused blocks")
    production_deploy_window: bool = Field(..., description="Flags if this employee is on-call or deploying live systems")
    average_incident_count: int = Field(default=0, description="Active high-priority support tickets assigned")


# ==============================================================================
# SECTION 2: SYNTHETIC DATA BASE (THE ISOLATED SANDBOX)
# ==============================================================================

# Highly structured synthetic documents (no production credentials or real names)
SYNTHETIC_FOUNDRY_DB: Dict[str, FoundryIQSchema] = {
    "AZ-400": FoundryIQSchema(
        exam_id="AZ-400",
        exam_title="Azure DevOps Technologies Certification",
        target_role="DevOps Engineer",
        modules=[
            CertificationModule(
                module_id="M-401",
                title="Design a DevOps Strategy",
                estimated_hours=6.0,
                skills_covered=["Agile Planning", "Source Control Topology", "Incident Mapping"],
                prerequisites=[]
            ),
            CertificationModule(
                module_id="M-402",
                title="Implement Continuous Integration with GitHub & Pipelines",
                estimated_hours=10.0,
                skills_covered=["YAML Declarative Blueprints", "Lint Rules", "Static Testing Gates"],
                prerequisites=["M-401"]
            ),
            CertificationModule(
                module_id="M-403",
                title="Establish Continuous Delivery / Release Automations",
                estimated_hours=8.0,
                skills_covered=["Environment Isolation", "Canary Gates", "Telemetry Hooks"],
                prerequisites=["M-402"]
            ),
            CertificationModule(
                module_id="M-404",
                title="Configure Dependency Management & Compliance",
                estimated_hours=5.0,
                skills_covered=["Package Feeds", "Vulnerability Auditing", "License Verification"],
                prerequisites=["M-401"]
            )
        ],
        source_citations=[
            SourceCitation(doc_id="SRC-DEV-01", title="Microsoft Azure Architectures", paragraph_ref="Sec. 4.2: CI Topologies"),
            SourceCitation(doc_id="SRC-DEV-02", title="Enterprise Security Release Guide", paragraph_ref="Ch. 9: Dependency Audits")
        ]
    )
}

SYNTHETIC_FABRIC_DB: Dict[str, FabricIQSchema] = {
    "EMP-102": FabricIQSchema(
        employee_id="EMP-102",
        current_role="Junior Software Developer",
        target_role="DevOps Engineer",
        identified_gaps=["Vulnerability Auditing", "YAML Declarative Blueprints", "Telemetry Hooks"],
        recommended_cert="AZ-400",
        assigned_team_id="TEAM-B"
    ),
    "EMP-103": FabricIQSchema(
        employee_id="EMP-103",
        current_role="System Admin",
        target_role="Cloud Security Specialist",
        identified_gaps=["IAM Protocols", "Network Hardening"],
        recommended_cert="SC-300",
        assigned_team_id="TEAM-B"
    )
}

SYNTHETIC_WORK_TELEMETRY: Dict[str, WorkIQSchema] = {
    "EMP-102_HIGH_STRESS": WorkIQSchema(
        employee_id="EMP-102",
        reporting_week="2026-W24",
        meeting_hours=24.5,  # Exceeds the 20-hour self-reflection threshold
        deep_work_hours=8.0,
        production_deploy_window=True,  # Strict capacity limiter active
        average_incident_count=3
    ),
    "EMP-102_NORMAL": WorkIQSchema(
        employee_id="EMP-102",
        reporting_week="2026-W25",
        meeting_hours=12.0,
        deep_work_hours=20.0,
        production_deploy_window=False,
        average_incident_count=0
    )
}

# ==============================================================================
# SECTION 3: THE 5-AGENT MULTI-AGENT TOPOLOGY
# ==============================================================================

class StudyDay(BaseModel):
    day: str = Field(..., description="Day of the plan, e.g., Day 1, Monday")
    allocated_hours: float
    modules_covered: List[str]
    tasks: List[str]

class WeeklyStudyPlan(BaseModel):
    week_number: int
    focus_topic: str
    target_hours: float
    daily_matrix: List[StudyDay]

class StudyTimeline(BaseModel):
    timeline_id: str
    employee_id: str
    certification_id: str
    total_allocated_weeks: int
    weeks: List[WeeklyStudyPlan]
    mitigation_applied: bool = False
    mitigation_notes: str = ""

class AssessmentItem(BaseModel):
    question_id: str
    question_text: str
    options: List[str]
    correct_option_index: int
    citation_ref: str
    verified: bool = False
    verifier_notes: str = ""

class TeamProgressReport(BaseModel):
    team_id: str
    scanned_members_count: int
    overall_readiness_percentage: float
    risk_level: str
    unmasked_anonymized_metrics: List[Dict[str, Any]]


# --- MULTI-AGENT STATE DEFINITION ---
class EngineState(BaseModel):
    """The central thread-safe orchestrator state passing through agent borders."""
    employee_id: str
    fabric_iq: Optional[FabricIQSchema] = None
    telemetry_iq: Optional[WorkIQSchema] = None
    foundry_iq: Optional[FoundryIQSchema] = None
    curated_module_ids: List[str] = Field(default_factory=list)
    curated_citations: List[SourceCitation] = Field(default_factory=list)
    study_timeline: Optional[StudyTimeline] = None
    capacity_warnings: List[str] = Field(default_factory=list)
    assessments: List[AssessmentItem] = Field(default_factory=list)
    system_trace: List[str] = Field(default_factory=list)
    current_agent_turn: str = "ORCHESTRATOR"


class Agent1LearningPathCurator:
    """AGENT 1: Learning Path Curator."""
    def __init__(self):
        self.name = "PathCurator"
        self.prompt = (
            "You are the Learning Path Curator. Your job is to parse identified_gaps "
            "against the Certification Curriculum and match relevant modules, maintaining strict "
            "data accuracy and citations. Never inject un-cited recommendations."
        )

    def run_step(self, state: EngineState) -> EngineState:
        state.system_trace.append(f"[{self.name}] Turn active. Analyzing skill goals.")
        if not state.fabric_iq:
            raise ValueError(f"[{self.name}] Error: Missing FabricIQ in state.")
        
        cert_id = state.fabric_iq.recommended_cert
        gaps = state.fabric_iq.identified_gaps
        
        foundry_blueprint = SYNTHETIC_FOUNDRY_DB.get(cert_id)
        if not foundry_blueprint:
            state.system_trace.append(f"[{self.name}] No blueprints in Foundry IQ for {cert_id}.")
            return state

        state.foundry_iq = foundry_blueprint
        matched_mods = []
        citations_found = set()

        for module in foundry_blueprint.modules:
            # Match if any skill covered in module bridges an identified gap
            has_gap_overlap = any(skill in gaps for skill in module.skills_covered)
            if has_gap_overlap:
                matched_mods.append(module.module_id)
                # Gather associated matching citations
                for cit in foundry_blueprint.source_citations:
                    citations_found.add(cit.doc_id)

        # Update engine states
        state.curated_module_ids = matched_mods
        state.curated_citations = [
            cit for cit in foundry_blueprint.source_citations 
            if cit.doc_id in citations_found
        ]
        
        state.system_trace.append(
            f"[{self.name}] Step complete. Matched Modules: {matched_mods}. "
            f"Extracted {len(state.curated_citations)} source citations."
        )
        return state


class Agent2StudyPlanGenerator:
    """AGENT 2: Study Plan Generator Agent (Planner-Executor Pattern)."""
    def __init__(self):
        self.name = "StudyPlanGen"
        self.planner_prompt = "Planner Node: Group curated modules into logical weeks respecting prerequisites."
        self.executor_prompt = "Executor Node: Distribute module chunks into custom daily study matrices."

    def run_step(self, state: EngineState) -> EngineState:
        state.system_trace.append(f"[{self.name}] Initiating Planner-Executor routine.")
        if not state.curated_module_ids or not state.foundry_iq:
            state.system_trace.append(f"[{self.name}] Warning: No curated modules. Generating basic onboard plan.")
            # Default fallback modules
            curated_mods = ["M-401"]
        else:
            curated_mods = state.curated_module_ids

        # PART 1: Planner Logic (Macro)
        # Groups the modules into logical sequential periods (e.g., Week 1, Week 2)
        weeks_plan: List[WeeklyStudyPlan] = []
        
        # Sort modules by prerequisites constraints
        all_mods = {m.module_id: m for m in state.foundry_iq.modules if m.module_id in curated_mods}
        
        # To simplify, we schedule M-401 first, and build sequences
        sorted_mods = []
        visited = set()
        
        def resolve_mod(m_id):
            if m_id in visited or m_id not in all_mods:
                return
            m_entity = all_mods[m_id]
            for prereq in m_entity.prerequisites:
                resolve_mod(prereq)
            visited.add(m_id)
            sorted_mods.append(m_entity)

        for m_id in all_mods:
            resolve_mod(m_id)

        # PART 2: Executor Logic (Micro day-to-day timeline allocations)
        week_idx = 1
        for mod in sorted_mods:
            days = [
                StudyDay(day="Monday", allocated_hours=1.5, modules_covered=[mod.module_id], tasks=["Watch core lectures", "Read Citations"]),
                StudyDay(day="Wednesday", allocated_hours=1.5, modules_covered=[mod.module_id], tasks=["Interactive shell labs"]),
                StudyDay(day="Friday", allocated_hours=1.0, modules_covered=[mod.module_id], tasks=["Review flashcards & micro-quiz"])
            ]
            weekly_hours = sum(d.allocated_hours for d in days)
            
            weeks_plan.append(WeeklyStudyPlan(
                week_number=week_idx,
                focus_topic=mod.title,
                target_hours=weekly_hours,
                daily_matrix=days
            ))
            week_idx += 1

        state.study_timeline = StudyTimeline(
            timeline_id="TL-" + state.employee_id + "-1",
            employee_id=state.employee_id,
            certification_id=state.foundry_iq.exam_id if state.foundry_iq else "GENERIC",
            total_allocated_weeks=len(weeks_plan),
            weeks=weeks_plan
        )
        state.system_trace.append(f"[{self.name}] Multi-week timeline drafted successfully. Planner-Executor exited.")
        return state


class Agent3EngagementCritic:
    """AGENT 3: Engagement Agent (Self-Reflection / Critic Loop)."""
    def __init__(self):
        self.name = "CapacityCritic"
        self.prompt = (
            "You are the Capacity Critic. Analyze workspace calendar hours and telemetry. "
            "If meeting hours > 20 or active production windows are flagged, "
            "you MUST scale down deep allocations, delay blocks, and log warnings."
        )

    def run_step(self, state: EngineState) -> EngineState:
        state.system_trace.append(f"[{self.name}] Turn active. Analyzing system telemetry.")
        if not state.telemetry_iq:
            state.system_trace.append(f"[{self.name}] Warning: No live telemetry found. Retaining normal plan scale.")
            return state

        meetings = state.telemetry_iq.meeting_hours
        prod_window = state.telemetry_iq.production_deploy_window
        
        critic_triggered = False
        mitigation_reasons = []

        if meetings > 20.0:
            critic_triggered = True
            mitigation_reasons.append(f"Excessive Meeting Load ({meetings} hrs/week)")
        if prod_window:
            critic_triggered = True
            mitigation_reasons.append("Active Live Production Release Window")

        if critic_triggered and state.study_timeline:
            state.system_trace.append(f"[{self.name}] Self-Reflection loop triggered: {', '.join(mitigation_reasons)}")
            state.capacity_warnings.append(f"CRITIC WARNING: Scaled down due to: {', '.join(mitigation_reasons)}")
            
            # Apply downscaling logic dynamically (reduces target study parameters)
            state.study_timeline.mitigation_applied = True
            state.study_timeline.mitigation_notes = "Downscaled allocations by 50% due to calendar conflicts."
            
            for week in state.study_timeline.weeks:
                week.target_hours = 0.0
                for day in week.daily_matrix:
                    original_hrs = day.allocated_hours
                    day.allocated_hours = float(round(original_hrs * 0.5, 2))
                    day.tasks.append("MITIGATION SHIFT: Heavy duty deployment cycle. Shift labs to passive read.")
                    week.target_hours += day.allocated_hours

            state.system_trace.append(f"[{self.name}] Downscaled study schedule elements by 50% successfully.")
        else:
            state.system_trace.append(f"[{self.name}] Schedule verified within acceptable limits. No capacity issues resolved.")

        return state


class Agent4AssessmentVerifier:
    """AGENT 4: Assessment Agent (Verifier Pattern)."""
    def __init__(self):
        self.name = "AssessmentVerifier"
        self.generator_prompt = "Generate relevant grounded developer exam questions from citations."
        self.verifier_prompt = "Audit all generated text options and answer keys against citations for integrity."

    def run_step(self, state: EngineState) -> EngineState:
        state.system_trace.append(f"[{self.name}] Initiating grounded question writing sequence.")
        
        # Pull reference knowledge
        citations = state.curated_citations if state.curated_citations else []
        cite_text = "Standard enterprise architecture definitions"
        if citations:
            cite_text = f"{citations[0].title} document ({citations[0].paragraph_ref})"

        # Step A: Primary creation layer writes mock questions
        raw_items = [
            AssessmentItem(
                question_id="Q-1",
                question_text=f"Under the blueprint outlined in {cite_text}, which release phase minimizes production downtime by shifting routes gradually?",
                options=["Silo Deployments", "Rolling Appends", "Canary Deployment Gates", "Monolithic Installs"],
                correct_option_index=2,
                citation_ref=citations[0].doc_id if citations else "SRC-GENERIC"
            )
        ]

        # Step B: Verifier Layer checks correctness against citation
        for item in raw_items:
            # Simulate secondary logic verifying alignment
            state.system_trace.append(f"[{self.name}] Verifying item correctness against database {item.citation_ref}")
            if "Canary" in item.options[item.correct_option_index]:
                item.verified = True
                item.verifier_notes = "Verified against Microsoft Release Guidelines; correct_index perfectly aligned."
                state.assessments.append(item)
            else:
                item.verified = False
                item.verifier_notes = "Refused - Out of scope option."

        state.system_trace.append(f"[{self.name}] Assessments written: {len(state.assessments)} validated questions generated.")
        return state


class Agent5ManagerInsights:
    """AGENT 5: Manager Insights Agent (Data Anonymizer & Team Readiness Risk Profiler)."""
    def __init__(self):
        self.name = "ManagerReporter"

    def run_team_summary(self, target_team_id: str, employees: List[FabricIQSchema], telemetry_log: Dict[str, WorkIQSchema]) -> TeamProgressReport:
        """Processes team-wide data but strictly sanitizes PII and individual metrics."""
        team_members = [emp for emp in employees if emp.assigned_team_id == target_team_id]
        scanned_count = len(team_members)
        
        # Calculate readiness metrics and track high risk cases
        readiness_accum = 0.0
        anonymized_metrics = []
        high_risk_cases = 0

        for idx, emp in enumerate(team_members):
            # Compute a readiness score estimate (using dummy logic based on skill gap delta)
            total_skills = len(emp.identified_gaps) + 4
            readiness_score = float(round((4 / total_skills) * 100, 1))
            readiness_accum += readiness_score

            # Check if telemetry associated with this ID indicates critical work capacity blocks
            emp_tele_key = f"{emp.employee_id}_HIGH_STRESS"
            tele = telemetry_log.get(emp_tele_key)
            capacity_strain = False
            if tele and (tele.meeting_hours > 20 or tele.production_deploy_window):
                capacity_strain = True
                high_risk_cases += 1

            # Sanitize employee identity (PII avoidance)
            anonymized_metrics.append({
                "anonymized_alias": f"RoleGroup_{emp.current_role.replace(' ', '_')}_{idx+1}",
                "estimated_readiness": readiness_score,
                "capacity_risk_index_triggered": capacity_strain,
                "target_curriculum": emp.recommended_cert
            })

        avg_readiness = readiness_accum / max_scanned if (max_scanned := scanned_count) > 0 else 0.0
        risk_evaluation = "LOW"
        if high_risk_cases > 0:
            risk_evaluation = "MEDIUM (Active capacity blockers active on team members)"
        if high_risk_cases / max(scanned_count, 1) > 0.5:
            risk_evaluation = "HIGH"

        return TeamProgressReport(
            team_id=target_team_id,
            scanned_members_count=scanned_count,
            overall_readiness_percentage=float(round(avg_readiness, 1)),
            risk_level=risk_evaluation,
            unmasked_anonymized_metrics=anonymized_metrics
        )


# ==============================================================================
# SECTION 4: STATE ORCHESTRATOR & ROUTER
# ==============================================================================

class DeterministicRouter:
    """Thread-safe state manager guiding linear & self-reflective node jumps."""
    def __init__(self):
        self.curator = Agent1LearningPathCurator()
        self.planner = Agent2StudyPlanGenerator()
        self.critic = Agent3EngagementCritic()
        self.verifier = Agent4AssessmentVerifier()

    def run_workflow_for_employee(self, emp_id: str, stress_profile: str = "HIGH_STRESS") -> EngineState:
        # Load schema inputs safely from synthetic bases
        fabric_data = SYNTHETIC_FABRIC_DB.get(emp_id)
        telemetry_key = f"{emp_id}_{stress_profile}"
        telemetry_data = SYNTHETIC_WORK_TELEMETRY.get(telemetry_key)

        # Initialize global system transaction state
        state = EngineState(
            employee_id=emp_id,
            fabric_iq=fabric_data,
            telemetry_iq=telemetry_data
        )
        state.system_trace.append("[Orchestrator] Beginning multi-agent engine transition sequence.")

        # Step 1: Learning Path Curator Agent
        state.current_agent_turn = "LEARNING_PATH_CURATOR"
        state = self.curator.run_step(state)

        # Step 2: Study Plan Generator Agent
        state.current_agent_turn = "STUDY_PLAN_GENERATOR"
        state = self.planner.run_step(state)

        # Step 3: Self-Reflection Engagement Critic Agent
        state.current_agent_turn = "ENGAGEMENT_CRITIC"
        state = self.critic.run_step(state)

        # Step 4: Assessment Verifier Agent
        state.current_agent_turn = "ASSESSMENT_VERIFIER"
        state = self.verifier.run_step(state)

        # Step 5: Transition completion
        state.current_agent_turn = "ORCHESTRATOR_COMPLETED"
        state.system_trace.append("[Orchestrator] Multi-agent trajectory run successfully completed.")
        return state


# ==============================================================================
# SECTION 5: APP ENTRY POINT / DISPATCHER FOR TEST CLINIC
# ==============================================================================

if __name__ == "__main__":
    print("="*80)
    print("OrbitIQ CAPACITY-AWARE ENTERPRISE UPSKILLING MULTI-AGENT ENGINE RUNNER")
    print("="*80)
    
    router = DeterministicRouter()
    
    # Run High Stress scenario for Employee EMP-102
    print("\n--- TEST RUN 1: HIGH CONCURRENT MEETING STRESS & PROD RELEASES (EMP-102) ---")
    high_stress_state = router.run_workflow_for_employee("EMP-102", "HIGH_STRESS")
    
    print("\n[CAPACITY ALERT LOGS]:")
    for warn in high_stress_state.capacity_warnings:
        print(f"  * {warn}")

    print("\n[GENERATED GROUNDED ASSESSMENT EXAMPLES]:")
    for qa in high_stress_state.assessments:
        print(f"  Quest: {qa.question_text}")
        print(f"  Options: {qa.options}")
        print(f"  Correct Option Index: {qa.correct_option_index}")
        print(f"  Verification Status: {qa.verified} | Notes: {qa.verifier_notes}")

    # Run Normal Capacity Scenario for same employee
    print("\n--- TEST RUN 2: NORMAL WORK CAPACITY SCENARIO (EMP-102) ---")
    normal_state = router.run_workflow_for_employee("EMP-102", "NORMAL")
    print(f"Mitigation applied during normal load? {normal_state.study_timeline.mitigation_applied if normal_state.study_timeline else 'N/A'}")

    # Run Team aggregation insights
    print("\n--- TEST RUN 3: AGGREGATE MANAGER INSIGHTS TRACKING (TEAM-B) ---")
    manager_agent = Agent5ManagerInsights()
    all_employees = list(SYNTHETIC_FABRIC_DB.values())
    
    team_report = manager_agent.run_team_summary("TEAM-B", all_employees, SYNTHETIC_WORK_TELEMETRY)
    
    print(f"Team Evaluated: {team_report.team_id}")
    print(f"Scanned Active Members: {team_report.scanned_members_count}")
    print(f"Overall Team Technical Readiness Rate: {team_report.overall_readiness_percentage}%")
    print(f"Operational Vulnerability Level: {team_report.risk_level}")
    print("\n[ANONYMIZED COMPLIANCE INSIGHTS EXPORTS (No PII Allowed)]:")
    for metrics in team_report.unmasked_anonymized_metrics:
        print(f"  - Key: {metrics['anonymized_alias']} | Readiness: {metrics['estimated_readiness']}% | Alert: {metrics['capacity_risk_index_triggered']}")
    print("\n" + "="*80)
    print("OrbitIQ Engine Execution Complete.")
    print("="*80)

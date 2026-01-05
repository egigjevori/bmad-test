# BMAD Methodology Setup & Configuration

> How the BMAD Method was configured and applied to the Life OS project.

---

## Overview

Life OS was built using **BMAD (BMad Method)** v6.0.0-alpha.21, an AI-driven agile development methodology that provides structured workflows for taking a project from ideation to deployment.

---

## Installation

The BMAD framework was installed via npm:

```bash
npx bmad-method@alpha install
```

This created the `_bmad/` directory structure with:

```
_bmad/
├── core/                    # Core BMAD platform
│   ├── agents/              # BMad Master agent
│   ├── config.yaml          # Project configuration
│   ├── resources/           # Shared resources
│   ├── tasks/               # Atomic task definitions
│   └── workflows/           # Core workflows (party-mode, brainstorming)
│
├── bmm/                     # BMad Method Module
│   ├── agents/              # 12 specialized AI agents
│   ├── workflows/           # 34+ development workflows
│   ├── testarch/            # Testing infrastructure
│   ├── data/                # Templates and standards
│   └── docs/                # Complete documentation
│
└── _config/                 # Manifests and registry
```

---

## Configuration

### Core Configuration (`_bmad/core/config.yaml`)

```yaml
user_name: Nova
communication_language: English
document_output_language: English
output_folder: "{project-root}/_bmad-output"
```

### Output Structure

All BMAD-generated artifacts are stored in `_bmad-output/`:

```
_bmad-output/
├── PROCESS.md                          # Development journey log
├── IDEA.md                             # Initial concept document
├── project-context.md                  # AI agent context file
├── planning-artifacts/
│   ├── product-brief-life-os-2025-12-29.md
│   ├── architecture-life-os-2025-12-29.md
│   ├── prd.md
│   ├── ux-design-specification.md
│   └── epics.md
└── implementation-artifacts/
    ├── 6-1-theme-toggle.md
    ├── 6-2-widget-management.md
    └── 6-4-github-pages-deployment.md
```

---

## Workflows Used

### Phase 1: Analysis

| Workflow | Purpose | Outcome |
|----------|---------|---------|
| `create-product-brief` | Define vision, users, success metrics | Product Brief |
| `party-mode` | Multi-agent brainstorming | Architecture decisions, scope refinement |

### Phase 2: Planning (Solutioning)

| Workflow | Purpose | Outcome |
|----------|---------|---------|
| `create-architecture` | Technical decisions, patterns | Architecture Doc |
| `create-prd` | Formal requirements | PRD with 39 FRs, 13 NFRs |
| `create-ux-design` | Design system, components | UX Design Specification |

### Phase 3: Solutioning

| Workflow | Purpose | Outcome |
|----------|---------|---------|
| `create-epics-and-stories` | Break down requirements | 6 Epics, 27 Stories |
| `generate-project-context` | AI coding context | project-context.md |

### Phase 4: Implementation

| Workflow | Purpose | Outcome |
|----------|---------|---------|
| `dev-story` | Execute individual stories | Implemented features |
| `quick-dev` | Flexible development | Ad-hoc features (Pomodoro, Journal) |
| `party-mode` | Team discussions | Widget implementations |

---

## Agents Utilized

### Primary Agents

| Agent | Role | When Used |
|-------|------|-----------|
| **BMad Master** | Orchestration, workflow execution | Throughout project |
| **Analyst (John)** | Product vision, requirements | Phase 1 |
| **PM** | Product management, PRD | Phase 2 |
| **Architect (Winston)** | Technical architecture | Phase 2 |
| **UX Designer (Sally)** | Design system, UX patterns | Phase 2 |
| **SM** | Scrum/sprint management | Phase 3-4 |
| **DEV** | Implementation | Phase 4 |

### Party Mode Usage

Party Mode was used for collaborative decision-making:

1. **Initial Scope Definition** - All agents discussed MVP scope
2. **Architecture Decisions** - Winston led technical discussions
3. **UX Principles** - Sally defined design philosophy
4. **Widget Implementation** - Team implemented features in YOLO mode

---

## Key Commands

### Starting BMAD

```
# Load BMad Master
/bmad:core:agents:bmad-master

# Start Party Mode for team discussions
/bmad:core:workflows:party-mode

# Check workflow status
/bmad:bmm:workflows:workflow-status
```

### Creating Artifacts

```
# Create product brief
/bmad:bmm:workflows:create-product-brief

# Create architecture document
/bmad:bmm:workflows:create-architecture

# Create PRD
/bmad:bmm:workflows:create-prd

# Create UX design
/bmad:bmm:workflows:create-ux-design

# Create epics and stories
/bmad:bmm:workflows:create-epics-and-stories

# Generate AI context
/bmad:bmm:workflows:generate-project-context
```

### Implementation

```
# Develop a story
/bmad:bmm:workflows:dev-story

# Quick development (flexible)
/bmad:bmm:workflows:quick-dev

# Code review
/bmad:bmm:workflows:code-review
```

---

## YOLO Mode

YOLO mode was used during implementation for rapid development:

```
# In party mode
"implement in yolo mode"
```

YOLO mode characteristics:
- Minimal prompts
- Autonomous decision-making
- Proceed without confirmation
- Best for well-defined tasks

---

## Best Practices Learned

### 1. Document Early

Create PROCESS.md from day one to track decisions and progress.

### 2. Use Party Mode for Decisions

Multi-agent discussions surface different perspectives:
- PM challenges scope
- Architect proposes solutions
- UX ensures usability

### 3. Generate Project Context

The `project-context.md` file is invaluable for AI-assisted development:
- Technology versions
- Coding patterns
- Anti-patterns to avoid

### 4. Iterate on Scope

Initial scope was 9 features; MVP delivered 5 core widgets. This was the right call.

### 5. Track Everything

The PROCESS.md file became the project's memory:
- Decisions made and why
- Artifacts created
- Implementation progress

---

## File Locations

| Resource | Path |
|----------|------|
| BMAD Core | `_bmad/core/` |
| BMAD Method Module | `_bmad/bmm/` |
| Configuration | `_bmad/core/config.yaml` |
| Output | `_bmad-output/` |
| Process Log | `_bmad-output/PROCESS.md` |
| Documentation | `_bmad/bmm/docs/` |

---

## References

- [BMAD Documentation Hub](./_bmad/bmm/docs/index.md)
- [Quick Start Guide](./_bmad/bmm/docs/quick-start.md)
- [Agents Guide](./_bmad/bmm/docs/agents-guide.md)
- [Party Mode Guide](./_bmad/bmm/docs/party-mode.md)
- [BMAD GitHub](https://github.com/bmad-code-org/BMAD-METHOD)
- [BMAD Discord](https://discord.gg/gk8jAdXWmj)

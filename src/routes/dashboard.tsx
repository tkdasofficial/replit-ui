import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowUp,
  BarChart3,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  FileCode2,
  FileSpreadsheet,
  FolderGit2,
  Gauge,
  Image,
  Globe2,
  Import,
  Layers3,
  Lightbulb,
  Library,
  Menu,
  Mic,
  MoreHorizontal,
  Pin,
  Presentation,
  PanelLeft,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  ListChecks,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { AppDrawer } from "@/components/AppDrawer";
import { projectSlug } from "@/lib/projects";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Evo Agent" },
      { name: "description", content: "Overview of your projects and agent activity." },
      { property: "og:title", content: "Dashboard — Evo Agent" },
      { property: "og:description", content: "Overview of your projects and agent activity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EvoAgent,
});

const recent = ["Hyper Copilot", "Stellar Dashboard", "Pulse Commerce", "Nexus API"];
const dashboardProjects = [
  { name: "Hyper Copilot", kind: "Agent workspace", tone: "amber" },
  { name: "Stellar Dashboard", kind: "Analytics", tone: "blue" },
  { name: "Pulse Commerce", kind: "Storefront", tone: "green" },
  { name: "Nexus API", kind: "Developer tools", tone: "coral" },
] as const;

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-mark" aria-label="Evo Agent">
      <span />
      <span />
      <span />
      {!compact && <b>Evo</b>}
    </div>
  );
}

export function EvoAgent() {
  const [drawer, setDrawer] = useState(false);
  const navigate = useNavigate();
  const openProject = (name: string) => void navigate({ to: "/project/$projectId", params: { projectId: projectSlug(name) } });
  const [prompt, setPrompt] = useState("");
  const [running, setRunning] = useState(false);

  const beginTask = () => {
    if (!prompt.trim()) return;
    setRunning(true);
    openProject("WebsiteToApk");
  };

  return (
    <div className="app-shell">
      <aside className="desktop-sidebar">
        <div className="sidebar-brand"><BrandMark /><button className="icon-button" aria-label="Collapse sidebar"><PanelLeft /></button></div>
        <button className="new-project"><Plus /> New project</button>
        <nav className="side-nav" aria-label="Main navigation">
          <button className="active"><Sparkles /> Agent</button>
          <button><FolderGit2 /> Projects</button>
          <button><Library /> Templates</button>
          <button><Clock3 /> Activity</button>
          <button><Boxes /> Integrations</button>
        </nav>
        <p className="nav-label">Recent</p>
        <div className="recent-list">
          {recent.map((name, index) => <button key={name}><span className={`project-dot dot-${index}`} />{name}<MoreHorizontal /></button>)}
        </div>
        <div className="sidebar-footer"><button><CircleHelp /> Help</button><button><Settings /> Settings</button><div className="profile"><span>TK</span><div><b>TK Das</b><small>Personal workspace</small></div><MoreHorizontal /></div></div>
      </aside>

      <div className="main-frame">
        <header className={"topbar home-topbar"}>
          <button className="icon-button mobile-only" onClick={() => setDrawer(true)} aria-label="Open navigation"><Menu /></button>
          <div className="project-switcher"><BrandMark compact /><span>Evo Agent</span><ChevronDown /></div>
          <div className="command-search"><Search /><span>Search projects and commands</span><kbd>⌘ K</kbd></div>
          <div className="top-actions"><button className="icon-button" aria-label="Tools"><Wrench /></button><button className="icon-button" aria-label="Tasks"><Clock3 /></button><div className="avatar">TK</div></div>
        </header>

        <Home openProject={openProject} openDrawer={() => setDrawer(true)} prompt={prompt} setPrompt={setPrompt} beginTask={beginTask} />
      </div>

      <AppDrawer open={drawer} onClose={() => setDrawer(false)} onOpenProject={openProject} onNew={() => { setPrompt(""); setRunning(false); }} />
    </div>
  );
}

function Home({ openProject, openDrawer, prompt, setPrompt, beginTask }: { openProject: (name: string) => void; openDrawer: () => void; prompt: string; setPrompt: (v: string) => void; beginTask: () => void }) {
  return (
    <main className="home-page">
      <div className="home-inner">
        <div className="dashboard-mobile-head"><button onClick={openDrawer} aria-label="Open sidebar"><PanelLeft /></button><Lightbulb /></div>
        <div className="eyebrow"><span className="live-dot" /> SYSTEM READY <span>v1.0</span></div>
        <h1>What are we working<br />on today?</h1>
        <section className="projects-section" aria-labelledby="projects-heading">
          <div className="projects-head"><span id="projects-heading">Projects</span><button>Show all <ChevronRight /></button></div>
          <div className="project-scroll">
            {dashboardProjects.map((project) => (
              <button className="project-card" key={project.name} onClick={() => openProject(project.name)}>
                <span className={`project-thumb project-thumb-${project.tone}`}><i /><i /><FolderGit2 /></span>
                <span className="project-meta"><b>{project.name}</b><small>{project.kind}</small></span>
              </button>
            ))}
          </div>
        </section>
        <div className="idea-list">
          <button onClick={() => setPrompt("Turn my notes into slides")}><Presentation className="coral" /> Turn my notes into slides</button>
          <button onClick={() => setPrompt("Analyze a Google Sheet")}><FileSpreadsheet className="green" /> Analyze a Google Sheet</button>
          <button onClick={() => setPrompt("Find three directions")}><Sparkles className="orange" /> Find three directions</button>
          <button onClick={() => setPrompt("Turn a sheet into a dashboard")}><BarChart3 className="blue" /> Turn a sheet into a dashboard</button>
        </div>
      </div>
      <Composer prompt={prompt} setPrompt={setPrompt} beginTask={beginTask} placeholder="Start chatting or describe a task..." />
    </main>
  );
}

function Composer({ prompt, setPrompt, beginTask, placeholder, compact = false }: { prompt: string; setPrompt: (v: string) => void; beginTask: () => void; placeholder: string; compact?: boolean }) {
  const [model, setModel] = useState("Speed");
  const [modelMenu, setModelMenu] = useState(false);
  const models = ["Speed", "Flash", "Heavy"];

  return <div className={`composer-wrap ${compact ? "compact" : ""}`}><div className="composer"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={placeholder} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); beginTask(); } }} /><div className="composer-actions"><button aria-label="Attach"><Plus /></button><div className="model-select"><button className="model" onClick={() => setModelMenu(!modelMenu)} aria-haspopup="listbox" aria-expanded={modelMenu}><Zap /> {model} <ChevronDown /></button>{modelMenu && <div className="model-menu" role="listbox" aria-label="Select model">{models.map((name) => <button key={name} role="option" aria-selected={model === name} onClick={() => { setModel(name); setModelMenu(false); }}><span>{name}</span>{model === name && <span className="model-check">✓</span>}</button>)}</div>}</div><button aria-label="Voice"><Mic /></button></div></div></div>;
}


import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowDown, ChevronUp, CheckCircle2, FilePen, Play, BookOpen, BrainCircuit, ChevronDown, CircleGauge, Code2, Database, ExternalLink, FolderGit2, Gauge, Globe2, Image, Layers3, ListChecks, MoreHorizontal, Plus, Rocket, Search, ShieldCheck, Sparkles, SquareTerminal, X } from "lucide-react";
import { useState } from "react";
import { AppDrawer } from "@/components/AppDrawer";
import { ChatInput } from "@/components/ChatInput";
import { Header, type WorkspaceView } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { projectName as nameFor, projectSlug } from "@/lib/projects";

export const Route = createFileRoute("/project/$projectId")({
  head: () => ({ meta: [
    { title: "Project workspace — Evo Agent" },
    { name: "description", content: "Build, review, and manage software projects from one focused workspace." },
    { property: "og:title", content: "Project workspace — Evo Agent" },
    { property: "og:description", content: "Build, review, and manage software projects from one focused workspace." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: EvoAgent,
});

const tools = [
  [Rocket, "Publishing", "Publish a shareable version of your App, unaffected by changes made in the project editor"],
  [Globe2, "Domains", "Manage custom domains for your published project"],
  [Gauge, "Monitoring", "View app health, request metrics, and alerts for your published app."],
  [Sparkles, "Growth", "Find, fix, and monitor SEO and growth opportunities"],
  [Database, "Database", "Stores structured data such as user profiles, game scores, and product catalogs."],
  [ShieldCheck, "Users & Auth", "Secure sign-in and account management for your application."],
  [ShieldCheck, "Security Center", "Scan your app for vulnerabilities and exposed secrets."],
  [SquareTerminal, "Console", "View logs and output from your running app."],
  [SquareTerminal, "Shell", "Run commands directly in your project environment."],
  [ListChecks, "Workflows", "Configure how your app starts, builds, and runs."],
  [Code2, "Developer", "Advanced tools for inspecting and editing code."],
  [FolderGit2, "Files", "Browse and edit files in your project."],
  [BookOpen, "Library", "Reusable components, assets, and templates."],
] as const;

function EvoAgent() {
  const navigate = useNavigate();
  const { projectId } = Route.useParams();
  const name = nameFor(projectId);
  const [drawer, setDrawer] = useState(false);
  const [workspace, setWorkspace] = useState(true);
  const [view, setView] = useState<WorkspaceView>("agent");
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submit = () => { if (!prompt.trim()) return; setWorkspace(true); setSubmitted(true); setView("agent"); };
  const openWorkspace = (p?: string) => { setWorkspace(true); setView("agent"); if (p) void navigate({ to: "/project/$projectId", params: { projectId: projectSlug(p) } }); };

  return <div className="app-shell workspace-shell">
    <AppDrawer open={drawer} onClose={() => setDrawer(false)} onNew={() => void navigate({ to: "/dashboard" })} onOpenProject={openWorkspace} />
    <div className="main-frame">
      <Header workspace={workspace} view={view} onViewChange={setView} projectName={name} onOpenDrawer={() => setDrawer(true)} />
      <Workspace key={projectId} view={view} prompt={prompt} setPrompt={setPrompt} onSubmit={submit} submitted={submitted} />
    </div>
  </div>;
}


function Workspace({ view, prompt, setPrompt, onSubmit, submitted }: { view: WorkspaceView; prompt: string; setPrompt: (value: string) => void; onSubmit: () => void; submitted: boolean }) {
  const [toolSearch, setToolSearch] = useState("");
  return <main className={`workspace-page view-${view}`}>
    {view === "agent" ? <AgentView submitted={submitted} prompt={prompt} /> : view === "tools" ? <ToolsView search={toolSearch} /> : <TasksView />}
    {view === "agent" && <ChatInput value={prompt} onChange={setPrompt} onSubmit={onSubmit} />}
    {view === "tools" && <div className="tool-search"><Search /><input value={toolSearch} onChange={(event) => setToolSearch(event.target.value)} placeholder="Search tools…" aria-label="Search tools" /></div>}
    {view === "tasks" && <Button variant="outline" className="new-task"><Plus /><span>New task</span><b><Sparkles />Core</b></Button>}
    <LaunchBar />
  </main>;
}

type Act = [typeof BookOpen, string, boolean?];
const g0: Act[] = [[SquareTerminal, "Configured workflow"], [Play, "Started the application"], [BrainCircuit, "Planned the implementation", true]];
const g1: Act[] = [[BookOpen, "Opened index_1764518134621.html"], [BookOpen, "Opened ErrorBoundary.tsx"], [BookOpen, "Opened ThemedText.tsx"], [BookOpen, "Opened ThemedView.tsx"], [BookOpen, "Opened MainTabNavigator.tsx"], [BrainCircuit, "Generated app icon and assets", true]];
const g2: Act[] = [[Image, "Generated image", true], [BookOpen, "Opened HomeStackNavigator.tsx"], [BookOpen, "Opened screenOptions.ts"], [BookOpen, "Opened useScreenInsets.ts"], [BookOpen, "Opened Card.tsx"], [BookOpen, "Opened Button.tsx"], [BookOpen, "Opened ScreenScrollView.tsx"], [BookOpen, "Opened ScreenKeyboardAwareScrollView.tsx"], [BookOpen, "Opened ErrorFallback.tsx"], [BrainCircuit, "Decided on architecture", true]];
const g3: Act[] = [[SquareTerminal, "Ran npm install"], [BrainCircuit, "Planned app structure", true], [FilePen, "Edited app.json"], [FilePen, "Edited theme.ts"], [BookOpen, "Opened App.tsx"], [BrainCircuit, "Reviewed changes", true]];

function AgentView({ submitted, prompt }: { submitted: boolean; prompt: string }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const t = (i: number) => () => setExpanded(expanded === i ? null : i);
  return <section className="agent-view"><div className="chat-feed">
    <div className="msg-user">{submitted && prompt ? prompt : "This is my complete website HTML File. You convert this file to a Android App (Apk)."}</div>
    <div className="msg-age">{submitted ? "Just now" : "10 months ago"}</div>
    <p className="msg-ai">I&apos;ll help you convert this HTML file into an Android app. Let me analyze the file and create a plan for building a mobile app using React Native with Expo.</p>
    <StatusRow icon={CircleGauge} text="Worked for 20 seconds" />
    <ActionGroup count={3} actions={g0} expanded={expanded === 0} onToggle={t(0)} />
    <p className="msg-ai">I&apos;ll convert your eSports PlayGround website into a React Native mobile app. Let me start by reading the complete HTML file and then building the app.</p>
    <ActionGroup count={6} actions={g1} expanded={expanded === 1} onToggle={t(1)} />
    <p className="msg-ai">Now I have a good understanding of the website. Let me start building the eSports PlayGround mobile app. I&apos;ll generate the app icon and read more template files.</p>
    <ActionGroup count={10} actions={g2} expanded={expanded === 2} onToggle={t(2)} />
    <p className="msg-ai">Now I have all the information I need. Let me copy the icon to assets and start building the app. I&apos;ll update the theme, app.json, and create the full app structure.</p>
    <ActionGroup count={13} actions={g3} expanded={expanded === 3} onToggle={t(3)} />
    <StatusRow icon={CheckCircle2} text="Checkpoint made 10 months ago" ok />
    <Button variant="outline" className="scroll-latest"><ArrowDown />Scroll to latest</Button>
  </div></section>;
}

function StatusRow({ icon: Icon, text, ok }: { icon: typeof CircleGauge; text: string; ok?: boolean }) {
  return <button type="button" className="act-row act-status"><i className={ok ? "ok" : ""}><Icon /></i><span>{text}</span><ChevronDown className="act-chev" /></button>;
}

function ActionGroup({ count, actions, expanded, onToggle }: { count: number; actions: Act[]; expanded: boolean; onToggle: () => void }) {
  const chips = actions.length > 5 ? [...actions.slice(0, 4), null, actions[actions.length - 1]] : actions;
  return <div className={`act-group ${expanded ? "open" : ""}`}>
    {expanded
      ? <button type="button" className="act-row" onClick={onToggle} aria-expanded><i><ChevronUp /></i><span>Show less</span></button>
      : <button type="button" className="act-summary" onClick={onToggle} aria-expanded={false}><span className="act-chips">{chips.map((a, i) => <i key={i}>{a ? (() => { const I = a[0]; return <I />; })() : <MoreHorizontal />}</i>)}</span><span>{count} actions</span></button>}
    {expanded && <div className="act-list">{actions.map(([Icon, label, more], i) => <div className="act-row" key={i}><i><Icon /></i><span>{label}</span>{more && <ChevronDown className="act-chev" />}</div>)}</div>}
  </div>;
}

function ToolsView({ search }: { search: string }) {
  const visible = tools.filter(([, title, description]) => `${title} ${description}`.toLowerCase().includes(search.toLowerCase()));
  return <section className="tools-view view-slide"><p className="section-kicker">Replit Cloud</p><div className="tool-grid">{visible.map(([Icon, title, description]) => <Button variant="outline" key={title}><Icon /><span><b>{title}</b><small>{description}</small></span></Button>)}</div>{visible.length === 0 && <p className="tools-empty">No tools found</p>}</section>;
}
function TasksView() {
  const [intro, setIntro] = useState(true);
  return <section className="tasks-view view-slide">
    {intro && <div className="tasks-intro"><div className="tasks-intro-top"><span className="tasks-new">New</span><Button variant="ghost" size="icon" aria-label="Dismiss" onClick={() => setIntro(false)}><X /></Button></div>
      <div className="tasks-dots">{["muted","blue","green","gold","violet"].map((c) => <i key={c} className={`dot-${c}`}><span /></i>)}</div>
      <p>Background tasks allow you to get more work done at once.</p><p>Try creating your first one!</p><a href="#" onClick={(e) => e.preventDefault()}>View documentation</a></div>}
    {[["Ready","No ready tasks"],["Active","No active tasks"],["Draft","No draft tasks"]].map(([title, empty]) => <div className="task-section" key={title}><h2>{title}</h2><div>{empty}</div></div>)}
  </section>;
}
function LaunchBar() { return <div className="launch-bar"><Button variant="outline" size="icon" aria-label="Preview panels"><Layers3 /></Button><Button variant="outline" className="launch-main">Open Mobile App</Button><Button variant="outline" size="icon" aria-label="Publish application"><ExternalLink /></Button></div>; }

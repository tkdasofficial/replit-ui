import { useNavigate } from "@tanstack/react-router";
import { Bot, ChevronDown, FolderGit2, Import, Layers3, Library, MoreHorizontal, PanelLeft, Pin, Plus, Search, Settings, X } from "lucide-react";
import { useState } from "react";

function BrandMark() {
  return <div className="brand-mark" aria-label="Evo Agent"><span /><span /><span /></div>;
}

const allProjects = [
  { name: "hyper-copilot-sandbox", chat: false },
  { name: "Clone hyper copilot sandbox", chat: true },
  { name: "hyper-copilot-sandbox-1", chat: false },
  { name: "elite-veo", chat: false },
  { name: "Stellar Dashboard", chat: false },
  { name: "Pulse Commerce", chat: false },
  { name: "Nexus API", chat: false },
];
const workspaces = ["Personal workspace", "Team workspace"];

function DrawerPanel({ close, setWorkspace, goHome }: { close: () => void; setWorkspace: (name: string) => void; goHome: () => void }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(allProjects);
  const [pinned, setPinned] = useState<string[]>([]);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [ws, setWs] = useState(workspaces[0]);
  const [wsOpen, setWsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const go = (to: "/import" | "/library" | "/integrations" | "/dashboard") => { close(); navigate({ to }); };
  const list = projects
    .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(pinned.includes(b.name)) - Number(pinned.includes(a.name)));
  const togglePin = (name: string) => setPinned((p) => (p.includes(name) ? p.filter((n) => n !== name) : [...p, name]));

  return <div className="drawer-backdrop" onClick={close}><aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
    {search === null
      ? <div className="drawer-head"><button className="bare" onClick={() => go("/dashboard")} aria-label="Dashboard"><BrandMark /></button><div><button className="bare" aria-label="Search projects" onClick={() => setSearch("")}><Search /></button><button className="bare" aria-label="Close sidebar" onClick={close}><PanelLeft /></button></div></div>
      : <div className="drawer-head drawer-head-search"><Search /><input autoFocus className="drawer-search" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} /><button className="bare" aria-label="Close search" onClick={() => setSearch(null)}><X /></button></div>}
    <div className="ws-wrap">
      <button className="workspace-pill" onClick={() => setWsOpen(!wsOpen)} aria-expanded={wsOpen}><span>{ws === workspaces[0] ? "TK" : "TM"}</span> {ws} <ChevronDown /></button>
      {wsOpen && <div className="drawer-menu">{workspaces.map((w) => <button key={w} onClick={() => { setWs(w); setWsOpen(false); }}>{w}{w === ws && <span className="model-check">✓</span>}</button>)}</div>}
    </div>
    <button className="drawer-new" onClick={() => { goHome(); close(); }}><Plus /> New</button>
    <nav><button onClick={() => go("/library")}><Library /> Library</button><button onClick={() => go("/import")}><Import /> Import</button><button onClick={() => go("/integrations")}><Layers3 /> Integrations</button></nav>
    <p className="nav-label">Recent</p>
    <div className="drawer-recent">{list.length === 0 && <p className="drawer-empty">No projects found</p>}{list.map((p) => <div key={p.name} className="recent-row">
      <button className="recent-open" onClick={() => setWorkspace(p.name)}>{p.chat ? <Bot /> : <FolderGit2 />}<span>{p.name}</span></button>
      <button className={`bare ${pinned.includes(p.name) ? "pinned" : ""}`} aria-label="Pin" onClick={() => togglePin(p.name)}><Pin /></button>
      <button className="bare" aria-label="More" onClick={() => setMenuFor(menuFor === p.name ? null : p.name)}><MoreHorizontal /></button>
      {menuFor === p.name && <div className="drawer-menu row-menu"><button onClick={() => setWorkspace(p.name)}>Open</button><button onClick={() => { togglePin(p.name); setMenuFor(null); }}>{pinned.includes(p.name) ? "Unpin" : "Pin"}</button><button onClick={() => { setProjects((ps) => ps.filter((x) => x.name !== p.name)); setMenuFor(null); }}>Remove</button></div>}
    </div>)}</div>
    <div className="ws-wrap account-wrap">
      {settingsOpen && <div className="drawer-menu up"><button onClick={() => setSettingsOpen(false)}>Account</button><button onClick={() => setSettingsOpen(false)}>Preferences</button><button onClick={() => { setSettingsOpen(false); close(); }}>Sign out</button></div>}
      <div className="drawer-account"><span>TK</span><b>TK Das</b><button className="bare" aria-label="Settings" onClick={() => setSettingsOpen(!settingsOpen)}><Settings /></button></div>
    </div>
  </aside></div>;
}
export function AppDrawer({ open, onClose, onNew, onOpenProject }: { open: boolean; onClose: () => void; onNew: () => void; onOpenProject: (name: string) => void }) {
  if (!open) return null;
  return <DrawerPanel close={onClose} setWorkspace={(name) => { onOpenProject(name); onClose(); }} goHome={onNew} />;
}

import { Bot, CheckSquare, ChevronDown, ChevronLeft, ListChecks, Menu, PanelLeft, Search, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type WorkspaceView = "agent" | "tools" | "tasks";

function ProjectGlyph() {
  return <span className="project-glyph" aria-hidden="true"><i /><i /><i /></span>;
}

export function Header({ workspace, view, onViewChange, onOpenDrawer, projectName = "WebsiteToApk" }: {
  projectName?: string;
  workspace: boolean;
  view: WorkspaceView;
  onViewChange: (view: WorkspaceView) => void;
  onOpenDrawer: () => void;
}) {
  if (workspace) {
    return (
      <header className="workspace-header" aria-label="Workspace navigation">
        {view === "agent"
          ? <Button variant="ghost" size="icon" className="workspace-menu" onClick={onOpenDrawer} aria-label="Open sidebar"><PanelLeft /></Button>
          : <Button variant="ghost" size="icon" className="workspace-menu" onClick={() => onViewChange("agent")} aria-label="Back to agent"><ChevronLeft /></Button>}
        <nav className="workspace-switcher" aria-label="Workspace pages">
          <Button variant="ghost" className={cn("workspace-tab workspace-project", view === "agent" && "active")} onClick={() => onViewChange("agent")} aria-label={projectName} aria-current={view === "agent" ? "page" : undefined}>
            <ProjectGlyph />{view === "agent" && <><span>{projectName}</span><ChevronDown className="tab-chevron" /></>}
          </Button>
          <Button variant="ghost" className={cn("workspace-tab", view === "tools" && "active")} onClick={() => onViewChange("tools")} aria-label="Tools" aria-current={view === "tools" ? "page" : undefined}>
            <Wrench />{view === "tools" && <span>Tools</span>}
          </Button>
          <Button variant="ghost" className={cn("workspace-tab", view === "tasks" && "active")} onClick={() => onViewChange("tasks")} aria-label="Tasks" aria-current={view === "tasks" ? "page" : undefined}>
            <ListChecks />{view === "tasks" && <span>Tasks</span>}
          </Button>
        </nav>
      </header>
    );
  }

  return (
    <header className="topbar home-topbar">
      <Button variant="ghost" size="icon" className="mobile-only" onClick={onOpenDrawer} aria-label="Open navigation"><Menu /></Button>
      <div className="project-switcher"><ProjectGlyph /><span>Evo Agent</span><ChevronDown /></div>
      <div className="command-search"><Search /><span>Search projects and commands</span><kbd>⌘ K</kbd></div>
      <div className="top-actions"><Button variant="ghost" size="icon" aria-label="Tools"><Wrench /></Button><Button variant="ghost" size="icon" aria-label="Tasks"><Bot /></Button><div className="avatar">TK</div></div>
    </header>
  );
}

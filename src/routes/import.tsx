import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Code2, FileArchive, FolderUp, Github, Gitlab, Sheet, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Import — Evo Agent" },
      { name: "description", content: "Bring repositories, ZIP files, folders and spreadsheets into Evo." },
      { property: "og:title", content: "Import — Evo Agent" },
      { property: "og:description", content: "Bring repositories, ZIP files, folders and spreadsheets into Evo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ImportPage,
});

function Bitbucket() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3.5a.7.7 0 0 0-.7.8l2.7 16.4a1 1 0 0 0 1 .8h12.1a.7.7 0 0 0 .7-.6l2.9-16.6a.7.7 0 0 0-.7-.8zm11.2 11.6H9.9L8.8 8.9h6.5z" /></svg>;
}

type Item = { id: string; title: string; desc: string; icon: LucideIcon | typeof Bitbucket; kind?: "zip" | "dir" };
const items: Item[] = [
  { id: "github", title: "GitHub", desc: "Import any repository or existing app. Agent may be less predictable.", icon: Github },
  { id: "gitlab", title: "GitLab", desc: "Import a repository from GitLab. Agent support may be limited.", icon: Gitlab },
  { id: "bitbucket", title: "Bitbucket", desc: "Import a repository or existing app. Agent support may be limited.", icon: Bitbucket },
  { id: "zip", title: "Upload ZIP", desc: "Import a project from a .zip file.", icon: FileArchive, kind: "zip" },
  { id: "dir", title: "Upload Directory", desc: "Pick a folder from your device to import its files.", icon: FolderUp, kind: "dir" },
  { id: "sheet", title: "Spreadsheet", desc: "Create an app from Excel, CSV, or Google Sheets data.", icon: Sheet },
  { id: "empty", title: "Empty", desc: "Start from a completely empty project without Agent setup or scaffolding.", icon: Code2 },
];

function ImportPage() {
  const zipRef = useRef<HTMLInputElement>(null);
  const dirRef = useRef<HTMLInputElement>(null);
  const [note, setNote] = useState<string | null>(null);
  const pick = (it: Item) => {
    if (it.kind === "zip") return zipRef.current?.click();
    if (it.kind === "dir") return dirRef.current?.click();
    setNote(`${it.title} import selected`);
  };
  return (
    <main className="import-page">
      <Link to="/dashboard" className="import-back"><ArrowLeft size={15} /> Back to Evo</Link>
      <h1>Import to Evo</h1>
      <p className="import-sub">Migrate data, code, and designs from other apps into Evo</p>
      <div className="import-list">
        {items.map((it) => { const I = it.icon; return (
          <Button key={it.id} variant="ghost" className="import-card" onClick={() => pick(it)}>
            <span className="import-icon"><I /></span>
            <span className="import-text"><b>{it.title}</b><span>{it.desc}</span></span>
            <ArrowRight className="import-arrow" />
          </Button>
        ); })}
      </div>
      {note && <p className="import-note" role="status">{note}</p>}
      <input ref={zipRef} type="file" accept=".zip" hidden onChange={(e) => e.target.files?.[0] && setNote(`Selected ${e.target.files[0].name}`)} />
      <input ref={dirRef} type="file" hidden multiple {...({ webkitdirectory: "" } as Record<string, string>)} onChange={(e) => e.target.files?.length && setNote(`Selected ${e.target.files.length} files`)} />
    </main>
  );
}

import { ArrowUp, Blocks, Check, ChevronDown, Grip, Lock, Mic, Palette, Plus, Sparkles, Upload, Wand2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const attachItems = [
  [Upload, "Upload a file"],
  [Wand2, "Use a skill"],
  [Palette, "Use a design system"],
  [Blocks, "Add an integration"],
  [Sparkles, "Create something new"],
] as const;

const modes = [
  { name: "Free", note: "No credits used", locked: false },
  { name: "Power", note: "Auto", locked: true },
  { name: "Max", note: "Auto", locked: true },
];

export function AttachmentMenu({ onClose }: { onClose: () => void }) {
  return <div className="attach-menu" role="menu">{attachItems.map(([Icon, label]) => <Button key={label} variant="ghost" role="menuitem" onClick={onClose}><Icon />{label}</Button>)}</div>;
}

export function AgentModeModal({ mode, onPick, onClose }: { mode: string; onPick: (m: string) => void; onClose: () => void }) {
  return <div className="mode-backdrop" onClick={onClose}><div className="mode-sheet" role="dialog" aria-label="Agent mode" onClick={(e) => e.stopPropagation()}>
    <div className="mode-head"><b>Agent mode</b><Button variant="ghost" size="icon" aria-label="Close" onClick={onClose}><X /></Button></div>
    <p className="mode-label">Modes</p>
    {modes.map((m) => <Button key={m.name} variant="ghost" className="mode-row" disabled={m.locked} onClick={() => { onPick(m.name); onClose(); }}>
      <span><b>{m.name}</b><small>{m.note}</small></span>{m.locked ? <Lock /> : m.name === mode ? <Check /> : null}
    </Button>)}
    <p className="mode-label">Models</p>
    <Button variant="ghost" className="mode-row" onClick={onClose}><span><b>Default</b><small>Best model for the task</small></span><Check /></Button>
    <Button variant="ghost" className="mode-row" onClick={onClose}><span><b>Advanced settings</b></span><ChevronDown className="-rotate-90" /></Button>
  </div></div>;
}

export function ChatInput({ value, onChange, onSubmit, placeholder = "Make, test, iterate…", home = false }: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  home?: boolean;
}) {
  const [plan, setPlan] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const [model, setModel] = useState("Free");

  return (
    <div className={`chat-input-wrap ${home ? "home-chat-input" : ""}`}>
      {attachOpen && <AttachmentMenu onClose={() => setAttachOpen(false)} />}
      <div className="chat-input">
        <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label="Message" onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); onSubmit(); } }} />
        <div className="chat-toolbar">
          <Button variant="ghost" size="icon" aria-label="Attach" aria-expanded={attachOpen} onClick={() => setAttachOpen(!attachOpen)}><Plus /></Button>
          {!home && <Button variant="ghost" className={`plan-toggle ${plan ? "selected" : ""}`} onClick={() => setPlan(!plan)} aria-pressed={plan}><i />Plan</Button>}
          <div className="chat-model">
            <Button variant="ghost" onClick={() => setModelOpen(true)} aria-haspopup="dialog"><Grip />{model}<ChevronDown /></Button>
          </div>
          <Button variant="ghost" size="icon" aria-label="Voice input"><Mic /></Button>
          <Button variant="ghost" size="icon" className="send-message" onClick={onSubmit} disabled={!value.trim()} aria-label="Send message"><ArrowUp /></Button>
        </div>
      </div>
      {modelOpen && <AgentModeModal mode={model} onPick={setModel} onClose={() => setModelOpen(false)} />}
    </div>
  );
}

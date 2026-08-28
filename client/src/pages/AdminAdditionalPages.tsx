// Tagpuan style: warm scrapbook operations — cream paper, brown ink, terracotta actions, editorial type, tactile artifacts.

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Archive,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CloudUpload,
  Eye,
  FileImage,
  FileText,
  Filter,
  Flag,
  FolderOpen,
  Image as ImageIcon,
  ImagePlus,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Pencil,
  Play,
  Plus,
  Search,
  Send,
  Sparkles,
  Star,
  Tag,
  Trash2,
  UploadCloud,
  UserCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

const asset = {
  next: "/assets/tagpuan/next-gathering.jpg",
  sunday: "/assets/tagpuan/sunday-sessions.jpg",
  creative: "/assets/tagpuan/creative-nights.jpg",
  weeknight: "/assets/tagpuan/weeknight-hang.jpg",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: ReactNode; action?: ReactNode }) {
  return <header className="page-header section-page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action ? <div className="header-actions">{action}</div> : null}</header>;
}

function Notice({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="toast success"><CheckCircle2 size={17} />{message}<button type="button" onClick={onClose} aria-label="Dismiss notification"><X size={15} /></button></div>;
}

function MetricStrip({ items }: { items: Array<{ label: string; value: string; icon: ReactNode; tone?: string }> }) {
  return <div className="section-metrics">{items.map((item) => <div className="section-metric" key={item.label}><span className={cn("metric-icon", item.tone)}>{item.icon}</span><div><strong>{item.value}</strong><span>{item.label}</span></div></div>)}</div>;
}

function Tabs({ items, value, onChange }: { items: string[]; value: string; onChange: (value: string) => void }) {
  return <div className="section-tabs" role="tablist">{items.map((item) => <button type="button" key={item} className={cn(value === item && "active")} onClick={() => onChange(item)}>{item}</button>)}</div>;
}

function SearchBar({ value, onChange, placeholder = "Search this section..." }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <div className="section-search"><Search size={17} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label={placeholder} /><button type="button" aria-label="More filters"><Filter size={16} /></button></div>;
}

function ActionPill({ children, onClick, primary = false }: { children: ReactNode; onClick?: () => void; primary?: boolean }) {
  return <button type="button" className={cn("button small action-pill", primary ? "primary" : "outline")} onClick={onClick}>{children}</button>;
}

function DetailDrawer({ eyebrow, title, description, children, actions, onClose }: { eyebrow: string; title: string; description?: ReactNode; children: ReactNode; actions?: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = previousOverflow; };
  }, [onClose]);
  return <><button className="drawer-backdrop" type="button" aria-label="Close detail drawer" onClick={onClose} /><aside className="detail-drawer" role="dialog" aria-modal="true" aria-labelledby="detail-drawer-title"><div className="drawer-topbar"><span className="drawer-eyebrow">{eyebrow}</span><button className="icon-button" type="button" onClick={onClose} aria-label="Close detail drawer"><X size={19} /></button></div><div className="drawer-scroll"><h2 id="detail-drawer-title">{title}</h2>{description ? <p className="drawer-description">{description}</p> : null}{children}</div>{actions ? <div className="drawer-footer">{actions}</div> : null}</aside></>;
}

function DrawerMeta({ items }: { items: Array<{ label: string; value: ReactNode }> }) {
  return <div className="drawer-meta-grid">{items.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div>;
}

function DrawerAction({ children, onClick, primary = false }: { children: ReactNode; onClick?: () => void; primary?: boolean }) {
  return <button type="button" className={cn("button drawer-action", primary ? "primary" : "outline")} onClick={onClick}>{children}</button>;
}

const recaps = [
  { title: "The Social Room", date: "Aug 29, 2026", photos: 24, notes: "A night of speed friending, open mic, and good conversations.", status: "Ready to publish", image: asset.next },
  { title: "Sunday Sessions", date: "Aug 15, 2026", photos: 18, notes: "Co-work, share what you’re building, and learn from each other.", status: "Published", image: asset.sunday },
  { title: "Weeknight Hang", date: "Jul 25, 2026", photos: 0, notes: "Good talks, new friends, and a whole lot of laughs.", status: "Needs photos", image: asset.weeknight },
];

export function RecapsPage() {
  const [tab, setTab] = useState("All recaps");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null); const [selectedRecap, setSelectedRecap] = useState<(typeof recaps)[number] | null>(null);
  const filtered = useMemo(() => recaps.filter((item) => {
    const searchMatch = `${item.title} ${item.notes}`.toLowerCase().includes(query.toLowerCase());
    const tabMatch = tab === "All recaps" || (tab === "Needs photos" && item.status === "Needs photos") || (tab === "Ready" && item.status === "Ready to publish") || (tab === "Published" && item.status === "Published");
    return searchMatch && tabMatch;
  }), [query, tab]);
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); };
  return <div className="page-wrap section-page"><SectionHeader eyebrow="EVENT RECAPS" title="Keep the moments close." description="Turn each gathering into a story people can revisit, share, and carry forward." action={<ActionPill primary onClick={() => notify("Recap upload space is ready.")}><Plus size={16} /> Add recap</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL RECAPS", value: "8", icon: <FolderOpen size={18} />, tone: "orange" }, { label: "READY TO PUBLISH", value: "2", icon: <Check size={18} />, tone: "green" }, { label: "MISSING PHOTOS", value: "1", icon: <ImageIcon size={18} />, tone: "yellow" }, { label: "TOTAL PHOTOS", value: "126", icon: <FileImage size={18} />, tone: "blue" }]} />
    <div className="section-toolbar"><Tabs items={["All recaps", "Needs photos", "Ready", "Published"]} value={tab} onChange={setTab} /><SearchBar value={query} onChange={setQuery} placeholder="Search recaps..." /></div>
    <div className="recap-grid">{filtered.map((recap) => <article className="recap-card surface-card" key={recap.title}><div className="recap-image-wrap"><img src={recap.image} alt={`${recap.title} recap`} /><span className={cn("content-status", recap.status === "Published" && "published", recap.status === "Needs photos" && "warning")}>{recap.status}</span></div><div className="recap-card-body"><div className="card-kicker"><span>{recap.date}</span><span><ImageIcon size={13} /> {recap.photos} photos</span></div><h2>{recap.title}</h2><p>{recap.notes}</p><div className="card-action-row"><ActionPill onClick={() => setSelectedRecap(recap)}><Eye size={15} /> View recap</ActionPill><button className="icon-button" type="button" onClick={() => notify("More recap actions coming soon.")} aria-label={`More actions for ${recap.title}`}><MoreHorizontal size={18} /></button></div></div></article>)}</div>
    {!filtered.length ? <div className="empty-state surface-card"><FolderOpen size={30} /><h2>No recaps in this view</h2><p>Try another filter or add the next gathering recap.</p></div> : null}
    {selectedRecap ? <DetailDrawer eyebrow="EVENT RECAP" title={selectedRecap.title} description="A closer look at this gathering before it is shared with the community." onClose={() => setSelectedRecap(null)} actions={<><DrawerAction onClick={() => setSelectedRecap(null)}>Keep editing</DrawerAction><DrawerAction primary onClick={() => notify(`${selectedRecap.title} is ready to publish.`)}><Send size={15} /> Publish recap</DrawerAction></>}><div className="drawer-image"><img src={selectedRecap.image} alt={`${selectedRecap.title} recap`} /></div><DrawerMeta items={[{ label: "Event date", value: selectedRecap.date }, { label: "Photo count", value: `${selectedRecap.photos} photos` }, { label: "Current state", value: selectedRecap.status }]} /><div className="drawer-section"><h3>Recap checklist</h3><div className="drawer-check-row"><CheckCircle2 size={16} /> Event notes added <Check size={14} /></div><div className={cn("drawer-check-row", selectedRecap.photos === 0 && "pending")}><ImageIcon size={16} /> {selectedRecap.photos ? "Cover photo selected" : "Add a cover photo"} {selectedRecap.photos ? <Check size={14} /> : <ArrowRight size={14} />}</div><div className="drawer-callout"><Sparkles size={16} /><span>{selectedRecap.photos ? "This recap has everything it needs for a thoughtful publish." : "Add at least one photo before sharing this recap."}</span></div></div></DetailDrawer> : null}
    {notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const wallNotes = [
  { title: "Looking for people who want to start a book club", meta: "anonymous · 12 pins", time: "10m ago", tone: "yellow", status: "New" },
  { title: "Learning Blender. Any tips?", meta: "anonymous · 8 pins", time: "1h ago", tone: "green", status: "Pinned" },
  { title: "Who’s in for a morning run this Sunday?", meta: "anonymous · 5 pins", time: "2h ago", tone: "pink", status: "New" },
  { title: "Does anyone have a spare film camera?", meta: "anonymous · 3 pins", time: "4h ago", tone: "blue", status: "Reported" },
  { title: "Starting a Saturday pottery circle", meta: "Maria Santos · 7 pins", time: "6h ago", tone: "orange", status: "Pinned" },
  { title: "Looking for a quiet study buddy", meta: "anonymous · 2 pins", time: "1d ago", tone: "lavender", status: "New" },
];

export function WallPage() {
  const [tab, setTab] = useState("All notes"); const [query, setQuery] = useState(""); const [notice, setNotice] = useState<string | null>(null); const [selectedNote, setSelectedNote] = useState<(typeof wallNotes)[number] | null>(null);
  const filtered = useMemo(() => wallNotes.filter((note) => `${note.title} ${note.meta}`.toLowerCase().includes(query.toLowerCase()) && (tab === "All notes" || note.status === tab.replace(" notes", ""))), [query, tab]);
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); };
  return <div className="page-wrap section-page"><SectionHeader eyebrow="COMMUNITY  /  WALL" title="What’s on the wall?" description="Keep an eye on the small sparks, questions, and invitations shared by the community." action={<ActionPill primary onClick={() => notify("Wall moderation filters opened.")}><Flag size={16} /> Review reports</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL NOTES", value: "146", icon: <MessageCircle size={18} />, tone: "yellow" }, { label: "NEW THIS WEEK", value: "32", icon: <Sparkles size={18} />, tone: "orange" }, { label: "REPORTED", value: "3", icon: <Flag size={18} />, tone: "pink" }, { label: "PINNED", value: "84", icon: <Tag size={18} />, tone: "green" }]} />
    <div className="section-toolbar"><Tabs items={["All notes", "New notes", "Reported", "Pinned"]} value={tab} onChange={setTab} /><SearchBar value={query} onChange={setQuery} placeholder="Search wall notes..." /></div>
    <div className="wall-admin-grid">{filtered.map((note) => <article className={cn("wall-admin-card surface-card", note.tone)} key={note.title}><div className="wall-card-top"><span className="wall-sticker"><MessageCircle size={18} /></span><span className={cn("mini-status", note.status.toLowerCase())}>{note.status}</span></div><h2>{note.title}</h2><div className="wall-card-meta"><span>{note.meta}</span><time>{note.time}</time></div><div className="card-action-row"><ActionPill onClick={() => setSelectedNote(note)}><Eye size={15} /> View note</ActionPill><button className="icon-button" type="button" onClick={() => notify("Wall note actions coming soon.")} aria-label="More wall note actions"><MoreHorizontal size={18} /></button></div></article>)}</div>
    {!filtered.length ? <div className="empty-state surface-card"><MessageCircle size={30} /><h2>No wall notes in this view</h2><p>Try another status or search term.</p></div> : null}{selectedNote ? <DetailDrawer eyebrow="WALL MODERATION" title={selectedNote.title} description="Review the note, check its context, and decide what should happen next." onClose={() => setSelectedNote(null)} actions={<><DrawerAction onClick={() => notify("Wall note archived.")}><Archive size={15} /> Archive</DrawerAction><DrawerAction primary onClick={() => notify("Wall note pinned to the community wall.")}><Tag size={15} /> {selectedNote.status === "Pinned" ? "Keep pinned" : "Pin note"}</DrawerAction></>}><div className={cn("drawer-note-preview", selectedNote.tone)}><MessageCircle size={22} /><p>{selectedNote.title}</p><span>{selectedNote.meta} · {selectedNote.time}</span></div><DrawerMeta items={[{ label: "Status", value: selectedNote.status }, { label: "Community response", value: selectedNote.meta.split("·")[1]?.trim() || "No pins yet" }, { label: "Visibility", value: "Community wall" }]} /><div className="drawer-section"><h3>Moderation note</h3><p className="drawer-body-copy">Keep the conversation open when a note is constructive, specific, and safe for the shared wall. Reported notes should be reviewed before they are archived.</p><div className="drawer-callout"><Flag size={16} /><span>{selectedNote.status === "Reported" ? "This note has been reported and needs a decision." : "No reports attached to this note."}</span></div></div></DetailDrawer> : null}{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const projects = [
  { title: "Sunday Sketch Club", owner: "Nica Villanueva", detail: "A low-pressure weekly drawing circle for anyone who wants to make something together.", tags: ["Art", "Looking for people"], tone: "yellow", progress: "Looking for people", image: asset.creative },
  { title: "The Neighborhood Zine", owner: "Miguel Reyes", detail: "Collecting tiny stories, photos, and recommendations from around the block.", tags: ["Publishing", "In progress"], tone: "green", progress: "In progress", image: asset.sunday },
  { title: "Community Garden Swap", owner: "Bea Alonzo", detail: "A monthly exchange for seedlings, cuttings, and the knowledge to keep them going.", tags: ["Outdoors", "Shared"], tone: "blue", progress: "Shared", image: asset.next },
];

type Project = (typeof projects)[number];
type ProjectDraft = { title: string; owner: string; detail: string; tags: string; progress: Project["progress"]; tone: Project["tone"]; image: string };
const emptyProjectDraft = (): ProjectDraft => ({ title: "", owner: "", detail: "", tags: "", progress: "Looking for people", tone: "yellow", image: asset.creative });

export function ProjectsPage() {
  const [tab, setTab] = useState("All projects"); const [notice, setNotice] = useState<string | null>(null); const [projectList, setProjectList] = useState<Project[]>(projects); const [selectedProject, setSelectedProject] = useState<Project | null>(null); const [editorMode, setEditorMode] = useState<"create" | "edit" | null>(null); const [editingProjectTitle, setEditingProjectTitle] = useState<string | null>(null); const [draft, setDraft] = useState<ProjectDraft>(emptyProjectDraft); const [deleteTarget, setDeleteTarget] = useState<Project | null>(null); const [openMenu, setOpenMenu] = useState<string | null>(null); const uploadedCoverUrls = useRef<string[]>([]); useEffect(() => () => uploadedCoverUrls.current.forEach((url) => URL.revokeObjectURL(url)), []); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); }; const updateDraft = (field: keyof ProjectDraft, value: string) => setDraft((current) => ({ ...current, [field]: value } as ProjectDraft)); const openEditor = (mode: "create" | "edit", project?: Project) => { setDraft(project ? { ...project, tags: project.tags.join(", ") } : emptyProjectDraft()); setEditingProjectTitle(project?.title ?? null); setEditorMode(mode); setSelectedProject(null); setOpenMenu(null); }; const saveDraft = () => { const title = draft.title.trim(); const owner = draft.owner.trim(); const detail = draft.detail.trim(); if (!title || !owner || !detail) { notify("Add a title, project owner, and brief before saving."); return; } const nextProject: Project = { ...draft, title, owner, detail, tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean) }; setProjectList((current) => editorMode === "edit" && editingProjectTitle ? current.map((project) => project.title === editingProjectTitle ? nextProject : project) : [nextProject, ...current]); notify(editorMode === "edit" ? `${title} updated.` : `${title} added to Passion Projects.`); setEditorMode(null); setEditingProjectTitle(null); }; const confirmDelete = () => { if (!deleteTarget) return; setProjectList((current) => current.filter((project) => project.title !== deleteTarget.title)); notify(`${deleteTarget.title} deleted.`); setDeleteTarget(null); };
  const visible = projectList.filter((project) => tab === "All projects" || project.progress === tab);
  return <div className="page-wrap section-page"><SectionHeader eyebrow="COMMUNITY  /  PASSION PROJECTS" title="Good things are taking shape." description="Help people find collaborators, encouragement, and a little momentum for the ideas they care about." action={<ActionPill primary onClick={() => { setDraft(emptyProjectDraft()); setEditorMode("create"); setSelectedProject(null); setOpenMenu(null); }}><Plus size={16} /> Add project</ActionPill>} />
    <MetricStrip items={[{ label: "ACTIVE PROJECTS", value: "28", icon: <Sparkles size={18} />, tone: "orange" }, { label: "LOOKING FOR PEOPLE", value: "11", icon: <UsersRound size={18} />, tone: "yellow" }, { label: "IN PROGRESS", value: "9", icon: <Play size={18} />, tone: "green" }, { label: "SHARED THIS MONTH", value: "18", icon: <ArrowUpRight size={18} />, tone: "blue" }]} />
    <div className="section-toolbar"><Tabs items={["All projects", "Looking for people", "In progress", "Shared"]} value={tab} onChange={setTab} /><button className="button outline small" type="button" onClick={() => notify("Project sorting options opened.")}><Filter size={15} /> Sort by <ChevronDown size={14} /></button></div>
    <div className="project-grid">{visible.map((project, index) => <article className={cn("project-card surface-card", index === 0 && "featured-project")} key={project.title}><div className="project-photo"><img src={project.image} alt={`${project.title} project`} /><span className={cn("project-state", project.tone)}>{project.progress}</span></div><div className="project-card-body"><div className="project-label"><Sparkles size={14} /> Passion project</div><h2>{project.title}</h2><p>{project.detail}</p><div className="project-owner"><span className="mini-avatar sun">{project.owner.split(" ").map((name) => name[0]).join("")}</span><span>Started by <strong>{project.owner}</strong></span></div><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="card-action-row"><ActionPill primary onClick={() => setSelectedProject(project)}>View project <ArrowRight size={15} /></ActionPill><div className="project-menu-wrap"><button className="icon-button" type="button" onClick={() => setOpenMenu(openMenu === project.title ? null : project.title)} aria-label={`More actions for ${project.title}`} aria-expanded={openMenu === project.title}><MoreHorizontal size={18} /></button>{openMenu === project.title ? <div className="project-menu" role="menu"><button type="button" role="menuitem" onClick={() => openEditor("edit", project)}><Pencil size={15} /> Edit project</button><button className="danger" type="button" role="menuitem" onClick={() => { setDeleteTarget(project); setOpenMenu(null); setSelectedProject(null); }}><Trash2 size={15} /> Delete project</button></div> : null}</div></div></div></article>)}</div>{selectedProject ? <DetailDrawer eyebrow="PASSION PROJECT" title={selectedProject.title} description="See what this project is about, who started it, and how the community can help it move forward." onClose={() => setSelectedProject(null)} actions={<><DrawerAction onClick={() => setSelectedProject(null)}>Close details</DrawerAction><DrawerAction primary onClick={() => notify(`${selectedProject.title} shared with the community.`)}><ArrowUpRight size={15} /> Share project</DrawerAction></>}><div className="drawer-project-hero"><img src={selectedProject.image} alt={`${selectedProject.title} project`} /><span className={cn("project-state", selectedProject.tone)}>{selectedProject.progress}</span></div><DrawerMeta items={[{ label: "Started by", value: selectedProject.owner }, { label: "Project state", value: selectedProject.progress }, { label: "Community tags", value: selectedProject.tags.join(" · ") }]} /><div className="drawer-section"><h3>Project brief</h3><p className="drawer-body-copy">{selectedProject.detail}</p><div className="drawer-callout"><Sparkles size={16} /><span>Projects grow through small, generous contributions. Invite people into the next clear step.</span></div></div></DetailDrawer> : null}{editorMode ? <DetailDrawer eyebrow={editorMode === "edit" ? "EDIT PROJECT" : "NEW PROJECT"} title={editorMode === "edit" ? "Shape the project details." : "Start a new project."} description="Give this idea enough clarity for the right people to find it, join it, or cheer it on." onClose={() => setEditorMode(null)} actions={<><DrawerAction onClick={() => setEditorMode(null)}>Cancel</DrawerAction><DrawerAction primary onClick={saveDraft}><Check size={15} /> {editorMode === "edit" ? "Save changes" : "Add project"}</DrawerAction></>}><div className="project-editor-form"><label className="editor-field">Project title<input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="e.g. Saturday pottery circle" /></label><label className="editor-field">Started by<input value={draft.owner} onChange={(event) => updateDraft("owner", event.target.value)} placeholder="Name of the project starter" /></label><label className="editor-field">Project brief<textarea value={draft.detail} onChange={(event) => updateDraft("detail", event.target.value)} placeholder="What is this project about, and who is it for?" rows={5} /></label><label className="editor-field">Tags<span className="editor-hint">Separate tags with commas</span><input value={draft.tags} onChange={(event) => updateDraft("tags", event.target.value)} placeholder="Art, Looking for people" /></label><div className="editor-grid"><label className="editor-field">Status<select className="editor-select" value={draft.progress} onChange={(event) => updateDraft("progress", event.target.value)}><option value="Looking for people">Looking for people</option><option value="In progress">In progress</option><option value="Shared">Shared</option></select></label><label className="editor-field">Cover image<select className="editor-select" value={draft.image} onChange={(event) => updateDraft("image", event.target.value)}><option value={asset.creative}>Creative nights</option><option value={asset.sunday}>Sunday sessions</option><option value={asset.next}>The Social Room</option><option value={asset.weeknight}>Weeknight hang</option></select></label></div><div className="cover-upload-row"><label className="cover-upload-button"><UploadCloud size={16} /> Upload image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; if (!file.type.startsWith("image/")) { notify("Please choose an image file."); return; } if (file.size > 5 * 1024 * 1024) { notify("Cover images must be 5 MB or smaller."); return; } const url = URL.createObjectURL(file); uploadedCoverUrls.current.push(url); updateDraft("image", url); notify("Cover preview updated."); event.target.value = ""; }} /></label><span>JPG, PNG, or WebP · max 5 MB</span></div><div className="editor-image-preview"><img src={draft.image} alt="Selected project cover preview" /><span>{draft.image.startsWith("blob:") ? "Uploaded cover preview" : "Cover preview"}</span></div></div></DetailDrawer> : null}{deleteTarget ? <DetailDrawer eyebrow="DELETE PROJECT" title={`Delete ${deleteTarget.title}?`} description="This removes the project from the current admin workspace. This local demo action cannot be undone." onClose={() => setDeleteTarget(null)} actions={<><DrawerAction onClick={() => setDeleteTarget(null)}>Keep project</DrawerAction><DrawerAction primary onClick={confirmDelete}><Trash2 size={15} /> Delete project</DrawerAction></>}><div className="delete-dialog"><Trash2 size={24} /><p>People will no longer see this project in the Passion Projects list.</p><div className="drawer-callout"><Archive size={16} /><span>If you only want to pause visibility, edit the status instead.</span></div></div></DetailDrawer> : null}{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const applicants = [
  { initials: "JC", name: "Juan Cruz", note: "I’m looking for a creative community and new people to learn from.", applied: "Today, 9:12 AM", status: "Pending", tone: "rose" },
  { initials: "LS", name: "Lara Santos", note: "Would love to join the next Sunday Sessions.", applied: "Yesterday", status: "Pending", tone: "sky" },
  { initials: "KM", name: "Kaye Morales", note: "Interested in meeting people who make things.", applied: "Aug 26, 2026", status: "Approved", tone: "sun" },
  { initials: "AP", name: "Andre Pascual", note: "Hoping to find a regular place to share ideas.", applied: "Aug 25, 2026", status: "Waitlist", tone: "green" },
  { initials: "RD", name: "Rina David", note: "I want to help make the city feel a little smaller.", applied: "Aug 23, 2026", status: "Approved", tone: "lavender" },
];

export function ApplicantsPage() {
  const [tab, setTab] = useState("All applicants"); const [query, setQuery] = useState(""); const [notice, setNotice] = useState<string | null>(null); const [selectedApplicant, setSelectedApplicant] = useState<(typeof applicants)[number] | null>(null); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); };
  const visible = applicants.filter((applicant) => `${applicant.name} ${applicant.note}`.toLowerCase().includes(query.toLowerCase()) && (tab === "All applicants" || applicant.status === tab));
  return <div className="page-wrap section-page"><SectionHeader eyebrow="COMMUNITY  /  APPLICANTS" title="Meet the next neighbors." description="Review new applications and keep the intake experience thoughtful, clear, and human." action={<ActionPill onClick={() => notify("Applicant export is preparing.")}><ArrowUpRight size={16} /> Export list</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL APPLICANTS", value: "12", icon: <UsersRound size={18} />, tone: "orange" }, { label: "NEW THIS WEEK", value: "4", icon: <Sparkles size={18} />, tone: "yellow" }, { label: "PENDING REVIEW", value: "7", icon: <Clock3 size={18} />, tone: "pink" }, { label: "APPROVED", value: "5", icon: <UserCheck size={18} />, tone: "green" }]} />
    <div className="section-toolbar"><Tabs items={["All applicants", "Pending", "Approved", "Waitlist"]} value={tab} onChange={setTab} /><SearchBar value={query} onChange={setQuery} placeholder="Search applicants..." /></div>
    <div className="applicant-table surface-card"><div className="table-heading"><span>Applicant</span><span>Note from them</span><span>Applied</span><span>Status</span><span /></div>{visible.map((applicant) => <div className="applicant-row" key={applicant.name}><div className="applicant-person"><span className={cn("mini-avatar", applicant.tone)}>{applicant.initials}</span><strong>{applicant.name}</strong></div><p>{applicant.note}</p><time>{applicant.applied}</time><span className={cn("review-status", applicant.status.toLowerCase())}><i />{applicant.status}</span><button className="icon-button" type="button" onClick={() => setSelectedApplicant(applicant)} aria-label={`Open ${applicant.name}`}><ArrowUpRight size={17} /></button></div>)}</div>{!visible.length ? <div className="empty-state surface-card"><UsersRound size={30} /><h2>No applicants in this view</h2><p>Try another status or search term.</p></div> : null}{selectedApplicant ? <DetailDrawer eyebrow="APPLICANT REVIEW" title={selectedApplicant.name} description="Review this application with the same care we want people to feel when they join Tagpuan." onClose={() => setSelectedApplicant(null)} actions={<><DrawerAction onClick={() => notify(`${selectedApplicant.name} moved to the waitlist.`)}><Clock3 size={15} /> Waitlist</DrawerAction><DrawerAction onClick={() => notify(`${selectedApplicant.name} application declined.`)}><X size={15} /> Decline</DrawerAction><DrawerAction primary onClick={() => notify(`${selectedApplicant.name} approved for the community.`)}><UserCheck size={15} /> Approve applicant</DrawerAction></>}><div className="drawer-person"><span className={cn("drawer-avatar", selectedApplicant.tone)}>{selectedApplicant.initials}</span><div><strong>{selectedApplicant.name}</strong><span>Applied {selectedApplicant.applied}</span></div></div><DrawerMeta items={[{ label: "Current status", value: selectedApplicant.status }, { label: "Community fit", value: "Thoughtful match" }, { label: "Preferred entry", value: "Next gathering" }]} /><div className="drawer-section"><h3>Note from them</h3><p className="drawer-body-copy">{selectedApplicant.note}</p><div className="drawer-callout"><Sparkles size={16} /><span>Keep the reply warm and specific, whichever decision you make.</span></div></div></DetailDrawer> : null}{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const spotlights = [
  { title: "The hands behind the good stuff", person: "Nica Villanueva", excerpt: "On making room for a slower kind of creativity.", status: "Draft", tone: "yellow", initials: "NV" },
  { title: "A little more courage to begin", person: "Miguel Reyes", excerpt: "On sharing work before it feels finished.", status: "Published", tone: "green", initials: "MR" },
  { title: "Finding your people in the city", person: "Ella Dela Cruz", excerpt: "On the tiny rituals that make a place feel like yours.", status: "Draft", tone: "pink", initials: "ED" },
];

export function SpotlightsPage() {
  const [tab, setTab] = useState("All spotlights"); const [notice, setNotice] = useState<string | null>(null); const [selectedSpotlight, setSelectedSpotlight] = useState<(typeof spotlights)[number] | null>(null); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); }; const visible = spotlights.filter((item) => tab === "All spotlights" || item.status === tab);
  return <div className="page-wrap section-page"><SectionHeader eyebrow="CONTENT  /  MEMBER SPOTLIGHTS" title="People worth spotlighting." description="Shape member stories with care and publish the voices that make Tagpuan feel like home." action={<ActionPill primary onClick={() => notify("Spotlight draft started.")}><Plus size={16} /> New spotlight</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL SPOTLIGHTS", value: "16", icon: <Star size={18} />, tone: "orange" }, { label: "PUBLISHED", value: "12", icon: <Check size={18} />, tone: "green" }, { label: "DRAFTS", value: "3", icon: <FileText size={18} />, tone: "yellow" }, { label: "THIS MONTH", value: "2", icon: <Sparkles size={18} />, tone: "blue" }]} />
    <div className="section-toolbar"><Tabs items={["All spotlights", "Draft", "Published"]} value={tab} onChange={setTab} /><button className="button outline small" type="button" onClick={() => notify("Spotlight sorting options opened.")}><Filter size={15} /> Sort by <ChevronDown size={14} /></button></div>
    <div className="spotlight-grid">{visible.map((item) => <article className="spotlight-card surface-card" key={item.title}><div className={cn("spotlight-art", item.tone)}><span className="portrait-badge">{item.initials}</span><span className={cn("content-status", item.status === "Published" && "published")}>{item.status}</span><Sparkles size={23} /></div><div className="spotlight-body"><div className="card-kicker"><span>Member spotlight</span><span>6 min read</span></div><h2>{item.title}</h2><p>{item.excerpt}</p><div className="spotlight-person"><span className="mini-avatar sky">{item.initials}</span><span>Featuring <strong>{item.person}</strong></span></div><div className="card-action-row"><ActionPill onClick={() => setSelectedSpotlight(item)}><Pencil size={15} /> Edit story</ActionPill><button className="icon-button" type="button" onClick={() => notify("Spotlight actions coming soon.")} aria-label="More spotlight actions"><MoreHorizontal size={18} /></button></div></div></article>)}</div>{selectedSpotlight ? <DetailDrawer eyebrow="MEMBER SPOTLIGHT" title={selectedSpotlight.title} description="Shape the story, check the details, and publish when it feels true to the person behind it." onClose={() => setSelectedSpotlight(null)} actions={<><DrawerAction onClick={() => notify("Spotlight kept as a draft.")}><FileText size={15} /> Keep draft</DrawerAction><DrawerAction primary onClick={() => notify(`${selectedSpotlight.title} published.`)}><Send size={15} /> Publish story</DrawerAction></>}><div className={cn("drawer-story-card", selectedSpotlight.tone)}><span className="portrait-badge">{selectedSpotlight.initials}</span><span className="drawer-story-label">Member story</span></div><DrawerMeta items={[{ label: "Featuring", value: selectedSpotlight.person }, { label: "Reading time", value: "6 min read" }, { label: "Current status", value: selectedSpotlight.status }]} /><div className="drawer-section"><h3>Story preview</h3><p className="drawer-body-copy">{selectedSpotlight.excerpt} The full story gives this member a little more room to share what they are making, learning, and noticing right now.</p><div className="drawer-callout"><Sparkles size={16} /><span>Keep the voice specific, generous, and recognizably theirs.</span></div></div></DetailDrawer> : null}{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const hearMeOut = [
  { subject: "Can we make the next gathering earlier?", sender: "Anonymous", category: "Suggestion", status: "New", time: "18m ago", tone: "yellow", excerpt: "Would love a chance to join before the workday ends..." },
  { subject: "A small thank you to the volunteers", sender: "Kaye Morales", category: "Appreciation", status: "In review", time: "3h ago", tone: "green", excerpt: "The welcome at the last session made it easy to stay..." },
  { subject: "More quiet corners, please", sender: "Anonymous", category: "Idea", status: "Published", time: "Yesterday", tone: "blue", excerpt: "Could we set aside a low-volume corner at future events?" },
  { subject: "Looking for a mentor in product design", sender: "Andre Pascual", category: "Ask", status: "New", time: "2d ago", tone: "pink", excerpt: "I’d love to learn from someone who has made the jump..." },
];

export function HearMeOutPage() {
  const [tab, setTab] = useState("All submissions"); const [notice, setNotice] = useState<string | null>(null); const [selectedSubmission, setSelectedSubmission] = useState<(typeof hearMeOut)[number] | null>(null); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); }; const visible = hearMeOut.filter((item) => tab === "All submissions" || item.status === tab);
  return <div className="page-wrap section-page"><SectionHeader eyebrow="CONTENT  /  HEAR ME OUT" title="Give the room a mic." description="Review thoughtful submissions and keep the community conversation moving in the open." action={<ActionPill onClick={() => notify("Submission guidelines opened.")}><FileText size={16} /> View guidelines</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL SUBMISSIONS", value: "42", icon: <MessageCircle size={18} />, tone: "orange" }, { label: "NEW", value: "8", icon: <Sparkles size={18} />, tone: "yellow" }, { label: "IN REVIEW", value: "5", icon: <Clock3 size={18} />, tone: "pink" }, { label: "PUBLISHED", value: "29", icon: <Check size={18} />, tone: "green" }]} />
    <div className="section-toolbar"><Tabs items={["All submissions", "New", "In review", "Published"]} value={tab} onChange={setTab} /><button className="button outline small" type="button" onClick={() => notify("Submission categories opened.")}><Filter size={15} /> Filter category</button></div>
    <div className="submission-list">{visible.map((item) => <article className="submission-row surface-card" key={item.subject}><span className={cn("submission-icon", item.tone)}><MessageCircle size={20} /></span><div className="submission-copy"><div className="card-kicker"><span>{item.category}</span><span>{item.sender}</span></div><h2>{item.subject}</h2><p>{item.excerpt}</p></div><div className="submission-meta"><span className={cn("review-status", item.status.toLowerCase().replace(" ", "-"))}><i />{item.status}</span><time>{item.time}</time></div><div className="submission-actions"><ActionPill onClick={() => setSelectedSubmission(item)}><Eye size={15} /> Review</ActionPill><button className="icon-button" type="button" onClick={() => notify("Submission actions coming soon.")} aria-label="More submission actions"><MoreHorizontal size={18} /></button></div></article>)}</div>{selectedSubmission ? <DetailDrawer eyebrow="HEAR ME OUT" title={selectedSubmission.subject} description="Give this submission a thoughtful read before deciding how it should meet the wider community." onClose={() => setSelectedSubmission(null)} actions={<><DrawerAction onClick={() => notify("Submission kept in review.")}><Clock3 size={15} /> Keep in review</DrawerAction><DrawerAction onClick={() => notify("Submission archived.")}><Archive size={15} /> Archive</DrawerAction><DrawerAction primary onClick={() => notify(`${selectedSubmission.subject} published.`)}><Send size={15} /> Publish submission</DrawerAction></>}><div className={cn("drawer-note-preview", selectedSubmission.tone)}><MessageCircle size={22} /><p>{selectedSubmission.excerpt}</p><span>{selectedSubmission.sender} · {selectedSubmission.category}</span></div><DrawerMeta items={[{ label: "Category", value: selectedSubmission.category }, { label: "Submitted", value: selectedSubmission.time }, { label: "Current status", value: selectedSubmission.status }]} /><div className="drawer-section"><h3>Editor’s note</h3><p className="drawer-body-copy">This is a good place to add a short context note before publishing, especially when a submission becomes a prompt for the next gathering.</p><div className="drawer-callout"><Sparkles size={16} /><span>Publish with a clear title and preserve the sender’s original tone.</span></div></div></DetailDrawer> : null}{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const mediaItems = [
  { name: "social-room-01.jpg", type: "Event photo", image: asset.next, size: "2.4 MB" },
  { name: "sunday-session-04.jpg", type: "Event photo", image: asset.sunday, size: "1.8 MB" },
  { name: "creative-night-02.jpg", type: "Event photo", image: asset.creative, size: "2.1 MB" },
  { name: "weeknight-hang-08.jpg", type: "Event photo", image: asset.weeknight, size: "2.7 MB" },
  { name: "social-room-cover.jpg", type: "Cover image", image: asset.next, size: "1.2 MB" },
  { name: "creative-night-cover.jpg", type: "Cover image", image: asset.creative, size: "1.4 MB" },
];

export function MediaPage() {
  const [tab, setTab] = useState("All media"); const [selected, setSelected] = useState<string[]>([]); const [notice, setNotice] = useState<string | null>(null); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); }; const visible = mediaItems.filter((item) => tab === "All media" || item.type === tab.slice(0, -1));
  const toggle = (name: string) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  return <div className="page-wrap section-page"><SectionHeader eyebrow="CONTENT  /  MEDIA" title="The shared album." description="Keep the library tidy, find the right image quickly, and make every recap feel considered." action={<ActionPill primary onClick={() => notify("Upload picker opened.")}><UploadCloud size={16} /> Upload media</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL ASSETS", value: "126", icon: <ImageIcon size={18} />, tone: "orange" }, { label: "EVENT PHOTOS", value: "98", icon: <CalendarDays size={18} />, tone: "yellow" }, { label: "COVER IMAGES", value: "20", icon: <FileImage size={18} />, tone: "green" }, { label: "STORAGE USED", value: "1.8 GB", icon: <CloudUpload size={18} />, tone: "blue" }]} />
    <div className="media-upload surface-card"><div className="upload-icon"><ImagePlus size={22} /></div><div><strong>Drop files here to keep the story going</strong><p>JPG or PNG, max 5MB each. We’ll keep your originals safe.</p></div><button className="button outline small" type="button" onClick={() => notify("Upload picker opened.")}><Plus size={15} /> Choose files</button></div>
    <div className="section-toolbar"><Tabs items={["All media", "Event photos", "Cover images"]} value={tab} onChange={setTab} /><div className="media-toolbar-actions">{selected.length ? <ActionPill onClick={() => notify(`${selected.length} media ${selected.length === 1 ? "item" : "items"} selected.`)}><Check size={15} /> {selected.length} selected</ActionPill> : null}<button className="button outline small" type="button" onClick={() => notify("Media sorting options opened.")}><Filter size={15} /> Sort by <ChevronDown size={14} /></button></div></div>
    <div className="media-grid">{visible.map((item) => <button type="button" className={cn("media-card surface-card", selected.includes(item.name) && "selected")} key={item.name} onClick={() => toggle(item.name)}><div className="media-image"><img src={item.image} alt={item.name} /><span className="select-mark">{selected.includes(item.name) ? <Check size={14} /> : null}</span></div><div className="media-card-copy"><strong>{item.name}</strong><span>{item.type} · {item.size}</span></div></button>)}</div>{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const campaigns = [
  { subject: "August around the corner", audience: "All subscribers", sent: "Aug 01, 2026", recipients: "284", status: "Sent" },
  { subject: "The Social Room is coming up", audience: "Event friends", sent: "Jul 21, 2026", recipients: "96", status: "Sent" },
  { subject: "A note from the community", audience: "All subscribers", sent: "Draft", recipients: "284", status: "Draft" },
];

export function NewsletterPage() {
  const [notice, setNotice] = useState<string | null>(null); const [subject, setSubject] = useState("A little room for good things"); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); };
  return <div className="page-wrap section-page"><SectionHeader eyebrow="AUDIENCE  /  NEWSLETTER" title="Stay in touch." description="Send a thoughtful note when there’s something worth gathering around." action={<ActionPill primary onClick={() => notify("Newsletter composer opened.")}><Plus size={16} /> New campaign</ActionPill>} />
    <MetricStrip items={[{ label: "SUBSCRIBERS", value: "284", icon: <Mail size={18} />, tone: "orange" }, { label: "OPEN RATE", value: "68%", icon: <Eye size={18} />, tone: "green" }, { label: "SENT THIS MONTH", value: "2", icon: <Send size={18} />, tone: "yellow" }, { label: "DRAFT CAMPAIGNS", value: "1", icon: <FileText size={18} />, tone: "blue" }]} />
    <div className="newsletter-layout"><section className="surface-card campaign-card"><div className="card-heading"><h2>Recent campaigns</h2><a href="#audience">View audience</a></div><div className="campaign-list">{campaigns.map((campaign) => <div className="campaign-row" key={campaign.subject}><span className={cn("campaign-icon", campaign.status.toLowerCase())}>{campaign.status === "Sent" ? <Send size={16} /> : <FileText size={16} />}</span><div><strong>{campaign.subject}</strong><span>{campaign.audience} · {campaign.recipients} recipients</span></div><time>{campaign.sent}</time><button className="icon-button" type="button" onClick={() => notify(`${campaign.subject} opened.`)} aria-label={`Open ${campaign.subject}`}><ArrowUpRight size={16} /></button></div>)}</div></section><section className="surface-card newsletter-composer"><div className="card-heading"><h2>Quick compose</h2><span className="draft-chip">Draft</span></div><label className="field-label">Subject line<input value={subject} onChange={(event) => setSubject(event.target.value)} /></label><label className="field-label">Audience<div className="fake-select">All subscribers <ChevronDown size={15} /></div></label><div className="newsletter-preview"><span>PREVIEW</span><h3>{subject || "Your next note"}</h3><p>A short, warm note from Tagpuan can make the next gathering feel a little closer before anyone arrives.</p><div className="preview-line" /><small>Tagpuan Community · Keep the space warm.</small></div><div className="card-action-row"><ActionPill onClick={() => notify("Campaign saved as draft.")}><FileText size={15} /> Save draft</ActionPill><ActionPill primary onClick={() => notify("Campaign preview opened.")}><Eye size={15} /> Preview</ActionPill></div></section></div>{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

// Tagpuan style: warm scrapbook operations — cream paper, brown ink, terracotta actions, editorial type, tactile artifacts.

import { useMemo, useState, type ReactNode } from "react";
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
  next: "/manus-storage/tagpuan-next-gathering_95abaa3b.jpg",
  sunday: "/manus-storage/tagpuan-sunday-sessions_d56d6a50.jpg",
  creative: "/manus-storage/tagpuan-creative-nights_a09cc658.jpg",
  weeknight: "/manus-storage/tagpuan-weeknight-hang_ed471b84.jpg",
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

const recaps = [
  { title: "The Social Room", date: "Aug 29, 2026", photos: 24, notes: "A night of speed friending, open mic, and good conversations.", status: "Ready to publish", image: asset.next },
  { title: "Sunday Sessions", date: "Aug 15, 2026", photos: 18, notes: "Co-work, share what you’re building, and learn from each other.", status: "Published", image: asset.sunday },
  { title: "Weeknight Hang", date: "Jul 25, 2026", photos: 0, notes: "Good talks, new friends, and a whole lot of laughs.", status: "Needs photos", image: asset.weeknight },
];

export function RecapsPage() {
  const [tab, setTab] = useState("All recaps");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const filtered = useMemo(() => recaps.filter((item) => {
    const searchMatch = `${item.title} ${item.notes}`.toLowerCase().includes(query.toLowerCase());
    const tabMatch = tab === "All recaps" || (tab === "Needs photos" && item.status === "Needs photos") || (tab === "Ready" && item.status === "Ready to publish") || (tab === "Published" && item.status === "Published");
    return searchMatch && tabMatch;
  }), [query, tab]);
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); };
  return <div className="page-wrap section-page"><SectionHeader eyebrow="EVENT RECAPS" title="Keep the moments close." description="Turn each gathering into a story people can revisit, share, and carry forward." action={<ActionPill primary onClick={() => notify("Recap upload space is ready.")}><Plus size={16} /> Add recap</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL RECAPS", value: "8", icon: <FolderOpen size={18} />, tone: "orange" }, { label: "READY TO PUBLISH", value: "2", icon: <Check size={18} />, tone: "green" }, { label: "MISSING PHOTOS", value: "1", icon: <ImageIcon size={18} />, tone: "yellow" }, { label: "TOTAL PHOTOS", value: "126", icon: <FileImage size={18} />, tone: "blue" }]} />
    <div className="section-toolbar"><Tabs items={["All recaps", "Needs photos", "Ready", "Published"]} value={tab} onChange={setTab} /><SearchBar value={query} onChange={setQuery} placeholder="Search recaps..." /></div>
    <div className="recap-grid">{filtered.map((recap) => <article className="recap-card surface-card" key={recap.title}><div className="recap-image-wrap"><img src={recap.image} alt={`${recap.title} recap`} /><span className={cn("content-status", recap.status === "Published" && "published", recap.status === "Needs photos" && "warning")}>{recap.status}</span></div><div className="recap-card-body"><div className="card-kicker"><span>{recap.date}</span><span><ImageIcon size={13} /> {recap.photos} photos</span></div><h2>{recap.title}</h2><p>{recap.notes}</p><div className="card-action-row"><ActionPill onClick={() => notify(`${recap.title} recap opened.`)}><Eye size={15} /> View recap</ActionPill><button className="icon-button" type="button" onClick={() => notify("More recap actions coming soon.")} aria-label={`More actions for ${recap.title}`}><MoreHorizontal size={18} /></button></div></div></article>)}</div>
    {!filtered.length ? <div className="empty-state surface-card"><FolderOpen size={30} /><h2>No recaps in this view</h2><p>Try another filter or add the next gathering recap.</p></div> : null}
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
  const [tab, setTab] = useState("All notes"); const [query, setQuery] = useState(""); const [notice, setNotice] = useState<string | null>(null);
  const filtered = useMemo(() => wallNotes.filter((note) => `${note.title} ${note.meta}`.toLowerCase().includes(query.toLowerCase()) && (tab === "All notes" || note.status === tab.replace(" notes", ""))), [query, tab]);
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); };
  return <div className="page-wrap section-page"><SectionHeader eyebrow="COMMUNITY  /  WALL" title="What’s on the wall?" description="Keep an eye on the small sparks, questions, and invitations shared by the community." action={<ActionPill primary onClick={() => notify("Wall moderation filters opened.")}><Flag size={16} /> Review reports</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL NOTES", value: "146", icon: <MessageCircle size={18} />, tone: "yellow" }, { label: "NEW THIS WEEK", value: "32", icon: <Sparkles size={18} />, tone: "orange" }, { label: "REPORTED", value: "3", icon: <Flag size={18} />, tone: "pink" }, { label: "PINNED", value: "84", icon: <Tag size={18} />, tone: "green" }]} />
    <div className="section-toolbar"><Tabs items={["All notes", "New notes", "Reported", "Pinned"]} value={tab} onChange={setTab} /><SearchBar value={query} onChange={setQuery} placeholder="Search wall notes..." /></div>
    <div className="wall-admin-grid">{filtered.map((note) => <article className={cn("wall-admin-card surface-card", note.tone)} key={note.title}><div className="wall-card-top"><span className="wall-sticker"><MessageCircle size={18} /></span><span className={cn("mini-status", note.status.toLowerCase())}>{note.status}</span></div><h2>{note.title}</h2><div className="wall-card-meta"><span>{note.meta}</span><time>{note.time}</time></div><div className="card-action-row"><ActionPill onClick={() => notify(note.status === "Reported" ? "Report review opened." : "Wall note opened.")}><Eye size={15} /> View note</ActionPill><button className="icon-button" type="button" onClick={() => notify("Wall note actions coming soon.")} aria-label="More wall note actions"><MoreHorizontal size={18} /></button></div></article>)}</div>
    {!filtered.length ? <div className="empty-state surface-card"><MessageCircle size={30} /><h2>No wall notes in this view</h2><p>Try another status or search term.</p></div> : null}{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const projects = [
  { title: "Sunday Sketch Club", owner: "Nica Villanueva", detail: "A low-pressure weekly drawing circle for anyone who wants to make something together.", tags: ["Art", "Looking for people"], tone: "yellow", progress: "Looking for people", image: asset.creative },
  { title: "The Neighborhood Zine", owner: "Miguel Reyes", detail: "Collecting tiny stories, photos, and recommendations from around the block.", tags: ["Publishing", "In progress"], tone: "green", progress: "In progress", image: asset.sunday },
  { title: "Community Garden Swap", owner: "Bea Alonzo", detail: "A monthly exchange for seedlings, cuttings, and the knowledge to keep them going.", tags: ["Outdoors", "Shared"], tone: "blue", progress: "Shared", image: asset.next },
];

export function ProjectsPage() {
  const [tab, setTab] = useState("All projects"); const [notice, setNotice] = useState<string | null>(null); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); };
  const visible = projects.filter((project) => tab === "All projects" || project.progress === tab);
  return <div className="page-wrap section-page"><SectionHeader eyebrow="COMMUNITY  /  PASSION PROJECTS" title="Good things are taking shape." description="Help people find collaborators, encouragement, and a little momentum for the ideas they care about." action={<ActionPill primary onClick={() => notify("Project intake opened.")}><Plus size={16} /> Add project</ActionPill>} />
    <MetricStrip items={[{ label: "ACTIVE PROJECTS", value: "28", icon: <Sparkles size={18} />, tone: "orange" }, { label: "LOOKING FOR PEOPLE", value: "11", icon: <UsersRound size={18} />, tone: "yellow" }, { label: "IN PROGRESS", value: "9", icon: <Play size={18} />, tone: "green" }, { label: "SHARED THIS MONTH", value: "18", icon: <ArrowUpRight size={18} />, tone: "blue" }]} />
    <div className="section-toolbar"><Tabs items={["All projects", "Looking for people", "In progress", "Shared"]} value={tab} onChange={setTab} /><button className="button outline small" type="button" onClick={() => notify("Project sorting options opened.")}><Filter size={15} /> Sort by <ChevronDown size={14} /></button></div>
    <div className="project-grid">{visible.map((project, index) => <article className={cn("project-card surface-card", index === 0 && "featured-project")} key={project.title}><div className="project-photo"><img src={project.image} alt={`${project.title} project`} /><span className={cn("project-state", project.tone)}>{project.progress}</span></div><div className="project-card-body"><div className="project-label"><Sparkles size={14} /> Passion project</div><h2>{project.title}</h2><p>{project.detail}</p><div className="project-owner"><span className="mini-avatar sun">{project.owner.split(" ").map((name) => name[0]).join("")}</span><span>Started by <strong>{project.owner}</strong></span></div><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="card-action-row"><ActionPill primary onClick={() => notify(`${project.title} opened.`)}>View project <ArrowRight size={15} /></ActionPill><button className="icon-button" type="button" onClick={() => notify("Project actions coming soon.")} aria-label="More project actions"><MoreHorizontal size={18} /></button></div></div></article>)}</div>{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const applicants = [
  { initials: "JC", name: "Juan Cruz", note: "I’m looking for a creative community and new people to learn from.", applied: "Today, 9:12 AM", status: "Pending", tone: "rose" },
  { initials: "LS", name: "Lara Santos", note: "Would love to join the next Sunday Sessions.", applied: "Yesterday", status: "Pending", tone: "sky" },
  { initials: "KM", name: "Kaye Morales", note: "Interested in meeting people who make things.", applied: "Aug 26, 2026", status: "Approved", tone: "sun" },
  { initials: "AP", name: "Andre Pascual", note: "Hoping to find a regular place to share ideas.", applied: "Aug 25, 2026", status: "Waitlist", tone: "green" },
  { initials: "RD", name: "Rina David", note: "I want to help make the city feel a little smaller.", applied: "Aug 23, 2026", status: "Approved", tone: "lavender" },
];

export function ApplicantsPage() {
  const [tab, setTab] = useState("All applicants"); const [query, setQuery] = useState(""); const [notice, setNotice] = useState<string | null>(null); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); };
  const visible = applicants.filter((applicant) => `${applicant.name} ${applicant.note}`.toLowerCase().includes(query.toLowerCase()) && (tab === "All applicants" || applicant.status === tab));
  return <div className="page-wrap section-page"><SectionHeader eyebrow="COMMUNITY  /  APPLICANTS" title="Meet the next neighbors." description="Review new applications and keep the intake experience thoughtful, clear, and human." action={<ActionPill onClick={() => notify("Applicant export is preparing.")}><ArrowUpRight size={16} /> Export list</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL APPLICANTS", value: "12", icon: <UsersRound size={18} />, tone: "orange" }, { label: "NEW THIS WEEK", value: "4", icon: <Sparkles size={18} />, tone: "yellow" }, { label: "PENDING REVIEW", value: "7", icon: <Clock3 size={18} />, tone: "pink" }, { label: "APPROVED", value: "5", icon: <UserCheck size={18} />, tone: "green" }]} />
    <div className="section-toolbar"><Tabs items={["All applicants", "Pending", "Approved", "Waitlist"]} value={tab} onChange={setTab} /><SearchBar value={query} onChange={setQuery} placeholder="Search applicants..." /></div>
    <div className="applicant-table surface-card"><div className="table-heading"><span>Applicant</span><span>Note from them</span><span>Applied</span><span>Status</span><span /></div>{visible.map((applicant) => <div className="applicant-row" key={applicant.name}><div className="applicant-person"><span className={cn("mini-avatar", applicant.tone)}>{applicant.initials}</span><strong>{applicant.name}</strong></div><p>{applicant.note}</p><time>{applicant.applied}</time><span className={cn("review-status", applicant.status.toLowerCase())}><i />{applicant.status}</span><button className="icon-button" type="button" onClick={() => notify(`${applicant.name} profile opened.`)} aria-label={`Open ${applicant.name}`}><ArrowUpRight size={17} /></button></div>)}</div>{!visible.length ? <div className="empty-state surface-card"><UsersRound size={30} /><h2>No applicants in this view</h2><p>Try another status or search term.</p></div> : null}{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const spotlights = [
  { title: "The hands behind the good stuff", person: "Nica Villanueva", excerpt: "On making room for a slower kind of creativity.", status: "Draft", tone: "yellow", initials: "NV" },
  { title: "A little more courage to begin", person: "Miguel Reyes", excerpt: "On sharing work before it feels finished.", status: "Published", tone: "green", initials: "MR" },
  { title: "Finding your people in the city", person: "Ella Dela Cruz", excerpt: "On the tiny rituals that make a place feel like yours.", status: "Draft", tone: "pink", initials: "ED" },
];

export function SpotlightsPage() {
  const [tab, setTab] = useState("All spotlights"); const [notice, setNotice] = useState<string | null>(null); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); }; const visible = spotlights.filter((item) => tab === "All spotlights" || item.status === tab);
  return <div className="page-wrap section-page"><SectionHeader eyebrow="CONTENT  /  MEMBER SPOTLIGHTS" title="People worth spotlighting." description="Shape member stories with care and publish the voices that make Tagpuan feel like home." action={<ActionPill primary onClick={() => notify("Spotlight draft started.")}><Plus size={16} /> New spotlight</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL SPOTLIGHTS", value: "16", icon: <Star size={18} />, tone: "orange" }, { label: "PUBLISHED", value: "12", icon: <Check size={18} />, tone: "green" }, { label: "DRAFTS", value: "3", icon: <FileText size={18} />, tone: "yellow" }, { label: "THIS MONTH", value: "2", icon: <Sparkles size={18} />, tone: "blue" }]} />
    <div className="section-toolbar"><Tabs items={["All spotlights", "Draft", "Published"]} value={tab} onChange={setTab} /><button className="button outline small" type="button" onClick={() => notify("Spotlight sorting options opened.")}><Filter size={15} /> Sort by <ChevronDown size={14} /></button></div>
    <div className="spotlight-grid">{visible.map((item) => <article className="spotlight-card surface-card" key={item.title}><div className={cn("spotlight-art", item.tone)}><span className="portrait-badge">{item.initials}</span><span className={cn("content-status", item.status === "Published" && "published")}>{item.status}</span><Sparkles size={23} /></div><div className="spotlight-body"><div className="card-kicker"><span>Member spotlight</span><span>6 min read</span></div><h2>{item.title}</h2><p>{item.excerpt}</p><div className="spotlight-person"><span className="mini-avatar sky">{item.initials}</span><span>Featuring <strong>{item.person}</strong></span></div><div className="card-action-row"><ActionPill onClick={() => notify(`${item.title} opened.`)}><Pencil size={15} /> Edit story</ActionPill><button className="icon-button" type="button" onClick={() => notify("Spotlight actions coming soon.")} aria-label="More spotlight actions"><MoreHorizontal size={18} /></button></div></div></article>)}</div>{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
}

const hearMeOut = [
  { subject: "Can we make the next gathering earlier?", sender: "Anonymous", category: "Suggestion", status: "New", time: "18m ago", tone: "yellow", excerpt: "Would love a chance to join before the workday ends..." },
  { subject: "A small thank you to the volunteers", sender: "Kaye Morales", category: "Appreciation", status: "In review", time: "3h ago", tone: "green", excerpt: "The welcome at the last session made it easy to stay..." },
  { subject: "More quiet corners, please", sender: "Anonymous", category: "Idea", status: "Published", time: "Yesterday", tone: "blue", excerpt: "Could we set aside a low-volume corner at future events?" },
  { subject: "Looking for a mentor in product design", sender: "Andre Pascual", category: "Ask", status: "New", time: "2d ago", tone: "pink", excerpt: "I’d love to learn from someone who has made the jump..." },
];

export function HearMeOutPage() {
  const [tab, setTab] = useState("All submissions"); const [notice, setNotice] = useState<string | null>(null); const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 2500); }; const visible = hearMeOut.filter((item) => tab === "All submissions" || item.status === tab);
  return <div className="page-wrap section-page"><SectionHeader eyebrow="CONTENT  /  HEAR ME OUT" title="Give the room a mic." description="Review thoughtful submissions and keep the community conversation moving in the open." action={<ActionPill onClick={() => notify("Submission guidelines opened.")}><FileText size={16} /> View guidelines</ActionPill>} />
    <MetricStrip items={[{ label: "TOTAL SUBMISSIONS", value: "42", icon: <MessageCircle size={18} />, tone: "orange" }, { label: "NEW", value: "8", icon: <Sparkles size={18} />, tone: "yellow" }, { label: "IN REVIEW", value: "5", icon: <Clock3 size={18} />, tone: "pink" }, { label: "PUBLISHED", value: "29", icon: <Check size={18} />, tone: "green" }]} />
    <div className="section-toolbar"><Tabs items={["All submissions", "New", "In review", "Published"]} value={tab} onChange={setTab} /><button className="button outline small" type="button" onClick={() => notify("Submission categories opened.")}><Filter size={15} /> Filter category</button></div>
    <div className="submission-list">{visible.map((item) => <article className="submission-row surface-card" key={item.subject}><span className={cn("submission-icon", item.tone)}><MessageCircle size={20} /></span><div className="submission-copy"><div className="card-kicker"><span>{item.category}</span><span>{item.sender}</span></div><h2>{item.subject}</h2><p>{item.excerpt}</p></div><div className="submission-meta"><span className={cn("review-status", item.status.toLowerCase().replace(" ", "-"))}><i />{item.status}</span><time>{item.time}</time></div><div className="submission-actions"><ActionPill onClick={() => notify(`${item.subject} opened.`)}><Eye size={15} /> Review</ActionPill><button className="icon-button" type="button" onClick={() => notify("Submission actions coming soon.")} aria-label="More submission actions"><MoreHorizontal size={18} /></button></div></article>)}</div>{notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null}</div>;
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

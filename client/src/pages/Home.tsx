// Tagpuan style: warm scrapbook operations — cream paper, brown ink, terracotta actions, editorial type, tactile artifacts.

import { useMemo, useState, type ChangeEvent, type DragEvent, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ApplicantsPage, HearMeOutPage, MediaPage, NewsletterPage, ProjectsPage, RecapsPage, SpotlightsPage, WallPage } from "./AdminAdditionalPages";
import {
  AlignCenter,
  AlignLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Bold,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Clapperboard,
  Clock3,
  ExternalLink,
  Eye,
  FileText,
  Flag,
  Image as ImageIcon,
  ImagePlus,
  Italic,
  LayoutDashboard,
  Link2,
  List,
  ListOrdered,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  PlusCircle,
  Search,
  Send,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Underline,
  UploadCloud,
  UserCircle2,
  UserRound,
  UserRoundPlus,
  UsersRound,
  X,
} from "lucide-react";

type NoticeTone = "success" | "neutral";

type Notice = { message: string; tone: NoticeTone } | null;

type EventStatus = "Published" | "Draft" | "Past";

type EventItem = {
  id: number;
  session: string;
  title: string;
  date: string;
  shortDate: string;
  day: string;
  time: string;
  location: string;
  description: ReactNode;
  going: number;
  confirmed: number;
  capacity: number;
  status: EventStatus;
  image: string;
};

const asset = {
  mark: "/manus-storage/tagpuan-mark_ab941381.png",
  next: "/manus-storage/tagpuan-next-gathering_95abaa3b.jpg",
  sunday: "/manus-storage/tagpuan-sunday-sessions_d56d6a50.jpg",
  creative: "/manus-storage/tagpuan-creative-nights_a09cc658.jpg",
  weeknight: "/manus-storage/tagpuan-weeknight-hang_ed471b84.jpg",
};

const events: EventItem[] = [
  {
    id: 1,
    session: "SESSION 07",
    title: "The Social Room",
    date: "Aug 29, 2026",
    shortDate: "AUG 29, 2026",
    day: "SATURDAY",
    time: "7:00 PM",
    location: "The Den",
    description: "A night of speed friending, open mic, DJ sets, games, and good conversations.",
    going: 32,
    confirmed: 28,
    capacity: 50,
    status: "Published",
    image: asset.next,
  },
  {
    id: 2,
    session: "SESSION 06",
    title: "Sunday Sessions",
    date: "Aug 15, 2026",
    shortDate: "AUG 15, 2026",
    day: "SATURDAY",
    time: "3:00 PM",
    location: "The Den",
    description: "Co-work, share what you’re building, and learn from each other.",
    going: 41,
    confirmed: 37,
    capacity: 60,
    status: "Published",
    image: asset.sunday,
  },
  {
    id: 3,
    session: "SESSION 08",
    title: "Creative Nights",
    date: "Sep 12, 2026",
    shortDate: "SEP 12, 2026",
    day: "SATURDAY",
    time: "7:00 PM",
    location: "The Den",
    description: "Bring your art, music, words, or ideas. Let’s create together.",
    going: 0,
    confirmed: 0,
    capacity: 40,
    status: "Draft",
    image: asset.creative,
  },
  {
    id: 4,
    session: "SESSION 05",
    title: "Weeknight Hang",
    date: "Jul 25, 2026",
    shortDate: "JUL 25, 2026",
    day: "SATURDAY",
    time: "7:00 PM",
    location: "The Den",
    description: "Good talks, new friends, and a whole lot of laughs.",
    going: 55,
    confirmed: 53,
    capacity: 60,
    status: "Past",
    image: asset.weeknight,
  },
];

const navGroups = [
  {
    label: "Events",
    items: [
      { label: "All Events", path: "/admin/events", icon: CalendarDays },
      { label: "Create Event", path: "/admin/events/new", icon: PlusCircle },
      { label: "Event Recaps", path: "/admin/recaps", icon: Clapperboard },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Wall", path: "/admin/wall", icon: MessageCircle },
      { label: "Passion Projects", path: "/admin/projects", icon: Sparkles },
      { label: "Applicants", path: "/admin/applicants", icon: UsersRound },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Member Spotlights", path: "/admin/spotlights", icon: UserCircle2 },
      { label: "Hear Me Out", path: "/admin/hear-me-out", icon: Bell },
      { label: "Media", path: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    label: "Audience",
    items: [{ label: "Newsletter", path: "/admin/newsletter", icon: Mail }],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
  back,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  action?: ReactNode;
  back?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        {back}
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action ? <div className="header-actions">{action}</div> : null}
    </header>
  );
}

function TapedPhoto({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("taped-photo", className)}>
      <span className="tape tape-one" />
      <span className="tape tape-two" />
      <img src={src} alt={alt} />
    </div>
  );
}

function StatusBadge({ status }: { status: EventStatus }) {
  return <span className={cn("status-badge", status.toLowerCase())}><span />{status}</span>;
}

function StatCard({ icon: Icon, value, label }: { icon: typeof CalendarDays; value: string; label: ReactNode }) {
  return (
    <div className="stat-card">
      <Icon size={22} strokeWidth={1.8} />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isOverview = location === "/" || location === "/admin" || location === "/admin/";
  const activePath = isOverview ? "/admin" : location;

  const navigate = (path: string) => {
    setLocation(path);
    setMobileOpen(false);
  };

  return (
    <div className="admin-root">
      <aside className={cn("admin-sidebar", mobileOpen && "mobile-open")}>
        <div className="sidebar-top">
          <div className="brand-lockup">
            <img src={asset.mark} alt="Tagpuan hut mark" />
            <div>
              <div className="brand-name">TAGPUAN</div>
              <div className="brand-subtitle">Admin Workspace</div>
            </div>
          </div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation" type="button"><X size={20} /></button>
        </div>

        <nav className="side-nav" aria-label="Admin navigation">
          <button className={cn("nav-item", isOverview && "active")} onClick={() => navigate("/admin")} type="button">
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </button>
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <div className="nav-label">{group.label}</div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activePath === item.path;
                return (
                  <button key={item.path} className={cn("nav-item", active && "active")} onClick={() => navigate(item.path)} type="button">
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-account">
          <div className="account-avatar">P</div>
          <div className="account-copy"><strong>Pokecardph</strong><span>pokecardph@gmail.com</span></div>
          <ChevronDown size={16} />
        </div>
      </aside>

      {mobileOpen ? <button className="sidebar-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" type="button" /> : null}

      <main className="admin-main">
        <div className="mobile-topbar">
          <button className="icon-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation" type="button"><Menu size={20} /></button>
          <div className="mobile-brand">TAGPUAN <span>ADMIN</span></div>
          <Link className="mobile-preview" href="/" aria-label="Preview website"><ArrowUpRight size={16} /></Link>
        </div>
        {children}
        <footer className="admin-footer">
          <img src={asset.mark} alt="" />
          <span>Tagpuan Community Admin Panel</span>
          <span className="footer-dot">•</span>
          <span>Keep the space warm and the people closer.</span>
          <Sparkles size={14} />
        </footer>
      </main>
    </div>
  );
}

function OverviewPage() {
  return (
    <div className="page-wrap">
      <PageHeader
        eyebrow="TAGPUAN ADMIN"
        title="Keep the scrapbook alive."
        description={<>Manage gatherings, review who’s coming,<br className="desktop-break" /> and keep the community surfaces current.</>}
        action={<a className="button primary" href="#preview"><span>Preview website</span><ArrowUpRight size={17} /></a>}
      />

      <section className="stats-grid" aria-label="Community metrics">
        <StatCard icon={CalendarDays} value="3" label="UPCOMING EVENTS" />
        <StatCard icon={UserRoundPlus} value="87" label="TOTAL RSVPS" />
        <StatCard icon={UsersRound} value="12" label="PENDING APPLICANTS" />
        <StatCard icon={MessageCircle} value="146" label="WALL NOTES" />
        <StatCard icon={Sparkles} value="28" label="PASSION PROJECTS" />
        <StatCard icon={Mail} value="284" label={<>NEWSLETTER<br />SUBSCRIBERS</>} />
      </section>

      <div className="overview-top-grid">
        <section className="surface-card next-card">
          <div className="card-heading"><h2>Next Gathering</h2></div>
          <div className="next-card-body">
            <TapedPhoto src={asset.next} alt="Friends gathering under warm string lights" className="next-photo" />
            <div className="next-details">
              <span className="session-tag">SESSION 07</span>
              <h3>The Social Room</h3>
              <div className="dashed-rule" />
              <div className="meta-list">
                <span><Calendar size={16} /> AUG 29, 2026 <b>•</b> SATURDAY</span>
                <span><Clock3 size={16} /> 7:00 PM</span>
                <span><MapPin size={16} /> THE DEN</span>
                <span><UsersRound size={16} /> 32 people going</span>
              </div>
              <div className="inline-actions">
                <Link className="button primary small" href="/admin/events">Manage event <ArrowRight size={16} /></Link>
                <a className="button outline small" href="#public-page">View public page <ExternalLink size={15} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="surface-card activity-card">
          <div className="card-heading"><h2>Recent Activity</h2><a href="#all-activity">View all</a></div>
          <div className="activity-list">
            <ActivityRow icon={<UserRoundPlus size={17} />} tone="green" text="Maria Santos submitted an RSVP" time="4m ago" />
            <ActivityRow icon={<MessageCircle size={17} />} tone="yellow" text="New Wall note posted" time="18m ago" />
            <ActivityRow icon={<UsersRound size={17} />} tone="pink" text="Juan Cruz joined the community" time="1h ago" />
            <ActivityRow icon={<ImageIcon size={17} />} tone="blue" text="Recap photos updated" time="3h ago" />
            <ActivityRow icon={<Sparkles size={17} />} tone="orange" text="New passion project shared" time="5h ago" />
          </div>
        </section>
      </div>

      <div className="overview-bottom-grid">
        <section className="surface-card list-card">
          <div className="card-heading"><h2>Recent RSVPs</h2><a href="#rsvps">View all</a></div>
          <div className="rsvp-list">
            <RsvpRow initials="BA" name="Bea Alonzo" event="The Social Room" time="2m ago" tone="sun" />
            <RsvpRow initials="MR" name="Miguel Reyes" event="The Social Room" time="7m ago" tone="sky" />
            <RsvpRow initials="ED" name="Ella Dela Cruz" event="Sunday Sessions" time="15m ago" tone="rose" />
          </div>
        </section>

        <section className="surface-card list-card wall-card">
          <div className="card-heading"><h2>Wall Activity</h2><a href="#wall">View all</a></div>
          <div className="wall-list">
            <WallRow tone="yellow" text="Looking for people who want to start a book club" meta="anonymous · 12 pins" time="10m ago" />
            <WallRow tone="green" text="Learning Blender. Any tips?" meta="anonymous · 8 pins" time="1h ago" />
            <WallRow tone="pink" text="Who’s in for a morning run this Sunday?" meta="anonymous · 5 pins" time="2h ago" />
          </div>
        </section>

        <section className="surface-card list-card attention-card">
          <div className="card-heading"><h2>Content Needing Attention</h2><a href="#content">View all</a></div>
          <div className="attention-list">
            <AttentionRow icon={<Flag size={17} />} label="Pending Wall reports" count="3" />
            <AttentionRow icon={<CalendarDays size={17} />} label="Draft events" count="2" />
            <AttentionRow icon={<UsersRound size={17} />} label="Unpublished spotlights" count="1" />
            <AttentionRow icon={<ImageIcon size={17} />} label="Recap with missing photos" count="2" />
          </div>
        </section>
      </div>
    </div>
  );
}

function ActivityRow({ icon, tone, text, time }: { icon: ReactNode; tone: string; text: string; time: string }) {
  return <div className="activity-row"><span className={cn("activity-icon", tone)}>{icon}</span><span className="activity-text">{text}</span><span className="activity-time">{time}</span></div>;
}

function RsvpRow({ initials, name, event, time, tone }: { initials: string; name: string; event: string; time: string; tone: string }) {
  return <div className="rsvp-row"><span className={cn("mini-avatar", tone)}>{initials}</span><div><strong>{name}</strong><span>{event}</span></div><time>{time}</time></div>;
}

function WallRow({ tone, text, meta, time }: { tone: string; text: string; meta: string; time: string }) {
  return <div className="wall-row"><span className={cn("note-chip", tone)}><span /> </span><div><strong>{text}</strong><span>{meta}</span></div><time>{time}</time></div>;
}

function AttentionRow({ icon, label, count }: { icon: ReactNode; label: string; count: string }) {
  return <div className="attention-row"><span>{icon}</span><strong>{label}</strong><b>{count}</b></div>;
}

function EventRow({ event, onAction }: { event: EventItem; onAction: (message: string) => void }) {
  const isPast = event.status === "Past";
  return (
    <article className="event-row surface-card">
      <TapedPhoto src={event.image} alt={`${event.title} event`} className="event-photo" />
      <div className="event-content">
        <div className="event-title-line"><span className={cn("session-tag", isPast && "muted")}>{event.session}</span><StatusBadge status={event.status} /></div>
        <h2>{event.title}</h2>
        <div className="event-meta"><span><Calendar size={16} /> {event.shortDate} <b>•</b> {event.day}</span><span><Clock3 size={16} /> {event.time}</span><span><MapPin size={16} /> {event.location}</span></div>
        <p>{event.description}</p>
        <div className="event-counts"><span><UsersRound size={16} /> {event.going} {isPast ? "went" : "going"}</span><i /><span><UserRoundPlus size={16} /> {event.confirmed} confirmed</span><i /><span><CircleDot size={16} /> {event.capacity} capacity</span></div>
      </div>
      <div className="event-actions">
        <button className="button outline action-button" type="button" onClick={() => onAction(isPast ? "Recap preview opened." : event.status === "Draft" ? "Draft preview opened." : "Public event page opened.")}><Eye size={17} /> {isPast ? "View recap" : event.status === "Draft" ? "View draft" : "View public"}</button>
        <button className="button outline action-button" type="button" onClick={() => onAction(isPast ? "Attendee list opened." : "Attendees list opened.")}><UsersRound size={17} /> {isPast ? "View attendees" : `Attendees (${event.going})`}</button>
        {!isPast ? <button className="button outline action-button" type="button" onClick={() => onAction("Edit mode is ready for this event.")}><Pencil size={17} /> Edit</button> : null}
        <button className="icon-button event-menu" type="button" aria-label="More event actions" onClick={() => onAction("More event actions coming soon.")}><MoreHorizontal size={19} /></button>
      </div>
    </article>
  );
}

function EventsPage() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<Notice>(null);

  const filteredEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return events.filter((event) => {
      const matchesQuery = !normalized || `${event.title} ${event.description} ${event.location}`.toLowerCase().includes(normalized);
      const matchesFilter = filter === "All" || (filter === "Upcoming" && event.status === "Published") || event.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  const showNotice = (message: string) => {
    setNotice({ message, tone: "neutral" });
    window.setTimeout(() => setNotice(null), 2500);
  };

  return (
    <div className="page-wrap events-page">
      <PageHeader
        eyebrow="EVENTS"
        title="What’s going on?"
        description="Manage gatherings, schedules, RSVPs, and event content."
        action={<button className="button primary" type="button" onClick={() => setLocation("/admin/events/new")}><Plus size={18} /> Create event</button>}
      />
      <div className="events-toolbar">
        <div className="filter-tabs" role="tablist" aria-label="Event filters">
          {["All", "Upcoming", "Draft", "Past", "Archived"].map((item) => <button key={item} className={cn(filter === item && "active")} onClick={() => setFilter(item)} type="button">{item}</button>)}
        </div>
        <div className="search-tools"><label className="search-field"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events..." aria-label="Search events" /></label><button className="icon-button outline-icon" type="button" onClick={() => showNotice("More filters will be available here.")} aria-label="Open filters"><SlidersHorizontal size={18} /></button></div>
      </div>
      <div className="event-list">
        {filteredEvents.length ? filteredEvents.map((event) => <EventRow key={event.id} event={event} onAction={showNotice} />) : <div className="empty-state surface-card"><Search size={28} /><h2>No events found</h2><p>Try another search or choose a different filter.</p></div>}
      </div>
      <div className="pagination-row"><span>Showing {filteredEvents.length ? 1 : 0}–{filteredEvents.length} of {filteredEvents.length} events</span><div className="pagination-controls"><button className="icon-button" type="button" disabled aria-label="Previous page"><ArrowLeft size={17} /></button><button className="page-number active" type="button">1</button><button className="page-number" type="button" onClick={() => showNotice("Page 2 is not needed for this preview dataset.")}>2</button><button className="page-number" type="button" onClick={() => showNotice("Page 3 is not needed for this preview dataset.")}>3</button><button className="icon-button" type="button" onClick={() => showNotice("Next page is not available in this preview dataset.")} aria-label="Next page"><ArrowRight size={17} /></button></div><label className="rows-select">Rows per page:<select defaultValue="10" aria-label="Rows per page"><option value="10">10</option><option value="20">20</option></select><ChevronDown size={15} /></label></div>
      {notice ? <div className={cn("toast", notice.tone)}><CheckCircle2 size={17} />{notice.message}</div> : null}
    </div>
  );
}

const activityOptions = ["Speed Friending", "Open Mic", "Hear Me Out", "Games", "DJ Sets", "Free Drinks"];

function CreateEventPage() {
  const [, setLocation] = useLocation();
  const [eventName, setEventName] = useState("The Social Room");
  const [date, setDate] = useState("2026-08-29");
  const [time, setTime] = useState("19:00");
  const [location, setEventLocation] = useState("The Den");
  const [rsvp, setRsvp] = useState("");
  const [capacity, setCapacity] = useState("50");
  const [description, setDescription] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>(activityOptions);
  const [status, setStatus] = useState("published");
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const notify = (message: string, tone: NoticeTone = "success") => {
    setNotice({ message, tone });
    window.setTimeout(() => setNotice(null), 2800);
  };

  const toggleActivity = (item: string) => setSelectedActivities((current) => current.includes(item) ? current.filter((activity) => activity !== item) : [...current, item]);
  const setUpload = (file?: File) => { if (file) setFileName(file.name); };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => setUpload(event.target.files?.[0]);
  const handleDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); setUpload(event.dataTransfer.files?.[0]); };
  const submit = (kind: "draft" | "publish") => { notify(kind === "publish" ? `“${eventName || "Untitled event"}” is ready to publish.` : "Draft saved. You can keep editing later."); };

  return (
    <div className="page-wrap create-page">
      <PageHeader
        eyebrow="EVENTS  ›  CREATE EVENT"
        title="Create Event"
        description="Add the details of your gathering and publish it for the community."
        back={<button className="back-link" type="button" onClick={() => setLocation("/admin/events")}><ArrowLeft size={15} /> Back to events</button>}
        action={<><button className="button outline header-save" type="button" onClick={() => submit("draft")}><FileText size={16} /> Save draft</button><button className="button primary" type="button" onClick={() => submit("publish")}><Send size={16} /> Publish event <ArrowUpRight size={15} /></button></>}
      />

      <div className="create-grid">
        <section className="surface-card form-card event-info-card">
          <div className="section-title"><h2>Event Information</h2></div>
          <label className="field-label">Event name <span>*</span><input value={eventName} onChange={(event) => setEventName(event.target.value)} placeholder="Give your gathering a name" /></label>
          <div className="form-three"><label className="field-label">Date <span>*</span><div className="input-with-icon"><Calendar size={17} /><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></div></label><label className="field-label">Time <span>*</span><div className="input-with-icon"><Clock3 size={17} /><input type="time" value={time} onChange={(event) => setTime(event.target.value)} /></div></label><label className="field-label">Location <span>*</span><div className="input-with-icon"><MapPin size={17} /><input value={location} onChange={(event) => setEventLocation(event.target.value)} /></div></label></div>
          <label className="field-label">RSVP URL<div className="input-with-icon"><Link2 size={17} /><input value={rsvp} onChange={(event) => setRsvp(event.target.value)} placeholder="https://..." /></div></label>
          <label className="field-label">Capacity<div className="input-with-icon"><UsersRound size={17} /><input type="number" min="1" value={capacity} onChange={(event) => setCapacity(event.target.value)} /></div></label>
        </section>

        <section className="surface-card form-card image-card">
          <div className="section-title"><h2>Event Image</h2></div>
          <div className={cn("drop-zone", dragging && "dragging", fileName && "has-file")} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}>
            {fileName ? <><CheckCircle2 size={30} /><strong>{fileName}</strong><span>Ready to use for this event</span><button type="button" className="text-button" onClick={() => setFileName("")}>Choose another</button></> : <><UploadCloud size={34} /><strong>Drop event photo here</strong><span>or <label className="browse-label">click to browse<input type="file" accept="image/png,image/jpeg" onChange={handleFileChange} /></label></span></>}
          </div>
          <p className="helper centered">Recommended: 16:9 ratio, JPG or PNG, max 5MB</p>
        </section>

        <section className="surface-card form-card description-card">
          <div className="section-title"><h2>Event Description</h2></div>
          <div className="editor-shell"><div className="editor-toolbar"><button type="button" onClick={() => notify("Bold formatting selected.", "neutral")}><Bold size={16} /></button><button type="button" onClick={() => notify("Italic formatting selected.", "neutral")}><Italic size={16} /></button><button type="button" onClick={() => notify("Underline formatting selected.", "neutral")}><Underline size={16} /></button><i /><button type="button" onClick={() => notify("Bulleted list selected.", "neutral")}><List size={16} /></button><button type="button" onClick={() => notify("Numbered list selected.", "neutral")}><ListOrdered size={16} /></button><i /><button type="button" onClick={() => notify("Left align selected.", "neutral")}><AlignLeft size={16} /></button><button type="button" onClick={() => notify("Center align selected.", "neutral")}><AlignCenter size={16} /></button><button type="button" onClick={() => notify("Link insertion selected.", "neutral")}><Link2 size={16} /></button></div><textarea value={description} onChange={(event) => event.target.value.length <= 2000 && setDescription(event.target.value)} placeholder="Describe your event, what to expect, and why people should join..." /><div className="char-count">{description.length} / 2000</div></div>
        </section>

        <section className="surface-card form-card activities-card">
          <div className="section-title"><h2>Activities</h2><p>Select the activities that will be part of this event.</p></div>
          <div className="activity-options">{activityOptions.map((item) => <label className="check-card" key={item}><input type="checkbox" checked={selectedActivities.includes(item)} onChange={() => toggleActivity(item)} /><span className="custom-check"><Check size={13} /></span><span>{item}</span></label>)}</div>
        </section>

        <section className="surface-card form-card publishing-card">
          <div className="section-title"><h2>Publishing</h2></div>
          <div className="publishing-options">
            <label className={cn("publish-option", status === "draft" && "selected")}><input type="radio" name="status" value="draft" checked={status === "draft"} onChange={(event) => setStatus(event.target.value)} /><span className="radio-dot" /><span><strong>Draft</strong><small>Save as draft and continue editing later.</small></span></label>
            <label className={cn("publish-option", status === "published" && "selected")}><input type="radio" name="status" value="published" checked={status === "published"} onChange={(event) => setStatus(event.target.value)} /><span className="radio-dot" /><span><strong>Published</strong><small>Publish event and make it visible to the community.</small></span></label>
            <label className={cn("publish-option", status === "archived" && "selected")}><input type="radio" name="status" value="archived" checked={status === "archived"} onChange={(event) => setStatus(event.target.value)} /><span className="radio-dot" /><span><strong>Archived</strong><small>Archive this event and hide it from the public.</small></span></label>
          </div>
        </section>
      </div>
      {notice ? <div className={cn("toast", notice.tone)}><CheckCircle2 size={17} />{notice.message}</div> : null}
    </div>
  );
}

function PlaceholderPage({ title, eyebrow, description }: { title: string; eyebrow: string; description: ReactNode }) {
  const [notice, setNotice] = useState(false);
  return <div className="page-wrap"><PageHeader eyebrow={eyebrow} title={title} description={description} action={<button className="button primary" type="button" onClick={() => setNotice(true)}><Settings2 size={17} /> Manage section</button>} /><div className="empty-state surface-card placeholder-state"><Sparkles size={32} /><h2>This space is ready for your community.</h2><p>The layout is connected to the Tagpuan workspace. The detailed tools for this section can be added without changing the shell.</p>{notice ? <span className="inline-note"><CheckCircle2 size={16} /> Feature roadmap noted.</span> : null}</div></div>;
}

export default function Home() {
  const [location] = useLocation();
  let content: ReactNode;
  if (location === "/" || location === "/admin" || location === "/admin/") content = <OverviewPage />;
  else if (location === "/admin/events") content = <EventsPage />;
  else if (location === "/admin/events/new") content = <CreateEventPage />;
  else if (location === "/admin/recaps") content = <RecapsPage />;
  else if (location === "/admin/wall") content = <WallPage />;
  else if (location === "/admin/projects") content = <ProjectsPage />;
  else if (location === "/admin/applicants") content = <ApplicantsPage />;
  else if (location === "/admin/spotlights") content = <SpotlightsPage />;
  else if (location === "/admin/hear-me-out") content = <HearMeOutPage />;
  else if (location === "/admin/media") content = <MediaPage />;
  else content = <NewsletterPage />;

  return <AdminShell>{content}</AdminShell>;
}

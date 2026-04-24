// Shared chrome — horizontal nav, footer, mobile status bar, bottom nav, header.
// Expose globally.

/* ============ DESKTOP ============ */

function AitherMark({ height = 15 }) {
  return (
    <svg height={height} viewBox="0 0 56 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Aither" role="img">
      <path d="M10 0H9.71483C5.35895 0 1.81527 3.36443 1.81527 7.5C1.81527 8.30098 1.12882 8.95245 0.285446 8.95245H0V15H0.285171C4.64105 15 8.18473 11.6356 8.18473 7.5C8.18473 6.69902 8.87118 6.04755 9.71455 6.04755H9.99972L10 0Z" fill="currentColor"/>
      <path d="M17.4231 12H15.8271L18.9591 3.432H20.8791L23.9871 12H22.3791L21.5751 9.708H18.2391L17.4231 12ZM18.6591 8.484H21.1551L19.9191 4.824H19.8831L18.6591 8.484ZM24.6597 3.432H26.1957V12H24.6597V3.432ZM26.8727 4.728V3.432H33.4487V4.728H30.9287V12H29.3927V4.728H26.8727ZM39.3553 3.432H40.8793V12H39.3553V8.352H35.6593V12H34.1233V3.432H35.6593V7.056H39.3553V3.432ZM47.8032 3.432V4.728H43.8072V7.032H47.5512V8.304H43.8072V10.704H47.8392V12H42.2712V3.432H47.8032ZM48.9424 11.988V3.432H52.2064C54.1624 3.432 55.2544 4.452 55.2544 5.868C55.2544 7.128 54.4624 7.884 53.5504 8.124C54.3424 8.352 54.6184 9.012 54.9184 9.972C55.1584 10.752 55.3384 11.364 55.6504 11.916V12H54.0784C53.8024 11.472 53.5984 10.716 53.3344 10.008C53.0464 9.216 52.6744 8.664 51.6184 8.664H50.4784V11.988H48.9424ZM52.1224 7.416C53.1664 7.416 53.7424 6.864 53.7424 6C53.7424 5.256 53.2504 4.68 52.0864 4.68H50.4784V7.416H52.1224Z" fill="currentColor"/>
    </svg>
  );
}

function HorizontalNav({ current = "Events", search = "Search events, hosts, venues" }) {
  const tabs = ["Home", "Events", "Hosts", "Messages"];
  return (
    <div className="ki-hnav">
      <div className="brand">Logo</div>
      <nav className="tabs">
        {tabs.map(t => <a key={t} aria-current={t === current ? "page" : undefined}>{t}</a>)}
      </nav>
      <div className="spacer" />
      <div className="search">
        <Icons.Search size={14} />
        <span>{search}</span>
      </div>
      <button className="btn-ghost">Sign out</button>
      <div className="avatar">SY</div>
    </div>
  );
}

function Footer() {
  return (
    <div className="ki-footer">
      <div className="l">Logo</div>
      <div className="links">
        <span>Events</span>
        <span>Hosts</span>
        <span>Messages</span>
        <span>Privacy policy</span>
      </div>
      <div className="meta">
        <span>© Logo 202X</span>
        <span>·</span>
        <span>New York</span>
        <span>·</span>
        <span>All rights reserved</span>
      </div>
    </div>
  );
}

/* ============ MOBILE ============ */

function StatusBar({ time = "9:41" }) {
  return (
    <div className="ki-statusbar">
      <span>{time}</span>
      <div className="icons">
        <Icons.Signal size={16} />
        <Icons.Wifi size={16} />
        <Icons.Battery size={24} />
      </div>
    </div>
  );
}

function MobileHeader({ title, action = "info" }) {
  const Action = action === "info" ? Icons.Info : action === "search" ? Icons.Search : Icons.MoreH;
  return (
    <div className="ki-header">
      <button className="back" aria-label="Back"><Icons.Back size={20} /></button>
      <div className="title">{title}</div>
      <button className="action" aria-label="More"><Action size={20} /></button>
    </div>
  );
}

function BottomNav({ current = "Home" }) {
  const tabs = ["Home", "Profile", "Messages"];
  return (
    <div className="ki-bottomnav">
      {tabs.map(t => (
        <button key={t} aria-current={t === current ? "page" : undefined}>{t}</button>
      ))}
    </div>
  );
}

function HomeBar() { return <div className="ki-homebar" />; }

/* ============ DESKTOP · nav alternatives ============ */

// MinimalNav — logo · tabs · avatar. Authenticated in-app shell; no global search.
function MinimalNav({ current = "Events", initials = "SY", tabs = ["Home", "Events", "Hosts"] }) {
  return (
    <div className="ki-hnav-min">
      <div className="brand">Logo</div>
      <nav className="tabs">
        {tabs.map(t => <a key={t} aria-current={t === current ? "page" : undefined}>{t}</a>)}
      </nav>
      <div className="spacer" />
      <div className="avatar">{initials}</div>
    </div>
  );
}

// MarketingNav — logo · tabs · sign in · primary CTA. Pre-auth / public surfaces.
function MarketingNav({ current, cta = "Get access", tabs = ["Events", "Hosts", "About"] }) {
  return (
    <div className="ki-hnav-mkt">
      <div className="brand">Logo</div>
      <nav className="tabs">
        {tabs.map(t => <a key={t} aria-current={t === current ? "page" : undefined}>{t}</a>)}
      </nav>
      <div className="spacer" />
      <span className="signin">Sign in</span>
      <button className="wf-btn" data-primary="true">{cta}</button>
    </div>
  );
}

// WorkspaceNav — brand · breadcrumbs · status + action cluster + avatar.
// Deep editing context (the thing you see while building an event, draft, page).
function WorkspaceNav({
  crumbs = ["Sentropy Radio", "Events", "North Star Listening"],
  status = "Draft",
  initials = "SY",
}) {
  return (
    <div className="ki-hnav-ws">
      <div className="brand">Logo</div>
      <nav className="crumbs">
        {crumbs.map((c, i) => (
          <React.Fragment key={c + i}>
            {i > 0 && <span className="sep">/</span>}
            <span className={i === crumbs.length - 1 ? "current" : undefined}>{c}</span>
          </React.Fragment>
        ))}
      </nav>
      <div className="actions">
        <span className="status">{status}</span>
        <button className="wf-btn">Preview</button>
        <button className="wf-btn" data-primary="true">Publish</button>
        <div className="avatar">{initials}</div>
      </div>
    </div>
  );
}

// StepperNav — logo · numbered steps · save & exit. Multi-step / onboarding shell.
function StepperNav({
  steps = ["Details", "Co-hosts", "Tickets", "Review"],
  current = 1,
  exit = "Save & exit",
}) {
  return (
    <div className="ki-hnav-step">
      <div className="brand">Logo</div>
      <nav className="steps">
        {steps.map((s, i) => {
          const state = i < current ? "done" : i === current ? "current" : "todo";
          return (
            <React.Fragment key={s}>
              {i > 0 && <span className="step-sep" />}
              <span className="step" data-state={state}>
                <span className="num">{i < current ? "✓" : i + 1}</span>
                {s}
              </span>
            </React.Fragment>
          );
        })}
      </nav>
      <span className="exit">{exit}</span>
    </div>
  );
}

// SideNav — 240-wide vertical rail pinned left.
// Dashboard-shaped products where there are too many top-level destinations
// for a horizontal bar, and the product has enough depth to justify persistent
// wayfinding (hosts panel, admin, anything with a workspace sidebar).
function SideNav({
  current = "Events",
  initials = "SY",
  name = "Sasha Yanai",
  role = "Host · Sentropy",
}) {
  const items = [
    { name: "Home",     icon: Icons.Pin },
    { name: "Events",   icon: Icons.Calendar },
    { name: "Hosts",    icon: Icons.User },
    { name: "Messages", icon: Icons.MoreH },
    { name: "Saved",    icon: Icons.Bookmark },
  ];
  return (
    <div className="ki-snav">
      <div className="brand">Logo</div>
      {items.map(({ name: n, icon: I }) => (
        <div key={n} className="item" aria-current={n === current ? "page" : undefined}>
          <span className="ic"><I size={16} /></span>
          <span>{n}</span>
        </div>
      ))}
      <div className="spacer" />
      <div className="user">
        <div className="avatar">{initials}</div>
        <div className="who">
          <span className="n">{name}</span>
          <span className="m">{role}</span>
        </div>
      </div>
    </div>
  );
}

// SubNav — secondary tab strip that sits under any primary nav.
// In-page navigation for a section with its own sub-pages
// (Settings, Event detail, Host profile, etc.).
function SubNav({
  section = "Settings",
  current = "Billing",
  tabs = ["General", "Billing", "Team", "Usage", "Integrations", "API"],
  trailing,
}) {
  return (
    <div className="ki-subnav">
      {section && <div className="section">{section}</div>}
      <nav className="tabs">
        {tabs.map(t => <a key={t} aria-current={t === current ? "page" : undefined}>{t}</a>)}
      </nav>
      <div className="spacer" />
      {trailing && <div className="trailing">{trailing}</div>}
    </div>
  );
}

/* ============ MOBILE · header alternatives ============ */

// LargeTitleHeader — large title + meta + trailing action. Top-of-stack surfaces.
function LargeTitleHeader({ title = "Tonight", meta = "12 events · Thursday", action = "search" }) {
  const Action = action === "search" ? Icons.Search : action === "filter" ? Icons.Filter : Icons.MoreH;
  return (
    <div className="ki-header-lg">
      <div>
        <div className="title">{title}</div>
        {meta && <div className="meta">{meta}</div>}
      </div>
      <button className="action" aria-label={action}><Action size={20} /></button>
    </div>
  );
}

// SearchHeader — full-width search input + trailing avatar. Search-led surface.
function SearchHeader({ placeholder = "Search events, hosts, venues", initials = "SY" }) {
  return (
    <div className="ki-header-search">
      <div className="field">
        <Icons.Search size={14} />
        <span>{placeholder}</span>
      </div>
      <div className="avatar">{initials}</div>
    </div>
  );
}

// ModalHeader — Cancel · Title · Done. Sheets and dismissible forms.
function ModalHeader({ title = "New event", cancel = "Cancel", confirm = "Save" }) {
  return (
    <div className="ki-header-modal">
      <button className="cancel">{cancel}</button>
      <div className="title">{title}</div>
      <button className="done">{confirm}</button>
    </div>
  );
}

/* ============ MOBILE · bottom-nav alternatives ============ */

// BottomNavFive — native full-width bar, 5 icon + label tabs.
function BottomNavFive({ current = "Home" }) {
  const tabs = [
    { name: "Home",     icon: Icons.Pin },
    { name: "Discover", icon: Icons.Search },
    { name: "Events",   icon: Icons.Calendar },
    { name: "Saved",    icon: Icons.Bookmark },
    { name: "Profile",  icon: Icons.User },
  ];
  return (
    <div className="ki-bottomnav-5">
      {tabs.map(({ name, icon: I }) => (
        <button key={name} aria-current={name === current ? "page" : undefined}>
          <I size={18} />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}

// BottomNavFab — 2 tabs · centered create · 2 tabs. Creation-forward apps.
function BottomNavFab({ current = "Home" }) {
  const left = [
    { name: "Home",     icon: Icons.Pin },
    { name: "Discover", icon: Icons.Search },
  ];
  const right = [
    { name: "Saved",   icon: Icons.Bookmark },
    { name: "Profile", icon: Icons.User },
  ];
  const Tab = ({ name, I }) => (
    <button aria-current={name === current ? "page" : undefined}>
      <I size={18} />
      <span>{name}</span>
    </button>
  );
  return (
    <div className="ki-bottomnav-fab">
      {left.map(t => <Tab key={t.name} name={t.name} I={t.icon} />)}
      <div className="fab" aria-label="Create"><Icons.Plus size={22} /></div>
      {right.map(t => <Tab key={t.name} name={t.name} I={t.icon} />)}
    </div>
  );
}

Object.assign(window, {
  AitherMark,
  HorizontalNav, MinimalNav, MarketingNav, WorkspaceNav, StepperNav, SideNav, SubNav,
  Footer, StatusBar,
  MobileHeader, LargeTitleHeader, SearchHeader, ModalHeader,
  BottomNav, BottomNavFive, BottomNavFab,
  HomeBar,
});

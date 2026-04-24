/* ========== icons.jsx ========== */
// Icons — small SVG set. Lucide-style stroke, 1.5px.
// Exposed as globals for all frame components to use.

const Icon = ({ d, size = 18, stroke = 1.5, fill = "none", children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {d ? <path d={d} /> : children}
  </svg>
);

const Icons = {
  Search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Icon>,
  Back:   (p) => <Icon {...p}><path d="m15 18-6-6 6-6"/></Icon>,
  More:   (p) => <Icon {...p}><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></Icon>,
  MoreH:  (p) => <Icon {...p}><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></Icon>,
  Info:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></Icon>,
  Filter: (p) => <Icon {...p}><path d="M3 6h18M7 12h10M10 18h4"/></Icon>,
  Plus:   (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Check:  (p) => <Icon {...p}><path d="M20 6 9 17l-5-5"/></Icon>,
  ChevR:  (p) => <Icon {...p}><path d="m9 18 6-6-6-6"/></Icon>,
  ChevL:  (p) => <Icon {...p}><path d="m15 18-6-6 6-6"/></Icon>,
  ChevD:  (p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>,
  Download: (p) => <Icon {...p}><path d="M12 3v12M6 11l6 6 6-6M4 21h16"/></Icon>,
  Share:  (p) => <Icon {...p}><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/></Icon>,
  Heart:  (p) => <Icon {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Icon>,
  Play:   (p) => <Icon {...p} fill="currentColor" stroke="none"><path d="M7 5v14l12-7z"/></Icon>,
  PlayOutline: (p) => <Icon {...p}><path d="M7 5v14l12-7z"/></Icon>,
  Bookmark: (p) => <Icon {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></Icon>,
  Pin:    (p) => <Icon {...p}><path d="M12 22v-8M9 8a3 3 0 1 1 6 0v5H9zM7 13h10"/></Icon>,
  Map:    (p) => <Icon {...p}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></Icon>,
  Calendar: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M16 3v4M8 3v4M3 11h18"/></Icon>,
  Pin2: (p) => <Icon {...p}><path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></Icon>,
  Globe: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Icon>,
  User: (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></Icon>,
  Signal: (p) => <Icon {...p} stroke={0} fill="currentColor"><path d="M1 17h2v3H1zM5 14h2v6H5zM9 11h2v9H9zM13 8h2v12h-2z"/></Icon>,
  Wifi: (p) => <Icon {...p}><path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.05a6 6 0 0 1 7 0M12 20h.01M2 8.82a15 15 0 0 1 20 0"/></Icon>,
  Battery: (p) => <Icon {...p}><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><rect x="4" y="9" width="14" height="6" rx="0" fill="currentColor" stroke="none"/></Icon>,
};

Object.assign(window, { Icon, Icons });


/* ========== chrome.jsx ========== */
// Shared chrome — horizontal nav, footer, mobile status bar, bottom nav, header.
// Expose globally.

/* ============ DESKTOP ============ */

function HorizontalNav({ current = "Events", search = "Search events, hosts, venues" }) {
  const tabs = ["Home", "Events", "Hosts", "Messages"];
  return (
    <div className="ki-hnav">
      <div className="brand">Company</div>
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
      <div className="l">Company</div>
      <div className="links">
        <span>Events</span>
        <span>Hosts</span>
        <span>Messages</span>
        <span>Privacy policy</span>
      </div>
      <div className="meta">
        <span>© Company 202X</span>
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

Object.assign(window, { HorizontalNav, Footer, StatusBar, MobileHeader, BottomNav, HomeBar });


/* ========== template-dense-list.jsx ========== */
// Template 1 — Dense List
// WEB: tracklist-style events list, paired with Detail (YT Music Playlist rhythm).
// MOBILE: compact event rows.
//
// Row anatomy (both):  idx? · POSTER · title · host · date · location · duration/status · actions

/* ============ WEB ============ */
// 1440×900 canvas (desktop viewport). Paired with Detail = hero-left + list-right.
// We use the FULL canvas for list here — this is the listing page.

const denseListWebRows = [
  { t: "Midnight at Mercury",      h: "Lauren Matsuda",  d: "Feb 8",  v: "Bushwick, Brooklyn",   k: "Thu 8pm",   p: "4h",   tag: "Guest list" },
  { t: "Rooftop Almanac · Vol 3",  h: "Flow Studio",     d: "Feb 10", v: "Dumbo · The Rail",     k: "Sat 6pm",   p: "6h",   tag: "Sold out" },
  { t: "Quiet Hours",              h: "Ensemble Gray",   d: "Feb 12", v: "Soho House · Meatpacking", k: "Mon 9pm", p: "3h", tag: "Invite" },
  { t: "Atlas Supper Club",        h: "Marisol Ortega",  d: "Feb 13", v: "East Village",         k: "Tue 7pm",   p: "3h",   tag: "RSVP" },
  { t: "After Hours Reading",      h: "Ardent Press",    d: "Feb 14", v: "McNally Jackson · Seaport", k: "Wed 8pm", p: "90m", tag: "Open" },
  { t: "North Star Listening",     h: "Sentropy Radio",  d: "Feb 15", v: "Williamsburg · Elsewhere", k: "Thu 10pm", p: "4h", tag: "Members" },
  { t: "The Long Table",           h: "Orient & Flint",  d: "Feb 16", v: "Crown Heights",        k: "Fri 7pm",   p: "3h",   tag: "RSVP" },
  { t: "Porchlight",               h: "Grove House",     d: "Feb 17", v: "Fort Greene · Park",   k: "Sat 5pm",   p: "5h",   tag: "Open" },
  { t: "Ember / Ash",              h: "Kindling Collective", d: "Feb 18", v: "Industry City",    k: "Sun 8pm",   p: "4h",   tag: "Invite" },
  { t: "Field Notes Vol 02",       h: "Atlas Obscura",   d: "Feb 20", v: "Brooklyn Botanic",     k: "Tue 6pm",   p: "3h",   tag: "Waitlist" },
  { t: "The Counting House",       h: "Hadrian Hall",    d: "Feb 21", v: "Tribeca · 21 Warren",  k: "Wed 9pm",   p: "4h",   tag: "Guest list" },
  { t: "Low Light",                h: "Nocturne Society", d: "Feb 23", v: "Chinatown · Basement", k: "Fri 11pm", p: "5h",   tag: "Members" },
];

function DenseListWeb() {
  return (
    <div className="dlw">
      <HorizontalNav current="Events" />
      <div className="dlw-body">
        {/* Header block — playlist-style: hero art left + meta right */}
        <div className="dlw-hero">
          <div className="wf-placeholder dlw-hero-art">POSTER</div>
          <div className="dlw-hero-meta">
            <div className="wf-kicker">Curated list · 12 events</div>
            <h1 className="dlw-title">This Week in New York</h1>
            <p className="dlw-desc">
              A dozen gatherings shaped by the city's small rooms — suppers, listening sessions,
              readings, rooftops. Updated every Monday.
            </p>
            <div className="dlw-meta-row">
              <span className="wf-meta">Aither Editorial</span>
              <span className="wf-dot" />
              <span className="wf-meta">12 events</span>
              <span className="wf-dot" />
              <span className="wf-meta">Feb 8 — Feb 23</span>
            </div>
            <div className="dlw-actions">
              <button className="wf-btn" data-primary="true"><Icons.Bookmark size={14} /> Save list</button>
              <button className="wf-btn"><Icons.Share size={14} /> Share</button>
              <button className="wf-btn" aria-label="More"><Icons.More size={14} /></button>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="dlw-pills">
          <button className="wf-pill" data-active="true">All</button>
          <button className="wf-pill">This week</button>
          <button className="wf-pill">Open</button>
          <button className="wf-pill">Members</button>
          <button className="wf-pill">Free</button>
          <button className="wf-pill">Manhattan</button>
          <button className="wf-pill">Brooklyn</button>
        </div>

        {/* Column header */}
        <div className="dlw-head">
          <div className="c-idx">#</div>
          <div className="c-title">Event</div>
          <div className="c-host">Host</div>
          <div className="c-date">Date</div>
          <div className="c-venue">Venue</div>
          <div className="c-dur">Duration</div>
          <div className="c-act"></div>
        </div>
        <div className="wf-hair" />

        {/* Rows */}
        <div className="dlw-rows">
          {denseListWebRows.map((r, i) => (
            <div className="dlw-row" key={i}>
              <div className="c-idx">{String(i + 1).padStart(2, "0")}</div>
              <div className="c-title">
                <div className="wf-placeholder dlw-thumb">POSTER</div>
                <div className="dlw-title-col">
                  <div className="t">{r.t}</div>
                  <div className="st">{r.k} · {r.tag}</div>
                </div>
              </div>
              <div className="c-host">{r.h}</div>
              <div className="c-date">{r.d}</div>
              <div className="c-venue">{r.v}</div>
              <div className="c-dur">{r.p}</div>
              <div className="c-act">
                <button aria-label="Save"><Icons.Heart size={16} /></button>
                <button aria-label="More"><Icons.More size={16} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="dlw-pagination">
          <button aria-label="Previous"><Icons.ChevL size={14} /></button>
          <button data-active="true">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button aria-label="Next"><Icons.ChevR size={14} /></button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ============ MOBILE ============ */

const denseListMobileRows = [
  { t: "Midnight at Mercury",     h: "Lauren Matsuda · Bushwick",      d: "Thu · 4h" },
  { t: "Rooftop Almanac · Vol 3", h: "Flow Studio · Dumbo",            d: "Sat · 6h" },
  { t: "Quiet Hours",             h: "Ensemble Gray · Meatpacking",    d: "Mon · 3h" },
  { t: "Atlas Supper Club",       h: "Marisol Ortega · East Village",  d: "Tue · 3h" },
  { t: "After Hours Reading",     h: "Ardent Press · Seaport",         d: "Wed · 90m" },
  { t: "North Star Listening",    h: "Sentropy · Williamsburg",        d: "Thu · 4h" },
  { t: "The Long Table",          h: "Orient & Flint · Crown Hts",     d: "Fri · 3h" },
  { t: "Porchlight",              h: "Grove House · Fort Greene",      d: "Sat · 5h" },
  { t: "Ember / Ash",             h: "Kindling · Industry City",       d: "Sun · 4h" },
  { t: "Field Notes Vol 02",      h: "Atlas Obscura · Botanic",        d: "Tue · 3h" },
  { t: "The Counting House",      h: "Hadrian Hall · Tribeca",         d: "Wed · 4h" },
  { t: "Low Light",               h: "Nocturne · Chinatown",           d: "Fri · 5h" },
  { t: "Porchlight II",           h: "Grove House · Park Slope",       d: "Sat · 5h" },
];

function DenseListMobile() {
  return (
    <div className="ki-mobile dlm">
      <StatusBar />
      {/* Page header (not the back-header — this is a tab root) */}
      <div className="dlm-head">
        <h1>Events</h1>
        <button className="dlm-search-ic" aria-label="Search"><Icons.Search size={20} /></button>
      </div>
      {/* Tabs + filter */}
      <div className="dlm-tabs">
        <div className="dlm-tabgroup">
          <button className="wf-pill">Map</button>
          <button className="wf-pill" data-active="true">List</button>
        </div>
        <button className="wf-pill dlm-filter"><Icons.Filter size={14} /> Filter</button>
      </div>

      <div className="ki-scroll dlm-scroll">
        <div className="dlm-list">
          {denseListMobileRows.map((r, i) => (
            <React.Fragment key={i}>
              <div className="dlm-row">
                <div className="wf-placeholder dlm-thumb">POSTER</div>
                <div className="dlm-text">
                  <div className="t">{r.t}</div>
                  <div className="s">{r.h}</div>
                </div>
                <div className="dlm-trail">
                  <div className="dur">{r.d}</div>
                  <button aria-label="More"><Icons.More size={18} /></button>
                </div>
              </div>
              <div className="dlm-hair" />
            </React.Fragment>
          ))}
        </div>
      </div>
      <BottomNav current="Home" />
      <HomeBar />
    </div>
  );
}

Object.assign(window, { DenseListWeb, DenseListMobile });


/* ========== template-editorial-detail.jsx ========== */
// Template 2 — Editorial Detail
// WEB: full-bleed hero + overlaid meta + sections below (YT Music Artist/Tems + Aither Event)
// MOBILE: Event page with hero POSTER + sticky compact header on scroll (shown as scrolled state)

/* ============ WEB ============ */

function EditorialDetailWeb() {
  return (
    <div className="edw">
      {/* Hero — full bleed, chrome is overlaid transparent */}
      <div className="edw-hero">
        <div className="wf-placeholder edw-hero-img">FULL-BLEED POSTER</div>
        <div className="edw-hero-wash" />
        {/* Overlaid transparent nav */}
        <div className="edw-overlay-nav">
          <div className="brand">Company</div>
          <nav className="tabs">
            <a>Home</a>
            <a aria-current="page">Events</a>
            <a>Hosts</a>
            <a>Messages</a>
          </nav>
          <div className="spacer" />
          <button className="search-ic" aria-label="Search"><Icons.Search size={18} /></button>
          <button className="btn-ghost">Sign out</button>
          <div className="avatar">SY</div>
        </div>

        {/* Hero content — bottom-left */}
        <div className="edw-hero-content">
          <div className="wf-kicker">Event · Thursday · Feb 15, 2026 · 10:00pm</div>
          <h1 className="edw-title">North Star<br/>Listening Session</h1>
          <p className="edw-lede">
            A late-night vinyl session with Sentropy Radio. Two hours of dub,
            ambient and long-form b-sides. Limited capacity.
          </p>
          <div className="edw-meta-row">
            <span>Hosted by <b>Sentropy Radio</b></span>
            <span className="wf-dot" />
            <span>Williamsburg · Elsewhere</span>
            <span className="wf-dot" />
            <span>87 going</span>
          </div>
          <div className="edw-actions">
            <button className="wf-btn" data-primary="true">RSVP</button>
            <button className="wf-btn"><Icons.Bookmark size={14} /> Save</button>
            <button className="wf-btn"><Icons.Share size={14} /> Share</button>
            <button className="wf-btn" aria-label="More"><Icons.More size={14} /></button>
          </div>
        </div>
      </div>

      {/* Sections below hero */}
      <div className="edw-body">
        <section className="edw-about">
          <div className="edw-col-kicker">
            <div className="wf-kicker">About</div>
          </div>
          <div className="edw-col-copy">
            <p>
              North Star is a monthly listening session programmed by Sentropy Radio.
              This edition centers on the deep-cut dub archive — sourced from private
              collections in Kingston, London and New York. Arrive early. The first set
              starts at 10:15 sharp.
            </p>
            <p>
              All listening is done on a four-point Devialet system. No phones on the
              dancefloor. Smoking on the courtyard patio.
            </p>
          </div>
          <div className="edw-col-side">
            <div className="edw-facts">
              <div className="row"><span className="l">Date</span><span className="v">Thu · Feb 15 · 10pm</span></div>
              <div className="row"><span className="l">Duration</span><span className="v">4 hours</span></div>
              <div className="row"><span className="l">Venue</span><span className="v">Elsewhere Loft</span></div>
              <div className="row"><span className="l">Address</span><span className="v">599 Johnson Ave, Brooklyn</span></div>
              <div className="row"><span className="l">Age</span><span className="v">21+</span></div>
              <div className="row"><span className="l">Price</span><span className="v">$22 advance</span></div>
            </div>
          </div>
        </section>

        <div className="wf-hair" />

        {/* Tonight's program */}
        <section className="edw-program">
          <div className="edw-section-head">
            <h2>Tonight's program</h2>
            <a className="edw-more">See full notes <Icons.ChevR size={13} /></a>
          </div>
          <div className="edw-tracks">
            {[
              { n: "01", t: "Opening · Ambient dub",       sub: "Selector — Mira Osei",       d: "45 min" },
              { n: "02", t: "Kingston b-sides",             sub: "Selector — Denzel Vaughn",   d: "55 min" },
              { n: "03", t: "Interlude · spoken word",      sub: "Poet — Ira Tomlin",          d: "10 min" },
              { n: "04", t: "London pressings · 1983-88",   sub: "Selector — Hilda Greaves",   d: "60 min" },
              { n: "05", t: "Closing · long-form",          sub: "Selector — Mira Osei",       d: "50 min" },
            ].map(r => (
              <div className="edw-track" key={r.n}>
                <div className="n">{r.n}</div>
                <div className="t">
                  <div className="t1">{r.t}</div>
                  <div className="t2">{r.sub}</div>
                </div>
                <div className="d">{r.d}</div>
                <button className="more" aria-label="More"><Icons.More size={16} /></button>
              </div>
            ))}
          </div>
        </section>

        <div className="wf-hair" />

        {/* Host + You might also like */}
        <section className="edw-host-row">
          <div className="edw-host">
            <div className="wf-kicker">Host</div>
            <div className="edw-host-card">
              <div className="wf-placeholder edw-host-art">HOST</div>
              <div className="edw-host-text">
                <h3>Sentropy Radio</h3>
                <p>
                  Independent radio station & listening society operating between Brooklyn
                  and Kingston. 2,400 members.
                </p>
                <div className="edw-host-actions">
                  <button className="wf-btn">Follow</button>
                  <button className="wf-btn">4 upcoming events</button>
                </div>
              </div>
            </div>
          </div>
          <div className="edw-sim">
            <div className="wf-kicker">You might also like</div>
            <div className="edw-sim-list">
              {["Low Light", "Ember / Ash", "Porchlight"].map((t, i) => (
                <div className="edw-sim-row" key={i}>
                  <div className="wf-placeholder edw-sim-thumb">POSTER</div>
                  <div className="edw-sim-text">
                    <div className="t">{t}</div>
                    <div className="s">Nocturne Society · Fri</div>
                  </div>
                  <Icons.ChevR size={14} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

/* ============ MOBILE ============ */
// Scrolled state — sticky compact header has collapsed the hero.
// Shows title + RSVP CTA in the header; main content is visible below.

function EditorialDetailMobile() {
  return (
    <div className="ki-mobile edm">
      <StatusBar />
      {/* Sticky compact header (scrolled state) */}
      <div className="edm-sticky">
        <button className="back" aria-label="Back"><Icons.Back size={20} /></button>
        <div className="edm-sticky-title">
          <div className="t">North Star Listening</div>
          <div className="s">Thu · 10pm · Williamsburg</div>
        </div>
        <button className="action" aria-label="More"><Icons.MoreH size={20} /></button>
      </div>

      <div className="ki-scroll edm-scroll">
        {/* Small collapsed hero strip — shows the hero is "above" but mostly gone */}
        <div className="edm-collapsed-hero">
          <div className="wf-placeholder edm-mini-poster">POSTER</div>
          <div className="edm-collapsed-meta">
            <div className="wf-kicker">Event</div>
            <div className="edm-collapsed-name">North Star Listening</div>
          </div>
        </div>

        <div className="edm-meta-block">
          <h1 className="edm-title">North Star Listening Session</h1>
          <p className="edm-lede">
            A late-night vinyl session with Sentropy Radio. Two hours of dub, ambient and long-form b-sides.
          </p>
          <div className="edm-meta-rows">
            <div className="edm-meta-row">
              <Icons.Calendar size={14} />
              <span>Thu · Feb 15, 2026 · 10pm</span>
            </div>
            <div className="edm-meta-row">
              <Icons.Pin2 size={14} />
              <span>Elsewhere Loft · Williamsburg</span>
            </div>
            <div className="edm-meta-row">
              <Icons.User size={14} />
              <span>Sentropy Radio · 87 going</span>
            </div>
          </div>
        </div>

        <div className="edm-hair" />

        <div className="edm-section">
          <div className="edm-section-kicker">About</div>
          <p className="edm-body">
            North Star is a monthly listening session programmed by Sentropy Radio. This edition centers
            on the deep-cut dub archive — sourced from private collections in Kingston, London and New York.
          </p>
          <p className="edm-body">Arrive early. The first set starts at 10:15 sharp.</p>
        </div>

        <div className="edm-hair" />

        <div className="edm-section">
          <div className="edm-section-kicker">Tonight's program</div>
          {[
            { n: "01", t: "Opening · Ambient dub",       d: "45 min" },
            { n: "02", t: "Kingston b-sides",             d: "55 min" },
            { n: "03", t: "Interlude · spoken word",      d: "10 min" },
            { n: "04", t: "London pressings · 1983-88",   d: "60 min" },
          ].map(r => (
            <div className="edm-track" key={r.n}>
              <span className="n">{r.n}</span>
              <span className="t">{r.t}</span>
              <span className="d">{r.d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating primary CTA above bottom nav */}
      <div className="edm-cta">
        <button className="wf-btn" data-primary="true">
          <Icons.Check size={14} /> RSVP · $22
        </button>
      </div>

      <BottomNav current="Home" />
      <HomeBar />
    </div>
  );
}

Object.assign(window, { EditorialDetailWeb, EditorialDetailMobile });


/* ========== template-multistep-form.jsx ========== */
// Template 3 — Multi-step Form (event creation)
// WEB: left progress rail + stacked sections on right
// MOBILE: Step 2/3 with progress indicator at top

/* ============ WEB ============ */
// 1440×900. Minimal chrome — just a thin top bar with brand + save & exit.
// Step 2 of 4 active: "Details"
// Sections: Cover & headline · Host & venue · When it happens · Capacity & RSVP

function MultiStepFormWeb() {
  const steps = [
    { n: "01", t: "Basics",            s: "Name · theme · cover", done: true },
    { n: "02", t: "Details",           s: "Host · venue · time",  active: true },
    { n: "03", t: "Guests",            s: "Invite list · RSVP" },
    { n: "04", t: "Review",            s: "Confirm & publish" },
  ];

  return (
    <div className="mfw">
      {/* Slim top bar */}
      <div className="mfw-topbar">
        <div className="brand">Company</div>
        <div className="mfw-tb-title">
          <span className="wf-kicker">New event</span>
          <span className="t">Atlas Supper Club</span>
        </div>
        <div className="spacer" />
        <div className="mfw-tb-save">
          <span className="wf-dot" /> Draft saved · just now
        </div>
        <button className="wf-btn">Save & exit</button>
      </div>

      <div className="mfw-body">
        {/* Left progress rail */}
        <aside className="mfw-rail">
          <div className="wf-kicker" style={{marginBottom: 24}}>Progress · 2 of 4</div>
          <div className="mfw-rail-steps">
            {steps.map((s, i) => (
              <div className="mfw-step" data-done={s.done || undefined} data-active={s.active || undefined} key={s.n}>
                <div className="marker">
                  {s.done ? <Icons.Check size={13}/> : <span>{s.n}</span>}
                </div>
                <div className="text">
                  <div className="t">{s.t}</div>
                  <div className="s">{s.s}</div>
                </div>
                {i < steps.length - 1 && <div className="line" />}
              </div>
            ))}
          </div>

          <div className="mfw-rail-help">
            <div className="wf-kicker">Need help?</div>
            <p>Drafts auto-save as you go. Switch to any completed step from this rail.</p>
          </div>
        </aside>

        {/* Form column */}
        <main className="mfw-form">
          <header className="mfw-form-head">
            <div className="wf-kicker">Step 02 · Details</div>
            <h1>Host, venue, and when it happens.</h1>
            <p>Required fields are marked. You can still edit these after publishing.</p>
          </header>

          <FormSection kicker="Host" title="Who's running this event?" help="Primary host is listed on the invite; co-hosts can edit and message guests.">
            <div className="mfw-grid-2">
              <Field label="Primary host" value="Marisol Ortega" trailing={<Icons.ChevD size={14} />} />
              <Field label="Co-hosts" placeholder="Add co-host…" trailing={<Icons.Plus size={14} />} />
            </div>
            <Field label="Host bio" placeholder="One line about the host — shows on the event page." />
          </FormSection>

          <FormSection kicker="Venue" title="Where is it?" help="Attach an address or a geographic area. Exact address can be released closer to the date.">
            <RadioRow
              options={[
                { k: "address", t: "Exact address",     s: "Shared on RSVP" },
                { k: "area",    t: "Neighborhood only", s: "Released 24h before" },
                { k: "private", t: "Private DM",        s: "Sent after approval" },
              ]}
              active="address"
            />
            <div className="mfw-grid-2">
              <Field label="Venue name" value="Hall Atlas" />
              <Field label="Capacity" value="48" trailing={<span className="wf-meta">guests</span>} />
            </div>
            <Field label="Address" value="221 E 7th Street, New York, NY 10009" />
            <Field label="Access notes" placeholder="Elevator? Wheelchair access? Buzzer code?" multiline />
          </FormSection>

          <FormSection kicker="When" title="Date & time" help="Times are in your local timezone. Guests see their own.">
            <div className="mfw-grid-3">
              <Field label="Date"        value="Tue · Feb 13, 2026" trailing={<Icons.Calendar size={14} />} />
              <Field label="Start time"  value="7:00 PM"             trailing={<Icons.ChevD size={14} />} />
              <Field label="End time"    value="10:00 PM"            trailing={<Icons.ChevD size={14} />} />
            </div>
            <div className="mfw-checkrow">
              <Checkbox checked />
              <span>Show end time on the invite</span>
            </div>
            <div className="mfw-checkrow">
              <Checkbox />
              <span>This is a recurring event</span>
            </div>
          </FormSection>

          {/* Footer — nav between steps */}
          <div className="mfw-form-foot">
            <button className="wf-btn"><Icons.ChevL size={14} /> Back to Basics</button>
            <div className="spacer" />
            <button className="wf-btn">Skip for now</button>
            <button className="wf-btn" data-primary="true">Continue to Guests <Icons.ChevR size={14} /></button>
          </div>
        </main>
      </div>
    </div>
  );
}

function FormSection({ kicker, title, help, children }) {
  return (
    <section className="mfw-section">
      <div className="mfw-section-head">
        <div className="wf-kicker">{kicker}</div>
        <h2>{title}</h2>
        {help && <p>{help}</p>}
      </div>
      <div className="mfw-section-body">{children}</div>
    </section>
  );
}

function Field({ label, value, placeholder, trailing, multiline }) {
  return (
    <label className="mfw-field">
      <span className="wf-label">{label}</span>
      <div className="wf-input">
        {multiline
          ? <textarea rows={3} defaultValue={value} placeholder={placeholder} />
          : <input type="text" defaultValue={value} placeholder={placeholder} />}
        {trailing && <span className="trail">{trailing}</span>}
      </div>
    </label>
  );
}

function RadioRow({ options, active }) {
  return (
    <div className="mfw-radiorow">
      {options.map(o => (
        <label className="mfw-radio" data-active={o.k === active || undefined} key={o.k}>
          <span className="ring">{o.k === active && <span className="dot" />}</span>
          <span className="t">
            <span className="t1">{o.t}</span>
            <span className="t2">{o.s}</span>
          </span>
        </label>
      ))}
    </div>
  );
}

function Checkbox({ checked }) {
  return (
    <span className="mfw-check" data-checked={checked || undefined}>
      {checked && <Icons.Check size={11} stroke={2} />}
    </span>
  );
}

/* ============ MOBILE ============ */
// Step 2 / 3 — Event creation · Details
// Progress indicator at top, stacked inputs, Skip + CTA pinned to bottom

function MultiStepFormMobile() {
  return (
    <div className="ki-mobile mfm">
      <StatusBar />
      <div className="mfm-header">
        <button className="back" aria-label="Back"><Icons.Back size={20} /></button>
        <div className="mfm-h-title">
          <div className="t">New event</div>
          <div className="s">Step 2 of 3 · Details</div>
        </div>
        <button className="close" aria-label="Close"><Icons.MoreH size={20} /></button>
      </div>

      {/* Progress bar */}
      <div className="mfm-progress">
        <div className="seg" data-done="true" />
        <div className="seg" data-active="true" />
        <div className="seg" />
      </div>

      <div className="ki-scroll mfm-scroll">
        <div className="mfm-intro">
          <h1>When, where,<br/>and who's hosting.</h1>
          <p>We'll show this on the invite. You can still edit it later.</p>
        </div>

        <div className="mfm-section">
          <div className="mfm-kicker">Host</div>
          <MField label="Primary host" value="Marisol Ortega" trailing="chev" />
          <MField label="Co-hosts" placeholder="Add co-host…" trailing="plus" />
        </div>

        <div className="mfm-hair" />

        <div className="mfm-section">
          <div className="mfm-kicker">When</div>
          <MField label="Date" value="Tue · Feb 13, 2026" trailing="cal" />
          <div className="mfm-row-2">
            <MField label="Start" value="7:00 PM" trailing="chev" />
            <MField label="End"   value="10:00 PM" trailing="chev" />
          </div>
        </div>

        <div className="mfm-hair" />

        <div className="mfm-section">
          <div className="mfm-kicker">Where</div>
          <MField label="Venue" value="Hall Atlas" />
          <MField label="Address" value="221 E 7th Street" />
          <div className="mfm-checkrow">
            <Checkbox checked />
            <span>Release exact address to RSVPs only</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="mfm-cta">
        <button className="mfm-skip">Skip</button>
        <button className="wf-btn mfm-cont" data-primary="true">
          Continue <Icons.ChevR size={14} />
        </button>
      </div>
      <HomeBar />
    </div>
  );
}

function MField({ label, value, placeholder, trailing }) {
  const T = trailing === "chev" ? Icons.ChevD : trailing === "plus" ? Icons.Plus : trailing === "cal" ? Icons.Calendar : null;
  return (
    <label className="mfm-field">
      <span className="wf-label">{label}</span>
      <div className="wf-input">
        <input type="text" defaultValue={value} placeholder={placeholder} />
        {T && <T size={14} />}
      </div>
    </label>
  );
}

Object.assign(window, { MultiStepFormWeb, MultiStepFormMobile });


/* ========== app.jsx ========== */
// Main app — infinite pan/zoom canvas with all frames.

const { useState, useEffect, useRef, useCallback } = React;

/* ========== Canvas component (pan/zoom) ========== */
function Canvas({ children, scaleState, panState }) {
  const viewportRef = useRef(null);
  const surfaceRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const [scale, setScale] = scaleState;
  const [pan, setPan] = panState;

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    // don't start pan if clicking inside an interactive control in the topbar
    const t = e.target;
    if (t.closest && t.closest('.topbar')) return;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (!dragging || !dragStart.current) return;
    setPan({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };
  const onMouseUp = () => { setDragging(false); dragStart.current = null; };

  const onWheel = useCallback((e) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      // zoom around cursor
      const rect = viewportRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      setScale(prev => {
        const next = Math.max(0.08, Math.min(2.5, prev * factor));
        // adjust pan so the point under the cursor stays fixed
        setPan(p => ({
          x: cx - ((cx - p.x) * next / prev),
          y: cy - ((cy - p.y) * next / prev),
        }));
        return next;
      });
    } else {
      setPan(p => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
    }
  }, [setScale, setPan]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  useEffect(() => {
    if (!dragging) return;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={viewportRef}
      className={"canvas-viewport" + (dragging ? " dragging" : "")}
      onMouseDown={onMouseDown}
    >
      <div
        ref={surfaceRef}
        className="canvas-surface"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

/* ========== Frame wrapper — applies dark/light + shadow ========== */
function Frame({ x, y, w, h, mode, title, subtitle, children }) {
  return (
    <div
      className="wf-frame wf"
      data-mode={mode}
      style={{ left: x, top: y, width: w, height: h }}
    >
      {children}
      <div className="wf-frame-label">
        <span className="n">{title}</span>
        <span className="s">{subtitle}</span>
      </div>
    </div>
  );
}

/* ========== Section (labels a group of frames) ========== */
function Section({ x, y, w, h, num, name, tag, children }) {
  return (
    <div className="wf-section" style={{ left: x, top: y, width: w, height: h }}>
      <div className="wf-section-header">
        <span className="num">{num}</span>
        <span className="name">{name}</span>
        <span className="tag">{tag}</span>
      </div>
      {children}
    </div>
  );
}

/* ========== Intro card ========== */
function IntroCard({ x, y }) {
  return (
    <div className="intro-card" style={{ left: x, top: y }}>
      <div className="num">Aither · Wireframe Library · v0.1</div>
      <h1>Three templates, six frames.<br/>A test batch for the kit.</h1>
      <p className="body">
        Dense List, Editorial Detail, and Multi-step Form — each shipped in mobile + web
        and paired in light + dark. Built from the Aither Desktop component kit and
        Aither Mobile patterns, with density cues borrowed from YT Music. Event-domain
        placeholder content throughout.
      </p>
      <dl className="rules">
        <dt>Grid</dt><dd>12-col web · 4-col mobile · 24px gutter · 24px side margin</dd>
        <dt>Canvas</dt><dd>Near-black #120D0B (dark) · bone #EAE4E2 (light) — paired</dd>
        <dt>Type</dt><dd>TWK Lausanne Pan 300 primary body; Inter 500 / 600 for heavier UI weights. No Apercu in wireframes.</dd>
        <dt>Color</dt><dd>None. Emphasis by weight and size only.</dd>
        <dt>Components</dt><dd>Lifted from Aither Desktop kit — nav, table, search, modal</dd>
        <dt>Navigate</dt><dd>Drag to pan · ⌘/Ctrl + scroll to zoom · scroll to pan</dd>
      </dl>
    </div>
  );
}

/* ========== Topbar ========== */
function Topbar({ mode, setMode, scale, setScale, resetView }) {
  return (
    <div className="topbar" style={{ paddingLeft: 120 }}>
      <a href="../index.html" title="Back to home" aria-label="Back to home"
         style={{ position: 'fixed', top: 12, left: 12, zIndex: 9999, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', fontFamily: "'Space Mono', ui-monospace, monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(234,228,226,0.75)', background: 'rgba(18,13,11,0.55)', border: '1px solid rgba(234,228,226,0.18)', borderRadius: 4, textDecoration: 'none', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
         onMouseOver={(e) => { e.currentTarget.style.color = 'rgba(234,228,226,1)'; e.currentTarget.style.borderColor = 'rgba(234,228,226,0.4)'; }}
         onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(234,228,226,0.75)'; e.currentTarget.style.borderColor = 'rgba(234,228,226,0.18)'; }}
      >&larr; Home</a>
      <div className="topbar-title">
        <span className="k">Part Two · Wireframes · v0.1</span>
        <span className="t">Template library — test batch (3 of 4)</span>
      </div>
      <div className="topbar-spacer" />
      <div className="topbar-help">
        Drag to pan · <kbd>⌘</kbd>+scroll to zoom · <kbd>0</kbd> to reset
      </div>
      <div className="mode-toggle" role="group" aria-label="Light / dark master toggle">
        <button aria-pressed={mode === "dark"}  onClick={() => setMode("dark")}>Dark</button>
        <button aria-pressed={mode === "light"} onClick={() => setMode("light")}>Light</button>
        <button aria-pressed={mode === "paired"} onClick={() => setMode("paired")}>Paired</button>
      </div>
      <div className="zoom-controls">
        <button onClick={() => setScale(s => Math.max(0.08, s / 1.15))} aria-label="Zoom out">−</button>
        <span className="zoom-val">{Math.round(scale * 100)}%</span>
        <button onClick={() => setScale(s => Math.min(2.5, s * 1.15))} aria-label="Zoom in">+</button>
        <button onClick={resetView} aria-label="Reset view" title="Reset view">⌂</button>
      </div>
    </div>
  );
}

/* ========== Main app ========== */
function App() {
  const [mode, setMode] = useState("paired");      // dark | light | paired
  const [scale, setScale] = useState(0.28);
  const [pan, setPan] = useState({ x: 120, y: 140 });

  useEffect(() => {
    const saved = localStorage.getItem("aither-wf-mode");
    if (saved) setMode(saved);
  }, []);
  useEffect(() => { localStorage.setItem("aither-wf-mode", mode); }, [mode]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "0") resetView();
      if (e.key === "1") { setScale(0.28); setPan({ x: 120, y: 140 }); }
      if (e.key === "2") { setScale(0.5);  setPan({ x: 100, y: 100 }); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const resetView = () => { setScale(0.28); setPan({ x: 120, y: 140 }); };

  /* ====== Layout map ======
     Each section column contains mobile + web, shown in dark and/or light
     based on `mode`. Coordinates are laid out on an infinite plane.
     
     We size frames at their canonical dims:
       Web    : 1440 × 900 (scrollable content flows)
       Mobile : 390  × 844
     And lay out sections horizontally:
       - Section A (x=0)      : Dense List
       - Section B (x=4200)   : Editorial Detail
       - Section C (x=8400)   : Multi-step Form
     Intro card is top-left at (0, -1400).
  */

  const shouldShow = (variant) => {
    if (mode === "paired") return true;
    return variant === mode;
  };

  const sections = [
    {
      num: "01",
      name: "Dense List",
      tag: "Tracklist rhythm · YT Music adopted",
      x: 0,
      frames: {
        web:    { C: DenseListWeb,    w: 1440, h: 1600 },
        mobile: { C: DenseListMobile, w: 390,  h: 844  },
      },
    },
    {
      num: "02",
      name: "Editorial Detail",
      tag: "Full-bleed hero · sticky scroll",
      x: 4200,
      frames: {
        web:    { C: EditorialDetailWeb,    w: 1440, h: 2400 },
        mobile: { C: EditorialDetailMobile, w: 390,  h: 844  },
      },
    },
    {
      num: "03",
      name: "Multi-step Form",
      tag: "Progress rail · event creation",
      x: 8400,
      frames: {
        web:    { C: MultiStepFormWeb,    w: 1440, h: 1200 },
        mobile: { C: MultiStepFormMobile, w: 390,  h: 844  },
      },
    },
  ];

  return (
    <>
      <Topbar mode={mode} setMode={setMode} scale={scale} setScale={setScale} resetView={resetView} />
      <Canvas scaleState={[scale, setScale]} panState={[pan, setPan]}>
        <IntroCard x={-100} y={-1400} />

        {sections.map((s, i) => {
          // layout within a section:
          //   mobile dark  at y=0,   x=0
          //   mobile light at y=0,   x=480
          //   web dark     at y=1100, x=0
          //   web light    at y=1100, x=1600
          const { web, mobile } = s.frames;
          const items = [];

          if (shouldShow("dark")) {
            items.push({ x: 0,    y: 0,    w: mobile.w, h: mobile.h, mode: "dark",  C: mobile.C,
                         title: `Mobile · ${s.name}`, sub: `dark · 390×844` });
            items.push({ x: 0,    y: 1200, w: web.w,    h: web.h,    mode: "dark",  C: web.C,
                         title: `Web · ${s.name}`,    sub: `dark · 1440×900` });
          }
          if (shouldShow("light")) {
            items.push({ x: shouldShow("dark") ? 540 : 0,  y: 0,    w: mobile.w, h: mobile.h, mode: "light", C: mobile.C,
                         title: `Mobile · ${s.name}`, sub: `light · 390×844` });
            items.push({ x: shouldShow("dark") ? 1600 : 0, y: 1200, w: web.w,    h: web.h,    mode: "light", C: web.C,
                         title: `Web · ${s.name}`,    sub: `light · 1440×900` });
          }

          // section bounding box
          const maxX = Math.max(...items.map(it => it.x + it.w), 0);
          const maxY = Math.max(...items.map(it => it.y + it.h), 0);

          return (
            <Section key={s.num} x={s.x} y={0} w={maxX} h={maxY} num={s.num} name={s.name} tag={s.tag}>
              {items.map((it, j) => {
                const Comp = it.C;
                return (
                  <Frame key={j} x={it.x} y={it.y} w={it.w} h={it.h} mode={it.mode} title={it.title} subtitle={it.sub}>
                    <Comp />
                  </Frame>
                );
              })}
            </Section>
          );
        })}
      </Canvas>

      <div className="legend">
        <div className="row"><span className="dot dot-light" /> Dark · product default</div>
        <div className="row"><span className="dot dot-dark" /> Light · annotated review</div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);



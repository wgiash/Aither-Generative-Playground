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

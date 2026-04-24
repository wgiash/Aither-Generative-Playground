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

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

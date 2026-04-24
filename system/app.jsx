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

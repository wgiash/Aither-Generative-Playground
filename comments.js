/* =========================================================
   Figma-style comment pins.
   - Pins live inside the content container → survive pan/zoom/scale.
   - Drag to move, click to open thread, delete to remove.
   - No nickname required.
   - Real-time sync via Firestore.
   ========================================================= */
(() => {
  'use strict';

  // ---------- Styles ----------
  const css = `
  .cm-toolbar { position: fixed; right: 20px; bottom: 20px; display: flex; gap: 4px; align-items: center; padding: 6px; background: #1a1a1a; color: #fff; border-radius: 999px; box-shadow: 0 10px 30px rgba(0,0,0,.35); z-index: 2147483000; font: 13px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif; }
  .cm-toolbar * { box-sizing: border-box; }
  .cm-btn { cursor: pointer; border: 0; background: transparent; color: inherit; padding: 8px 14px; border-radius: 999px; font: inherit; display: inline-flex; align-items: center; gap: 6px; }
  .cm-btn:hover { background: rgba(255,255,255,.08); }
  .cm-btn.active { background: #1e80ff; color: #fff; }
  .cm-btn svg { width: 14px; height: 14px; }
  .cm-count { font-size: 11px; opacity: .7; }
  .cm-kbd { display: inline-flex; align-items: center; justify-content: center; min-width: 16px; height: 16px; padding: 0 4px; margin-left: 4px; font: 600 10px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif; color: rgba(255,255,255,.9); background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.18); border-radius: 4px; letter-spacing: 0; }
  body.cm-adding, body.cm-adding * { cursor: crosshair !important; }
  .cm-pin { position: absolute; width: 28px; height: 28px; border-radius: 50% 50% 50% 3px; background: #ffcd3a; color: #1a1a1a; font: 700 11px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif; display: flex; align-items: center; justify-content: center; transform-origin: 2px 26px; transform: translate(-2px, -26px) scale(var(--cm-inv-scale, 1)); box-shadow: 0 3px 12px rgba(0,0,0,.4); cursor: grab; user-select: none; border: 2px solid #1a1a1a; z-index: 2147482000; touch-action: none; }
  .cm-pin.mine { background: #1e80ff; color: #fff; }
  .cm-pin.dragging { cursor: grabbing; transform: translate(-2px, -26px) scale(calc(var(--cm-inv-scale, 1) * 1.1)); box-shadow: 0 6px 20px rgba(0,0,0,.5); }
  .cm-pin:hover:not(.dragging) { transform: translate(-2px, -26px) scale(calc(var(--cm-inv-scale, 1) * 1.08)); }
  .cm-thread { position: fixed; width: 300px; background: #fff; color: #1a1a1a; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,.4); z-index: 2147483100; font: 13px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif; overflow: hidden; }
  .cm-thread * { box-sizing: border-box; }
  .cm-head { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 11px; letter-spacing: .05em; text-transform: uppercase; color: #777; }
  .cm-head-btns { display: flex; gap: 8px; align-items: center; }
  .cm-ibtn { background: none; border: 0; cursor: pointer; padding: 4px; color: #999; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; }
  .cm-ibtn:hover { background: #f0f0f0; color: #333; }
  .cm-ibtn.del:hover { background: #fee; color: #c33; }
  .cm-ibtn svg { width: 14px; height: 14px; }
  .cm-msgs { max-height: 260px; overflow-y: auto; }
  .cm-msg { padding: 10px 12px; border-bottom: 1px solid #f2f2f2; display: flex; justify-content: space-between; gap: 8px; }
  .cm-msg:last-child { border-bottom: 0; }
  .cm-msg .txt { flex: 1; line-height: 1.45; white-space: pre-wrap; word-wrap: break-word; color: #1a1a1a; }
  .cm-msg .when { color: #999; font-size: 11px; white-space: nowrap; padding-top: 2px; }
  .cm-msg.mine .txt { color: #1e80ff; }
  .cm-input { display: flex; padding: 8px; gap: 6px; border-top: 1px solid #eee; background: #fafafa; }
  .cm-input textarea { flex: 1; border: 1px solid #ddd; border-radius: 6px; padding: 7px 9px; font: inherit; resize: none; min-height: 34px; max-height: 100px; outline: none; color: #1a1a1a; background: #fff; }
  .cm-input textarea:focus { border-color: #1e80ff; }
  .cm-input button { background: #1e80ff; color: #fff; border: 0; border-radius: 6px; padding: 0 14px; cursor: pointer; font: inherit; font-weight: 600; }
  .cm-input button:disabled { opacity: .4; cursor: not-allowed; }
  .cm-err { position: fixed; top: 20px; right: 20px; background: #c33; color: #fff; padding: 12px 16px; border-radius: 8px; font: 13px -apple-system, BlinkMacSystemFont, sans-serif; z-index: 2147483647; max-width: 360px; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- Identity (device-level, for "mine" vs "theirs") ----------
  let deviceId = localStorage.getItem('cm-device');
  if (!deviceId) {
    deviceId = Math.random().toString(36).slice(2) + '-' + Date.now().toString(36);
    localStorage.setItem('cm-device', deviceId);
  }

  // ---------- Context ----------
  const pageFile = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
  const deckStage = document.querySelector('deck-stage');
  const getCanvasSurface = () => document.querySelector('.canvas-surface');
  const isDeck = !!deckStage;

  const getActiveSlide = () => {
    if (!deckStage) return null;
    const sections = Array.from(deckStage.querySelectorAll(':scope > section'));
    return sections.find(s => {
      const cs = getComputedStyle(s);
      return cs.visibility !== 'hidden' && cs.opacity !== '0';
    }) || sections[0];
  };

  const getContext = () => {
    if (isDeck) {
      const active = getActiveSlide();
      const label = active?.dataset?.screenLabel || active?.dataset?.label || 'slide-0';
      return { id: `${pageFile}::${label}`, container: active };
    }
    return { id: pageFile, container: getCanvasSurface() || document.body };
  };

  const getContainerScale = c => {
    // Walks up computing the aggregated scale from CSS transforms.
    let s = 1;
    let n = c;
    while (n && n !== document.body) {
      const t = getComputedStyle(n).transform;
      if (t && t !== 'none') {
        try {
          const m = new DOMMatrix(t);
          s *= m.a;
        } catch {}
      }
      n = n.parentElement;
    }
    return s || 1;
  };

  // ---------- Firebase ----------
  const showError = msg => {
    const e = document.createElement('div');
    e.className = 'cm-err';
    e.textContent = msg;
    document.body.appendChild(e);
    setTimeout(() => e.remove(), 8000);
  };

  const loadScript = src => new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });

  let db = null;
  const initFirebase = async () => {
    const cfg = window.FIREBASE_CONFIG;
    if (!cfg || cfg.apiKey?.startsWith('PASTE_')) {
      showError('Comments disabled — firebase-config.js not filled in.');
      return false;
    }
    await loadScript('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
    await loadScript('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js');
    firebase.initializeApp(cfg);
    db = firebase.firestore();
    return true;
  };

  // ---------- Render state ----------
  const pinsById = new Map(); // id → { data, el }
  let currentContext = getContext();
  let openThreadId = null;
  let openThreadEl = null;
  let addMode = false;
  let placingLock = false;

  const fmtTime = ts => {
    if (!ts) return 'now';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return 'now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h';
    return Math.floor(diff / 86400) + 'd';
  };

  const escapeHTML = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const ICON_TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>';
  const ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  const ICON_PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

  // ---------- Pin rendering ----------
  const renderPin = (id, data) => {
    let entry = pinsById.get(id);
    const container = currentContext.container;
    if (!container) return;
    if (!entry) {
      const el = document.createElement('div');
      el.className = 'cm-pin';
      if (data.deviceId === deviceId) el.classList.add('mine');
      container.appendChild(el);
      entry = { data, el };
      pinsById.set(id, entry);
      attachPinInteractions(id, el);
    }
    entry.data = data;
    entry.el.classList.toggle('mine', data.deviceId === deviceId);
    const idx = Array.from(pinsById.keys()).indexOf(id) + 1;
    entry.el.textContent = String(idx);
    entry.el.style.left = data.x + 'px';
    entry.el.style.top = data.y + 'px';
  };

  const removePin = id => {
    const entry = pinsById.get(id);
    if (!entry) return;
    entry.el.remove();
    pinsById.delete(id);
    if (openThreadId === id) closeThread();
  };

  const clearAllPins = () => {
    for (const id of Array.from(pinsById.keys())) removePin(id);
  };

  // ---------- Drag + click ----------
  const attachPinInteractions = (id, el) => {
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      e.stopPropagation();
      const entry = pinsById.get(id);
      if (!entry) return;
      const scale = getContainerScale(entry.el.parentElement) || 1;
      const startX = e.clientX, startY = e.clientY;
      const origX = entry.data.x, origY = entry.data.y;
      let moved = false;
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
      closeThread();

      const onMove = ev => {
        const dx = (ev.clientX - startX) / scale;
        const dy = (ev.clientY - startY) / scale;
        if (!moved && Math.hypot(dx, dy) > 3) moved = true;
        const nx = origX + dx, ny = origY + dy;
        el.style.left = nx + 'px';
        el.style.top = ny + 'px';
      };
      const onUp = async ev => {
        el.releasePointerCapture?.(ev.pointerId);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.classList.remove('dragging');
        if (moved && db) {
          const newX = parseFloat(el.style.left);
          const newY = parseFloat(el.style.top);
          try {
            await db.collection('pins').doc(id).update({ x: newX, y: newY });
          } catch (err) { showError('Save failed: ' + err.message); }
        } else {
          openThread(id);
        }
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
    });
  };

  // ---------- Thread ----------
  const positionThread = () => {
    if (!openThreadEl || !openThreadId) return;
    const entry = pinsById.get(openThreadId);
    if (!entry) return;
    const r = entry.el.getBoundingClientRect();
    const tw = openThreadEl.offsetWidth || 300;
    const th = openThreadEl.offsetHeight || 200;
    let left = r.right + 10;
    let top = r.top;
    if (left + tw > window.innerWidth - 10) left = r.left - tw - 10;
    if (top + th > window.innerHeight - 10) top = window.innerHeight - th - 10;
    if (top < 10) top = 10;
    openThreadEl.style.left = Math.max(10, left) + 'px';
    openThreadEl.style.top = top + 'px';
  };

  const renderThread = () => {
    if (!openThreadEl || !openThreadId) return;
    const entry = pinsById.get(openThreadId);
    if (!entry) return;
    const isMine = entry.data.deviceId === deviceId;
    const msgs = (entry.data.messages || []).map(m => {
      const mine = m.deviceId === deviceId;
      return `<div class="cm-msg ${mine ? 'mine' : ''}">
        <div class="txt">${escapeHTML(m.text)}</div>
        <div class="when">${fmtTime(m.createdAt)}</div>
      </div>`;
    }).join('');
    const count = entry.data.messages?.length || 0;
    openThreadEl.innerHTML = `
      <div class="cm-head">
        <span>${count} comment${count === 1 ? '' : 's'}</span>
        <div class="cm-head-btns">
          <button class="cm-ibtn del" title="Delete pin">${ICON_TRASH}</button>
          <button class="cm-ibtn cm-close" title="Close">${ICON_CLOSE}</button>
        </div>
      </div>
      <div class="cm-msgs">${msgs || '<div class="cm-msg" style="color:#999;"><div class="txt">No comments yet.</div></div>'}</div>
      <div class="cm-input">
        <textarea placeholder="Comment…" rows="1"></textarea>
        <button disabled>Send</button>
      </div>`;

    const ta = openThreadEl.querySelector('textarea');
    const send = openThreadEl.querySelector('.cm-input button');
    ta.oninput = () => {
      send.disabled = !ta.value.trim();
      ta.style.height = 'auto';
      ta.style.height = Math.min(100, ta.scrollHeight) + 'px';
    };
    ta.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!send.disabled) send.click(); } };
    send.onclick = async () => {
      const text = ta.value.trim();
      if (!text || !db) return;
      send.disabled = true;
      try {
        await db.collection('pins').doc(openThreadId).update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            text, deviceId, createdAt: new Date()
          })
        });
        ta.value = '';
        ta.style.height = 'auto';
      } catch (err) { showError('Send failed: ' + err.message); send.disabled = false; }
    };

    openThreadEl.querySelector('.cm-close').onclick = closeThread;
    openThreadEl.querySelector('.cm-ibtn.del').onclick = async () => {
      if (!confirm('Delete this pin and all its comments?')) return;
      try { await db.collection('pins').doc(openThreadId).delete(); }
      catch (err) { showError('Delete failed: ' + err.message); }
    };

    setTimeout(() => { ta.focus(); positionThread(); }, 10);
  };

  const openThread = id => {
    if (openThreadId === id) { closeThread(); return; }
    closeThread();
    openThreadId = id;
    openThreadEl = document.createElement('div');
    openThreadEl.className = 'cm-thread';
    openThreadEl.onclick = e => e.stopPropagation();
    openThreadEl.onpointerdown = e => e.stopPropagation();
    document.body.appendChild(openThreadEl);
    renderThread();
  };

  const closeThread = () => {
    openThreadId = null;
    openThreadEl?.remove();
    openThreadEl = null;
  };

  // Close thread on outside click
  document.addEventListener('pointerdown', e => {
    if (!openThreadEl) return;
    if (openThreadEl.contains(e.target)) return;
    if (e.target.closest('.cm-pin')) return;
    if (e.target.closest('.cm-toolbar')) return;
    closeThread();
  }, true);

  // Reposition thread on any scroll/resize/pan
  const refreshThread = () => positionThread();
  window.addEventListener('scroll', refreshThread, { passive: true, capture: true });
  window.addEventListener('resize', refreshThread);
  // Keep pins visually the same size regardless of canvas zoom by pushing
  // the inverse of canvas-surface's scale into a CSS custom property.
  const updatePinScaleVar = () => {
    const cs = getCanvasSurface();
    if (!cs) return;
    let s = 1;
    try {
      const m = new DOMMatrix(getComputedStyle(cs).transform);
      s = m.a || 1;
    } catch {}
    // Figma-style: pins grow a bit when zoomed out so they stay visible.
    // At s=1 pins are natural size; when s<1 we layer a mild boost on top of
    // the 1/s inverse so on-screen size = s^-0.3 (e.g. 50% zoom → +23%).
    const boost = s < 1 ? Math.pow(1 / s, 0.3) : 1;
    document.body.style.setProperty('--cm-inv-scale', String((1 / s) * boost));
  };

  let canvasObserver = null;
  const observeCanvasSurface = () => {
    const cs = getCanvasSurface();
    if (!cs || canvasObserver) return;
    canvasObserver = new MutationObserver(() => { refreshThread(); updatePinScaleVar(); });
    canvasObserver.observe(cs, { attributes: true, attributeFilter: ['style'] });
    updatePinScaleVar();
  };
  // Also keep thread glued to pin via RAF while open
  const tick = () => { if (openThreadEl) positionThread(); requestAnimationFrame(tick); };
  requestAnimationFrame(tick);

  // ---------- Toolbar ----------
  const toolbar = document.createElement('div');
  toolbar.className = 'cm-toolbar';
  toolbar.innerHTML = `
    <button class="cm-btn" data-toggle title="Add comment (C)">${ICON_PIN}<span>Comment</span><span class="cm-kbd">C</span><span class="cm-count"></span></button>`;
  document.body.appendChild(toolbar);
  const toggleBtn = toolbar.querySelector('[data-toggle]');
  const countEl = toolbar.querySelector('.cm-count');

  // The iframe on the wireframe page is rendered with pointer-events: none
  // permanently (see wireframe-library.html) so you can drag-pan over the
  // slides. No toggling needed here.

  const setAddMode = (on) => {
    addMode = on;
    toggleBtn.classList.toggle('active', addMode);
    document.body.classList.toggle('cm-adding', addMode);
    if (addMode) closeThread();
  };

  toggleBtn.onclick = e => {
    e.stopPropagation();
    setAddMode(!addMode);
  };

  // Keyboard shortcuts: Esc exits add mode / closes thread; C toggles add mode.
  const isTypingTarget = el => {
    if (!el) return false;
    if (el.isContentEditable) return true;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  };
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (addMode) { setAddMode(false); e.preventDefault(); }
      else if (openThreadEl) { closeThread(); e.preventDefault(); }
      return;
    }
    if ((e.key === 'c' || e.key === 'C') && !e.metaKey && !e.ctrlKey && !e.altKey) {
      if (isTypingTarget(e.target)) return;
      e.preventDefault();
      setAddMode(!addMode);
    }
  });

  // ---------- Click to place ----------
  const handlePlaceClick = async e => {
    if (!addMode || placingLock) return;
    if (e.target.closest('.cm-toolbar, .cm-pin, .cm-thread')) return;
    if (!db) return;
    const container = currentContext.container;
    if (!container) return;
    // canvas-surface has a 0×0 CSS box (children are abs-positioned), but the
    // pan offset still lives in rect.left/top — that's all we need for coord
    // math, so we skip any bounds check here.
    const rect = container.getBoundingClientRect();

    // Synchronously exit add mode so a second click doesn't stack.
    placingLock = true;
    setAddMode(false);

    const scale = getContainerScale(container) || 1;
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    try {
      const ref = db.collection('pins').doc();
      await ref.set({
        contextId: currentContext.id,
        x, y,
        deviceId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        messages: []
      });
      setTimeout(() => openThread(ref.id), 80);
    } catch (err) {
      showError('Failed to place pin: ' + err.message);
    } finally {
      placingLock = false;
    }
  };
  document.addEventListener('click', handlePlaceClick, true);

  // ---------- Subscribe ----------
  let unsubscribe = null;
  const subscribe = () => {
    if (unsubscribe) { unsubscribe(); unsubscribe = null; }
    clearAllPins();
    if (!db) return;
    unsubscribe = db.collection('pins')
      .where('contextId', '==', currentContext.id)
      .onSnapshot(snap => {
        const seen = new Set();
        snap.forEach(doc => { seen.add(doc.id); renderPin(doc.id, doc.data()); });
        for (const id of Array.from(pinsById.keys())) if (!seen.has(id)) removePin(id);
        countEl.textContent = pinsById.size ? `· ${pinsById.size}` : '';
        if (openThreadId && pinsById.has(openThreadId)) renderThread();
        else if (openThreadId) closeThread();
      }, err => showError('Firestore: ' + err.message));
  };

  // Re-subscribe when slide changes
  if (isDeck) {
    document.addEventListener('slidechange', () => {
      closeThread();
      currentContext = getContext();
      subscribe();
    });
  }

  // ---------- Boot ----------
  const waitForContainer = () => new Promise(resolve => {
    if (isDeck || getCanvasSurface()) return resolve();
    // .canvas-surface is only created at runtime by the React app mounted
    // into #root (wireframe-library). Pages without that root — e.g.
    // prd-template, which pins to document.body — should boot immediately
    // instead of waiting out the safety timeout.
    if (!document.getElementById('root')) return resolve();
    const mo = new MutationObserver(() => {
      if (getCanvasSurface()) { mo.disconnect(); resolve(); }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    // Safety timeout so slide-only or other pages still boot
    setTimeout(() => { mo.disconnect(); resolve(); }, 8000);
  });

  (async () => {
    const ok = await initFirebase();
    if (!ok) return;
    await waitForContainer();
    observeCanvasSurface();
    currentContext = getContext();
    subscribe();
  })();
})();

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

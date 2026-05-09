/* global React */
// MeetMe — shared UI primitives, icons, browser frame, sidebar nav.

const { useState, useMemo, useEffect, useRef } = React;

// ---------------- Icons (24px, 1.6 stroke, calm) ----------------
const Icon = ({ d, size = 18, fill = "none", stroke = "currentColor", sw = 1.6, children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
    {d ? <path d={d} /> : children}
  </svg>
);

const I = {
  Home:    (p) => <Icon {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/></Icon>,
  Link:    (p) => <Icon {...p}><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/></Icon>,
  Type:    (p) => <Icon {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M9 4v16"/></Icon>,
  Clock:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  Sync:    (p) => <Icon {...p}><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M3 21v-5h5"/><path d="M21 3v5h-5"/></Icon>,
  Users:   (p) => <Icon {...p}><circle cx="9" cy="8" r="3.4"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15 14c3 .2 5 2.5 5 5"/></Icon>,
  Bell:    (p) => <Icon {...p}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15z"/><path d="M10 21a2 2 0 0 0 4 0"/></Icon>,
  Card:    (p) => <Icon {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/></Icon>,
  Plug:    (p) => <Icon {...p}><path d="M9 3v5"/><path d="M15 3v5"/><path d="M7 8h10v4a5 5 0 0 1-10 0z"/><path d="M12 17v4"/></Icon>,
  Bolt:    (p) => <Icon {...p}><path d="M13 3 5 14h6l-1 7 8-11h-6z"/></Icon>,
  Cog:     (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>,
  Plus:    (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Copy:    (p) => <Icon {...p}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></Icon>,
  External:(p) => <Icon {...p}><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></Icon>,
  Search:  (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Icon>,
  Chevron: (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>,
  ChevronD:(p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>,
  Check:   (p) => <Icon {...p}><path d="M5 12.5 10 17l9-10"/></Icon>,
  X:       (p) => <Icon {...p}><path d="M6 6l12 12M18 6 6 18"/></Icon>,
  Calendar:(p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 3v4M16 3v4"/></Icon>,
  Video:   (p) => <Icon {...p}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></Icon>,
  Globe:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18z"/></Icon>,
  Shield:  (p) => <Icon {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/></Icon>,
  Sparkle: (p) => <Icon {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></Icon>,
  Brain:   (p) => <Icon {...p}><path d="M9 4a3 3 0 0 0-3 3v.5a3 3 0 0 0-2 2.8V13a3 3 0 0 0 2 2.8V17a3 3 0 0 0 5 2.6V4.4A3 3 0 0 0 9 4z"/><path d="M15 4a3 3 0 0 1 3 3v.5a3 3 0 0 1 2 2.8V13a3 3 0 0 1-2 2.8V17a3 3 0 0 1-5 2.6"/></Icon>,
  Focus:   (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/></Icon>,
  Battery: (p) => <Icon {...p}><rect x="3" y="8" width="16" height="8" rx="2"/><path d="M21 11v2"/><rect x="5" y="10" width="6" height="4" rx="1" fill="currentColor" stroke="none"/></Icon>,
  Phone:   (p) => <Icon {...p}><path d="M5 4h4l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2 16 16 0 0 1-15-15 2 2 0 0 1 2-2z"/></Icon>,
  Mail:    (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></Icon>,
  Slack:   (p) => <Icon {...p}><rect x="4" y="10" width="6" height="4" rx="2"/><rect x="14" y="10" width="6" height="4" rx="2"/><rect x="10" y="4" width="4" height="6" rx="2"/><rect x="10" y="14" width="4" height="6" rx="2"/></Icon>,
  Stripe:  (p) => <Icon {...p}><path d="M6 8c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2"/><path d="M14 4v16"/></Icon>,
  Apple:   (p) => <Icon {...p} fill="currentColor" stroke="none"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.6-1.2-1.7-3-2-3.6-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.8-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.5 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.2 3.2-2.5 1-1.4 1.4-2.7 1.4-2.8s-2.7-1-2.7-4.4zM14 5c.7-.9 1.2-2.1 1-3.2-1 0-2.3.7-3 1.5-.6.8-1.3 2-1.1 3.1 1.1.1 2.3-.5 3.1-1.4z"/></Icon>,
  Google:  (p) => <Icon {...p} fill="none" stroke="currentColor" sw={1.6}><path d="M21 12.3c0-.7-.1-1.3-.2-2H12v3.7h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7z"/><path d="M12 21c2.6 0 4.7-.9 6.3-2.3l-3.1-2.4a5.4 5.4 0 0 1-8-2.8H4v2.5A9 9 0 0 0 12 21z"/><path d="M7.2 13.5a5.4 5.4 0 0 1 0-3V8H4a9 9 0 0 0 0 8z"/><path d="M12 6.6c1.4 0 2.7.5 3.7 1.5l2.7-2.7A9 9 0 0 0 4 8l3.2 2.5A5.4 5.4 0 0 1 12 6.6z"/></Icon>,
  Outlook: (p) => <Icon {...p}><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m3 8 6.5 4L16 8"/><path d="M16 9h5v6h-5"/></Icon>,
  Zoom:    (p) => <Icon {...p}><rect x="3" y="7" width="13" height="10" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></Icon>,
  Sun:     (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></Icon>,
  Coffee:  (p) => <Icon {...p}><path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 11h2a2 2 0 0 1 0 4h-2"/><path d="M7 5v2M11 5v2M15 5v2"/></Icon>,
  Moon:    (p) => <Icon {...p}><path d="M21 13A9 9 0 0 1 11 3a8 8 0 1 0 10 10z"/></Icon>,
  Heart:   (p) => <Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></Icon>,
  Filter:  (p) => <Icon {...p}><path d="M4 5h16l-6 8v6l-4-2v-4z"/></Icon>,
};

// ---------------- Light Safari-ish browser frame (matches the reference) ----------------
function SafariFrame({ url, width, height, children, accent = "#cdc7b8" }) {
  return (
    <div style={{
      width, height,
      background: "#efebe1",
      borderRadius: 14,
      boxShadow: "0 30px 60px -20px rgba(28,26,22,0.18), 0 0 0 1px rgba(28,26,22,0.06)",
      display: "flex", flexDirection: "column", overflow: "hidden",
      fontFamily: "Inter, system-ui, sans-serif",
    }}>
      <div style={{
        height: 40, padding: "0 14px",
        display: "flex", alignItems: "center", gap: 12,
        background: "#efebe1",
        borderBottom: "1px solid #ddd6c5",
      }}>
        <div style={{ display: "flex", gap: 7 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ed6a5e" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#f4be4f" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#61c554" }} />
        </div>
        <div style={{ display: "flex", gap: 4, color: "#8a857a" }}>
          <I.Chevron size={14} sw={2} style={{ transform: "rotate(180deg)" }} />
          <I.Chevron size={14} sw={2} />
        </div>
        <div style={{
          flex: 1, height: 26, borderRadius: 7, background: "#fbf9f3",
          border: "1px solid #ddd6c5",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6, color: "#5a5650", fontSize: 12,
        }}>
          <span style={{ width: 10, height: 12, borderRadius: 1.5, background: "#bfb9aa" }} />
          {url}
        </div>
        <span style={{ width: 16, height: 14, color: "#8a857a", display: "inline-flex" }}>
          <I.Plus size={14} sw={2} />
        </span>
      </div>
      <div style={{ flex: 1, background: "#fff", overflow: "hidden", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

// ---------------- Sidebar (host app) ----------------
const NAV = [
  { key: "dashboard", label: "Dashboard", icon: I.Home },
  { key: "pages", label: "Booking Pages", icon: I.Link },
  { key: "events", label: "Event Types", icon: I.Type },
  { key: "availability", label: "Availability", icon: I.Clock },
  { key: "sync", label: "Calendar Sync", icon: I.Sync },
  { key: "team", label: "Team", icon: I.Users },
  { key: "best", label: "Best Time", icon: I.Sparkle, badge: "New" },
  { key: "group", label: "Group Find", icon: I.Brain, badge: "New" },
  { key: "reminders", label: "Reminders", icon: I.Bell },
  { key: "payments", label: "Payments", icon: I.Card },
  { key: "integrations", label: "Integrations", icon: I.Plug },
  { key: "settings", label: "Settings", icon: I.Cog },
];

function Sidebar({ active = "dashboard", onNav, density = "comfortable" }) {
  const compact = density === "compact";
  return (
    <aside style={{
      width: 232, background: "var(--mm-sidebar)", color: "var(--mm-on-dark)",
      display: "flex", flexDirection: "column", padding: compact ? "16px 12px" : "20px 14px",
      borderRight: "1px solid rgba(0,0,0,0.1)",
    }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 6px 18px", color: "#f3efe7" }}>
        <span style={{
          width: 26, height: 26, borderRadius: 7, background: "var(--mm-clay)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--mm-display)", fontSize: 16, fontWeight: 500, color: "#fff",
          letterSpacing: "-0.02em",
        }}>m</span>
        <span style={{
          fontFamily: "var(--mm-display)", fontSize: 19, letterSpacing: "-0.02em",
        }}>MeetMe</span>
      </div>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        height: 32, padding: "0 10px", margin: "0 0 10px",
        background: "rgba(255,255,255,0.06)", borderRadius: 8,
        color: "var(--mm-on-dark-2)", fontSize: 13,
      }}>
        <I.Search size={14} />
        <span>Search</span>
        <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.7 }}>⌘K</span>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {NAV.map((n) => {
          const isActive = n.key === active;
          return (
            <button key={n.key}
              onClick={() => onNav && onNav(n.key)}
              style={{
                display: "flex", alignItems: "center", gap: 11,
                width: "100%", height: compact ? 30 : 34, padding: "0 10px",
                border: 0, background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
                color: isActive ? "#f3efe7" : "var(--mm-on-dark-2)",
                fontSize: 13.5, fontWeight: isActive ? 500 : 400,
                borderRadius: 8, textAlign: "left", letterSpacing: "-0.005em",
              }}>
              <n.icon size={16} />
              <span>{n.label}</span>
              {n.badge && (
                <span style={{
                  marginLeft: "auto", fontSize: 10, fontWeight: 500,
                  padding: "2px 6px", borderRadius: 999,
                  background: "var(--mm-clay)", color: "#fff",
                }}>{n.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", paddingTop: 14 }}>
        {/* Workspace */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "8px 8px", borderRadius: 10,
          background: "rgba(255,255,255,0.04)",
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "linear-gradient(140deg,#c8674a,#8a3d4c)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 500, fontSize: 13, fontFamily: "var(--mm-display)",
          }}>A</div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ color: "#f3efe7", fontSize: 13, fontWeight: 500 }}>Alex Morgan</span>
            <span style={{ color: "var(--mm-on-dark-2)", fontSize: 11.5 }}>Coaching · Pro</span>
          </div>
          <I.ChevronD size={14} style={{ marginLeft: "auto", color: "var(--mm-on-dark-2)" }} />
        </div>
      </div>
    </aside>
  );
}

// ---------------- Topbar (host app) ----------------
function Topbar({ title, subtitle, right }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      padding: "22px 32px 18px",
      borderBottom: "1px solid var(--mm-line)",
      background: "var(--mm-paper-2)",
    }}>
      <div>
        <h1 style={{ fontSize: 30, lineHeight: 1.1 }}>{title}</h1>
        {subtitle && <p style={{ marginTop: 6, color: "var(--mm-ink-3)", fontSize: 14 }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>{right}</div>
    </div>
  );
}

// ---------------- Stat tile ----------------
function Stat({ label, value, delta, deltaTone = "green", caption }) {
  const tone = { green: "var(--mm-green)", clay: "var(--mm-clay-2)", ink: "var(--mm-ink-3)" }[deltaTone];
  return (
    <div className="mm-card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 12, color: "var(--mm-ink-3)", letterSpacing: "0.02em", textTransform: "uppercase" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: "var(--mm-display)", fontSize: 28, letterSpacing: "-0.02em" }}>{value}</span>
        {delta && <span style={{ color: tone, fontSize: 12, fontWeight: 500 }}>{delta}</span>}
      </div>
      {caption && <span style={{ fontSize: 12, color: "var(--mm-ink-3)" }}>{caption}</span>}
    </div>
  );
}

// ---------------- Avatar (initials) ----------------
function Avatar({ name = "?", size = 28, tone = 0 }) {
  const palette = [
    ["#1f3b2e", "#d8e3dc"],
    ["#c8674a", "#f3dfd5"],
    ["#8a3d4c", "#f4dcdf"],
    ["#8a661f", "#f5e9cf"],
    ["#3a3833", "#e8e3d8"],
    ["#2a503e", "#d8e3dc"],
  ];
  const [bg, fg] = palette[Math.abs(hashStr(name)) % palette.length];
  const initials = name.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color: fg,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.4, fontWeight: 500, fontFamily: "Inter",
      flexShrink: 0,
    }}>{initials}</div>
  );
}
function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; }

// ---------------- Section header (inside artboards) ----------------
function SectionTitle({ children, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <h3 style={{ fontFamily: "var(--mm-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--mm-ink-3)" }}>{children}</h3>
      {action}
    </div>
  );
}

Object.assign(window, { I, SafariFrame, Sidebar, Topbar, Stat, Avatar, SectionTitle, NAV });

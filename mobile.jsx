/* global React, I, Avatar */
// MeetMe — Mobile guest booking screen (375x812 iPhone-ish)

function MobileBooking() {
  return (
    <div className="mm-root" style={{
      width: 375, height: 812, background: "var(--mm-paper-2)",
      display: "flex", flexDirection: "column", overflow: "hidden",
      borderRadius: 36, border: "10px solid #1c1a16",
      boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
    }}>
      {/* status bar */}
      <div style={{ height: 44, padding: "12px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ width: 90, height: 26, borderRadius: 13, background: "#1c1a16" }}/>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 16, height: 10, border: "1.5px solid currentColor", borderRadius: 2, position: "relative" }}>
            <span style={{ position: "absolute", inset: 1, background: "currentColor", borderRadius: 1 }}/>
          </span>
        </span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "10px 18px 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--mm-display)", fontSize: 17 }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: "var(--mm-clay)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>m</span>
            MeetMe
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "var(--mm-ink-3)" }}>
            <I.Shield size={11}/> Secure
          </span>
        </div>

        {/* Coach card */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: "linear-gradient(140deg, #d8c8b3, #5e6b4f)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--mm-display)", color: "rgba(255,255,255,0.6)", fontSize: 28,
          }}>AM</div>
          <div>
            <h2 style={{ fontSize: 22, lineHeight: 1.05 }}>Alexandra Morgan</h2>
            <span style={{ fontSize: 12.5, color: "var(--mm-ink-3)" }}>Health &amp; Wellness Coach</span>
            <div style={{ marginTop: 4 }}>
              <span className="mm-pill mm-pill--green" style={{ fontSize: 10.5 }}><I.Check size={10}/> Verified</span>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {[0,1,2,3].map(i => (
            <span key={i} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: i <= 2 ? "var(--mm-green)" : "var(--mm-paper-3)",
            }}/>
          ))}
        </div>

        <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 22, marginBottom: 4 }}>Pick a time</h3>
        <p style={{ fontSize: 13, color: "var(--mm-ink-3)", marginBottom: 14 }}>Wednesday, May 21 · Eastern Time</p>

        {/* Highlight banner */}
        <div style={{
          padding: "12px 14px", borderRadius: 12, marginBottom: 16,
          background: "var(--mm-clay-soft)", border: "1px solid #ebcec0",
          display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <I.Sparkle size={14} style={{ color: "var(--mm-clay-2)", marginTop: 1, flexShrink: 0 }}/>
          <span style={{ fontSize: 13, color: "var(--mm-clay-2)", lineHeight: 1.45 }}>
            <strong>9:00 AM</strong> looks great — Alexandra's morning peak, and a clear hour after for you.
          </span>
        </div>

        {/* Time list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { t: "9:00 AM", good: true, sel: true },
            { t: "10:30 AM", good: true },
            { t: "11:30 AM", good: false },
            { t: "1:00 PM", good: true },
            { t: "2:00 PM", good: false },
            { t: "3:30 PM", good: true },
          ].map((s, i) => (
            <button key={i} style={{
              height: 52, padding: "0 16px", borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: s.sel ? "var(--mm-green)" : s.good ? "var(--mm-paper)" : "var(--mm-paper-2)",
              color: s.sel ? "#f3efe7" : "var(--mm-ink)",
              border: "1.5px solid " + (s.sel ? "var(--mm-green)" : s.good ? "var(--mm-green-soft)" : "var(--mm-line)"),
              fontSize: 16, fontWeight: 500, cursor: "pointer",
            }}>
              <span>{s.t}</span>
              {s.good && !s.sel && <span className="mm-pill mm-pill--green" style={{ fontSize: 10 }}><I.Sparkle size={9}/> Recommended</span>}
              {s.sel && <I.Check size={16} sw={2.5}/>}
            </button>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        padding: "14px 18px 24px",
        borderTop: "1px solid var(--mm-line)",
        background: "var(--mm-paper)",
      }}>
        <button className="mm-btn mm-btn--clay" style={{ width: "100%", height: 52, fontSize: 16, borderRadius: 14 }}>
          Continue · 9:00 AM
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { MobileBooking });

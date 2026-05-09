/* global React, I, Avatar */
// MeetMe — Best Time Intelligence (the differentiator)

const { useState: useStateBT } = React;

function BestTime() {
  const [pick, setPick] = useStateBT(0);

  const slots = [
    { day: "Tue", date: "May 27", time: "10:30 AM", score: 96, host: "Morning peak", guest: "Light meeting day", focus: "+0", fatigue: "Low", reasons: [
      { label: "Hits Alex's morning peak focus window", tone: "good" },
      { label: "30-min buffer before & after for both sides", tone: "good" },
      { label: "Same-day prep available — reviewed materials", tone: "good" },
      { label: "Time-zone fair: 10:30 ET ↔ 16:30 CET", tone: "good" },
    ]},
    { day: "Wed", date: "May 28", time: "2:00 PM", score: 88, host: "Mid-day", guest: "Post-lunch lull", focus: "+0", fatigue: "Med", reasons: [
      { label: "Both sides have an open 90-min window", tone: "good" },
      { label: "Comes after Alex's 4 morning calls", tone: "warn" },
      { label: "Time-zone fair", tone: "good" },
      { label: "No prep buffer — meeting starts at hour mark", tone: "warn" },
    ]},
    { day: "Thu", date: "May 29", time: "9:00 AM", score: 81, host: "Morning peak", guest: "Early start", focus: "−1", fatigue: "Low", reasons: [
      { label: "Morning peak for Alex", tone: "good" },
      { label: "Consumes a focus block (15 min)", tone: "warn" },
      { label: "Asks guest to start at 9 AM their time", tone: "warn" },
      { label: "Reschedules avoid one back-to-back chain", tone: "good" },
    ]},
  ];

  const cur = slots[pick];

  return (
    <div style={{ flex: 1, overflow: "auto", background: "var(--mm-paper-2)" }}>
      <div style={{
        padding: "22px 32px 18px", borderBottom: "1px solid var(--mm-line)", background: "var(--mm-paper-2)",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      }}>
        <div>
          <span className="mm-pill mm-pill--clay" style={{ marginBottom: 8 }}><I.Sparkle size={11}/> Best Time Intelligence</span>
          <h1 style={{ fontSize: 30, lineHeight: 1.1 }}>Find a time that's actually <em style={{ fontStyle: "italic" }}>good</em>.</h1>
          <p style={{ marginTop: 6, color: "var(--mm-ink-3)", fontSize: 14 }}>
            Free is just the floor. We rank slots by focus impact, fatigue, urgency, and convenience for both sides.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="mm-btn mm-btn--ghost"><I.Filter size={14}/> Adjust weights</button>
          <button className="mm-btn mm-btn--primary"><I.Plus size={14}/> New search</button>
        </div>
      </div>

      <div style={{ padding: "22px 32px 32px", display: "grid", gap: 16 }}>
        {/* Search inputs */}
        <section className="mm-card" style={{ padding: 18, display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
          <Lbl label="Meeting purpose">
            <div className="mm-input">Quarterly strategy review with Helena</div>
          </Lbl>
          <Lbl label="With">
            <div className="mm-input"><Avatar name="Helena Voss" size={20}/> Helena Voss <I.X size={12} style={{ marginLeft: "auto" }}/></div>
          </Lbl>
          <Lbl label="Length">
            <div className="mm-input">60 min <I.ChevronD size={13} style={{ marginLeft: "auto" }}/></div>
          </Lbl>
          <Lbl label="Urgency">
            <div className="mm-input"><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--mm-amber)" }}/> This week <I.ChevronD size={13} style={{ marginLeft: "auto" }}/></div>
          </Lbl>
          <button className="mm-btn mm-btn--clay" style={{ height: 38 }}><I.Sparkle size={14}/> Find times</button>
        </section>

        {/* Ranked slots + detail */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 16 }}>
          <section className="mm-card" style={{ padding: 6 }}>
            <div style={{ padding: "10px 14px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Ranked suggestions</span>
              <span style={{ fontSize: 11, color: "var(--mm-ink-3)" }}>3 of 7</span>
            </div>
            {slots.map((s, i) => (
              <button key={i} onClick={() => setPick(i)} style={{
                width: "100%", padding: "14px 14px", border: 0, textAlign: "left",
                background: i === pick ? "var(--mm-green-tint)" : "transparent",
                borderTop: i > 0 ? "1px solid var(--mm-line)" : "none",
                borderRadius: i === pick ? 10 : 0,
                display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center",
                cursor: "pointer",
              }}>
                <ScoreRing score={s.score} active={i === pick}/>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25, gap: 2 }}>
                  <span style={{ fontFamily: "var(--mm-display)", fontSize: 18 }}>{s.day}, {s.date} · {s.time}</span>
                  <span style={{ fontSize: 12, color: "var(--mm-ink-3)" }}>{s.host} for you · {s.guest} for Helena</span>
                  <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                    <span className="mm-pill mm-pill--green">Focus {s.focus}</span>
                    <span className={"mm-pill " + (s.fatigue === "Low" ? "mm-pill--green" : "mm-pill--amber")}>Fatigue {s.fatigue}</span>
                  </div>
                </div>
                <I.Chevron size={14} style={{ color: "var(--mm-ink-3)" }}/>
              </button>
            ))}
          </section>

          {/* Detail */}
          <section className="mm-card" style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Selected</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--mm-ink-3)" }}>
                <I.Sparkle size={11}/> Quality score
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--mm-display)", fontSize: 30, letterSpacing: "-0.02em" }}>
              {cur.day}, {cur.date} · {cur.time}
            </h2>
            <p style={{ color: "var(--mm-ink-3)", fontSize: 13.5, marginTop: 4 }}>
              60 min · Zoom auto-link · 4:30 PM CET for Helena
            </p>

            {/* Score chart */}
            <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
              <ScoreBar label="Focus" v={cur.score === 96 ? 95 : cur.score === 88 ? 82 : 60}/>
              <ScoreBar label="Fatigue" v={cur.fatigue === "Low" ? 92 : 70}/>
              <ScoreBar label="Fairness" v={cur.score === 81 ? 64 : 90}/>
              <ScoreBar label="Convenience" v={cur.score - 4}/>
            </div>

            <hr className="mm-hr" style={{ margin: "18px 0 14px" }}/>

            <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Why this slot</span>
            <ul style={{ marginTop: 10, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {cur.reasons.map((r, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, alignItems: "flex-start" }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: 5, marginTop: 1,
                    background: r.tone === "good" ? "var(--mm-green-tint)" : "var(--mm-amber-soft)",
                    color: r.tone === "good" ? "var(--mm-green)" : "#8a661f",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>{r.tone === "good" ? <I.Check size={11} sw={2.5}/> : <I.X size={11} sw={2.5}/>}</span>
                  <span style={{ color: "var(--mm-ink-2)", lineHeight: 1.4 }}>{r.label}</span>
                </li>
              ))}
            </ul>

            <hr className="mm-hr" style={{ margin: "16px 0" }}/>

            {/* Day strip preview */}
            <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Your day around this time</span>
            <DayStrip />

            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <button className="mm-btn mm-btn--clay" style={{ flex: 1 }}>Book this time</button>
              <button className="mm-btn mm-btn--ghost">Send 3 options to Helena</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Lbl({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11.5, color: "var(--mm-ink-3)", letterSpacing: "0.02em", textTransform: "uppercase", fontWeight: 500 }}>{label}</span>
      {children}
    </label>
  );
}

function ScoreRing({ score, active }) {
  const r = 18, c = 2 * Math.PI * r;
  const off = c - (score / 100) * c;
  return (
    <div style={{ position: "relative", width: 44, height: 44 }}>
      <svg width="44" height="44">
        <circle cx="22" cy="22" r={r} stroke="var(--mm-line)" strokeWidth="3" fill="none"/>
        <circle cx="22" cy="22" r={r}
          stroke={score >= 90 ? "var(--mm-green)" : score >= 80 ? "var(--mm-clay)" : "var(--mm-amber)"}
          strokeWidth="3" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off}
          transform="rotate(-90 22 22)"/>
      </svg>
      <span style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--mm-display)", fontSize: 13, fontWeight: 500,
      }}>{score}</span>
    </div>
  );
}

function ScoreBar({ label, v }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--mm-ink-3)", marginBottom: 5 }}>
        <span>{label}</span><span>{v}</span>
      </div>
      <div style={{ height: 5, background: "var(--mm-paper-3)", borderRadius: 999 }}>
        <div style={{ width: v + "%", height: "100%", borderRadius: 999, background: v >= 80 ? "var(--mm-green)" : v >= 65 ? "var(--mm-clay)" : "var(--mm-amber)" }}/>
      </div>
    </div>
  );
}

function DayStrip() {
  // 8a..6p with blocks
  const hours = ["8","9","10","11","12","1","2","3","4","5"];
  const blocks = [
    { start: 0, len: 1.5, kind: "focus", label: "Focus" },
    { start: 1.5, len: 0.5, kind: "buffer" },
    { start: 2.5, len: 1, kind: "meeting", label: "Helena" },
    { start: 3.5, len: 0.5, kind: "buffer" },
    { start: 4, len: 1, kind: "lunch", label: "Lunch" },
    { start: 5, len: 1, kind: "free" },
    { start: 6, len: 0.5, kind: "meeting", label: "1:1 Sam" },
    { start: 7, len: 1, kind: "focus", label: "Focus" },
    { start: 8, len: 1, kind: "free" },
    { start: 9, len: 1, kind: "meeting", label: "Standup" },
  ];
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ position: "relative", height: 44, background: "var(--mm-paper-2)", borderRadius: 8, border: "1px solid var(--mm-line)", overflow: "hidden" }}>
        {blocks.map((b, i) => {
          const colors = {
            focus: { bg: "repeating-linear-gradient(45deg, #d8e3dc, #d8e3dc 5px, #ecf1ed 5px, #ecf1ed 10px)", c: "var(--mm-green)" },
            meeting: { bg: "var(--mm-clay-soft)", c: "var(--mm-clay-2)" },
            buffer: { bg: "var(--mm-paper-3)", c: "var(--mm-ink-3)" },
            lunch: { bg: "var(--mm-amber-soft)", c: "#8a661f" },
            free: { bg: "transparent", c: "var(--mm-ink-3)" },
          }[b.kind];
          return (
            <div key={i} style={{
              position: "absolute", top: 0, bottom: 0,
              left: (b.start / 10) * 100 + "%", width: (b.len / 10) * 100 + "%",
              background: colors.bg, color: colors.c,
              borderRight: i < blocks.length - 1 ? "1px solid var(--mm-paper-2)" : "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10.5, fontWeight: 500,
              outline: b.kind === "meeting" && b.label === "Helena" ? "2px solid var(--mm-green)" : "none",
              outlineOffset: -2,
              borderRadius: b.kind === "meeting" && b.label === "Helena" ? 6 : 0,
            }}>
              {b.label}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "var(--mm-ink-4)" }}>
        {hours.map(h => <span key={h}>{h}</span>)}
      </div>
    </div>
  );
}

Object.assign(window, { BestTime });

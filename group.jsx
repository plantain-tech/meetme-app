/* global React, I, Avatar */
// MeetMe — Smart Group Scheduling

const { useState: useStateG } = React;

function GroupFind() {
  const [pick, setPick] = useStateG(0);
  const attendees = [
    { name: "Alex Morgan", tz: "ET", role: "You", calStatus: "Connected" },
    { name: "Helena Voss", tz: "CET", role: "Designer", calStatus: "Connected" },
    { name: "Marcus Chen", tz: "PT", role: "Engineer", calStatus: "Connected" },
    { name: "Priya Patel", tz: "IST", role: "PM", calStatus: "Connected" },
    { name: "Sam Okafor", tz: "GMT", role: "Marketing", calStatus: "Pending" },
  ];

  const proposals = [
    { id: 0, when: "Tue, May 27", time: "11:00 AM ET", score: 94, mood: "Best for everyone",
      tzs: ["8 AM PT", "11 AM ET", "4 PM GMT", "5 PM CET", "8:30 PM IST"], notes: "Inside core hours for all. No focus blocks burned." },
    { id: 1, when: "Wed, May 28", time: "9:00 AM ET", score: 88, mood: "Early for some",
      tzs: ["6 AM PT ⚠", "9 AM ET", "2 PM GMT", "3 PM CET", "6:30 PM IST"], notes: "Marcus starts early — flag." },
    { id: 2, when: "Thu, May 29", time: "1:30 PM ET", score: 86, mood: "Late for India",
      tzs: ["10:30 AM PT", "1:30 PM ET", "6:30 PM GMT", "7:30 PM CET", "11 PM IST ⚠"], notes: "Priya past working hours." },
  ];

  const cur = proposals[pick];

  return (
    <div style={{ flex: 1, overflow: "auto", background: "var(--mm-paper-2)" }}>
      <div style={{ padding: "22px 32px 18px", borderBottom: "1px solid var(--mm-line)", background: "var(--mm-paper-2)" }}>
        <span className="mm-pill mm-pill--clay" style={{ marginBottom: 8 }}><I.Brain size={11}/> Group Find</span>
        <h1 style={{ fontSize: 30, lineHeight: 1.1 }}>Stop polling. Start meeting.</h1>
        <p style={{ marginTop: 6, color: "var(--mm-ink-3)", fontSize: 14, maxWidth: 640 }}>
          Paste a list of attendees. We read everyone's calendar and propose three high-quality times — fair across time zones, gentle on focus blocks, and ready to send.
        </p>
      </div>

      <div style={{ padding: "22px 32px 32px", display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}>
        {/* Left: attendees + constraints */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <section className="mm-card" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Attendees</span>
              <button className="mm-btn mm-btn--quiet mm-btn--sm"><I.Plus size={12}/> Add</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {attendees.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={a.name} size={28}/>
                  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2, flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</span>
                    <span style={{ fontSize: 11, color: "var(--mm-ink-3)" }}>{a.role} · {a.tz}</span>
                  </div>
                  <span className={"mm-pill " + (a.calStatus === "Connected" ? "mm-pill--green" : "mm-pill--amber")} style={{ fontSize: 10 }}>
                    {a.calStatus}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mm-card" style={{ padding: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 12 }}>Constraints</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
              <Constraint label="Length" value="60 minutes"/>
              <Constraint label="Within" value="Next 7 days"/>
              <Constraint label="Working hours only" value="On" toggle/>
              <Constraint label="Avoid focus blocks" value="On" toggle/>
              <Constraint label="Time-zone fairness" value="Strict"/>
              <Constraint label="Buffer before" value="15 min"/>
            </div>
          </section>

          <section className="mm-card" style={{ padding: 16, background: "var(--mm-clay-soft)", borderColor: "#ebcec0" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--mm-clay-2)", fontWeight: 500, marginBottom: 6 }}>
              <I.Sparkle size={12}/> No more polls
            </span>
            <p style={{ fontSize: 13, color: "var(--mm-ink-2)", lineHeight: 1.5 }}>
              4 of 5 attendees connected calendars. We resolved the time without a single vote.
              Sam will get a 1-tap confirmation email.
            </p>
          </section>
        </div>

        {/* Right: proposals */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Proposals row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {proposals.map((p, i) => (
              <button key={p.id} onClick={() => setPick(i)} style={{
                textAlign: "left", padding: 18, borderRadius: 14,
                background: i === pick ? "var(--mm-paper)" : "var(--mm-paper-2)",
                border: "1.5px solid " + (i === pick ? "var(--mm-green)" : "var(--mm-line)"),
                cursor: "pointer", display: "flex", flexDirection: "column", gap: 8,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className={"mm-pill " + (i === 0 ? "mm-pill--green" : "mm-pill--amber")} style={{ fontSize: 10 }}>
                    {p.mood}
                  </span>
                  <span style={{ fontFamily: "var(--mm-display)", fontSize: 18, color: i === pick ? "var(--mm-green)" : "var(--mm-ink-2)" }}>{p.score}</span>
                </div>
                <span style={{ fontFamily: "var(--mm-display)", fontSize: 22, lineHeight: 1.1 }}>{p.when}</span>
                <span style={{ fontSize: 13, color: "var(--mm-ink-2)" }}>{p.time}</span>
                <p style={{ fontSize: 12, color: "var(--mm-ink-3)", marginTop: 4 }}>{p.notes}</p>
              </button>
            ))}
          </div>

          {/* Detail card */}
          <section className="mm-card" style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Proposal {pick + 1} of 3</span>
                <h2 style={{ fontFamily: "var(--mm-display)", fontSize: 26, marginTop: 2 }}>{cur.when} · {cur.time}</h2>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="mm-btn mm-btn--ghost"><I.Copy size={13}/> Copy invite link</button>
                <button className="mm-btn mm-btn--clay">Send to attendees</button>
              </div>
            </div>

            {/* Local time strip per attendee */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {attendees.map((a, i) => {
                const tzLine = cur.tzs[i] || "";
                const warn = tzLine.includes("⚠");
                return (
                  <div key={i} style={{
                    display: "grid", gridTemplateColumns: "180px 1fr 110px",
                    gap: 14, alignItems: "center",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={a.name} size={26}/>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</span>
                    </div>
                    <TimezoneStrip tz={a.tz} pick={pick}/>
                    <span style={{ fontSize: 12.5, color: warn ? "var(--mm-clay-2)" : "var(--mm-ink-2)", textAlign: "right", fontWeight: warn ? 500 : 400 }}>
                      {tzLine}
                    </span>
                  </div>
                );
              })}
            </div>

            <hr className="mm-hr" style={{ margin: "18px 0 14px" }}/>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              <Metric label="Fairness" v={pick === 0 ? 96 : pick === 1 ? 78 : 70}/>
              <Metric label="Focus respect" v={pick === 0 ? 92 : 80}/>
              <Metric label="Working hours" v={pick === 0 ? 100 : 80}/>
              <Metric label="Calendar fit" v={94}/>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Constraint({ label, value, toggle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      <span style={{ color: "var(--mm-ink-2)" }}>{label}</span>
      {toggle ? <span className={"mm-toggle mm-toggle--on"}/> : <span style={{ color: "var(--mm-ink)", fontWeight: 500 }}>{value} ›</span>}
    </div>
  );
}

function TimezoneStrip({ tz, pick }) {
  // Map: where the proposed slot lands as % across 6am-10pm window
  const positions = { 0: { ET: 0.31, PT: 0.12, CET: 0.69, IST: 0.91, GMT: 0.62 },
                      1: { ET: 0.19, PT: 0, CET: 0.56, IST: 0.81, GMT: 0.50 },
                      2: { ET: 0.47, PT: 0.28, CET: 0.84, IST: 1.0, GMT: 0.78 } };
  const pos = positions[pick]?.[tz] ?? 0.5;
  const inWorking = pos >= 0.15 && pos <= 0.85;
  return (
    <div style={{ position: "relative", height: 14, background: "var(--mm-paper-2)", borderRadius: 999, border: "1px solid var(--mm-line)" }}>
      {/* working hours band */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: "15%", width: "70%",
        background: "var(--mm-green-tint)", borderRadius: 999,
      }}/>
      <div style={{
        position: "absolute", top: -3, bottom: -3,
        left: `calc(${pos * 100}% - 5px)`, width: 10,
        background: inWorking ? "var(--mm-green)" : "var(--mm-clay)",
        borderRadius: 4, border: "2px solid #fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}/>
    </div>
  );
}

function Metric({ label, v }) {
  return (
    <div>
      <span style={{ fontSize: 11.5, color: "var(--mm-ink-3)", letterSpacing: "0.02em", textTransform: "uppercase", fontWeight: 500 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}>
        <span style={{ fontFamily: "var(--mm-display)", fontSize: 22 }}>{v}</span>
        <span style={{ fontSize: 11, color: "var(--mm-ink-3)" }}>/100</span>
      </div>
      <div style={{ height: 3, background: "var(--mm-paper-3)", borderRadius: 999, marginTop: 6 }}>
        <div style={{ width: v + "%", height: "100%", background: v >= 85 ? "var(--mm-green)" : v >= 70 ? "var(--mm-clay)" : "var(--mm-amber)", borderRadius: 999 }}/>
      </div>
    </div>
  );
}

Object.assign(window, { GroupFind });

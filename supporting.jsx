/* global React, I, Avatar */
// MeetMe — Availability + Energy-aware scheduling, Event Types, Reminders, Integrations, Calendar Sync

const { useState: useStateA } = React;

// ---------- AVAILABILITY ----------
function Availability() {
  const days = [
    { day: "Monday", on: true, ranges: ["9:00 AM – 12:00 PM", "1:30 PM – 5:00 PM"] },
    { day: "Tuesday", on: true, ranges: ["9:00 AM – 5:00 PM"] },
    { day: "Wednesday", on: true, ranges: ["9:00 AM – 12:00 PM"] },
    { day: "Thursday", on: true, ranges: ["10:00 AM – 4:00 PM"] },
    { day: "Friday", on: true, ranges: ["9:00 AM – 1:00 PM"] },
    { day: "Saturday", on: false, ranges: [] },
    { day: "Sunday", on: false, ranges: [] },
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", background: "var(--mm-paper-2)" }}>
      <div style={{ padding: "22px 32px 18px", borderBottom: "1px solid var(--mm-line)" }}>
        <h1 style={{ fontSize: 30 }}>Availability</h1>
        <p style={{ color: "var(--mm-ink-3)", fontSize: 14, marginTop: 6 }}>
          Tell us when you're open — and what kind of week protects your energy.
        </p>
      </div>

      <div style={{ padding: "22px 32px 32px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
        {/* Working hours */}
        <section className="mm-card" style={{ padding: 22 }}>
          <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 20, marginBottom: 14 }}>Working hours</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {days.map((d, i) => (
              <div key={d.day} style={{
                display: "grid", gridTemplateColumns: "120px 36px 1fr auto",
                alignItems: "center", gap: 14,
                padding: "12px 0", borderTop: i > 0 ? "1px solid var(--mm-line)" : "none",
              }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: d.on ? "var(--mm-ink)" : "var(--mm-ink-4)" }}>{d.day}</span>
                <span className={"mm-toggle " + (d.on ? "mm-toggle--on" : "")}/>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {d.on ? d.ranges.map((r, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5 }}>
                      <span style={{ padding: "5px 10px", background: "var(--mm-paper-2)", border: "1px solid var(--mm-line)", borderRadius: 7 }}>{r.split(" – ")[0]}</span>
                      <span style={{ color: "var(--mm-ink-3)" }}>—</span>
                      <span style={{ padding: "5px 10px", background: "var(--mm-paper-2)", border: "1px solid var(--mm-line)", borderRadius: 7 }}>{r.split(" – ")[1]}</span>
                      {j === 0 && <button className="mm-btn mm-btn--quiet mm-btn--sm" style={{ marginLeft: 4 }}><I.Plus size={12}/></button>}
                    </div>
                  )) : <span style={{ color: "var(--mm-ink-4)", fontSize: 13 }}>Unavailable</span>}
                </div>
                <I.Copy size={14} style={{ color: "var(--mm-ink-4)" }}/>
              </div>
            ))}
          </div>

          <hr className="mm-hr" style={{ margin: "20px 0" }}/>

          <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 20, marginBottom: 14 }}>Booking guardrails</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Guard label="Buffer before meetings" value="15 min"/>
            <Guard label="Buffer after meetings" value="15 min"/>
            <Guard label="Minimum notice" value="2 hours"/>
            <Guard label="Maximum advance booking" value="60 days"/>
            <Guard label="Daily booking limit" value="6 meetings"/>
            <Guard label="Weekly booking limit" value="22 meetings"/>
          </div>
        </section>

        {/* Energy-aware */}
        <section className="mm-card" style={{ padding: 22, background: "linear-gradient(180deg, var(--mm-paper) 0%, var(--mm-paper-2) 100%)" }}>
          <span className="mm-pill mm-pill--clay" style={{ marginBottom: 8 }}><I.Battery size={11}/> Energy-aware scheduling</span>
          <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 20, marginBottom: 6 }}>Protect what matters</h3>
          <p style={{ color: "var(--mm-ink-3)", fontSize: 13.5, lineHeight: 1.5, marginBottom: 16 }}>
            We watch for context switching and meeting fatigue, then nudge bookings toward better windows.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Toggle title="Hold morning focus block" sub="9:00–10:30 AM, daily" on/>
            <Toggle title="Cap back-to-back meetings" sub="No more than 2 in a row" on/>
            <Toggle title="Cool-down after long calls" sub="30 min after any 60+ min meeting" on/>
            <Toggle title="Cluster meetings by topic" sub="Group 1:1s on Tuesday, demos on Thursday" />
            <Toggle title="Energy-fit time recommendations" sub="Show booking slots inside your peak hours first" on/>
          </div>

          <hr className="mm-hr" style={{ margin: "16px 0" }}/>

          <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>This week's protection</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginTop: 10 }}>
            {["Mon","Tue","Wed","Thu","Fri"].map((d, i) => {
              const focus = [3, 2, 4, 1, 3][i];
              const meetings = [4, 3, 2, 6, 2][i];
              return (
                <div key={d} style={{ background: "var(--mm-paper-2)", border: "1px solid var(--mm-line)", borderRadius: 10, padding: 10, textAlign: "center" }}>
                  <span style={{ fontSize: 11, color: "var(--mm-ink-3)", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 500 }}>{d}</span>
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontFamily: "var(--mm-display)", fontSize: 18 }}>{focus}h</span>
                    <span style={{ fontSize: 10.5, color: "var(--mm-ink-3)" }}>focus</span>
                  </div>
                  <div style={{ height: 3, background: "var(--mm-paper-3)", borderRadius: 999, marginTop: 8 }}>
                    <div style={{ width: Math.min(100, meetings * 16) + "%", height: "100%", background: meetings >= 5 ? "var(--mm-clay)" : "var(--mm-green)", borderRadius: 999 }}/>
                  </div>
                  <span style={{ fontSize: 10.5, color: meetings >= 5 ? "var(--mm-clay-2)" : "var(--mm-ink-3)", display: "block", marginTop: 4 }}>
                    {meetings} mtgs
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function Guard({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, color: "var(--mm-ink-3)", fontWeight: 500 }}>{label}</span>
      <div className="mm-input" style={{ justifyContent: "space-between" }}>
        <span>{value}</span>
        <I.ChevronD size={13}/>
      </div>
    </div>
  );
}

function Toggle({ title, sub, on }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span className={"mm-toggle " + (on ? "mm-toggle--on" : "")}/>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
        <span style={{ fontSize: 13.5, fontWeight: 500 }}>{title}</span>
        <span style={{ fontSize: 12, color: "var(--mm-ink-3)" }}>{sub}</span>
      </div>
    </div>
  );
}

// ---------- EVENT TYPES ----------
function EventTypes() {
  const types = [
    { name: "Discovery Call", duration: "30 min", price: "Free", color: "green", icon: I.Heart, bookings: 42, mode: "1:1", page: "alex.meetme.com/intro" },
    { name: "Health Coaching Session", duration: "60 min", price: "$150", color: "clay", icon: I.Sun, bookings: 28, mode: "1:1", page: "alex.meetme.com/coaching" },
    { name: "Nutrition Consultation", duration: "45 min", price: "$120", color: "amber", icon: I.Coffee, bookings: 19, mode: "1:1", page: "alex.meetme.com/nutrition" },
    { name: "Group Class · Mornings", duration: "45 min", price: "$25 / seat", color: "rose", icon: I.Users, bookings: 110, mode: "Group · 8 seats", page: "alex.meetme.com/morning-class" },
    { name: "Quarterly Review", duration: "90 min", price: "Included", color: "ink", icon: I.Brain, bookings: 8, mode: "Round-robin", page: "alex.meetme.com/qbr" },
    { name: "Press Interview", duration: "30 min", price: "Free", color: "green", icon: I.Mail, bookings: 6, mode: "Collective", page: "alex.meetme.com/press" },
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", background: "var(--mm-paper-2)" }}>
      <div style={{ padding: "22px 32px 18px", borderBottom: "1px solid var(--mm-line)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: 30 }}>Event Types</h1>
          <p style={{ color: "var(--mm-ink-3)", fontSize: 14, marginTop: 6 }}>The kinds of meetings people can book with you.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="mm-input" style={{ width: 220, height: 36, fontSize: 13 }}>
            <I.Search size={13}/> Search event types
          </div>
          <button className="mm-btn mm-btn--primary"><I.Plus size={14}/> New event type</button>
        </div>
      </div>

      <div style={{ padding: "22px 32px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {types.map((t, i) => (
          <article key={i} className="mm-card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <span style={{
                width: 36, height: 36, borderRadius: 9,
                background: `var(--mm-${t.color === "ink" ? "paper-3" : t.color}-${t.color === "ink" ? "" : t.color === "green" ? "tint" : "soft"})`,
                color: `var(--mm-${t.color === "green" ? "green" : t.color === "clay" ? "clay-2" : t.color === "amber" ? "amber" : t.color === "rose" ? "rose" : "ink-2"})`,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}><t.icon size={16}/></span>
              <span className={"mm-pill"}>{t.mode}</span>
            </div>
            <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 19, lineHeight: 1.15 }}>{t.name}</h3>
            <div style={{ display: "flex", gap: 10, fontSize: 12.5, color: "var(--mm-ink-3)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><I.Clock size={12}/> {t.duration}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><I.Card size={12}/> {t.price}</span>
            </div>
            <div style={{
              padding: "8px 10px", background: "var(--mm-paper-2)", border: "1px solid var(--mm-line)",
              borderRadius: 8, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--mm-ink-2)",
              fontFamily: "var(--mm-mono)",
            }}>
              <I.Link size={12}/>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.page}</span>
              <I.Copy size={12}/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
              <span style={{ fontSize: 12, color: "var(--mm-ink-3)" }}>{t.bookings} bookings · 30d</span>
              <button className="mm-btn mm-btn--quiet mm-btn--sm">Edit →</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ---------- REMINDERS ----------
function Reminders() {
  const triggers = [
    { when: "Immediately after booking", channel: "Email", who: "Both", title: "Confirmation with all details", icon: I.Mail },
    { when: "24 hours before", channel: "SMS", who: "Guest", title: "Reminder with one-tap join link", icon: I.Phone },
    { when: "1 hour before", channel: "Email", who: "Guest", title: "Quick reminder + Zoom link", icon: I.Mail },
    { when: "15 minutes before", channel: "Slack", who: "Host", title: "Heads-up in #scheduling", icon: I.Slack },
    { when: "1 hour after meeting", channel: "Email", who: "Guest", title: "Follow-up + booking next session", icon: I.Mail },
    { when: "On VIP booking", channel: "Slack", who: "Sales team", title: "Alert in #vip-leads (Hubspot tag)", icon: I.Slack },
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", background: "var(--mm-paper-2)" }}>
      <div style={{ padding: "22px 32px 18px", borderBottom: "1px solid var(--mm-line)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: 30 }}>Reminders &amp; Automations</h1>
          <p style={{ color: "var(--mm-ink-3)", fontSize: 14, marginTop: 6 }}>Every message your bookings send, in one timeline.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="mm-btn mm-btn--ghost"><I.Bolt size={14}/> Templates</button>
          <button className="mm-btn mm-btn--primary"><I.Plus size={14}/> New automation</button>
        </div>
      </div>

      <div style={{ padding: "22px 32px 32px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
        {/* Timeline */}
        <section className="mm-card" style={{ padding: 22 }}>
          <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 20, marginBottom: 18 }}>Booking timeline</h3>
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <span style={{ position: "absolute", left: 13, top: 0, bottom: 0, width: 2, background: "var(--mm-line)" }}/>
            {triggers.map((t, i) => (
              <div key={i} style={{ position: "relative", paddingBottom: 18 }}>
                <span style={{
                  position: "absolute", left: -28, top: 4, width: 28, height: 28,
                  background: "var(--mm-paper)", border: "1.5px solid var(--mm-line-2)", borderRadius: 8,
                  display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--mm-ink-2)",
                }}><t.icon size={14}/></span>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>{t.when}</span>
                    <span style={{ fontSize: 14.5, fontWeight: 500 }}>{t.title}</span>
                    <span style={{ fontSize: 12, color: "var(--mm-ink-3)" }}>{t.channel} → {t.who}</span>
                  </div>
                  <span className="mm-pill mm-pill--green">Active</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Template editor preview */}
        <section className="mm-card" style={{ padding: 18, height: "fit-content" }}>
          <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Editing</span>
          <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 18, marginTop: 4, marginBottom: 12 }}>SMS · 24 hours before</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Lbl2 label="Send when">
              <div className="mm-input">24 hours before · 9:00 AM cap</div>
            </Lbl2>
            <Lbl2 label="Message">
              <div style={{
                padding: 12, background: "var(--mm-paper-2)", border: "1px solid var(--mm-line)", borderRadius: 10,
                fontFamily: "var(--mm-mono)", fontSize: 12.5, lineHeight: 1.5, color: "var(--mm-ink-2)",
              }}>
                Hi <span style={{ background: "var(--mm-green-tint)", color: "var(--mm-green)", padding: "1px 5px", borderRadius: 4 }}>{"{guest.first_name}"}</span>! Reminder of our <span style={{ background: "var(--mm-green-tint)", color: "var(--mm-green)", padding: "1px 5px", borderRadius: 4 }}>{"{event.name}"}</span> tomorrow at <span style={{ background: "var(--mm-green-tint)", color: "var(--mm-green)", padding: "1px 5px", borderRadius: 4 }}>{"{event.local_time}"}</span>. Join here: <span style={{ background: "var(--mm-green-tint)", color: "var(--mm-green)", padding: "1px 5px", borderRadius: 4 }}>{"{join.short_url}"}</span> · Reschedule: <span style={{ background: "var(--mm-green-tint)", color: "var(--mm-green)", padding: "1px 5px", borderRadius: 4 }}>{"{reschedule.short_url}"}</span>
              </div>
            </Lbl2>
          </div>

          <hr className="mm-hr" style={{ margin: "14px 0" }}/>

          <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Preview</span>
          <div style={{
            marginTop: 10, padding: 14, background: "var(--mm-paper-3)", borderRadius: 14,
            position: "relative",
          }}>
            <div style={{
              padding: "8px 12px", background: "#fff", borderRadius: 14,
              border: "1px solid var(--mm-line)", fontSize: 13, lineHeight: 1.45,
            }}>
              Hi Jordan! Reminder of our Health Coaching Session tomorrow at 9:00 AM ET. Join here: meetme.co/j/8h2 · Reschedule: meetme.co/r/8h2
            </div>
            <span style={{ display: "block", textAlign: "right", fontSize: 10.5, color: "var(--mm-ink-3)", marginTop: 4 }}>Today · 9:00 AM</span>
          </div>
        </section>
      </div>
    </div>
  );
}

function Lbl2({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11.5, color: "var(--mm-ink-3)", letterSpacing: "0.02em", textTransform: "uppercase", fontWeight: 500 }}>{label}</span>
      {children}
    </label>
  );
}

// ---------- INTEGRATIONS ----------
function Integrations() {
  const groups = [
    { title: "Calendar", items: [
      { icon: I.Google, name: "Google Calendar", on: true, status: "Synced 2 min ago" },
      { icon: I.Apple, name: "Apple Calendar", on: true, status: "Synced 4 min ago" },
      { icon: I.Outlook, name: "Outlook", on: true, status: "Synced 1 min ago" },
      { icon: I.Calendar, name: "Microsoft 365", on: false },
    ]},
    { title: "Video", items: [
      { icon: I.Zoom, name: "Zoom", on: true, status: "Default for paid sessions" },
      { icon: I.Video, name: "Google Meet", on: true, status: "Default for free sessions" },
      { icon: I.Video, name: "Microsoft Teams", on: false },
    ]},
    { title: "Payments & CRM", items: [
      { icon: I.Stripe, name: "Stripe", on: true, status: "USD · 2.9% + 30¢" },
      { icon: I.Card, name: "PayPal", on: false },
      { icon: I.Users, name: "HubSpot", on: true, status: "Tags VIP leads" },
      { icon: I.Users, name: "Salesforce", on: false },
    ]},
    { title: "Workflow", items: [
      { icon: I.Slack, name: "Slack", on: true, status: "#scheduling, #vip-leads" },
      { icon: I.Bolt, name: "Zapier", on: true, status: "3 zaps active" },
      { icon: I.Bolt, name: "Make", on: false },
      { icon: I.Mail, name: "Mailchimp", on: true, status: "Adds bookers to lists" },
    ]},
    { title: "Developer", items: [
      { icon: I.External, name: "Webhooks", on: true, status: "2 endpoints" },
      { icon: I.Plug, name: "REST API", on: true, status: "Personal token" },
      { icon: I.Globe, name: "Analytics pixels", on: true, status: "GA4 · Meta · LinkedIn" },
    ]},
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", background: "var(--mm-paper-2)" }}>
      <div style={{ padding: "22px 32px 18px", borderBottom: "1px solid var(--mm-line)" }}>
        <h1 style={{ fontSize: 30 }}>Integrations</h1>
        <p style={{ color: "var(--mm-ink-3)", fontSize: 14, marginTop: 6 }}>Connect MeetMe with the tools you already use.</p>
      </div>
      <div style={{ padding: "22px 32px 32px", display: "flex", flexDirection: "column", gap: 22 }}>
        {groups.map((g, gi) => (
          <section key={gi}>
            <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>{g.title}</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 10 }}>
              {g.items.map((it, ii) => (
                <article key={ii} className="mm-card" style={{
                  padding: 16, display: "flex", flexDirection: "column", gap: 10,
                  opacity: it.on ? 1 : 0.85,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{
                      width: 38, height: 38, borderRadius: 9, background: "var(--mm-paper-3)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--mm-ink-2)",
                      border: "1px solid var(--mm-line)",
                    }}><it.icon size={18}/></span>
                    {it.on ? <span className="mm-pill mm-pill--green">Connected</span> : <button className="mm-btn mm-btn--ghost mm-btn--sm">Connect</button>}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{it.name}</span>
                  <span style={{ fontSize: 12, color: "var(--mm-ink-3)", lineHeight: 1.4 }}>{it.status || "Not connected"}</span>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// ---------- CALENDAR SYNC (onboarding) ----------
function CalendarSync() {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "var(--mm-paper-2)" }}>
      <div style={{ padding: "22px 32px 18px", borderBottom: "1px solid var(--mm-line)" }}>
        <h1 style={{ fontSize: 30 }}>Calendar Sync</h1>
        <p style={{ color: "var(--mm-ink-3)", fontSize: 14, marginTop: 6 }}>Connect every calendar you live in. We'll never double-book you.</p>
      </div>
      <div style={{ padding: "32px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1100 }}>
        <section className="mm-card" style={{ padding: 28 }}>
          <h2 style={{ fontFamily: "var(--mm-display)", fontSize: 24, marginBottom: 6 }}>Sign in once</h2>
          <p style={{ color: "var(--mm-ink-3)", fontSize: 14, marginBottom: 20, lineHeight: 1.5 }}>
            Signing in connects your calendar automatically. We use it to read availability and create new bookings — never to read your private events.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <SignBtn icon={<I.Google size={18}/>} label="Continue with Google"/>
            <SignBtn icon={<I.Apple size={18}/>} label="Continue with Apple"/>
            <SignBtn icon={<I.Outlook size={18}/>} label="Continue with Outlook"/>
            <SignBtn icon={<I.Calendar size={18}/>} label="Continue with Microsoft 365"/>
          </div>
          <p style={{ fontSize: 11.5, color: "var(--mm-ink-3)", marginTop: 16, lineHeight: 1.5, display: "flex", alignItems: "center", gap: 6 }}>
            <I.Shield size={12}/> Encrypted at rest. Read-only by default. Disconnect anytime.
          </p>
        </section>

        <section className="mm-card" style={{ padding: 22 }}>
          <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 20, marginBottom: 14 }}>Connected</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ConnRow icon={<I.Google size={16}/>} name="Google Calendar" email="alex@morgancoaching.com" primary checks/>
            <ConnRow icon={<I.Apple size={16}/>} name="Apple Calendar" email="alex@icloud.com" checks/>
            <ConnRow icon={<I.Outlook size={16}/>} name="Outlook" email="alex@morgan.work" checks/>
          </div>

          <hr className="mm-hr" style={{ margin: "16px 0" }}/>

          <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Settings</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            <Toggle title="Prevent double-booking" sub="Block any time on any connected calendar" on/>
            <Toggle title="Add new bookings to" sub="Google Calendar · Coaching" on/>
            <Toggle title="Real-time sync" sub="Push updates within seconds, not minutes" on/>
          </div>
        </section>
      </div>
    </div>
  );
}

function SignBtn({ icon, label }) {
  return (
    <button style={{
      height: 48, padding: "0 16px", borderRadius: 10,
      background: "#fff", border: "1.5px solid var(--mm-line-2)",
      display: "flex", alignItems: "center", gap: 12, fontSize: 14, fontWeight: 500,
      cursor: "pointer", color: "var(--mm-ink)",
      transition: "border-color .12s, background .12s",
    }}
    onMouseEnter={e => e.currentTarget.style.background = "var(--mm-paper-2)"}
    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
    >
      {icon}
      {label}
    </button>
  );
}

function ConnRow({ icon, name, email, primary, checks }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "var(--mm-paper-2)", borderRadius: 10, border: "1px solid var(--mm-line)" }}>
      <span style={{
        width: 32, height: 32, borderRadius: 8, background: "var(--mm-paper)",
        display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--mm-ink-2)",
        border: "1px solid var(--mm-line)",
      }}>{icon}</span>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{name}</span>
          {primary && <span className="mm-pill mm-pill--green">Primary</span>}
        </div>
        <span style={{ fontSize: 12, color: "var(--mm-ink-3)" }}>{email}</span>
      </div>
      {checks && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
          <span style={{ fontSize: 11, color: "var(--mm-green)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--mm-green)" }}/> Live
          </span>
          <span style={{ fontSize: 11, color: "var(--mm-ink-3)" }}>Conflict checking</span>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Availability, EventTypes, Reminders, Integrations, CalendarSync });

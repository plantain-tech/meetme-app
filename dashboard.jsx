/* global React, I, Sidebar, Topbar, Stat, Avatar, SectionTitle */
// MeetMe — Dashboard

const TODAY_BOOKINGS = [
  { time: "09:00", end: "09:30", who: "Sarah Johnson", what: "Discovery Call", via: "Zoom", tone: "green" },
  { time: "10:30", end: "11:30", who: "Michael Lee", what: "Coaching Session", via: "Google Meet", tone: "clay" },
  { time: "12:00", end: "12:45", who: "Emily Davis", what: "Nutrition Consultation", via: "Zoom", tone: "amber" },
  { time: "14:00", end: "14:30", who: "David Kim", what: "Follow-up Call", via: "Phone", tone: "green" },
  { time: "16:00", end: "17:00", who: "Jessica Williams", what: "Coaching Session", via: "Zoom", tone: "clay" },
];

function Dashboard({ density = "comfortable" }) {
  return (
    <div style={{ flex: 1, overflow: "auto", background: "var(--mm-paper-2)" }}>
      <Topbar
        title="Good morning, Alex"
        subtitle="Wednesday, May 21 · 5 bookings today · 1 focus block protected"
        right={
          <>
            <button className="mm-btn mm-btn--ghost"><I.Copy size={14}/> Copy booking link</button>
            <button className="mm-btn mm-btn--primary"><I.Plus size={14}/> New event type</button>
          </>
        }
      />
      <div style={{ padding: "22px 32px 32px", display: "grid", gap: 16 }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          <Stat label="Bookings" value="128" delta="+18%" caption="This month" />
          <Stat label="Conversion" value="64%" delta="+4 pts" caption="Visitors → booked" />
          <Stat label="No-shows" value="3" delta="−25%" deltaTone="green" caption="This month" />
          <Stat label="Revenue" value="$8,640" delta="+22%" deltaTone="green" caption="May to date" />
          <Stat label="Focus time" value="11.5h" delta="protected" deltaTone="ink" caption="This week" />
        </div>

        {/* Row: Schedule + Best Time Insights */}
        <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 16 }}>
          {/* Today */}
          <section className="mm-card" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 20 }}>Today's schedule</h3>
                <p style={{ color: "var(--mm-ink-3)", fontSize: 13, marginTop: 2 }}>5 meetings · 3.25 hours · 1 buffer block</p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="mm-btn mm-btn--quiet mm-btn--sm">Today</button>
                <button className="mm-btn mm-btn--ghost mm-btn--sm">View calendar →</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {TODAY_BOOKINGS.map((b, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "70px 1fr auto auto",
                  gap: 14, alignItems: "center",
                  padding: "11px 12px", borderRadius: 10,
                  background: i === 0 ? "var(--mm-green-tint)" : "var(--mm-paper-2)",
                  border: "1px solid var(--mm-line)",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                    <span style={{ fontFamily: "var(--mm-display)", fontSize: 16 }}>{b.time}</span>
                    <span style={{ color: "var(--mm-ink-3)", fontSize: 11.5 }}>→ {b.end}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar name={b.who} size={28} />
                    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{b.who}</span>
                      <span style={{ color: "var(--mm-ink-3)", fontSize: 12 }}>{b.what}</span>
                    </div>
                  </div>
                  <span className={`mm-pill ${b.tone === "green" ? "mm-pill--green" : b.tone === "clay" ? "mm-pill--clay" : "mm-pill--amber"}`}>
                    <I.Video size={11} /> {b.via}
                  </span>
                  <button className="mm-btn mm-btn--quiet mm-btn--sm">Open</button>
                </div>
              ))}
            </div>
          </section>

          {/* Best Time Insights */}
          <section className="mm-card" style={{
            padding: 18,
            background: "linear-gradient(180deg, var(--mm-paper) 0%, var(--mm-paper-2) 100%)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{
                width: 22, height: 22, borderRadius: 6,
                background: "var(--mm-clay-soft)", color: "var(--mm-clay-2)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}><I.Sparkle size={12} /></span>
              <span style={{ fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>
                Best Time Insights
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 20, marginBottom: 10 }}>This week is healthy.</h3>

            {/* Three signals */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Signal
                icon={<I.Battery size={14} />}
                title="Meeting fatigue"
                meter={42}
                tone="green"
                note="Thursday is heavy — 6 meetings, no buffers. Consider moving the 2pm."
              />
              <Signal
                icon={<I.Focus size={14} />}
                title="Focus time"
                meter={70}
                tone="green"
                note="11.5 hours protected. 2 meetings landed inside focus blocks."
              />
              <Signal
                icon={<I.Sun size={14} />}
                title="Energy fit"
                meter={86}
                tone="green"
                note="Most calls landed in your morning peak window."
              />
            </div>

            <hr className="mm-hr" style={{ margin: "14px 0 12px" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <p style={{ color: "var(--mm-ink-2)", fontSize: 13, lineHeight: 1.45 }}>
                Smart Find can suggest 3 better slots for the Thursday cluster.
              </p>
              <button className="mm-btn mm-btn--clay mm-btn--sm">Review →</button>
            </div>
          </section>
        </div>

        {/* Row: Calendars + Quick actions + Connected services */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <section className="mm-card" style={{ padding: 18 }}>
            <SectionTitle action={<button className="mm-btn mm-btn--quiet mm-btn--sm"><I.Plus size={12}/> Connect</button>}>Connected calendars</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <CalendarRow icon={<I.Google size={14} />} name="Google Calendar" email="alex@morgancoaching.com" status="Synced 2 min ago" />
              <CalendarRow icon={<I.Apple size={14} />} name="Apple Calendar" email="alex@icloud.com" status="Synced 4 min ago" />
              <CalendarRow icon={<I.Outlook size={14} />} name="Outlook" email="alex@morgan.work" status="Synced 1 min ago" />
            </div>
          </section>

          <section className="mm-card" style={{ padding: 18 }}>
            <SectionTitle>Quick actions</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <QuickAction icon={<I.Plus size={14}/>} label="New event type" />
              <QuickAction icon={<I.Copy size={14}/>} label="Copy booking link" />
              <QuickAction icon={<I.Sync size={14}/>} label="Connect calendar" />
              <QuickAction icon={<I.Users size={14}/>} label="Invite teammate" />
              <QuickAction icon={<I.Brain size={14}/>} label="Find a group time" />
              <QuickAction icon={<I.Bolt size={14}/>} label="Build automation" />
            </div>
          </section>

          <section className="mm-card" style={{ padding: 18 }}>
            <SectionTitle action={<button className="mm-btn mm-btn--quiet mm-btn--sm">Manage</button>}>Integrations</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <IntRow icon={<I.Zoom size={14}/>} name="Zoom" status="Auto-creates links" />
              <IntRow icon={<I.Stripe size={14}/>} name="Stripe" status="Active · USD" />
              <IntRow icon={<I.Slack size={14}/>} name="Slack" status="VIP alerts → #sales" />
              <IntRow icon={<I.Mail size={14}/>} name="Mailchimp" status="Adds bookers to list" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Signal({ icon, title, meter, tone, note }) {
  const color = tone === "green" ? "var(--mm-green)" : tone === "clay" ? "var(--mm-clay)" : "var(--mm-amber)";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{
          width: 22, height: 22, borderRadius: 6, background: "var(--mm-paper-3)",
          display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--mm-ink-2)",
        }}>{icon}</span>
        <span style={{ fontSize: 13.5, fontWeight: 500, flex: 1 }}>{title}</span>
        <span style={{ fontSize: 12, color: "var(--mm-ink-3)" }}>{meter}/100</span>
      </div>
      <div style={{ height: 4, background: "var(--mm-paper-3)", borderRadius: 999, overflow: "hidden", marginBottom: 6 }}>
        <div style={{ width: meter + "%", height: "100%", background: color, borderRadius: 999 }} />
      </div>
      <p style={{ color: "var(--mm-ink-3)", fontSize: 12.5, lineHeight: 1.4 }}>{note}</p>
    </div>
  );
}

function CalendarRow({ icon, name, email, status }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
      <span style={{
        width: 28, height: 28, borderRadius: 7, background: "var(--mm-paper-3)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "var(--mm-ink-2)", border: "1px solid var(--mm-line)",
      }}>{icon}</span>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2, minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 11.5, color: "var(--mm-ink-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</span>
      </div>
      <span style={{
        fontSize: 11, color: "var(--mm-green)", display: "flex", alignItems: "center", gap: 5,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--mm-green)" }} />
        {status}
      </span>
    </div>
  );
}

function QuickAction({ icon, label }) {
  return (
    <button className="mm-btn mm-btn--ghost" style={{
      height: 40, justifyContent: "flex-start", paddingLeft: 12, fontSize: 13,
    }}>{icon}{label}</button>
  );
}

function IntRow({ icon, name, status }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
      <span style={{
        width: 28, height: 28, borderRadius: 7, background: "var(--mm-paper-3)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "var(--mm-ink-2)", border: "1px solid var(--mm-line)",
      }}>{icon}</span>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2, flex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 11.5, color: "var(--mm-ink-3)" }}>{status}</span>
      </div>
      <span className="mm-pill mm-pill--green">Connected</span>
    </div>
  );
}

Object.assign(window, { Dashboard });

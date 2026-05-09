/* global React, I, Avatar */
// MeetMe — Public Booking page (guest flow). Stateful 4-step booking.

const { useState: useStateB } = React;

const SERVICES = [
  { id: "discovery", icon: I.Heart, name: "Discovery Call", duration: "30 min", price: "Free", desc: "A short intro to see if we're a fit." },
  { id: "coaching", icon: I.Sun, name: "Health Coaching Session", duration: "60 min", price: "$150", desc: "Deep-dive coaching, plan, and accountability." },
  { id: "nutrition", icon: I.Coffee, name: "Nutrition Consultation", duration: "45 min", price: "$120", desc: "Personalized nutrition guidance." },
  { id: "follow", icon: I.Clock, name: "Follow-up Check-in", duration: "15 min", price: "Included", desc: "For active clients only." },
];

const TIMES_GOOD = ["09:00", "10:30", "13:00", "15:30"];
const TIMES_OK = ["11:30", "14:00", "16:30"];

function PublicBooking({ accent = "var(--mm-green)" }) {
  const [step, setStep] = useStateB(2); // 0..3, default to step 3 to show full state
  const [service, setService] = useStateB("coaching");
  const [date, setDate] = useStateB(21);
  const [time, setTime] = useStateB("09:00");

  const svc = SERVICES.find(s => s.id === service);

  return (
    <div className="mm-root" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "auto" }}>
      {/* Header */}
      <header style={{
        padding: "16px 36px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid var(--mm-line)", background: "var(--mm-paper-2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--mm-display)", fontSize: 19, letterSpacing: "-0.02em" }}>
          <span style={{
            width: 22, height: 22, borderRadius: 6, background: "var(--mm-clay)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 13,
          }}>m</span>
          MeetMe
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 13, color: "var(--mm-ink-3)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><I.Shield size={13} /> Secure</span>
          <button className="mm-btn mm-btn--quiet mm-btn--sm">Returning? Sign in →</button>
        </div>
      </header>

      {/* Hero */}
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 28, padding: "32px 36px 18px", alignItems: "center" }}>
        <div style={{
          aspectRatio: "1", borderRadius: 16,
          background: "linear-gradient(140deg, #d8c8b3 0%, #a89876 60%, #5e6b4f 100%)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 65% 35%, rgba(255,255,255,0.45), transparent 50%)",
          }} />
          {/* Initials overlay */}
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--mm-display)", fontSize: 130, color: "rgba(255,255,255,0.45)",
            letterSpacing: "-0.04em",
          }}>AM</div>
        </div>
        <div>
          <span className="mm-pill mm-pill--green" style={{ marginBottom: 12 }}>
            <I.Check size={11} /> Verified Coach
          </span>
          <h1 style={{ fontSize: 52, lineHeight: 1.0, marginBottom: 8 }}>Alexandra Morgan</h1>
          <p style={{ fontSize: 18, color: "var(--mm-ink-3)" }}>Health &amp; Wellness Coach · 8 years experience · Based in Brooklyn, NY</p>
          <div style={{ display: "flex", gap: 18, marginTop: 14, color: "var(--mm-ink-2)", fontSize: 13.5 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><I.Video size={14} /> Video sessions</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><I.Globe size={14} /> Eastern Time (ET)</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><I.Sparkle size={14} /> 4.9 · 312 sessions</span>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ padding: "0 36px 16px", display: "flex", gap: 8 }}>
        {["Choose service", "Pick a date", "Pick a time", "Confirm"].map((label, i) => (
          <div key={i} style={{
            flex: 1, height: 36, borderRadius: 10, padding: "0 14px",
            display: "flex", alignItems: "center", gap: 10,
            background: i <= step ? "var(--mm-paper)" : "var(--mm-paper-2)",
            border: "1px solid " + (i === step ? "var(--mm-green)" : "var(--mm-line)"),
            color: i <= step ? "var(--mm-ink)" : "var(--mm-ink-4)",
            fontSize: 13, fontWeight: 500,
            cursor: "pointer",
          }}
          onClick={() => setStep(i)}
          >
            <span style={{
              width: 20, height: 20, borderRadius: "50%",
              background: i < step ? "var(--mm-green)" : i === step ? "var(--mm-green)" : "var(--mm-paper-3)",
              color: i <= step ? "#fff" : "var(--mm-ink-3)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 500,
            }}>{i < step ? <I.Check size={11} sw={2.5} /> : i + 1}</span>
            {label}
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, padding: "0 36px 32px", flex: 1 }}>
        <div className="mm-card" style={{ padding: 24, background: "var(--mm-paper)" }}>
          {step === 0 && <ChooseService selected={service} onSelect={(id) => { setService(id); setStep(1); }} />}
          {step === 1 && <ChooseDate selected={date} onSelect={(d) => { setDate(d); setStep(2); }} />}
          {step === 2 && <ChooseTime selected={time} date={date} onSelect={(t) => { setTime(t); setStep(3); }} />}
          {step === 3 && <ConfirmDetails service={svc} date={date} time={time} />}
        </div>

        {/* Summary */}
        <BookingSummary svc={svc} date={date} time={time} step={step} onConfirm={() => setStep(Math.min(3, step + 1))} />
      </div>

      {/* Footer reassurance */}
      <footer style={{
        padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-around",
        borderTop: "1px solid var(--mm-line)", background: "var(--mm-paper-2)",
      }}>
        {[
          { icon: <I.Calendar size={16} />, t: "Reschedule anytime", s: "Up until 12 hours before" },
          { icon: <I.X size={16} />, t: "Free cancellation", s: "Up to 24 hours before" },
          { icon: <I.Shield size={16} />, t: "Secure payments", s: "Stripe · 256-bit TLS" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8, background: "var(--mm-paper-3)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--mm-ink-2)",
            }}>{r.icon}</span>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{r.t}</span>
              <span style={{ fontSize: 11.5, color: "var(--mm-ink-3)" }}>{r.s}</span>
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
}

// Step 1: choose service
function ChooseService({ selected, onSelect }) {
  return (
    <>
      <h2 style={{ fontSize: 24, marginBottom: 4 }}>Choose a service</h2>
      <p style={{ color: "var(--mm-ink-3)", fontSize: 14, marginBottom: 18 }}>What would you like to book?</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {SERVICES.map(s => {
          const active = s.id === selected;
          return (
            <button key={s.id} onClick={() => onSelect(s.id)} style={{
              textAlign: "left", padding: 16, borderRadius: 12,
              background: active ? "var(--mm-green-tint)" : "var(--mm-paper-2)",
              border: "1.5px solid " + (active ? "var(--mm-green)" : "var(--mm-line)"),
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: active ? "var(--mm-green)" : "var(--mm-paper-3)",
                  color: active ? "#f3efe7" : "var(--mm-ink-2)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}><s.icon size={16} /></span>
                <span style={{ fontSize: 16, fontWeight: 500, fontFamily: "var(--mm-display)" }}>{s.name}</span>
              </div>
              <p style={{ color: "var(--mm-ink-3)", fontSize: 13, lineHeight: 1.5 }}>{s.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                <span style={{ fontSize: 12.5, color: "var(--mm-ink-2)" }}>{s.duration}</span>
                <span style={{ fontFamily: "var(--mm-display)", fontSize: 16 }}>{s.price}</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

// Step 2: pick a date
function ChooseDate({ selected, onSelect }) {
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = i - 2; // start grid Sun before 1st
    return d >= 1 && d <= 31 ? d : null;
  });
  const goodDays = new Set([19, 20, 21, 22, 23, 27, 28]); // Smart-time recommended
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <h2 style={{ fontSize: 24 }}>Pick a date</h2>
          <p style={{ color: "var(--mm-ink-3)", fontSize: 13.5, marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
            <I.Sparkle size={12} /> Highlighted days are recommended for both of you
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="mm-btn mm-btn--quiet mm-btn--sm"><I.Chevron size={14} style={{ transform: "rotate(180deg)" }} /></button>
          <span style={{ fontFamily: "var(--mm-display)", fontSize: 18 }}>May 2026</span>
          <button className="mm-btn mm-btn--quiet mm-btn--sm"><I.Chevron size={14} /></button>
        </div>
      </div>

      {/* Day-of-week */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginBottom: 6 }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <span key={d} style={{ textAlign: "center", fontSize: 11.5, color: "var(--mm-ink-3)", padding: "4px 0", letterSpacing: "0.04em", textTransform: "uppercase" }}>{d}</span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
        {days.map((d, i) => {
          if (d === null) return <div key={i} />;
          const active = d === selected;
          const recommended = goodDays.has(d);
          const past = d < 18;
          return (
            <button key={i} disabled={past} onClick={() => onSelect(d)} style={{
              height: 48, borderRadius: 10,
              background: active ? "var(--mm-green)" : recommended ? "var(--mm-clay-soft)" : "transparent",
              color: active ? "#f3efe7" : past ? "var(--mm-ink-4)" : recommended ? "var(--mm-clay-2)" : "var(--mm-ink-2)",
              border: "1px solid " + (active ? "var(--mm-green)" : recommended ? "#ebcec0" : "transparent"),
              fontSize: 14, fontFamily: active ? "var(--mm-display)" : "inherit",
              fontWeight: active ? 400 : recommended ? 500 : 400,
              cursor: past ? "not-allowed" : "pointer",
              opacity: past ? 0.4 : 1,
              position: "relative",
            }}>
              {d}
              {recommended && !active && (
                <span style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "var(--mm-clay-2)" }} />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

// Step 3: pick a time
function ChooseTime({ selected, date, onSelect }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 24 }}>Pick a time</h2>
          <p style={{ color: "var(--mm-ink-3)", fontSize: 13.5, marginTop: 2 }}>Wednesday, May {date} · Times shown in your timezone</p>
        </div>
        <div className="mm-input" style={{ width: 200, height: 32, fontSize: 13 }}>
          <I.Globe size={13} /> Eastern Time (ET) <I.ChevronD size={13} style={{ marginLeft: "auto" }} />
        </div>
      </div>

      {/* Smart-time recommended */}
      <div style={{
        padding: "10px 14px", borderRadius: 10, marginBottom: 14,
        background: "var(--mm-clay-soft)", border: "1px solid #ebcec0",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <I.Sparkle size={14} style={{ color: "var(--mm-clay-2)" }} />
        <span style={{ fontSize: 13, color: "var(--mm-clay-2)" }}>
          <strong>9:00 AM</strong> looks great — Alexandra's morning peak window, and a clear hour after for you.
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Best slots</span>
          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            {TIMES_GOOD.map(t => (
              <TimeButton key={t} t={t} active={t === selected} good onClick={() => onSelect(t)} />
            ))}
          </div>
        </div>
        <div>
          <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Other available</span>
          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            {TIMES_OK.map(t => (
              <TimeButton key={t} t={t} active={t === selected} onClick={() => onSelect(t)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function TimeButton({ t, active, good, onClick }) {
  return (
    <button onClick={onClick} style={{
      height: 44, padding: "0 14px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderRadius: 10,
      background: active ? "var(--mm-green)" : good ? "var(--mm-paper)" : "var(--mm-paper-2)",
      color: active ? "#f3efe7" : "var(--mm-ink)",
      border: "1.5px solid " + (active ? "var(--mm-green)" : good ? "var(--mm-green-soft)" : "var(--mm-line)"),
      fontSize: 14, fontWeight: 500, cursor: "pointer",
    }}>
      <span>{t} AM</span>
      {good && !active && <span className="mm-pill mm-pill--green" style={{ height: 18, fontSize: 10.5 }}><I.Sparkle size={9} /> Recommended</span>}
      {active && <I.Check size={14} sw={2.5} />}
    </button>
  );
}

// Step 4: confirm details
function ConfirmDetails({ service, date, time }) {
  return (
    <>
      <h2 style={{ fontSize: 24, marginBottom: 4 }}>Just a few details</h2>
      <p style={{ color: "var(--mm-ink-3)", fontSize: 14, marginBottom: 18 }}>We'll send your confirmation here.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <Field label="Full name" value="Jordan Reeves" />
        <Field label="Email" value="jordan@studio.co" />
        <Field label="Phone (for SMS reminders)" value="+1 (415) 555-0142" />
        <Field label="Time zone" value="Eastern Time (ET)" />
      </div>

      <Field label="What would you like to focus on?" value="Building a sustainable morning routine and managing energy through a busy launch quarter." textarea />

      <div style={{ marginTop: 16, padding: 14, background: "var(--mm-paper-2)", borderRadius: 10, border: "1px solid var(--mm-line)" }}>
        <span style={{ fontSize: 12, color: "var(--mm-ink-3)", letterSpacing: "0.02em", textTransform: "uppercase", fontWeight: 500 }}>Reminder preferences</span>
        <div style={{ display: "flex", gap: 18, marginTop: 8 }}>
          <Check label="Email · 24h before" on />
          <Check label="SMS · 1h before" on />
          <Check label="Add to my Google Calendar" on />
        </div>
      </div>
    </>
  );
}

function Field({ label, value, textarea }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12.5, color: "var(--mm-ink-2)", fontWeight: 500 }}>{label}</span>
      {textarea ? (
        <textarea defaultValue={value} style={{
          minHeight: 78, padding: "10px 12px", borderRadius: 10,
          border: "1px solid var(--mm-line-2)", background: "var(--mm-paper)",
          fontFamily: "inherit", fontSize: 14, color: "var(--mm-ink)", resize: "none",
        }} />
      ) : (
        <input defaultValue={value} className="mm-input" />
      )}
    </label>
  );
}

function Check({ label, on }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
      <span style={{
        width: 16, height: 16, borderRadius: 4,
        background: on ? "var(--mm-green)" : "var(--mm-paper)",
        border: "1.5px solid " + (on ? "var(--mm-green)" : "var(--mm-line-2)"),
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "#fff",
      }}>{on && <I.Check size={10} sw={3} />}</span>
      {label}
    </span>
  );
}

// Right-side summary
function BookingSummary({ svc, date, time, step, onConfirm }) {
  return (
    <div className="mm-card" style={{ padding: 22, height: "fit-content", position: "sticky", top: 0 }}>
      <span style={{ fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--mm-ink-3)", fontWeight: 500 }}>Your booking</span>
      <h3 style={{ fontFamily: "var(--mm-display)", fontSize: 22, marginTop: 6 }}>{svc.name}</h3>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <SumRow icon={<I.Clock size={14} />} label="Duration" value={svc.duration} />
        <SumRow icon={<I.Calendar size={14} />} label="Date" value={"Wed, May " + date + " · 2026"} />
        <SumRow icon={<I.Sun size={14} />} label="Time" value={time + " AM ET"} />
        <SumRow icon={<I.Video size={14} />} label="Location" value="Zoom · auto-link sent" />
        <SumRow icon={<I.Card size={14} />} label="Payment" value={svc.price === "Free" ? "Free" : svc.price + " · Visa ···· 4242"} />
      </div>

      <hr className="mm-hr" style={{ margin: "16px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: "var(--mm-ink-3)" }}>Total today</span>
        <span style={{ fontFamily: "var(--mm-display)", fontSize: 26 }}>{svc.price === "Free" || svc.price === "Included" ? "$0.00" : svc.price + ".00"}</span>
      </div>

      <button onClick={onConfirm} className="mm-btn mm-btn--clay" style={{ width: "100%", height: 46, fontSize: 15 }}>
        {step < 3 ? "Continue" : "Confirm booking"}
      </button>

      <p style={{ marginTop: 10, fontSize: 11.5, color: "var(--mm-ink-3)", textAlign: "center", lineHeight: 1.5 }}>
        By confirming, you agree to free cancellation up to 24 hours before.
      </p>
    </div>
  );
}

function SumRow({ icon, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{
        width: 26, height: 26, borderRadius: 7, background: "var(--mm-paper-3)",
        display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--mm-ink-2)",
      }}>{icon}</span>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25, flex: 1 }}>
        <span style={{ fontSize: 11, color: "var(--mm-ink-3)", letterSpacing: "0.02em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{value}</span>
      </div>
    </div>
  );
}

Object.assign(window, { PublicBooking });

/* global React, Sidebar, Dashboard, BestTime, GroupFind, Availability, EventTypes, Reminders, Integrations, CalendarSync */
// MeetMe — Host app shell. Composes sidebar + active page.

const { useState: useStateApp } = React;

function HostApp({ initial = "dashboard", density = "comfortable" }) {
  const [page, setPage] = useStateApp(initial);
  return (
    <div className="mm-root" style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", background: "var(--mm-paper-2)" }}>
      <Sidebar active={page} onNav={setPage} density={density}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {page === "dashboard" && <Dashboard density={density}/>}
        {page === "best" && <BestTime/>}
        {page === "group" && <GroupFind/>}
        {page === "availability" && <Availability/>}
        {page === "events" && <EventTypes/>}
        {page === "reminders" && <Reminders/>}
        {page === "integrations" && <Integrations/>}
        {page === "sync" && <CalendarSync/>}
        {(page === "pages" || page === "team" || page === "payments" || page === "settings") && <Placeholder name={page}/>}
      </div>
    </div>
  );
}

function Placeholder({ name }) {
  const labels = {
    pages: "Booking Pages",
    team: "Team",
    payments: "Payments",
    settings: "Settings",
  };
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mm-ink-3)", fontSize: 14 }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--mm-display)", fontSize: 28, color: "var(--mm-ink)" }}>{labels[name]}</h2>
        <p style={{ marginTop: 8 }}>Open this section to see the full design.</p>
      </div>
    </div>
  );
}

Object.assign(window, { HostApp });

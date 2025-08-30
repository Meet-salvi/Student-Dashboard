import React, { useState } from "react";
import "../css/dashbord.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Student_List from "./Student_List";
import Summary from "./Summary";


export default function Dashboard() {
  const [activePage, setActivePage] = useState("Students");
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Dashboard</h2>
        </div>
        <nav className="nav mt-5">
          <button
            className={`nav-btn mb-2 logo-text ${
              activePage === "Students" ? "active" : ""
            }`}
            onClick={() => setActivePage("Students")}
          >
            Students
          </button>
          <button
            className={`nav-btn mb-2 logo-text ${
              activePage === "Summary" ? "active" : ""
            }`}
            onClick={() => setActivePage("Summary")}
          >
            Summary
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <div className="header d-flex justify-content-between align-items-center mb-3">
          <h2>{ activePage }</h2>
        </div>

        {
          activePage === 'Students' ? <Student_List/>
            : activePage === 'Summary' ? <Summary/> : null
        }

      </main>
    </div>
  );
}

import "./Navbar.css";

import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar({ title }) {
  const handleNotification = () => {
    window.alert("You are all caught up!");
  };

  return (
    <header className="topbar">
      {/* Mobile Brand */}
      <div className="mobile-brand">
        🍽 Resto<span>Pro</span>
      </div>

      {/* Page Title */}
      <div className="page-title">
        <span className="eyebrow">
          RESTAURANT MANAGEMENT / {title.toUpperCase()}
        </span>

        <h1>{title}</h1>
      </div>

      {/* Navbar Actions */}
      <div className="topbar-actions">
        <label className="global-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search anything..."
            aria-label="Search anything"
          />
        </label>

        <button
          className="icon-button notification"
          aria-label="Notifications"
          onClick={handleNotification}
        >
          <Bell size={19} />
          <i />
        </button>

        {/* User Profile */}
        <div className="top-user">
          <div className="avatar small">N</div>

          <div>
            <strong>Nensi</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}

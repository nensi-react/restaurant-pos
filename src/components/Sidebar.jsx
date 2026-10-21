import "./Sidebar.css";

import {
  LayoutDashboard,
  ShoppingBasket,
  ClipboardList,
  Armchair,
  UtensilsCrossed,
  CircleHelp,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    id: "dashboard",
    label: "Dashboard",
    Icon: LayoutDashboard,
  },
  {
    id: "pos",
    label: "POS Terminal",
    Icon: ShoppingBasket,
  },
  {
    id: "orders",
    label: "Orders",
    Icon: ClipboardList,
  },
  {
    id: "tables",
    label: "Tables",
    Icon: Armchair,
  },
  {
    id: "menu",
    label: "Menu Management",
    Icon: UtensilsCrossed,
  },
];

export default function Sidebar({ activePage, onNavigate }) {
  const handleExplore = () => {
    window.alert(
      "Welcome to RestoPro! Use the sidebar to explore your workspace."
    );
  };

  return (
    <aside className="sidebar">
      {/* Restaurant Brand */}
      <div className="brand">
        <div className="brand-icon">
          <UtensilsCrossed size={22} />
        </div>

        <div>
          <h2>
            Resto<span>Pro</span>
          </h2>
          <p>RESTAURANT SUITE</p>
        </div>
      </div>

      {/* Navigation */}
      <p className="sidebar-label">WORKSPACE</p>

      <nav className="sidebar-nav">
        {navigation.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`nav-item ${
              activePage === id ? "active" : ""
            }`}
            onClick={() => onNavigate(id)}
            aria-current={activePage === id ? "page" : undefined}
          >
            <Icon size={19} />

            <span>{label}</span>

            {activePage === id && (
              <span className="nav-dot" />
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      {/* Help Card */}
      <div className="help-card">
        <div className="help-icon">
          <CircleHelp size={19} />
        </div>

        <h3>Need a hand?</h3>

        <p>
          Everything you need to run a smoother restaurant.
        </p>

        <button onClick={handleExplore}>
          Explore workspace
          <ChevronRight size={15} />
        </button>
      </div>

      {/* User Profile */}
      <div className="profile">
        <div className="avatar">N</div>

        <div className="profile-text">
          <strong>Nensi</strong>
          <span>Restaurant Manager</span>
        </div>

        <span className="online-dot" />
      </div>
    </aside>
  );
}

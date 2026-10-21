import "./Dashboard.css";

import {
  IndianRupee,
  ShoppingBag,
  Armchair,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Plus,
  UtensilsCrossed,
} from "lucide-react";

import StatCard from "../components/StatCard";
import { formatCurrency } from "../utils/formatCurrency";

export default function Dashboard({ orders, menu, onNavigate }) {
  // Calculate dashboard statistics
  const revenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const occupied = new Set(
    orders.map((order) => order.table)
  ).size;

  const stats = [
    {
      icon: IndianRupee,
      label: "Today's revenue",
      value: formatCurrency(revenue),
      trend: orders.length ? "Live" : "0%",
      color: "orange",
    },
    {
      icon: ShoppingBag,
      label: "Total orders",
      value: String(orders.length).padStart(2, "0"),
      trend: orders.length ? "Live" : "0%",
      color: "purple",
    },
    {
      icon: Armchair,
      label: "Tables occupied",
      value: `${occupied} / 12`,
      trend: "Live",
      color: "green",
    },
    {
      icon: TrendingUp,
      label: "Menu items",
      value: menu.length,
      trend: "Active",
      color: "blue",
    },
  ];

  return (
    <div className="page-content">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="welcome-kicker">
            YOUR RESTAURANT AT A GLANCE
          </span>

          <h2>
            Good service starts here, Nensi <span>✦</span>
          </h2>

          <p>
            Manage your restaurant operations from one
            beautiful workspace.
          </p>

          <button onClick={() => onNavigate("pos")}>
            Start a new order
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="banner-illustration">
          <div className="plate">🍽️</div>
          <span className="floating-food f1">🍕</span>
          <span className="floating-food f2">🥗</span>
          <span className="floating-food f3">🥤</span>
        </div>

        <div className="banner-orb orb-one" />
        <div className="banner-orb orb-two" />
      </section>

      {/* Business Overview */}
      <div className="section-title-row">
        <div>
          <span className="eyebrow">LIVE OVERVIEW</span>
          <h2>Business overview</h2>
          <p>
            Here's how your restaurant is performing this session.
          </p>
        </div>

        <span className="today-badge">● Live data</span>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-grid">
        {/* Recent Orders */}
        <section className="surface recent-orders">
          <div className="section-heading">
            <div>
              <h2>Recent orders</h2>
              <p>Your latest customer orders.</p>
            </div>

            <button
              className="link-button"
              onClick={() => onNavigate("orders")}
            >
              View all
              <ArrowRight size={15} />
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="dashboard-empty">
              <div className="empty-illustration">🧾</div>

              <h3>No orders yet</h3>

              <p>
                Your new orders will appear here once
                you start selling.
              </p>

              <button
                className="primary-button"
                onClick={() => onNavigate("pos")}
              >
                <Plus size={16} />
                Create first order
              </button>
            </div>
          ) : (
            <div className="recent-table">
              <div className="table-header">
                <span>ORDER</span>
                <span>TABLE</span>
                <span>ITEMS</span>
                <span>TOTAL</span>
                <span>STATUS</span>
              </div>

              {orders.slice(0, 5).map((order) => (
                <div className="recent-row" key={order.id}>
                  <strong>
                    #{String(order.id).slice(-6)}
                  </strong>

                  <span>{order.table}</span>

                  <span>
                    {order.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}{" "}
                    items
                  </span>

                  <strong>
                    {formatCurrency(order.total)}
                  </strong>

                  <span className="status-chip">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="surface quick-panel">
          <div className="section-heading">
            <div>
              <h2>Quick actions</h2>
              <p>Shortcuts for your daily tasks.</p>
            </div>
          </div>

          <button
            className="action-tile"
            onClick={() => onNavigate("pos")}
          >
            <span className="action-icon orange">
              <ShoppingBag size={20} />
            </span>

            <span>
              <strong>New order</strong>
              <small>Start billing a customer</small>
            </span>

            <ArrowUpRight size={17} />
          </button>

          <button
            className="action-tile"
            onClick={() => onNavigate("tables")}
          >
            <span className="action-icon green">
              <Armchair size={20} />
            </span>

            <span>
              <strong>Manage tables</strong>
              <small>Check table availability</small>
            </span>

            <ArrowUpRight size={17} />
          </button>

          <button
            className="action-tile"
            onClick={() => onNavigate("menu")}
          >
            <span className="action-icon purple">
              <UtensilsCrossed size={20} />
            </span>

            <span>
              <strong>Update menu</strong>
              <small>Edit food and pricing</small>
            </span>

            <ArrowUpRight size={17} />
          </button>

          <div className="tip-card">
            <span>✦ Pro tip</span>
            <p>
              Keep your menu updated to help your team
              take orders faster.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

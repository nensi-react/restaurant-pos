import "./Tables.css";

import { Armchair, ArrowRight } from "lucide-react";
import { restaurantTables } from "../data/menuData";

export default function Tables({ orders, onNavigate }) {
  // Identify tables that have orders
  const occupied = new Set(
    orders.map((order) => order.table)
  );

  const availableCount = restaurantTables.filter(
    (table) => !occupied.has(table.name)
  ).length;

  return (
    <div className="page-content">
      {/* Page Heading */}
      <div className="page-intro">
        <div>
          <span className="eyebrow">FLOOR MANAGEMENT</span>
          <h2>Table management</h2>
          <p>
            Track seating and open the POS for any table.
          </p>
        </div>

        <span className="today-badge">
          {availableCount} available
        </span>
      </div>

      {/* Table Status Legend */}
      <div className="table-legend">
        <span>
          <i className="legend-dot available-dot" />
          Available
        </span>

        <span>
          <i className="legend-dot occupied-dot" />
          Occupied
        </span>
      </div>

      {/* Restaurant Table Cards */}
      <div className="restaurant-table-grid">
        {restaurantTables.map((table) => {
          const busy = occupied.has(table.name);

          return (
            <article
              className={`restaurant-table-card ${
                busy ? "occupied" : ""
              }`}
              key={table.id}
            >
              <div className="table-card-top">
                <span
                  className={`table-symbol ${
                    busy ? "busy" : ""
                  }`}
                >
                  <Armchair size={24} />
                </span>

                <span
                  className={`table-state ${
                    busy ? "busy" : ""
                  }`}
                >
                  {busy ? "Occupied" : "Available"}
                </span>
              </div>

              <h3>{table.name}</h3>

              <p>
                {table.seats} seats ·{" "}
                {busy ? "Active order" : "Ready for guests"}
              </p>

              <button
                onClick={() => onNavigate("pos", table.name)}
              >
                {busy ? "Open order" : "Seat guests"}

                <ArrowRight size={15} />
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

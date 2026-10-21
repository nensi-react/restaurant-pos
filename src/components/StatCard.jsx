import "./StatCard.css";

import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color = "orange",
  note,
}) {
  return (
    <article className="stat-card">
      {/* Statistic Icon */}
      <div className={`stat-icon ${color}`}>
        <Icon size={21} />
      </div>

      {/* Statistic Details */}
      <div className="stat-copy">
        <p>{label}</p>

        <h3>{value}</h3>

        {/* Trend Information */}
        <div className="stat-foot">
          <span className="trend">
            <ArrowUpRight size={13} />
            {trend || "8.2%"}
          </span>

          <span>{note || "vs last week"}</span>
        </div>
      </div>
    </article>
  );
}

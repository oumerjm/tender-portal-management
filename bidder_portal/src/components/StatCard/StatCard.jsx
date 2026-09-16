import React from "react";
import "./StatCard.css";


export default function StatCard({ title, value, subtext, icon, iconBg = "#E6F4EA" }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {icon && (
          <div className="stat-card-icon" aria-hidden =  "true" style={{ backgroundColor: iconBg }}>
            {icon}
          </div>
        )}
      </div>

      <div className="stat-card-value">{value}</div>
      <p className="stat-card-subtext">{subtext}</p>
    </div>
  );
}
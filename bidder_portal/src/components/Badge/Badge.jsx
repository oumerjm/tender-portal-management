import React from "react";
import "./Badge.css";

export default function Badge({ variant = "default", children }) {
  const normalizedVariant = variant.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={`badge badge--${normalizedVariant}`}>
      {children}
    </span>
  );
}
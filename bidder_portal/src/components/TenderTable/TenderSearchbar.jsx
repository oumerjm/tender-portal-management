import React from "react";

export default function TenderSearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="tender-search-wrapper">
      <svg
        className="search-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <label htmlFor="tender-search" className="sr-only">
        Search active tenders
      </label>
      <input
        id="tender-search"
        type="text"
        className="tender-search-input"
        placeholder="Search Active Tenders (e.g. HB-2026-001, IT Procurement)..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import TenderSearchBar from "./TenderSearchbar";
import TenderTableRow from "./TenderTableRow";
import "./TenderTable.css";

export default function TenderTable({
  tenders = [],
  onSeeMore,
  actionLink,
  title = "Tenders",
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTenders = tenders.filter(
    (tender) =>
      tender.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="tender-table-card">
      <div className="tender-table-header">
        <h2 className="tender-table-title">{title}</h2>
        {actionLink && (
          <Link to={actionLink.to} className="tender-table-action">
            {actionLink.label}
          </Link>
        )}
      </div>

      {/* Search Input Bar */}
      <TenderSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Data Table */}
      <div className="table-responsive">
        <table className="tender-table">
          <thead>
            <tr>
              <th>TENDER ID</th>
              <th>TITLE</th>
              <th>CATEGORY</th>
              <th>BOND AMOUNT</th>
              <th>NON-REFUNDABLE FEE</th>
              <th>START DATE</th>
              <th>CLOSING DATE</th>
              <th className="sr-only">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenders.length > 0 ? (
              filteredTenders.map((tender) => (
                <TenderTableRow
                  key={tender.id}
                  tender={tender}
                  onSeeMore={onSeeMore}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-state">
                  No active tenders match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import TenderSearchBar from "./TenderSearchbar";
import TenderTableRow from "./TenderTableRow";
import "./TenderTable.css";                                                                                                                                                                                                                                        

export default function TenderTable({ tenders = [], onSeeMore }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTenders = tenders.filter(
    (tender) =>
      tender.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="tender-table-card">
      <h2 className="tender-table-title">Active Tenders</h2>

      {/* Search Input Bar */}
      <TenderSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      /> 

      {/* Data Table */}
      <div className="table-responsive">
        <table className="tender-table">
          <thead>
            <tr>
              <th>TENDER ID</th>
              <th>TITLE</th>
              <th>TENDER TYPE</th>
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

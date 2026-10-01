import React from "react";
import Badge from "../Badge/Badge";
import {
  TENDER_CATEGORY_DISPLAY,
  formatCurrency,
  formatDate,
} from "../../utils/tenderDisplay";

export default function TenderTableRow({ tender, onSeeMore }) {
  const { variant, label } = TENDER_CATEGORY_DISPLAY[tender.tenderCategory];

  return (
    <tr className="tender-row">
      <td className="cell-id">{tender.referenceCode}</td>
      <td className="cell-title" title={tender.title}>
        {tender.title}
      </td>
      <td>
        <Badge variant={variant}>{label}</Badge>
      </td>
      <td className="cell-amount">{formatCurrency(tender.bidBondAmount)}</td>
      <td className="cell-amount">{formatCurrency(tender.nonRefundableFee)}</td>
      <td className="cell-date">{formatDate(tender.advertisementDate)}</td>
      <td className="cell-date">{formatDate(tender.closingDate)}</td>
      <td className="cell-action">
        <button
          type="button"
          className="btn-see-more"
          onClick={() => onSeeMore(tender)}
        >
          See More
        </button>
      </td>
    </tr>
  );
}

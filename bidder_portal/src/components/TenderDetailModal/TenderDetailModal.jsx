import { useNavigate } from "react-router-dom";
import Badge from "../Badge/Badge";
import {
  TENDER_TYPE_DISPLAY,
  formatCurrency,
  formatDate,
} from "../../utils/tenderDisplay";
import "./TenderDetailModal.css";

export default function TenderDetailModal({ tender, onClose }) {
  const navigate = useNavigate();
  const { variant, label } = TENDER_TYPE_DISPLAY[tender.tenderType];

  function handleDownloadInvitation() {
    // TODO: wire to GET /tenders/{id}/invitation once backend exists - this endpoint is intentionally public/unauthenticated
  }

  function handleApply() {
    // This route should require authentication once real routing/auth guards are added.
    navigate(`/tenders/${tender.id}/apply`);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>

        <p className="modal-eyebrow">TENDER ID</p>
        <h2 className="modal-title">
          {tender.referenceCode} - {tender.title}
        </h2>

        <div className="modal-badges">
          <Badge variant={variant}>{label}</Badge>
          <Badge>Category: {tender.tenderCategory}</Badge>
        </div>

        <p className="modal-description">{tender.description}</p>

        <div className="modal-details-grid">
          <div className="modal-detail-item">
            <span className="modal-detail-label">BOND AMOUNT</span>
            <strong>{formatCurrency(tender.bidBondAmount)}</strong>
          </div>
          <div className="modal-detail-item">
            <span className="modal-detail-label">NON-REFUNDABLE FEE</span>
            <strong>{formatCurrency(tender.nonRefundableFee)}</strong>
          </div>
          <div className="modal-detail-item">
            <span className="modal-detail-label">START DATE</span>
            <strong>{formatDate(tender.advertisementDate)}</strong>
          </div>
          <div className="modal-detail-item">
            <span className="modal-detail-label">CLOSING DATE</span>
            <strong>{formatDate(tender.closingDate)}</strong>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="modal-button modal-button-secondary"
            onClick={handleDownloadInvitation}
          >
            Download Invitation
          </button>
          <button
            type="button"
            className="modal-button modal-button-primary"
            onClick={handleApply}
          >
            Apply / Purchase Bid Document
          </button>
        </div>
        <p className="modal-helper-text">
          By clicking Apply, you will be redirected to the bid document purchase
          and submission workflow.
        </p>
      </div>
    </div>
  );
}

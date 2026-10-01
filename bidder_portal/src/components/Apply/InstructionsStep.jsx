import { Download } from "lucide-react";

export function isInstructionsStepValid() {
  return true;
}

export default function InstructionsStep({ tender, receiptNumber }) {
  function handleDownloadInstructions() {
    window.alert("Bid Instruction Downloaded .");
  }

  return (
    <section className="apply-step">
      <div className="apply-step-heading">
        <Download size={20} />
        <div>
          <h2>Bid instructions</h2>
          <p>
            Review the tender instructions before preparing your submission.
          </p>
        </div>
      </div>
      <div className="apply-record">
        <span>Payment receipt</span>
        <strong>{receiptNumber}</strong>
      </div>
      <p className="apply-copy">
        The downloaded instructions describe the required technical and
        financial documents for {tender.referenceCode}.
      </p>
      <button
        type="button"
        className="apply-button apply-button-secondary"
        onClick={handleDownloadInstructions}
      >
        Download Instructions
      </button>
    </section>
  );
}

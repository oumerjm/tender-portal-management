import { useState } from "react";
import { CheckCircle2, CreditCard } from "lucide-react";
import { formatCurrency } from "../../utils/tenderDisplay";

export function isPaymentStepValid(applicationData) {
  return applicationData.paymentStatus === "paid";
}

export default function PaymentStep({
  tender,
  paymentStatus,
  receiptNumber,
  onUpdate,
}) {
  const isPaid = paymentStatus === "paid";
  const [isProcessing, setIsProcessing] = useState(false);

  async function handlePayment() {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    onUpdate({ paymentStatus: "paid", receiptNumber: `RCT-${Date.now()}` });
  }

  return (
    <section className="apply-step">
      <div className="apply-step-heading">
        <CreditCard size={20} />
        <div>
          <h2>Pay the tender fee</h2>
          <p>Complete payment to access the bid document instructions.</p>
        </div>
      </div>
      <div className="payment-summary">
        <span>Non-refundable fee</span>
        <strong>{formatCurrency(tender.nonRefundableFee)}</strong>
      </div>
      {isPaid ? (
        <div className="apply-success-message">
          <CheckCircle2 size={20} />
          <div>
            <strong>Payment confirmed</strong>
            <span>
              Receipt number: {receiptNumber}. Continue is now available.
            </span>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="apply-button apply-button-primary"
          disabled={isProcessing || paymentStatus === "paid"}
          onClick={handlePayment}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      )}
    </section>
  );
}

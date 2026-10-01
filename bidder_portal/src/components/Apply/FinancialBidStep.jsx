import { useState } from "react";
import { Info } from "lucide-react";
import {
  FINANCIAL_DOCUMENT_TYPES,
  validateFile,
} from "../../utils/documentRequirements";
export function isFinancialBidStepValid(data) {
  return (
    Number(data.bidAmount) > 0 &&
    FINANCIAL_DOCUMENT_TYPES.filter((doc) => doc.required).every(
      (doc) => data.financialFiles?.[doc.key] != null,
    )
  );
}
export default function FinancialBidStep({
  bidAmount,
  financialFiles,
  onUpdate,
}) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  function select(doc, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = validateFile(file);
    if (!result.valid) {
      setErrors((x) => ({ ...x, [doc.key]: result.error }));
      return;
    }
    setErrors((x) => ({ ...x, [doc.key]: null }));
    onUpdate({ financialFiles: { ...financialFiles, [doc.key]: file } });
  }
  return (
    <section className="apply-step">
      <div className="apply-info-box">
        <Info size={19} />
        <span>
          Your financial bid stays sealed and confidential until your technical
          submission has passed evaluation.
        </span>
      </div>
      <label className="apply-field-label" htmlFor="bid-amount">
        Bid amount (ETB)
      </label>
      <input
        id="bid-amount"
        className="apply-input"
        type="number"
        min="0.01"
        step="0.01"
        value={bidAmount}
        onBlur={() => setTouched(true)}
        onChange={(e) => onUpdate({ bidAmount: e.target.value })}
      />
      {touched && Number(bidAmount) <= 0 && (
        <p className="document-error">
          Enter a valid bid amount greater than 0
        </p>
      )}
      <div className="document-slots">
        {FINANCIAL_DOCUMENT_TYPES.map((doc) => (
          <div className="document-slot" key={doc.key}>
            <strong>
              {doc.label}
              {doc.required && <em> *</em>}
            </strong>
            {financialFiles?.[doc.key] ? (
              <div className="document-file">
                <span>{financialFiles[doc.key].name}</span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdate({
                      financialFiles: { ...financialFiles, [doc.key]: null },
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <label htmlFor={`financial-${doc.key}`} className="sr-only">
                  Upload {doc.label}
                </label>
                <input
                  id={`financial-${doc.key}`}
                  type="file"
                  onChange={(e) => select(doc, e)}
                />
              </>
            )}
            {errors[doc.key] && (
              <p className="document-error">{errors[doc.key]}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

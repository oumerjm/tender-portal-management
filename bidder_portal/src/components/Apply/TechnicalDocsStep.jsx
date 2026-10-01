import { useState } from "react";
import {
  TECHNICAL_DOCUMENT_TYPES,
  validateFile,
} from "../../utils/documentRequirements";
export function isTechnicalDocsStepValid(data) {
  return TECHNICAL_DOCUMENT_TYPES.filter((doc) => doc.required).every(
    (doc) => data.technicalFiles?.[doc.key] != null,
  );
}
export default function TechnicalDocsStep({ technicalFiles, onUpdate }) {
  const [errors, setErrors] = useState({});
  function select(doc, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = validateFile(file);
    if (!result.valid) {
      setErrors((x) => ({ ...x, [doc.key]: result.error }));
      return;
    }
    setErrors((x) => ({ ...x, [doc.key]: null }));
    onUpdate({ technicalFiles: { ...technicalFiles, [doc.key]: file } });
  }
  return (
    <section className="apply-step">
      <p className="apply-upload-note">
        Uploaded files are not permanently saved until you submit your
        application. Avoid refreshing this page mid-upload.
      </p>
      <div className="apply-step-heading">
        <div>
          <h2>Technical documents</h2>
          <p>Upload all required technical documents.</p>
        </div>
      </div>
      <div className="document-slots">
        {TECHNICAL_DOCUMENT_TYPES.map((doc) => (
          <div className="document-slot" key={doc.key}>
            <strong>
              {doc.label}
              {doc.required && <em> *</em>}
            </strong>
            {technicalFiles?.[doc.key] ? (
              <div className="document-file">
                <span>{technicalFiles[doc.key].name}</span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdate({
                      technicalFiles: { ...technicalFiles, [doc.key]: null },
                    })
                  }
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <label htmlFor={`technical-${doc.key}`} className="sr-only">
                  Upload {doc.label}
                </label>
                <input
                  id={`technical-${doc.key}`}
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

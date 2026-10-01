export const TECHNICAL_DOCUMENT_TYPES = [
  {
    key: "companyRegistration",
    label: "Company Registration Certificate",
    required: true,
  },
  { key: "taxClearance", label: "Tax Clearance Certificate", required: true },
  { key: "tradeLicense", label: "Trade License", required: true },
  { key: "technicalProposal", label: "Technical Proposal", required: true },
  {
    key: "equipmentList",
    label: "Equipment / Personnel List",
    required: false,
  },
];
export const FINANCIAL_DOCUMENT_TYPES = [
  { key: "bidBondGuarantee", label: "Bid Bond Guarantee", required: true },
  {
    key: "auditedFinancials",
    label: "Audited Financial Statements",
    required: true,
  },
  { key: "bankSolvencyLetter", label: "Bank Solvency Letter", required: false },
];
export const ALLOWED_FILE_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".jpg",
  ".jpeg",
  ".png",
];
export const MAX_FILE_SIZE_MB = 10;
export function validateFile(file) {
  const extension = `.${file.name.split(".").pop().toLowerCase()}`;
  if (!ALLOWED_FILE_EXTENSIONS.includes(extension))
    return {
      valid: false,
      error: `File type ${extension} is not allowed. Accepted: ${ALLOWED_FILE_EXTENSIONS.join(", ")}`,
    };
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024)
    return { valid: false, error: `File exceeds ${MAX_FILE_SIZE_MB}MB limit.` };
  return { valid: true, error: null };
}

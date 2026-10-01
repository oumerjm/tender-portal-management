export const TENDER_TYPE_DISPLAY = {
  OPEN: { variant: "open", label: "Open" },
  SELECTIVE_RESTRICTED: { variant: "invitation", label: "By Invitation" },
  NEGOTIATED: { variant: "negotiated", label: "Negotiated" },
};

export const TENDER_CATEGORY_DISPLAY = {
  GOODS: { variant: "goods", label: "Goods" },
  SERVICES: { variant: "services", label: "Services" },
  WORKS: { variant: "works", label: "Works" },
};

export function formatCurrency(amount) {
  return `ETB ${amount.toLocaleString()}`;
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

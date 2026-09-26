export const MOCK_OPEN_TENDERS = [
  {
    id: 101,
    referenceCode: "HB-2026-001",
    title: "Supply and Delivery of Office Computing Equipment",
    tenderType: "OPEN",
    tenderCategory: "GOODS",
    status: "OPEN",
    requestingDepartment: "Information Technology Department",
    advertisementDate: "2026-08-10T09:00:00",
    closingDate: "2026-09-15T17:00:00",
    nonRefundableFee: 500,
    bidBondAmount: 50000,
    description:
      "Hijra Bank is procuring desktop computers, laptops, printers, and related accessories for its offices. The selected supplier will deliver, install, and commission the equipment at designated bank locations.",
  },
  {
    id: 102,
    referenceCode: "HB-2026-002",
    title: "Renovation of Main Branch Customer Service Hall",
    tenderType: "SELECTIVE_RESTRICTED",
    invitedBidderEmails: ["bidder@example.com"],
    tenderCategory: "WORKS",
    status: "OPEN",
    requestingDepartment: "Facilities and Administration Department",
    advertisementDate: "2026-08-17T09:00:00",
    closingDate: "2026-09-22T17:00:00",
    nonRefundableFee: 500,
    bidBondAmount: 150000,
    description:
      "Hijra Bank seeks a qualified contractor to renovate the customer service hall at its main branch. The work includes interior finishes, service counters, electrical upgrades, and accessibility improvements.",
  },
  {
    id: 103,
    referenceCode: "HB-2026-003",
    title: "Managed Security Monitoring Services Contract",
    tenderType: "NEGOTIATED",
    tenderCategory: "SERVICES",
    status: "OPEN",
    requestingDepartment: "Risk and Compliance Department",
    advertisementDate: "2026-08-24T09:00:00",
    closingDate: "2026-09-30T17:00:00",
    nonRefundableFee: 350,
    bidBondAmount: 100000,
    description:
      "Hijra Bank requires a managed security monitoring service to support continuous oversight of its technology environment. The provider will monitor security events, escalate incidents, and provide regular risk reports.",
  },
];

export const MOCK_MY_BIDS = [
  { id: 201, tenderId: 101, tenderReferenceCode: "HB-2026-001", tenderTitle: "Supply and Delivery of Office Computing Equipment", status: "IN_PROGRESS", appliedDate: "2026-08-12T10:00:00", currentStep: 3, maxStepReached: 3 },
  { id: 202, tenderId: 102, tenderReferenceCode: "HB-2026-002", tenderTitle: "Renovation of Main Branch Customer Service Hall", status: "SUBMITTED", appliedDate: "2026-08-20T14:30:00", currentStep: null, maxStepReached: null },
  { id: 203, tenderId: 103, tenderReferenceCode: "HB-2026-003", tenderTitle: "Managed Security Monitoring Services Contract", status: "UNDER_EVALUATION", appliedDate: "2026-08-25T09:15:00", currentStep: null, maxStepReached: null },
  { id: 204, tenderId: 101, tenderReferenceCode: "HB-2026-001", tenderTitle: "Supply and Delivery of Office Computing Equipment", status: "AWARDED", appliedDate: "2026-07-29T11:00:00", currentStep: null, maxStepReached: null },
  { id: 205, tenderId: 102, tenderReferenceCode: "HB-2026-002", tenderTitle: "Renovation of Main Branch Customer Service Hall", status: "REJECTED", appliedDate: "2026-07-18T16:20:00", currentStep: null, maxStepReached: null },
  { id: 206, tenderId: 103, tenderReferenceCode: "HB-2026-003", tenderTitle: "Managed Security Monitoring Services Contract", status: "WITHDRAWN", appliedDate: "2026-07-11T13:45:00", currentStep: null, maxStepReached: null },
];

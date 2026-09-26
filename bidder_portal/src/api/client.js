import { MOCK_MY_BIDS, MOCK_OPEN_TENDERS } from "./mockData";

const USE_MOCK = true;
const API_BASE_URL = "http://localhost:8080/api/v1";

function delay(value, ms = 400) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = await response.json();

  if (!response.ok || !body.success) {
    throw new Error(body.message);
  }

  return body.data;
}

export const api = {
  async login(email, password) {
    if (USE_MOCK) {
      return delay({
        token: "mock-token",
        email,
        role: "BIDDER",
        fullName: "Mock Bidder Co.",
      });
    }

    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email, password, fullName, companyName) {
    if (USE_MOCK) {
      return delay({ token: "mock-token", email, role: "BIDDER", fullName });
    }

    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName, companyName }),
    });
  },

  async getOpenTenders() {
    if (USE_MOCK) {
      return delay(MOCK_OPEN_TENDERS);
    }

    return request("/tenders/open");
  },

  async getTenderById(id) {
    if (USE_MOCK) {
      const tender = MOCK_OPEN_TENDERS.find((item) => item.id === Number(id));
      return delay(tender);
    }

    return request(`/tenders/${id}`);
  },

  async getMyBids() {
    if (USE_MOCK) return delay(MOCK_MY_BIDS);
    return request("/bidders/me/applications");
  },

  async getApplicationForTender(tenderId) {
    if (USE_MOCK) return delay(MOCK_MY_BIDS.find((item) => item.tenderId === Number(tenderId)) || null);
    return request(`/bidders/me/applications/tender/${tenderId}`);
  },

  async withdrawApplication(tenderId) {
    if (USE_MOCK) {
      const application = MOCK_MY_BIDS.find((item) => item.tenderId === Number(tenderId));
      if (application) application.status = "WITHDRAWN";
      return delay(application || null);
    }
    return request(`/bidders/me/applications/tender/${tenderId}/withdraw`, { method: "POST" });
  },

  async submitApplication(tenderId, applicationSummary) {
    // NOTE: MOCK_MY_BIDS is in-memory only and resets on every page reload - this mock does not provide real cross-session persistence. Real persistence requires the backend.
    if (USE_MOCK) { let entry = MOCK_MY_BIDS.find((item) => item.tenderId === Number(tenderId) && item.status === "IN_PROGRESS"); if (!entry) { entry = { id: Date.now(), tenderId: Number(tenderId), status: "SUBMITTED" }; MOCK_MY_BIDS.push(entry); } entry.status = "SUBMITTED"; entry.appliedDate = new Date().toISOString(); return delay(entry); }
    return request(`/bidders/me/applications/tender/${tenderId}/submit`, { method: "POST", body: JSON.stringify(applicationSummary) });
  },

  async updateApplicationProgress(tenderId, { currentStep, maxStepReached }) {
    // NOTE: MOCK_MY_BIDS is in-memory only and resets on every page reload - this mock does not provide real cross-session persistence. Real persistence requires the backend.
    if (USE_MOCK) { let entry = MOCK_MY_BIDS.find((item) => item.tenderId === Number(tenderId) && item.status === "IN_PROGRESS"); if (!entry) { entry = { id: Date.now(), tenderId: Number(tenderId), status: "IN_PROGRESS", appliedDate: new Date().toISOString() }; MOCK_MY_BIDS.push(entry); } entry.currentStep = currentStep; entry.maxStepReached = maxStepReached; return delay(entry); }
    return request(`/bidders/me/applications/tender/${tenderId}/progress`, { method: "PATCH", body: JSON.stringify({ currentStep, maxStepReached }) });
  },
};

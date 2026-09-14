import { MOCK_OPEN_TENDERS } from "./mockData";

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
};

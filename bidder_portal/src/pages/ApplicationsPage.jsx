import { useEffect, useState } from "react";
import { api } from "../api/client";
import ApplicationsTable from "../components/Applications/ApplicationsTable";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      try {
        setApplications(await api.getMyBids());
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  if (loading)
    return <p className="applications-loading">Loading applications...</p>;

  return (
    <section className="applications-page">
      <header>
        <span>PROCUREMENT PORTAL</span>
        <h1>My Applications</h1>
      </header>
      <ApplicationsTable applications={applications} />
    </section>
  );
}

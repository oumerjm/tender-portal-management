import { useEffect, useState } from "react";
import { api } from "../api/client";
import TenderTable from "../components/TenderTable/TenderTable";

export default function TenderListPage() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTenders() {
      try {
        setTenders(await api.getOpenTenders());
      } finally {
        setLoading(false);
      }
    }
    loadTenders();
  }, []);

  if (loading) return <p className="dashboard-loading">Loading tenders...</p>;
  return <TenderTable tenders={tenders} onSeeMore={() => {}} />;
}

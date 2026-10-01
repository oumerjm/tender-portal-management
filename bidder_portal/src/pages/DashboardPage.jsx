import { useState, useEffect } from "react";
import { api } from "../api/client";
import TenderTable from "../components/TenderTable/TenderTable";
import TenderDetailModal from "../components/TenderDetailModal/TenderDetailModal";
import StatCard from "../components/StatCard/StatCard";
import "./DashboardPage.css";
import { ShieldCheck, AlarmClockPlus, LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTender, setSelectedTender] = useState(null);

  useEffect(() => {
    async function loadTenders() {
      const result = await api.getOpenTenders();
      setTenders(result);
      setLoading(false);
    }
    loadTenders();
  }, []);

  function handleSeeMore(tender) {
    setSelectedTender(tender);
  }

  function handleCloseModal() {
    setSelectedTender(null);
  }

  if (loading) {
    return <p className="dashboard-loading">Loading tenders...</p>;
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-stats">
        <StatCard title="Active Tenders" value={tenders.length} subtext="Currently accepting bid applications" icon={<ShieldCheck />} iconBg="#eef2ff" />
        <StatCard title="Closing Soon" value={5} subtext="Expiring within the next 7 working days" icon={<AlarmClockPlus />} iconBg="#fff0c7" />
        <StatCard title="My Active Bids" value={3} subtext="Tenders you have submitted bids to" icon={<LayoutDashboard />} iconBg="#e7ecff" />
      </div>
      <div className="dashboard-tenders-preview"><TenderTable tenders={tenders.slice(0, 5)} onSeeMore={handleSeeMore} actionLink={{ to: "/tenders", label: "View All Tenders \u2192" }} /></div>
      {selectedTender && (
        <TenderDetailModal tender={selectedTender} onClose={handleCloseModal} />
      )}
    </section>
  );
}

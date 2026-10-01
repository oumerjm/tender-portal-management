import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function PortalLayout() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  return (
    <div className="portal-shell">
      <Sidebar isOpen={isNavigationOpen} onNavigate={() => setIsNavigationOpen(false)} />
      {isNavigationOpen && <button type="button" className="navigation-scrim" aria-label="Close navigation" onClick={() => setIsNavigationOpen(false)} />}
      <div className="portal-workspace">
        <Navbar onOpenNavigation={() => setIsNavigationOpen(true)} />
        <main className="portal-content"><Outlet /></main>
        <Footer />
      </div>
    </div>
  );
}

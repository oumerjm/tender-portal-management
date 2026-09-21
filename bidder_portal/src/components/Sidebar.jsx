import { NavLink } from "react-router-dom";
import { ClipboardList, FileCheck2, LayoutDashboard, Settings } from "lucide-react";
import hijraLogo from "../assets/hijra_logo_Icon.png";
import { getAccountDisplayName } from "../utils/accountDisplay";
const navigationItems = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/tenders", label: "Tender List", Icon: ClipboardList },
  { to: "/my-bids", label: "My Bids", Icon: FileCheck2 },
  { to: "/settings", label: "Settings", Icon: Settings },
];

export default function Sidebar({ isOpen, onNavigate }) {
  const displayName = getAccountDisplayName();

  return (
    <aside className={`portal-sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="portal-brand">
        <div className="portal-brand-mark">
          <img src={hijraLogo} alt="Hijra Bank" className="sidebar-logo-icon" />
        </div>
        <div><strong>HIJRA BANK</strong><span>TENDERS PORTAL</span></div>
      </div>
      <nav className="sidebar-navigation" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar-link ${isActive ? "is-active" : ""}`} onClick={onNavigate}>
            <span className="sidebar-link-icon" aria-hidden="true"><item.Icon size={17} strokeWidth={1.8} /></span><span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-account">
        <div className="sidebar-avatar" aria-hidden="true">{displayName.slice(0, 1).toUpperCase()}</div>
        <div><strong>{displayName}</strong><span>Bidder Account</span></div>
      </div>
    </aside>
  );
}

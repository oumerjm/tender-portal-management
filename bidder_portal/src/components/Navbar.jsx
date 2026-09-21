import { NavLink } from "react-router-dom";
import { getAccountDisplayName } from "../utils/accountDisplay";

export default function Navbar({ onOpenNavigation }) {
  const displayName = getAccountDisplayName();

  return (
    <header className="portal-navbar">
      <button type="button" className="navigation-toggle" aria-label="Open navigation" onClick={onOpenNavigation}>
        <span />
        <span />
        <span />
      </button>
      <div className="portal-greeting">
        <h1>Hello, {displayName}</h1>
        <p>Welcome back to Hijra Bank's Tender Portal.</p>
      </div>
      <nav className="portal-top-links" aria-label="Portal links">
        <NavLink to="/dashboard">Hijra Bank</NavLink>
        <span aria-hidden="true">&#8226;</span>
        <a href="https://hijra-bank.com" target="_blank" rel="noopener noreferrer">About Us</a>
        <span aria-hidden="true">&#8226;</span>
        <a href="https://hijra-bank.com/contact-us/" target="_blank" rel="noopener noreferrer">Contact Us</a>
      </nav>
    </header>
  );
}

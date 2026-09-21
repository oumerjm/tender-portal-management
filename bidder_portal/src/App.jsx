import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PortalLayout from "./components/PortalLayout";
import DashboardPage from "./pages/DashboardPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import SignInPage from "./pages/SignInPage/SignInPage";

function App() {
  return (
    <Routes>
      <Route element={<PortalLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tenders" element={<PlaceholderPage />} />
        <Route path="/my-bids" element={<PlaceholderPage />} />
        <Route path="/settings" element={<PlaceholderPage />} />
        <Route path="/tenders/:id/apply" element={<PlaceholderPage />} />
      </Route>
      <Route path="/signup" element={<SignInPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;

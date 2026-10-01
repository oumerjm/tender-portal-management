import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PortalLayout from "./components/PortalLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplyPage from "./pages/ApplyPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import TenderListPage from "./pages/TenderListpage";
import DashboardPage from "./pages/DashboardPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import SignInPage from "./pages/SignInPage/SignInPage";

function App() {
  return (
    <Routes>
      <Route element={<PortalLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tenders" element={<TenderListPage />} />
        <Route path="/applications" element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />
        <Route path="/settings" element={<PlaceholderPage />} />
        <Route path="/tenders/:id/apply" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
      </Route>
      <Route path="/signup" element={<SignInPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;

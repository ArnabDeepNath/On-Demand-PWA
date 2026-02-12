import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import { CustomerLayout, AgentLayout } from "./layouts/Layouts";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/customer/HomePage";
import BookingWizard from "./pages/customer/BookingWizard";
import BookingConfirmed from "./pages/customer/BookingConfirmed";
import BookingHistory from "./pages/customer/BookingHistory";
import ProfilePage from "./pages/customer/ProfilePage";
import SearchPage from "./pages/customer/SearchPage";
import DashboardPage from "./pages/agent/DashboardPage";
import MechanicOnboarding from "./pages/agent/MechanicOnboarding";
import SparePartsPage from "./pages/agent/SparePartsPage";
import SupportTasksPage from "./pages/agent/SupportTasksPage";

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "var(--bg-primary)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            className="gradient-text"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "2rem",
            }}
          >
            SHA24
          </div>
          <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  if (user.role === "agent") {
    return (
      <Routes>
        <Route element={<AgentLayout />}>
          <Route path="/agent" element={<DashboardPage />} />
          <Route path="/agent/onboard" element={<MechanicOnboarding />} />
          <Route path="/agent/parts" element={<SparePartsPage />} />
          <Route path="/agent/support" element={<SupportTasksPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/agent" replace />} />
      </Routes>
    );
  }

  // Customer routes
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookings" element={<BookingHistory />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/book" element={<BookingWizard />} />
      <Route path="/booking-confirmed" element={<BookingConfirmed />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

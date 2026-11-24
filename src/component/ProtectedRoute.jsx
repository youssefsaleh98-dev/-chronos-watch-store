
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, authLoading } = useAuth();

  // Wait until Firebase checks authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <p className="text-[#d4af37] text-xl">
          Checking authentication...
        </p>
      </div>
    );
  }

  // If user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in
  return <Outlet />;
};

export default ProtectedRoute;

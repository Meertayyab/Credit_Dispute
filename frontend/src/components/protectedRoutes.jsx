// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  if (!token || !expiry || Date.now() > Number(expiry)) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

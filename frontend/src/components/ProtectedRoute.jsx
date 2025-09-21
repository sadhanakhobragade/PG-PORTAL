import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && user.role !== requiredRole) {
    // if role mismatch redirect to appropriate dashboard
    return <Navigate to={user.role === "owner" ? "/dashboard" : "/tenant/dashboard"} replace />;
  }

  return children;
}

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Protege uma rota exigindo autenticação.
 * @param {string} requiredType - "cliente" | "empresa" | undefined (qualquer)
 */
export default function ProtectedRoute({ children, requiredType }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#111",
        color: "#F2C94C",
        fontFamily: "sans-serif",
        fontSize: "1rem",
      }}>
        Carregando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredType && profile?.type !== requiredType) {
    // Redireciona para a área correta se o tipo não bater
    if (profile?.type === "empresa") return <Navigate to="/dashboard" replace />;
    return <Navigate to="/home" replace />;
  }

  return children;
}
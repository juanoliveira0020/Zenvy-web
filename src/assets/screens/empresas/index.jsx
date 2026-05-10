import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "../../../firebase/auth";
import {
  getEstablishmentByOwner,
  onEstablishmentBookings,
  updateBookingStatus,
} from "../../../firebase/db";

function getStatusClass(status) {
  switch (status) {
    case "confirmado": return "status-confirmado";
    case "pendente": return "status-pendente";
    case "cancelado": return "status-cancelado";
    case "concluído": return "status-concluido";
    default: return "";
  }
}

export default function DashboardEmpresa() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [est, setEst] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [updating, setUpdating] = useState(null); // bookingId sendo atualizado

  // Carrega estabelecimento da empresa
  useEffect(() => {
    if (!user) return;
    getEstablishmentByOwner(user.uid)
      .then((estData) => {
        setEst(estData);
      })
      .catch(console.error);
  }, [user]);

  // Listener em tempo real para reservas do estabelecimento
  useEffect(() => {
    if (!est?.id) {
      setLoading(false);
      return;
    }
    const unsub = onEstablishmentBookings(est.id, (data) => {
      setBookings(data);
      setLoading(false);
    });
    return unsub;
  }, [est]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdating(bookingId);
    try {
      await updateBookingStatus(bookingId, newStatus);
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    } finally {
      setUpdating(null);
    }
  };

  const filteredBookings = filter === "todos"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const stats = {
    total: bookings.length,
    pendentes: bookings.filter((b) => b.status === "pendente").length,
    confirmados: bookings.filter((b) => b.status === "confirmado").length,
    cancelados: bookings.filter((b) => b.status === "cancelado").length,
  };

  return (
    <div className="aurea-container">
      <header className="header">
        <div className="container">
          <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            Zenvy.
          </a>
          <nav className="header-nav">
            <ul>
              <li><a href="#" className="active">Meus Agendamentos</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <span className="login" style={{ cursor: "default" }}>{profile?.name?.split(" ")[0]}</span>
            <a href="#" className="login" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Sair</a>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-header">
            <div>
              <h1 className="section-title">Gestão de Reservas</h1>
              <p className="section-subtitle">
                {est ? est.name : "Carregando estabelecimento..."}
              </p>
            </div>
          </div>

          {/* Cards de resumo */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total", value: stats.total, color: "#F2C94C" },
              { label: "Pendentes", value: stats.pendentes, color: "#f39c12" },
              { label: "Confirmados", value: stats.confirmados, color: "#4CAF50" },
              { label: "Cancelados", value: stats.cancelados, color: "#e74c3c" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "700", color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filtros */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            {["todos", "pendente", "confirmado", "cancelado", "concluído"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor: filter === f ? "#F2C94C" : "#333",
                  background: filter === f ? "#F2C94C" : "transparent",
                  color: filter === f ? "#111" : "#aaa",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  textTransform: "capitalize",
                  fontWeight: filter === f ? "600" : "400",
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Tabela */}
          <div className="table-container">
            {loading ? (
              <div className="loading-message">Carregando agendamentos...</div>
            ) : filteredBookings.length === 0 ? (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <p>Nenhum agendamento {filter !== "todos" ? `com status "${filter}"` : "encontrado"}.</p>
              </div>
            ) : (
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Serviço</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td className="font-medium">{b.userName}</td>
                      <td>{b.serviceName}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                      <td>R$ {b.servicePrice}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {b.status === "pendente" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(b.id, "confirmado")}
                                disabled={updating === b.id}
                                style={{ padding: "4px 10px", borderRadius: "6px", border: "none", background: "#4CAF50", color: "#fff", cursor: "pointer", fontSize: "0.75rem" }}
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => handleStatusChange(b.id, "cancelado")}
                                disabled={updating === b.id}
                                style={{ padding: "4px 10px", borderRadius: "6px", border: "none", background: "#e74c3c", color: "#fff", cursor: "pointer", fontSize: "0.75rem" }}
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                          {b.status === "confirmado" && (
                            <button
                              onClick={() => handleStatusChange(b.id, "concluído")}
                              disabled={updating === b.id}
                              style={{ padding: "4px 10px", borderRadius: "6px", border: "none", background: "#F2C94C", color: "#111", cursor: "pointer", fontSize: "0.75rem" }}
                            >
                              Concluir
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            Zenvy — A nova era das reservas premium
          </div>
          <nav className="footer-nav">
            <ul>
              <li><a href="#">Suporte</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
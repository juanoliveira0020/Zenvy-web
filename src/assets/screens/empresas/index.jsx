import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function DashboardEmpresa() {
  const navigate = useNavigate();

  // Estados para gerenciar os agendamentos e o carregamento (simulando integração com backend)
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulação de uma chamada à API (Backend)
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        // Aqui você colocaria o seu fetch real: const response = await fetch('/api/agendamentos');
        // Simulando um delay de rede de 1 segundo
        setTimeout(() => {
          const dadosMockados = [
            { id: 1, cliente: "João Silva", servico: "Corte de Cabelo", data: "08/05/2026", horario: "14:00", status: "Confirmado" },
            { id: 2, cliente: "Maria Oliveira", servico: "Manicure Completa", data: "08/05/2026", horario: "15:30", status: "Pendente" },
            { id: 3, cliente: "Ana Costa", servico: "Pedicure Spa", data: "09/05/2026", horario: "09:00", status: "Confirmado" },
            { id: 4, cliente: "Carla Mendes", servico: "Nail Art Premium", data: "09/05/2026", horario: "11:00", status: "Cancelado" }
          ];
          setAgendamentos(dadosMockados);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  // Função auxiliar para definir a cor do status
  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmado": return "status-confirmado";
      case "Pendente": return "status-pendente";
      case "Cancelado": return "status-cancelado";
      default: return "";
    }
  };

  return (
    <div className="aurea-container">
      {/* HEADER DA EMPRESA */}
      <header className="header">
        <div className="container">
          <a
            href="#"
            className="header-logo"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
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
            <a
              href="#"
              className="login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/"); // Simula um logout voltando pra home
              }}
            >
              Sair
            </a>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL (DASHBOARD) */}
      <main className="dashboard-main">
        <div className="container">
          
          <div className="dashboard-header">
            <div>
              <h1 className="section-title">Gestão de Reservas</h1>
              <p className="section-subtitle">Acompanhe os agendamentos do seu estabelecimento.</p>
            </div>
            {/* Botão de ação opcional para exportar ou filtrar */}
            <button className="btn btn-gold">Exportar Relatório</button>
          </div>

          {/* ÁREA DA TABELA */}
          <div className="table-container">
            {loading ? (
              <div className="loading-message">Carregando agendamentos...</div>
            ) : agendamentos.length === 0 ? (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <p>Nenhum agendamento encontrado no momento.</p>
              </div>
            ) : (
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Serviço</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {agendamentos.map((agendamento) => (
                    <tr key={agendamento.id}>
                      <td className="font-medium">{agendamento.cliente}</td>
                      <td>{agendamento.servico}</td>
                      <td>{agendamento.data}</td>
                      <td>{agendamento.horario}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(agendamento.status)}`}>
                          {agendamento.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </main>

      {/* FOOTER */}
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
              <li><a href="#">Termos de Uso</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
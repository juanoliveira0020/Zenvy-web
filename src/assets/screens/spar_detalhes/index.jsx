import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Spa_Detalhes() {
  const navigate = useNavigate();

  // Estados para gerenciar a interatividade
  const [selectedService, setSelectedService] = useState("Manicure Completa");
  const [selectedDate, setSelectedDate] = useState("sex, 01 de mai.");
  const [selectedTime, setSelectedTime] = useState(null);

  // Verifica se todos os campos necessários foram selecionados para habilitar o botão
  const isBookingReady = selectedService && selectedDate && selectedTime;

  const handleConfirmBooking = () => {
    if (isBookingReady) {
      alert(`Reserva confirmada!\nServiço: ${selectedService}\nData: ${selectedDate}\nHorário: ${selectedTime}`);
    }
  };

  return (
    <div className="aurea-container">
      {/* HEADER */}
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
            Aurea.
          </a>

          <nav className="header-nav">
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Início
                </a>
              </li>
              <li><a href="#" className="active">Categorias</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <a
              href="#"
              className="login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Entrar
            </a>

            <a
              href="#"
              className="btn btn-gold btn-header"
              onClick={(e) => {
                e.preventDefault();
                navigate("/cadastro");
              }}
            >
              Cadastrar
            </a>
          </div>
        </div>
      </header>

      {/* BANNER DO ESTABELECIMENTO */}
      <div className="studio-banner">
        <div className="studio-banner-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
        <div className="studio-banner-overlay"></div>
        <div className="container studio-banner-content">
          <a 
            href="#" 
            className="back-link"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1); // Funcionalidade de voltar
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar
          </a>
          
          <h1 className="studio-title">Spa Saint Tropez</h1>
          
          <div className="studio-meta">
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
              </svg>
              São Paulo - Rua Oscar Freire, 500
            </div>
            <div className="meta-item text-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#F2C94C" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" />
              </svg>
              <span className="font-bold">5</span> <span className="text-muted">(189)</span>
            </div>
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              09:00 - 19:00
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL (LAYOUT EM DUAS COLUNAS) */}
      <main className="studio-main">
        <div className="container layout-grid">
          
          {/* Coluna Esquerda (Serviços e Sobre) */}
          <div className="left-column">
            
            {/* Seção de Serviços */}
            <div className="services-section">
              <h2 className="section-title">Serviços</h2>
              <p className="section-subtitle">Escolha um serviço para ver os horários disponíveis.</p>
              
              <div className="services-list">
                
                {/* Serviço Selecionado */}
                <div 
                  className={`service-card ${selectedService === "Manicure Completa" ? "selected" : ""}`}
                  onClick={() => setSelectedService("Manicure Completa")}
                >
                  <div className="service-info">
                    <div className="service-header">
                      <h3>Massagens Terapêuticas</h3>
                      {selectedService === "Manicure Completa" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="service-time">50 min</span>
                  </div>
                  <div className="service-price">R$ 290</div>
                </div>

                {/* Serviço Padrão 1 */}
                <div 
                  className={`service-card ${selectedService === "Pedicure Spa" ? "selected" : ""}`}
                  onClick={() => setSelectedService("Pedicure Spa")}
                >
                  <div className="service-info">
                    <div className="service-header">
                      <h3>Tratamentos Faciais</h3>
                      {selectedService === "Pedicure Spa" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="service-time">45 min</span>
                  </div>
                  <div className="service-price">R$ 220</div>
                </div>

                {/* Serviço Padrão 2 */}
                <div 
                  className={`service-card ${selectedService === "Nail Art Premium" ? "selected" : ""}`}
                  onClick={() => setSelectedService("Nail Art Premium")}
                >
                  <div className="service-info">
                    <div className="service-header">
                      <h3>Day Spa</h3>
                      {selectedService === "Nail Art Premium" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="service-time">90 min</span>
                  </div>
                  <div className="service-price">R$ 580</div>
                </div>

              </div>
            </div>

            {/* Seção Sobre */}
            <div className="about-section">
              <h2 className="section-title">Sobre</h2>
              <div className="about-content">
                <p>O Spa Saint Tropez, voçe cuidando de si.</p>
              </div>
            </div>

          </div>

          {/* Coluna Direita (Widget de Reserva) */}
          <div className="right-column">
            <div className="booking-widget">
              
              <div className="widget-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V6" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>RESERVAR HORÁRIO</span>
              </div>

              {/* Seletor de Datas */}
              <div className="booking-section">
                <div className="booking-label">Escolha o dia</div>
                <div className="date-selector">
                  <button 
                    className={`date-btn ${selectedDate === "sex, 01 de mai." ? "active" : ""}`}
                    onClick={() => setSelectedDate("sex, 01 de mai.")}
                  >
                    sex, 01 de mai.
                  </button>
                  <button 
                    className={`date-btn ${selectedDate === "sáb, 02 de mai." ? "active" : ""}`}
                    onClick={() => setSelectedDate("sáb, 02 de mai.")}
                  >
                    sáb, 02 de mai.
                  </button>
                  <button 
                    className={`date-btn ${selectedDate === "dom, 03 de mai." ? "active" : ""}`}
                    onClick={() => setSelectedDate("dom, 03 de mai.")}
                  >
                    dom, 03 de mai.
                  </button>
                </div>
                
                {/* Scroll track */}
                <div className="scroll-track">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="scrollbar"><div className="scroll-thumb"></div></div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Grid de Horários */}
              <div className="booking-section">
                <div className="booking-label">Horários disponíveis</div>
                <div className="time-grid">
                  {/* Array mapeado apenas para não repetir o mesmo HTML 18 vezes, facilitando a aplicação do estado sem quebrar a estrutura */}
                  {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"].map((time) => (
                    <button 
                      key={time}
                      className={`time-btn ${selectedTime === time ? "active" : ""}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão de Ação */}
              <button 
                className={`btn-confirm-booking ${!isBookingReady ? "disabled" : "enabled"}`} 
                disabled={!isBookingReady}
                onClick={handleConfirmBooking}
              >
                Confirmar reserva
              </button>
              <p className="login-warning">É necessário estar logado para reservar.</p>

            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            Aurea — A nova era das reservas premium
          </div>
          <nav className="footer-nav">
            <ul>
              <li><a href="#">Categorias</a></li>
              <li><a href="#">Para empresas</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
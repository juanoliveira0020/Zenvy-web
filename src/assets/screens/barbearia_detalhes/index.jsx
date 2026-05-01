import React from "react";
import "./index.css";

export default function Barbearia_Detalhes() {
  return (
    <div className="aurea-container">
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <a href="#" className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            Aurea.
          </a>
          <nav className="header-nav">
            <ul>
              <li><a href="#">Início</a></li>
              <li><a href="#" className="active">Categorias</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <a href="#" className="login">Entrar</a>
            <a href="#" className="btn btn-gold btn-header">Cadastrar</a>
          </div>
        </div>
      </header>

      {/* HERO BANNER DO ESTABELECIMENTO */}
      <div className="hero-banner">
        <div className="hero-banner-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1920&auto=format&fit=crop')" }}></div>
        <div className="hero-banner-overlay"></div>
        <div className="container hero-banner-content">
          <a href="#" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar
          </a>
          
          <h1>Noir Barber Club</h1>
          
          <div className="hero-meta">
            <span className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
              </svg>
              São Paulo - Rua Augusta, 1200
            </span>
            <span className="meta-item rating">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#F2C94C" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" />
              </svg>
              4.9 <span className="reviews">(342)</span>
            </span>
            <span className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
              </svg>
              09:00 - 20:00
            </span>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL (SERVIÇOS E RESERVA) */}
      <main className="details-section">
        <div className="container layout-grid">
          
          {/* COLUNA ESQUERDA: SERVIÇOS */}
          <div className="services-column">
            <div className="section-header">
              <h2>Serviços</h2>
              <p>Escolha um serviço para ver os horários disponíveis.</p>
            </div>

            <div className="services-list">
              {/* Serviço 1 - Ativo */}
              <div className="service-card active">
                <div className="service-info">
                  <h3>
                    Corte Masculino
                    <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="#F2C94C" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="#F2C94C" fillOpacity="0.2"/>
                      <path d="M17 8L10 15L7 12" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </h3>
                  <p className="service-desc">Corte completo + finalização</p>
                  <span className="service-duration">45 min</span>
                </div>
                <div className="service-price">R$ 80</div>
              </div>

              {/* Serviço 2 */}
              <div className="service-card">
                <div className="service-info">
                  <h3>Barba Premium</h3>
                  <p className="service-desc">Toalha quente + óleos</p>
                  <span className="service-duration">30 min</span>
                </div>
                <div className="service-price">R$ 60</div>
              </div>

              {/* Serviço 3 */}
              <div className="service-card">
                <div className="service-info">
                  <h3>Combo Corte + Barba</h3>
                  <span className="service-duration">75 min</span>
                </div>
                <div className="service-price">R$ 130</div>
              </div>
            </div>

            <div className="about-section">
              <h3>Sobre</h3>
              <p>Barbearia premium com mestres especializados em estilos clássicos e modernos.</p>
            </div>
          </div>

          {/* COLUNA DIREITA: WIDGET DE RESERVA */}
          <div className="booking-column">
            <div className="booking-widget">
              <div className="widget-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V6" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                RESERVAR HORÁRIO
              </div>
              
              <div className="widget-body">
                <div className="step-group">
                  <span className="step-label">Escolha o dia</span>
                  <div className="date-selector">
                    <button className="date-pill active">sex., 01 de mai.</button>
                    <button className="date-pill">sáb., 02 de mai.</button>
                    <button className="date-pill">dom., 03 de mai.</button>
                  </div>
                  
                  {/* Barra de navegação dos dias */}
                  <div className="date-scrollbar">
                    <button className="scroll-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="scroll-track">
                      <div className="scroll-thumb"></div>
                    </div>
                    <button className="scroll-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="step-group">
                  <span className="step-label">Horários disponíveis</span>
                  <div className="time-grid">
                    <button className="time-slot">09:00</button>
                    <button className="time-slot">09:30</button>
                    <button className="time-slot">10:00</button>
                    <button className="time-slot">10:30</button>
                    <button className="time-slot">11:00</button>
                    <button className="time-slot">11:30</button>
                    <button className="time-slot">12:00</button>
                    <button className="time-slot">12:30</button>
                    <button className="time-slot">13:00</button>
                    <button className="time-slot">13:30</button>
                    <button className="time-slot">14:00</button>
                    <button className="time-slot">14:30</button>
                    <button className="time-slot">15:00</button>
                    <button className="time-slot">15:30</button>
                    <button className="time-slot">16:00</button>
                    <button className="time-slot">16:30</button>
                    <button className="time-slot">17:00</button>
                    <button className="time-slot">17:30</button>
                    <button className="time-slot">18:00</button>
                    <button className="time-slot">18:30</button>
                    <button className="time-slot">19:00</button>
                  </div>
                </div>

                <button className="btn-confirm disabled">Confirmar reserva</button>
                <p className="login-notice">É necessário estar logado para reservar.</p>
              </div>
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
};
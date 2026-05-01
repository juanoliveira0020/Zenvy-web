import React from "react";
import "./index.css";

export default function Manicure_Detalhes() {
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

      {/* BANNER DO ESTABELECIMENTO */}
      <div className="studio-banner">
        <div className="studio-banner-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1920&auto=format&fit=crop')" }}></div>
        <div className="studio-banner-overlay"></div>
        <div className="container studio-banner-content">
          <a href="#" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar
          </a>
          
          <h1 className="studio-title">Gold Nails Studio</h1>
          
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
                <div className="service-card selected">
                  <div className="service-info">
                    <div className="service-header">
                      <h3>Manicure Completa</h3>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="service-time">60 min</span>
                  </div>
                  <div className="service-price">R$ 90</div>
                </div>

                {/* Serviço Padrão 1 */}
                <div className="service-card">
                  <div className="service-info">
                    <div className="service-header">
                      <h3>Pedicure Spa</h3>
                    </div>
                    <span className="service-time">75 min</span>
                  </div>
                  <div className="service-price">R$ 120</div>
                </div>

                {/* Serviço Padrão 2 */}
                <div className="service-card">
                  <div className="service-info">
                    <div className="service-header">
                      <h3>Nail Art Premium</h3>
                    </div>
                    <span className="service-time">90 min</span>
                  </div>
                  <div className="service-price">R$ 180</div>
                </div>

              </div>
            </div>

            {/* Seção Sobre */}
            <div className="about-section">
              <h2 className="section-title">Sobre</h2>
              <div className="about-content">
                <p>Nail art de luxo com produtos importados.</p>
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
                  <button className="date-btn active">sex, 01 de mai.</button>
                  <button className="date-btn">sáb, 02 de mai.</button>
                  <button className="date-btn">dom, 03 de mai.</button>
                </div>
                
                {/* Scroll track (simulado visualmente com base na imagem) */}
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
                  <button className="time-btn">09:00</button>
                  <button className="time-btn">09:30</button>
                  <button className="time-btn">10:00</button>
                  <button className="time-btn">10:30</button>
                  <button className="time-btn">11:00</button>
                  <button className="time-btn">11:30</button>
                  <button className="time-btn">12:00</button>
                  <button className="time-btn">12:30</button>
                  <button className="time-btn">13:00</button>
                  <button className="time-btn">13:30</button>
                  <button className="time-btn">14:00</button>
                  <button className="time-btn">14:30</button>
                  <button className="time-btn">15:00</button>
                  <button className="time-btn">15:30</button>
                  <button className="time-btn">16:00</button>
                  <button className="time-btn">16:30</button>
                  <button className="time-btn">17:00</button>
                  <button className="time-btn">17:30</button>
                  <button className="time-btn">18:00</button>
                </div>
              </div>

              {/* Botão de Ação */}
              <button className="btn-confirm-booking disabled" disabled>Confirmar reserva</button>
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
};
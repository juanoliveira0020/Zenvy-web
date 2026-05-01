import React from "react";
import "./index.css";

export default function Home() {
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
              <li><a href="#">Categorias</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <a href="#" className="login">Entrar</a>
            <a href="#" className="btn btn-gold btn-header">Cadastrar</a>
          </div>
        </div>
      </header>

      {/* SEÇÃO 1: HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="premium-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
              </svg>
              Nova era das reservas premium
            </div>
            <h1>
              Reserve<br />
              experiências<br />
              extraordinárias<br />
              <span>em segundos.</span>
            </h1>
            <p>
              Barbearias, salões, estética e bem-estar. Encontre os melhores estabelecimentos da sua cidade e agende com horários em tempo real.
            </p>
            <div className="hero-actions">
              <a href="#" className="btn btn-gold">Explorar categorias →</a>
              <a href="#" className="btn btn-contoured">Sou um estabelecimento</a>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <h3>2.4k+</h3>
                <p>Estabelecimentos</p>
              </div>
              <div className="stat-item">
                <h3>98%</h3>
                <p>Satisfação</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Reservas Online</p>
              </div>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-image">
              {/* Fundo via CSS */}
            </div>
            <div className="next-booking-widget">
              <div className="next-booking-info">
                <h4>Próximo horário</h4>
                <p>Hoje, 14:30</p>
                <p className="place">Noir Barber Club • Corte + Barba</p>
              </div>
              <div className="rating">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
                </svg>
                4.9
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: CATEGORIAS */}
      <section className="categories">
        <div className="container">
          <div className="categories-header">
            <div className="categories-title">
              <h4>Categorias</h4>
              <h2>Para cada momento, uma experiência</h2>
            </div>
            <a href="#" className="view-all">Ver todas →</a>
          </div>
          <div className="category-grid">
            {/* Card 1: Barbearia */}
            <div className="category-card barber">
              <div className="category-card-bg"></div>
              <div className="category-content">
                <div className="category-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.188 17.5c-.846-.01-1.636-.34-2.222-.927a3.146 3.146 0 0 1-.927-2.222c.01-.846.34-1.636.927-2.222.586-.587 1.376-.917 2.222-.927a3.146 3.146 0 0 1 2.222.927 3.146 3.146 0 0 1 .927 2.222 3.146 3.146 0 0 1-.927 2.222 3.146 3.146 0 0 1-2.222.927Zm-11.75 0c-.846-.01-1.636-.34-2.222-.927a3.146 3.146 0 0 1-.927-2.222c.01-.846.34-1.636.927-2.222.586-.587 1.376-.917 2.222-.927a3.146 3.146 0 0 1 2.222.927 3.146 3.146 0 0 1 .927 2.222 3.146 3.146 0 0 1-.927 2.222 3.146 3.146 0 0 1-2.222.927Zm12.181-8.529l-4.14 1.11L12 12.336l-2.479-2.255-4.14-1.11-1.11 4.14L1.792 10.632 7.728 5 12 8.928 16.272 5l5.936 5.632-2.479.479-1.11-4.14Z" fill="#1A1A1A" />
                  </svg>
                </div>
                <h3>Barbearia</h3>
                <p>Cortes, barba e estilo</p>
              </div>
            </div>
            {/* Card 2: Manicure */}
            <div className="category-card manicure">
              <div className="category-card-bg"></div>
              <div className="category-content">
                <div className="category-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v3.69c1.077-.107 2.19-.107 3.267 0V3a.75.75 0 0 1 1.5 0v1.018A12.784 12.784 0 0 1 18.75 5.5v-2.5a.75.75 0 0 1 1.5 0v3.42c1.238.483 2.198 1.442 2.68 2.68a.75.75 0 0 1-1.391.562C21.134 8.71 19.866 7.75 18 7.75h-.5v6.5a.75.75 0 0 1-.75.75h-10.5a.75.75 0 0 1-.75-.75v-6.5h-.5C2.134 7.75.866 8.71.461 9.712A.75.75 0 0 1 .161 8.87C1.199 7.428 2.801 6.5 4.5 6.5V3a.75.75 0 0 1 1.5 0v2.5a12.784 12.784 0 0 1 1.233-1.482V3a.75.75 0 0 1 1.5 0v3.69c1.077-.107 2.19-.107 3.267 0V3a.75.75 0 0 1 .75-.75ZM4.5 15h15v3.75a3.75 3.75 0 0 1-3.75 3.75H8.25a3.75 3.75 0 0 1-3.75-3.75V15Z" fill="#1A1A1A" />
                  </svg>
                </div>
                <h3>Manicure</h3>
                <p>Unhas impecáveis</p>
              </div>
            </div>
            {/* Card 3: Estética */}
            <div className="category-card spa">
              <div className="category-card-bg"></div>
              <div className="category-content">
                <div className="category-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C10.144 2 8.363 2.738 7.05 4.05 5.738 5.363 5 7.144 5 9c0 1.075.26 2.088.713 2.981l-.693.694A6.974 6.974 0 0 0 3 17.5a.75.75 0 0 0 1.5 0 5.485 5.485 0 0 1 1.62-3.879l4.5 4.5A.75.75 0 0 0 11.69 17l-4.5-4.5.694-.693A6.974 6.974 0 0 0 9.019 5.713c-.907.456-1.92.713-2.981.713C6.038 6.426 6.038 6.426 6.038 6.426l4.5 4.5A.75.75 0 0 0 11.62 10l-4.5-4.5A.75.75 0 0 0 6.038 5l-.693.694A6.974 6.974 0 0 0 9 9.019c0-1.075.26-2.088.713-2.981A.75.75 0 0 0 8.311 5.69 5.485 5.485 0 0 0 12 2c-.907.456-1.92.713-2.981.713A.75.75 0 0 0 8.311.69 5.485 5.485 0 0 0 12 2c.907-.456 1.92-.713 2.981-.713.43 0 .86.034 1.282.102A.75.75 0 0 0 16 2.081a5.485 5.485 0 0 0-3.689 3.689l1.414.072 1.414-1.414a.75.75 0 0 0-.072 1.414l-1.414.072A5.485 5.485 0 0 0 12 2Zm7.5 17a6.974 6.974 0 0 0-4.019-.713c-.907-.456-1.92-.713-2.981-.713C12.5 17 12 17.5 12 17.5l4.5 4.5A.75.75 0 0 0 17 21l-4.5-4.5-.694.693c1.075.107 2.088.36 2.981.713.218-.11.455-.2.7-.278A.75.75 0 0 0 17 21a5.485 5.485 0 0 0 3.689-3.689A.75.75 0 0 0 19.5 17a5.485 5.485 0 0 0-3.689 3.689l1.414.072A.75.75 0 0 0 17 21Z" fill="#1A1A1A" />
                  </svg>
                </div>
                <h3>Estética</h3>
                <p>Cuidados premium para a pele</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: COMO FUNCIONA */}
      <section className="how-it-works">
        <div className="container">
          <div className="how-inner">
            <h4>Como funciona</h4>
            <h2>Três passos para o seu próximo agendamento</h2>
            <div className="steps-grid">
              {/* Passo 1 */}
              <div className="step-item">
                <div className="step-icon-num">
                  <div className="step-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C10.144 2 8.363 2.738 7.05 4.05 5.738 5.363 5 7.144 5 9c0 1.075.26 2.088.713 2.981l-.693.694A6.974 6.974 0 0 0 3 17.5a.75.75 0 0 0 1.5 0 5.485 5.485 0 0 1 1.62-3.879l4.5 4.5A.75.75 0 0 0 11.69 17l-4.5-4.5.694-.693A6.974 6.974 0 0 0 9.019 5.713c-.907.456-1.92.713-2.981.713C6.038 6.426 6.038 6.426 6.038 6.426l4.5 4.5A.75.75 0 0 0 11.62 10l-4.5-4.5A.75.75 0 0 0 6.038 5l-.693.694A6.974 6.974 0 0 0 9 9.019c0-1.075.26-2.088.713-2.981A.75.75 0 0 0 8.311 5.69 5.485 5.485 0 0 0 12 2c-.907.456-1.92.713-2.981.713A.75.75 0 0 0 8.311.69 5.485 5.485 0 0 0 12 2c.907-.456 1.92-.713 2.981-.713.43 0 .86.034 1.282.102A.75.75 0 0 0 16 2.081a5.485 5.485 0 0 0-3.689 3.689l1.414.072 1.414-1.414a.75.75 0 0 0-.072 1.414l-1.414.072A5.485 5.485 0 0 0 12 2Zm7.5 17a6.974 6.974 0 0 0-4.019-.713c-.907-.456-1.92-.713-2.981-.713C12.5 17 12 17.5 12 17.5l4.5 4.5A.75.75 0 0 0 17 21l-4.5-4.5-.694.693c1.075.107 2.088.36 2.981.713.218-.11.455-.2.7-.278A.75.75 0 0 0 17 21a5.485 5.485 0 0 0 3.689-3.689A.75.75 0 0 0 19.5 17a5.485 5.485 0 0 0-3.689 3.689l1.414.072A.75.75 0 0 0 17 21Z" fill="#1A1A1A" />
                    </svg>
                  </div>
                  <div className="step-num">01</div>
                </div>
                <h3>Escolha a categoria</h3>
                <p>Navegue pelos serviços disponíveis e encontre o ideal para você.</p>
              </div>
              {/* Passo 2 */}
              <div className="step-item">
                <div className="step-icon-num">
                  <div className="step-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3ZM5 6h14a1 1 0 0 1 1 1v2H4V7a1 1 0 0 1 1-1Zm14 16H5a1 1 0 0 1-1-1v-11h16v11a1 1 0 0 1-1 1ZM8 14h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Zm0 2v1h1v-1H8Z" fill="#1A1A1A" />
                    </svg>
                  </div>
                  <div className="step-num">02</div>
                </div>
                <h3>Reserve seu horário</h3>
                <p>Veja disponibilidade em tempo real e selecione o melhor momento.</p>
              </div>
              {/* Passo 3 */}
              <div className="step-item">
                <div className="step-icon-num">
                  <div className="step-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8ZM12.75 6.25a.75.75 0 0 0-1.5 0v6.06l3.47 2.02a.75.75 0 1 0 .76-1.28l-2.73-1.6Z" fill="#1A1A1A" />
                    </svg>
                  </div>
                  <div className="step-num">03</div>
                </div>
                <h3>Aproveite a experiência</h3>
                <p>Receba a confirmação e curta seu serviço com tranquilidade.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
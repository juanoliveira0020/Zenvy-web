import React from "react";
import "./index.css";

export default function Manicure() {
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

      {/* BANNER DA CATEGORIA */}
      <div className="category-banner">
        <div className="category-banner-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1920&auto=format&fit=crop')" }}></div>
        <div className="category-banner-overlay"></div>
        <div className="container category-banner-content">
          <a href="#" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Categorias
          </a>
          
          <div className="category-title-wrapper">
            <span className="category-title-icon">💅</span>
            <div className="category-title-text">
              <h1>Manicure</h1>
              <p>Unhas impecáveis</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL (LISTA DE ESTABELECIMENTOS) */}
      <main className="establishments-section">
        <div className="container">
          <p className="results-count">1 estabelecimento disponíveis</p>
          
          <div className="establishments-grid">
            
            {/* Card de Estabelecimento */}
            <div className="establishment-card">
              <div className="est-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop')" }}></div>
              
              <div className="est-content">
                <div className="est-header">
                  <h2>Gold Nails Studio</h2>
                  <div className="est-rating">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F2C94C" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" />
                    </svg>
                    5
                  </div>
                </div>
                
                <div className="est-address">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                  </svg>
                  São Paulo - Rua Oscar Freire, 500
                </div>
                
                <p className="est-desc">Nail art de luxo com produtos importados.</p>
                
                <div className="est-footer">
                  <span className="est-services">3 serviços</span>
                  <a href="#" className="est-link">
                    Ver horários 
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
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
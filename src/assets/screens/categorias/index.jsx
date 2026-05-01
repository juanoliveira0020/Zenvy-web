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
              <li><a href="#" className="active">Categorias</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <a href="#" className="login">Entrar</a>
            <a href="#" className="btn btn-gold btn-header">Cadastrar</a>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL: PÁGINA DE CATEGORIAS */}
      <main className="categories-page">
        <div className="container">
          
          <div className="page-header">
            <span className="explore-tag">Explore</span>
            <h1>Todas as <span>categorias</span></h1>
            <p>Selecione um tipo de serviço e descubra os melhores estabelecimentos.</p>
          </div>

          <div className="all-categories-grid">
            
            {/* Card 1: Barbearia */}
            <a href="#" className="service-card">
              <div className="service-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop')" }}></div>
              <div className="service-card-body">
                <div className="service-card-info">
                  <span className="service-icon">✂️</span>
                  <h3>Barbearia</h3>
                  <p>Cortes, barba e estilo</p>
                </div>
                <div className="service-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>

            {/* Card 2: Manicure */}
            <a href="#" className="service-card">
              <div className="service-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610992015762-3ff6c2c8f8ac?q=80&w=600&auto=format&fit=crop')" }}></div>
              <div className="service-card-body">
                <div className="service-card-info">
                  <span className="service-icon">💅</span>
                  <h3>Manicure</h3>
                  <p>Unhas impecáveis</p>
                </div>
                <div className="service-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>

            {/* Card 3: Estética */}
            <a href="#" className="service-card">
              <div className="service-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop')" }}></div>
              <div className="service-card-body">
                <div className="service-card-info">
                  <span className="service-icon">✨</span>
                  <h3>Estética</h3>
                  <p>Cuidados premium para a pele</p>
                </div>
                <div className="service-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>

            {/* Card 4: Salão de Cabelo */}
            <a href="#" className="service-card">
              <div className="service-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop')" }}></div>
              <div className="service-card-body">
                <div className="service-card-info">
                  <span className="service-icon">💆‍♀️</span>
                  <h3>Salão de Cabelo</h3>
                  <p>Cortes, cores e tratamentos</p>
                </div>
                <div className="service-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>

            {/* Card 5: Massagem */}
            <a href="#" className="service-card">
              <div className="service-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=600&auto=format&fit=crop')" }}></div>
              <div className="service-card-body">
                <div className="service-card-info">
                  <span className="service-icon">🌿</span>
                  <h3>Massagem</h3>
                  <p>Relaxamento e bem-estar</p>
                </div>
                <div className="service-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>

            {/* Card 6: Tatuagem */}
            <a href="#" className="service-card">
              <div className="service-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=600&auto=format&fit=crop')" }}></div>
              <div className="service-card-body">
                <div className="service-card-info">
                  <span className="service-icon">🖋️</span>
                  <h3>Tatuagem</h3>
                  <p>Arte na pele com história</p>
                </div>
                <div className="service-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>

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
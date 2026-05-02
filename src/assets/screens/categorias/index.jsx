import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Categorias() {
  const navigate = useNavigate(); // ✅ necessário

  return (
    <div className="aurea-container">
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <a href="/" className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            Aurea.
          </a>
          <nav className="header-nav">
            <ul>
              <li><a href="/home">Início</a></li>
              <li><a href="/categorias" className="active">Categorias</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <a href="/login" className="login">Entrar</a>
            <a href="/cadastro" className="btn btn-gold btn-header">Cadastrar</a>
          </div>
        </div>
      </header>

      <main className="categories-page">
        <div className="container">
          
          <div className="page-header">
            <span className="explore-tag">Explore</span>
            <h1>Todas as <span>categorias</span></h1>
            <p>Selecione um tipo de serviço e descubra os melhores estabelecimentos.</p>
          </div>

          <div className="all-categories-grid">
            
            {/* Card 1: Barbearia */}
            <a
              href="#"
              className="service-card"
              onClick={(e) => {
                e.preventDefault();
                navigate("/categoria/barbearia"); // ✅ corrigido
              }}
            >
              <div className="service-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop')" }}></div>
              <div className="service-card-body">
                <div className="service-card-info">
                  <div className="service-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="6" cy="6" r="3"></circle>
                    </svg>
                  </div>
                  <h3>Barbearia</h3>
                  <p>Cortes, barba e estilo</p>
                </div>
              </div>
            </a>

            {/* Card 2: Manicure */}
            <a
              href="#"
              className="service-card"
              onClick={(e) => {
                e.preventDefault();
                navigate("/categoria/manicure"); // ✅ corrigido
              }}
            >
              <div className="service-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop')" }}></div>
              <div className="service-card-body">
                <div className="service-card-info">
                  <h3>Manicure</h3>
                  <p>Unhas impecáveis</p>
                </div>
              </div>
            </a>

            {/* Card 3: Estética */}
            <a
              href="#"
              className="service-card"
              onClick={(e) => {
                e.preventDefault();
                navigate("/categoria/estetica"); // ⚠️ rota não existe no App.jsx
              }}
            >
              <div className="service-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop')" }}></div>
              <div className="service-card-body">
                <div className="service-card-info">
                  <h3>Estética</h3>
                  <p>Cuidados premium para a pele</p>
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
              <li><a href="/categorias">Categorias</a></li>
              <li><a href="/empresas">Para empresas</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
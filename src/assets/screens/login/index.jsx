import React from "react";
import "./index.css";

export default function Login() {
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
            <a href="#" className="login active">Entrar</a>
            <a href="#" className="btn btn-gold btn-header">Cadastrar</a>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL: PÁGINA DE LOGIN */}
      <main className="login-page">
        <div className="login-background-strip"></div>
        
        <div className="login-card">
          <div className="login-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#1A1A1A" />
            </svg>
          </div>
          
          <h2>Bem-vindo de volta</h2>
          <p className="login-subtitle">
            Acesse sua conta para reservar e gerenciar seus horários.
          </p>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                placeholder="voce@email.com" 
                required 
              />
              <span className="form-hint">
                Demo: digite qualquer e-mail. Caso não exista, criamos como cliente.
              </span>
            </div>

            <button type="submit" className="btn btn-gold w-100">
              Entrar
            </button>
          </form>

          <p className="login-signup">
            Ainda não tem conta? <a href="#">Cadastre-se</a>
          </p>
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
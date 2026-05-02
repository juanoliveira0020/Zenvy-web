import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para lidar com navegação de links
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Função para simular o login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simula um delay de API
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/home"); // Redireciona para o início após logar
    }, 1500);
  };

  return (
    <div className="aurea-container">
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <a href="/" onClick={(e) => handleNavigation(e, '/')} className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            <span className="logo-text">Aurea.</span>
          </a>
          
          <nav className="header-nav">
            <ul>
              <li><a href="/" onClick={(e) => handleNavigation(e, '/')}>Início</a></li>
              <li><a href="/categorias" onClick={(e) => handleNavigation(e, '/categorias')}>Categorias</a></li>
            </ul>
          </nav>
          
          <div className="header-actions">
            <a href="/login" onClick={(e) => handleNavigation(e, '/login')} className="login-link active">Entrar</a>
            <button onClick={() => navigate('/cadastro')} className="btn btn-gold btn-pill">Cadastrar</button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="login-page">
        {/* Faixa vertical de fundo conforme a imagem */}
        <div className="background-strip"></div>
        
        <div className="login-card">
          <div className="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#1A1A1A" />
            </svg>
          </div>
          
          <h2 className="card-title">Bem-vindo de volta</h2>
          <p className="card-subtitle">
            Acesse sua conta para reservar e gerenciar seus horários.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                placeholder="voce@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <span className="form-hint">
                Demo: digite qualquer e-mail. Caso não exista, criamos como cliente.
              </span>
            </div>

            <button 
              type="submit" 
              className={`btn btn-gold w-100 ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="signup-text">
            Ainda não tem conta? <a href="/cadastro" onClick={(e) => handleNavigation(e, '/cadastro')}>Cadastre-se</a>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-brand">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            <span>Aurea — A nova era das reservas premium</span>
          </div>
          <nav className="footer-links">
            <ul>
              <li><a href="/categorias" onClick={(e) => handleNavigation(e, '/categorias')}>Categorias</a></li>
              <li><a href="/empresas" onClick={(e) => handleNavigation(e, '/empresas')}>Para empresas</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
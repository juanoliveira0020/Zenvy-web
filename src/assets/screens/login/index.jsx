import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const navigate = useNavigate();
  // Estado para controlar o tipo de conta no login, igual ao cadastro
  const [accountType, setAccountType] = useState('cliente');
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para lidar com navegação suave
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Função para simular o login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simula tempo de requisição e redireciona de acordo com o tipo de conta
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (accountType === 'empresa') {
        navigate("/dashboard"); // Redireciona a empresa para o dashboard
      } else {
        navigate("/perfil"); // Redireciona o cliente para a página de perfil
      }
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
            <span className="logo-text">Zenvy.</span>
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

      {/* CONTEÚDO PRINCIPAL: PÁGINA DE LOGIN */}
      <main className="login-page">
        <div className="background-strip"></div>
        
        <div className="login-card">
          <div className="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#1A1A1A" />
            </svg>
          </div>
          
          <h2 className="card-title">Bem-vindo de volta</h2>
          <p className="card-subtitle">
            Acesse sua conta para gerenciar suas reservas.
          </p>

          {/* SELETOR DE TIPO DE CONTA (IDÊNTICO AO CADASTRO) */}
          <div className="account-types">
            <button 
              type="button" 
              className={`type-btn ${accountType === 'cliente' ? 'active' : ''}`}
              onClick={() => setAccountType('cliente')}
            >
              <div className="type-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="type-title">Cliente</span>
              <span className="type-desc">Entrar como usuário</span>
            </button>
            
            <button 
              type="button" 
              className={`type-btn ${accountType === 'empresa' ? 'active' : ''}`}
              onClick={() => setAccountType('empresa')}
            >
              <div className="type-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7M9 9V9.01M9 13V13.01M9 17V17.01M15 13V13.01M15 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="type-title">Empresa</span>
              <span className="type-desc">Área do estabelecimento</span>
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail cadastrado</label>
              <input 
                type="email" 
                id="email" 
                placeholder="voce@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <span className="form-hint">
                Demo: digite qualquer e-mail para simular o login.
              </span>
            </div>

            <button 
              type="submit" 
              className={`btn btn-gold w-100 ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Autenticando...' : 'Entrar na conta'}
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
            <span>Zenvy — A nova era das reservas premium</span>
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
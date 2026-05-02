import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Cadastro() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('cliente');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para navegação suave
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Função para simular o cadastro
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula tempo de requisição e redireciona
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/login");
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
            <a href="/login" onClick={(e) => handleNavigation(e, '/login')} className="login">Entrar</a>
            <button onClick={() => navigate('/cadastro')} className="btn btn-gold btn-header">Cadastrar</button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL: PÁGINA DE CADASTRO */}
      <main className="signup-page">
        <div className="signup-background-strip"></div>
        
        <div className="signup-card">
          <div className="signup-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#1A1A1A" />
            </svg>
          </div>
          
          <h2>Criar conta</h2>
          <p className="signup-subtitle">
            Escolha o tipo de conta para começar.
          </p>

          {/* SELETOR DE TIPO DE CONTA */}
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
              <span className="type-desc">Quero reservar serviços</span>
            </button>
            
            <button 
              type="button" 
              className={`type-btn ${accountType === 'estabelecimento' ? 'active' : ''}`}
              onClick={() => setAccountType('estabelecimento')}
            >
              <div className="type-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7M9 9V9.01M9 13V13.01M9 17V17.01M15 13V13.01M15 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="type-title">Estabelecimento</span>
              <span className="type-desc">Quero receber reservas</span>
            </button>
          </div>

          {/* FORMULÁRIO DINÂMICO */}
          <form className="signup-form" onSubmit={handleSubmit}>
            
            {/* Campos exclusivos de Cliente */}
            {accountType === 'cliente' && (
              <>
                <div className="form-group">
                  <label htmlFor="nome">Seu nome</label>
                  <input type="text" id="nome" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email-cliente">E-mail</label>
                  <input type="email" id="email-cliente" required />
                </div>
              </>
            )}

            {/* Campos exclusivos de Estabelecimento */}
            {accountType === 'estabelecimento' && (
              <>
                <div className="form-group">
                  <label htmlFor="responsavel">Nome do responsável</label>
                  <input type="text" id="responsavel" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail corporativo</label>
                  <input type="email" id="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="estabelecimento">Nome do estabelecimento</label>
                  <input type="text" id="estabelecimento" required />
                </div>

                <div className="form-group">
                  <label htmlFor="categoria">Categoria principal</label>
                  <div className="select-wrapper">
                    <select id="categoria" required defaultValue="">
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="barbearia">Barbearia</option>
                      <option value="salao">Salão de Beleza</option>
                      <option value="estetica">Estética</option>
                      <option value="tatuagem">Tatuagem</option>
                    </select>
                    <div className="select-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cidade">Cidade</label>
                  <input type="text" id="cidade" required />
                </div>
              </>
            )}

            <button 
              type="submit" 
              className={`btn btn-gold w-100 mt-2 ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processando...' : 'Criar conta'}
            </button>
          </form>

          <p className="signup-login-link">
            Já tem conta? <a href="/login" onClick={(e) => handleNavigation(e, '/login')}>Entrar</a>
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
              <li><a href="/categorias" onClick={(e) => handleNavigation(e, '/categorias')}>Categorias</a></li>
              <li><a href="/empresas" onClick={(e) => handleNavigation(e, '/empresas')}>Para empresas</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
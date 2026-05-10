import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { signIn, resetPassword } from "../../../firebase/auth";
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [accountType, setAccountType] = useState("cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Redireciona se já estiver logado
  useEffect(() => {
    if (!loading && user && profile) {
      if (profile.type === "empresa") navigate("/dashboard", { replace: true });
      else navigate("/perfil", { replace: true });
    }
  }, [user, profile, loading, navigate]);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Preencha e-mail e senha.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { profile: prof } = await signIn(email, password);
      if (prof.type === "empresa") {
        navigate("/dashboard");
      } else {
        navigate("/perfil");
      }
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setError("Digite seu e-mail para recuperar a senha.");
      return;
    }
    setIsSubmitting(true);
    try {
      await resetPassword(resetEmail);
      setResetSent(true);
      setError("");
    } catch (err) {
      setError("E-mail não encontrado ou inválido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function firebaseErrorMessage(code) {
    switch (code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "E-mail ou senha incorretos.";
      case "auth/invalid-email":
        return "E-mail inválido.";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde.";
      default:
        return "Erro ao fazer login. Tente novamente.";
    }
  }

  if (loading) return null;

  return (
    <div className="aurea-container">
      <header className="header">
        <div className="container">
          <a href="/" onClick={(e) => handleNavigation(e, "/")} className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            <span className="logo-text">Zenvy.</span>
          </a>
          <nav className="header-nav">
            <ul>
              <li><a href="/" onClick={(e) => handleNavigation(e, "/")}>Início</a></li>
              <li><a href="/categorias" onClick={(e) => handleNavigation(e, "/categorias")}>Categorias</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <a href="/login" onClick={(e) => handleNavigation(e, "/login")} className="login-link active">Entrar</a>
            <button onClick={() => navigate("/cadastro")} className="btn btn-gold btn-pill">Cadastrar</button>
          </div>
        </div>
      </header>

      <main className="login-page">
        <div className="background-strip"></div>

        <div className="login-card">
          <div className="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#1A1A1A" />
            </svg>
          </div>

          {!showReset ? (
            <>
              <h2 className="card-title">Bem-vindo de volta</h2>
              <p className="card-subtitle">Acesse sua conta para gerenciar suas reservas.</p>

              <div className="account-types">
                <button type="button" className={`type-btn ${accountType === "cliente" ? "active" : ""}`} onClick={() => setAccountType("cliente")}>
                  <div className="type-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="type-title">Cliente</span>
                  <span className="type-desc">Entrar como usuário</span>
                </button>

                <button type="button" className={`type-btn ${accountType === "empresa" ? "active" : ""}`} onClick={() => setAccountType("empresa")}>
                  <div className="type-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7M9 9V9.01M9 13V13.01M9 17V17.01M15 13V13.01M15 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="type-title">Empresa</span>
                  <span className="type-desc">Área do estabelecimento</span>
                </button>
              </div>

              {error && <p className="form-error">{error}</p>}

              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">E-mail cadastrado</label>
                  <input type="email" id="email" placeholder="voce@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className={`btn btn-gold w-100 ${isSubmitting ? "loading" : ""}`} disabled={isSubmitting}>
                  {isSubmitting ? "Autenticando..." : "Entrar na conta"}
                </button>
              </form>

              <p className="forgot-password" style={{ textAlign: "center", marginTop: "12px", fontSize: "0.85rem" }}>
                <button type="button" onClick={() => { setShowReset(true); setError(""); }} style={{ background: "none", border: "none", color: "#F2C94C", cursor: "pointer", textDecoration: "underline" }}>
                  Esqueci minha senha
                </button>
              </p>
              <p className="signup-text">Ainda não tem conta? <a href="/cadastro" onClick={(e) => handleNavigation(e, "/cadastro")}>Cadastre-se</a></p>
            </>
          ) : (
            <>
              <h2 className="card-title">Recuperar senha</h2>
              <p className="card-subtitle">Enviaremos um link de redefinição para seu e-mail.</p>

              {resetSent ? (
                <p style={{ color: "#4CAF50", textAlign: "center", marginTop: "16px" }}>
                  E-mail enviado! Verifique sua caixa de entrada.
                </p>
              ) : (
                <>
                  {error && <p className="form-error">{error}</p>}
                  <form className="form" onSubmit={handlePasswordReset}>
                    <div className="form-group">
                      <label htmlFor="resetEmail">Seu e-mail</label>
                      <input type="email" id="resetEmail" placeholder="voce@email.com" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className={`btn btn-gold w-100 ${isSubmitting ? "loading" : ""}`} disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
                    </button>
                  </form>
                </>
              )}

              <p style={{ textAlign: "center", marginTop: "12px", fontSize: "0.85rem" }}>
                <button type="button" onClick={() => { setShowReset(false); setError(""); setResetSent(false); }} style={{ background: "none", border: "none", color: "#F2C94C", cursor: "pointer", textDecoration: "underline" }}>
                  Voltar ao login
                </button>
              </p>
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-brand">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            <span>Zenvy — A nova era das reservas premium</span>
          </div>
          <nav className="footer-links">
            <ul>
              <li><a href="/categorias">Categorias</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
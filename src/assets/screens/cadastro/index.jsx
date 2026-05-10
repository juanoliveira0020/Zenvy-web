import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { signUp } from "../../../firebase/auth";
import { useAuth } from "../../../context/AuthContext";
import { seedDatabase } from "../../../firebase/seed";

export default function Cadastro() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [accountType, setAccountType] = useState("cliente");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Campos comuns
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Campos de empresa
  const [establishmentName, setEstablishmentName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");

  // Redireciona se já logado
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

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      const extraData =
        accountType === "empresa"
          ? { establishmentName, category, address, phone: "" }
          : { phone: "" };

      await signUp(email, password, name, accountType, extraData);

      // Semeamos os estabelecimentos iniciais (só cria se não existir)
      try { await seedDatabase(); } catch (_) {}

      if (accountType === "empresa") navigate("/dashboard");
      else navigate("/perfil");
    } catch (err) {
      const msg = firebaseErrorMessage(err.code);
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  function firebaseErrorMessage(code) {
    switch (code) {
      case "auth/email-already-in-use":
        return "Este e-mail já está cadastrado. Faça login.";
      case "auth/invalid-email":
        return "E-mail inválido.";
      case "auth/weak-password":
        return "Senha muito fraca. Use pelo menos 6 caracteres.";
      default:
        return "Erro ao criar conta. Tente novamente.";
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
            <a href="/login" onClick={(e) => handleNavigation(e, "/login")} className="login">Entrar</a>
            <button onClick={() => navigate("/cadastro")} className="btn btn-gold btn-header">Cadastrar</button>
          </div>
        </div>
      </header>

      <main className="signup-page">
        <div className="signup-background-strip"></div>

        <div className="signup-card">
          <div className="signup-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#1A1A1A" />
            </svg>
          </div>

          <h2>Criar conta</h2>
          <p className="signup-subtitle">Escolha o tipo de conta para começar.</p>

          <div className="account-types">
            <button type="button" className={`type-btn ${accountType === "cliente" ? "active" : ""}`} onClick={() => setAccountType("cliente")}>
              <div className="type-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="type-title">Cliente</span>
              <span className="type-desc">Quero reservar serviços</span>
            </button>

            <button type="button" className={`type-btn ${accountType === "empresa" ? "active" : ""}`} onClick={() => setAccountType("empresa")}>
              <div className="type-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7M9 9V9.01M9 13V13.01M9 17V17.01M15 13V13.01M15 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="type-title">Estabelecimento</span>
              <span className="type-desc">Quero receber reservas</span>
            </button>
          </div>

          {error && <p className="form-error" style={{ color: "#e74c3c", fontSize: "0.875rem", marginBottom: "8px" }}>{error}</p>}

          <form className="signup-form" onSubmit={handleSubmit}>
            {accountType === "cliente" && (
              <>
                <div className="form-group">
                  <label>Seu nome</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>E-mail</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Senha</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mín. 6 caracteres" />
                </div>
                <div className="form-group">
                  <label>Confirmar senha</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </>
            )}

            {accountType === "empresa" && (
              <>
                <div className="form-group">
                  <label>Nome do responsável</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>E-mail corporativo</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Senha</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mín. 6 caracteres" />
                </div>
                <div className="form-group">
                  <label>Confirmar senha</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Nome do estabelecimento</label>
                  <input type="text" value={establishmentName} onChange={(e) => setEstablishmentName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Categoria principal</label>
                  <div className="select-wrapper">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required defaultValue="">
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="barbearia">Barbearia</option>
                      <option value="manicure">Manicure</option>
                      <option value="spa">Spa</option>
                    </select>
                    <div className="select-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Endereço</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
              </>
            )}

            <button type="submit" className={`btn btn-gold w-100 mt-2 ${isSubmitting ? "loading" : ""}`} disabled={isSubmitting}>
              {isSubmitting ? "Processando..." : "Criar conta"}
            </button>
          </form>

          <p className="signup-login-link">Já tem conta? <a href="/login" onClick={(e) => handleNavigation(e, "/login")}>Entrar</a></p>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            Zenvy — A nova era das reservas premium
          </div>
          <nav className="footer-nav">
            <ul>
              <li><a href="/categorias">Categorias</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
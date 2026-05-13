import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { signUp } from "../../../firebase/auth";
import { useAuth } from "../../../context/AuthContext";
import { createEstablishment, createService } from "../../../firebase/db";
import { seedDatabase } from "../../../firebase/seed";

// Imagens padrão por categoria enquanto o dono não fizer upload próprio
const DEFAULT_IMAGES = {
  barbearia: {
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920&auto=format&fit=crop",
  },
  manicure: {
    imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1920&auto=format&fit=crop",
  },
  spa: {
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1170&auto=format&fit=crop",
  },
};

// Serviços padrão criados automaticamente ao cadastrar a empresa
function getDefaultServices(cat) {
  const map = {
    barbearia: [
      { name: "Corte Masculino", duration: 45, price: 50 },
      { name: "Barba", duration: 30, price: 35 },
      { name: "Corte + Barba", duration: 60, price: 75 },
    ],
    manicure: [
      { name: "Manicure Completa", duration: 60, price: 80 },
      { name: "Pedicure", duration: 60, price: 90 },
      { name: "Nail Art", duration: 90, price: 150 },
    ],
    spa: [
      { name: "Massagem Relaxante", duration: 50, price: 200 },
      { name: "Tratamento Facial", duration: 45, price: 180 },
      { name: "Day Spa", duration: 120, price: 500 },
    ],
  };
  return map[cat] || [];
}

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

  // Campos exclusivos de empresa
  const [establishmentName, setEstablishmentName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

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
    if (accountType === "empresa" && !category) {
      setError("Selecione uma categoria para o estabelecimento.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Cria o usuário no Firebase Auth + perfil no Firestore
      const firebaseUser = await signUp(email, password, name, accountType, { phone: "" });

      // 2. Se for empresa, cria o documento do estabelecimento na coleção "establishments"
      if (accountType === "empresa") {
        const images = DEFAULT_IMAGES[category] || DEFAULT_IMAGES["barbearia"];

        const estId = await createEstablishment(firebaseUser.uid, {
          name: establishmentName,
          category,
          address,
          description: description || `Bem-vindo ao ${establishmentName}.`,
          imageUrl: images.imageUrl,
          bannerUrl: images.bannerUrl,
          openTime: "09:00",
          closeTime: "19:00",
        });

        // 3. Cria os serviços padrão da categoria automaticamente
        const defaultServices = getDefaultServices(category);
        for (const svc of defaultServices) {
          await createService(estId, svc);
        }
      }

      // 4. Popula os estabelecimentos de demonstração (só cria se não existirem)
      try { await seedDatabase(); } catch (_) {}

      // 5. Redireciona conforme o tipo de conta
      if (accountType === "empresa") navigate("/dashboard");
      else navigate("/perfil");

    } catch (err) {
      setError(firebaseErrorMessage(err.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  function firebaseErrorMessage(code) {
    switch (code) {
      case "auth/email-already-in-use": return "Este e-mail já está cadastrado. Faça login.";
      case "auth/invalid-email": return "E-mail inválido.";
      case "auth/weak-password": return "Senha muito fraca. Use pelo menos 6 caracteres.";
      default: return "Erro ao criar conta. Tente novamente.";
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

          {error && (
            <p style={{ color: "#e74c3c", fontSize: "0.875rem", marginBottom: "12px", padding: "10px 14px", background: "rgba(231,76,60,0.1)", borderRadius: "8px", border: "1px solid rgba(231,76,60,0.3)" }}>
              {error}
            </p>
          )}

          <form className="signup-form" onSubmit={handleSubmit}>

            {/* ── CLIENTE ── */}
            {accountType === "cliente" && (
              <>
                <div className="form-group">
                  <label>Seu nome</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="João Silva" />
                </div>
                <div className="form-group">
                  <label>E-mail</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="voce@email.com" />
                </div>
                <div className="form-group">
                  <label>Senha</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mínimo 6 caracteres" />
                </div>
                <div className="form-group">
                  <label>Confirmar senha</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Repita a senha" />
                </div>
              </>
            )}

            {/* ── EMPRESA ── */}
            {accountType === "empresa" && (
              <>
                <div className="form-group">
                  <label>Nome do responsável</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Seu nome completo" />
                </div>
                <div className="form-group">
                  <label>E-mail corporativo</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="contato@estabelecimento.com" />
                </div>
                <div className="form-group">
                  <label>Senha</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mínimo 6 caracteres" />
                </div>
                <div className="form-group">
                  <label>Confirmar senha</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Repita a senha" />
                </div>
                <div className="form-group">
                  <label>Nome do estabelecimento</label>
                  <input type="text" value={establishmentName} onChange={(e) => setEstablishmentName(e.target.value)} required placeholder="Ex: Barbearia do João" />
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <div className="select-wrapper">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                      <option value="" disabled>Selecione uma categoria</option>
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
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Ex: São Paulo - Rua das Flores, 100" />
                </div>
                <div className="form-group">
                  <label>Descrição <span style={{ color: "#666", fontWeight: 400 }}>(opcional)</span></label>
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Uma frase sobre o seu estabelecimento" />
                </div>
              </>
            )}

            <button
              type="submit"
              className={`btn btn-gold w-100 mt-2 ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          <p className="signup-login-link">
            Já tem conta? <a href="/login" onClick={(e) => handleNavigation(e, "/login")}>Entrar</a>
          </p>
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
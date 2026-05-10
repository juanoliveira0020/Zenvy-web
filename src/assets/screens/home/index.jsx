import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "../../../firebase/auth";

export default function Home() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleCTA = () => {
    if (user) {
      if (profile?.type === "empresa") navigate("/dashboard");
      else navigate("/categorias");
    } else {
      navigate("/categorias");
    }
  };

  const handleEmpresaCTA = () => {
    if (user && profile?.type === "empresa") navigate("/dashboard");
    else navigate("/cadastro");
  };

  return (
    <div className="aurea-container">
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            Zenvy.
          </a>
          <nav className="header-nav">
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/home"); }}>Início</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/categorias"); }}>Categorias</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            {user ? (
              <>
                <a
                  href="#"
                  className="login"
                  onClick={(e) => {
                    e.preventDefault();
                    if (profile?.type === "empresa") navigate("/dashboard");
                    else navigate("/perfil");
                  }}
                >
                  {profile?.name?.split(" ")[0] || "Perfil"}
                </a>
                <button className="btn btn-gold btn-header" onClick={handleLogout}>Sair</button>
              </>
            ) : (
              <>
                <a href="#" className="login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Entrar</a>
                <a href="#" className="btn btn-gold btn-header" onClick={(e) => { e.preventDefault(); navigate("/cadastro"); }}>Cadastrar</a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="premium-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
              </svg>
              Nova era das reservas premium
            </div>
            <h1>
              Reserve<br />
              experiências<br />
              extraordinárias<br />
              <span>em segundos.</span>
            </h1>
            <p>
              Barbearias, salões, estética e bem-estar. Encontre os melhores estabelecimentos da sua cidade e agende com horários em tempo real.
            </p>
            <div className="hero-actions">
              <a href="#" className="btn btn-gold" onClick={(e) => { e.preventDefault(); handleCTA(); }}>Explorar categorias</a>
              <a href="#" className="btn btn-contoured" onClick={(e) => { e.preventDefault(); handleEmpresaCTA(); }}>Sou um estabelecimento</a>
            </div>
            <div className="stats-grid">
              <div className="stat-item"><h3>2.4k+</h3><p>Estabelecimentos</p></div>
              <div className="stat-item"><h3>98%</h3><p>Satisfação</p></div>
              <div className="stat-item"><h3>24/7</h3><p>Reservas Online</p></div>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-image"></div>
            <div className="next-booking-widget">
              <div className="next-booking-info">
                <h4>Próximo horário</h4>
                <p>Hoje, 14:30</p>
                <p className="place">Noir Barber Club • Corte + Barba</p>
              </div>
              <div className="rating">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
                </svg>
                4.9
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="categories">
        <div className="container">
          <div className="categories-header">
            <div className="categories-title">
              <h4>Categorias</h4>
              <h2>Para cada momento, uma experiência</h2>
            </div>
            <a href="#" className="view-all" onClick={(e) => { e.preventDefault(); navigate("/categorias"); }}>Ver todas →</a>
          </div>
          <div className="category-grid">
            <div className="category-card barber" onClick={() => navigate("/categoria/barbearia")} style={{ cursor: "pointer" }}>
              <div className="category-card-bg"></div>
              <div className="category-content">
                <div className="category-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="6" cy="6" r="3" stroke="#1A1A1A" strokeWidth="2" />
                    <circle cx="18" cy="6" r="3" stroke="#1A1A1A" strokeWidth="2" />
                    <path d="M6 9L18 15M18 9L6 15" stroke="#1A1A1A" strokeWidth="2" />
                  </svg>
                </div>
                <h3>Barbearia</h3>
                <p>Cortes, barba e estilo</p>
              </div>
            </div>
            <div className="category-card manicure" onClick={() => navigate("/categoria/manicure")} style={{ cursor: "pointer" }}>
              <div className="category-card-bg"></div>
              <div className="category-content">
                <div className="category-icon">💅</div>
                <h3>Manicure</h3>
                <p>Unhas impecáveis</p>
              </div>
            </div>
            <div className="category-card spa" onClick={() => navigate("/categoria/spa")} style={{ cursor: "pointer" }}>
              <div className="category-card-bg"></div>
              <div className="category-content">
                <div className="category-icon">🌿</div>
                <h3>Spa</h3>
                <p>Cuidados premium para a pele</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="how-it-works">
        <div className="container">
          <div className="how-inner">
            <h4>Como funciona</h4>
            <h2>Três passos para o seu próximo agendamento</h2>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-icon-num">
                  <div className="step-icon">🔍</div>
                  <div className="step-num">01</div>
                </div>
                <h3>Escolha a categoria</h3>
                <p>Navegue pelos serviços disponíveis e encontre o ideal para você.</p>
              </div>
              <div className="step-item">
                <div className="step-icon-num">
                  <div className="step-icon">📅</div>
                  <div className="step-num">02</div>
                </div>
                <h3>Reserve seu horário</h3>
                <p>Veja disponibilidade em tempo real e selecione o melhor momento.</p>
              </div>
              <div className="step-item">
                <div className="step-icon-num">
                  <div className="step-icon">✨</div>
                  <div className="step-num">03</div>
                </div>
                <h3>Aproveite a experiência</h3>
                <p>Receba a confirmação e curta seu serviço com tranquilidade.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/categorias"); }}>Categorias</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

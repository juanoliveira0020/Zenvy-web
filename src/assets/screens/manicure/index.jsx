import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { getEstablishmentsByCategory } from "../../../firebase/db";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "../../../firebase/auth";

export default function Manicure() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEstablishmentsByCategory("manicure")
      .then(setEstablishments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="aurea-container">
      <header className="header">
        <div className="container">
          <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); navigate("/home"); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            Zenvy.
          </a>
          <nav className="header-nav">
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/home"); }}>Início</a></li>
              <li><a href="#" className="active">Categorias</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            {user ? (
              <>
                <span className="login" style={{ cursor: "default" }}>{profile?.name?.split(" ")[0]}</span>
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

      <div className="category-banner">
        <div className="category-banner-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1920&auto=format&fit=crop')" }}></div>
        <div className="category-banner-overlay"></div>
        <div className="container category-banner-content">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Categorias
          </a>
          <div className="category-title-wrapper">
            <span className="category-title-icon">💅</span>
            <div className="category-title-text">
              <h1>Manicure</h1>
              <p>Unhas impecáveis</p>
            </div>
          </div>
        </div>
      </div>

      <main className="establishments-section">
        <div className="container">
          {loading ? (
            <p className="results-count">Carregando...</p>
          ) : (
            <>
              <p className="results-count">{establishments.length} estabelecimento{establishments.length !== 1 ? "s" : ""} disponíve{establishments.length !== 1 ? "is" : "l"}</p>
              <div className="establishments-grid">
                {establishments.map((est) => (
                  <div key={est.id} className="establishment-card">
                    <div className="est-image" style={{ backgroundImage: `url('${est.imageUrl}')` }}></div>
                    <div className="est-content">
                      <div className="est-header">
                        <h2>{est.name}</h2>
                        <div className="est-rating">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#F2C94C">
                            <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" />
                          </svg>
                          {est.rating}
                        </div>
                      </div>
                      <div className="est-address">{est.address}</div>
                      <p className="est-desc">{est.description}</p>
                      <div className="est-footer">
                        <span className="est-services">Serviços disponíveis</span>
                        <a href="#" className="est-link" onClick={(e) => { e.preventDefault(); navigate(`/manicure/${est.id}`); }}>
                          Ver horários
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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
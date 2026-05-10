import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { getEstablishmentsByCategory } from "../../../firebase/db";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "../../../firebase/auth";

export default function Barbearia() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEstablishmentsByCategory("barbearia")
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
        <div className="category-banner-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920&auto=format&fit=crop')" }}></div>
        <div className="category-banner-overlay"></div>
        <div className="container category-banner-content">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Categorias
          </a>
          <div className="category-title-wrapper">
            <span className="category-title-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M7.14247 16.5C8.01639 17.3739 8.01639 18.7908 7.14247 19.6647C6.26855 20.5387 4.85168 20.5387 3.97775 19.6647C3.10383 18.7908 3.10383 17.3739 3.97775 16.5C4.85168 15.6261 6.26855 15.6261 7.14247 16.5Z" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.8575 16.5C17.7315 15.6261 19.1483 15.6261 20.0222 16.5C20.8962 17.3739 20.8962 18.7908 20.0222 19.6647C19.1483 20.5387 17.7315 20.5387 16.8575 19.6647C15.9836 18.7908 15.9836 17.3739 16.8575 16.5Z" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 5L5 18" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 5L19 18" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="category-title-text">
              <h1>Barbearia</h1>
              <p>Cortes, barba e estilo</p>
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
                        <a href="#" className="est-link" onClick={(e) => { e.preventDefault(); navigate(`/barbearia/${est.id}`); }}>Ver horários</a>
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
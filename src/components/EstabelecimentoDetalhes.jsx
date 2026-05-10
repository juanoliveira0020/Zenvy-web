import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEstablishment, getServices, createBooking, getOccupiedSlots } from "../../../firebase/db";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "../../../firebase/auth";

// Gera os próximos N dias úteis como opções de data
function generateDates(count = 5) {
  const dates = [];
  const now = new Date();
  let current = new Date(now);
  while (dates.length < count) {
    current.setDate(current.getDate() + 1);
    const day = current.getDay();
    if (day !== 0) { // Pula domingo
      const label = current.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" })
        .replace(".", "")
        .toLowerCase();
      const value = current.toISOString().split("T")[0]; // YYYY-MM-DD
      dates.push({ label, value });
    }
  }
  return dates;
}

const ALL_SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00"];

export default function EstabelecimentoDetalhes({ estId }) {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [est, setEst] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState(null);
  const dates = generateDates(5);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [booking, setBooking] = useState({ loading: false, success: false, error: "" });

  // Carrega estabelecimento e serviços
  useEffect(() => {
    if (!estId) return;
    Promise.all([getEstablishment(estId), getServices(estId)])
      .then(([estData, svcData]) => {
        setEst(estData);
        setServices(svcData);
        if (svcData.length > 0) setSelectedService(svcData[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [estId]);

  // Carrega horários ocupados quando data muda
  useEffect(() => {
    if (!estId || !selectedDate) return;
    getOccupiedSlots(estId, selectedDate.value).then(setOccupiedSlots).catch(console.error);
  }, [estId, selectedDate]);

  const isBookingReady = selectedService && selectedDate && selectedTime;

  const handleConfirmBooking = async () => {
    if (!isBookingReady) return;

    if (!user) {
      navigate("/login");
      return;
    }

    setBooking({ loading: true, success: false, error: "" });
    try {
      await createBooking({
        userId: user.uid,
        userName: profile?.name || user.email,
        estId,
        establishmentName: est.name,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
        date: selectedDate.value,
        time: selectedTime,
      });
      setBooking({ loading: false, success: true, error: "" });
      setSelectedTime(null);
      // Atualiza horários ocupados
      getOccupiedSlots(estId, selectedDate.value).then(setOccupiedSlots);
    } catch (err) {
      setBooking({ loading: false, success: false, error: err.message || "Erro ao reservar. Tente novamente." });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#111", color: "#F2C94C" }}>
        Carregando...
      </div>
    );
  }

  if (!est) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#111", color: "#fff", gap: "16px" }}>
        <p>Estabelecimento não encontrado.</p>
        <button onClick={() => navigate(-1)} className="btn btn-gold">Voltar</button>
      </div>
    );
  }

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
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Início</a></li>
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

      {/* BANNER */}
      <div className="studio-banner">
        <div className="studio-banner-bg" style={{ backgroundImage: `url('${est.bannerUrl || est.imageUrl}')` }}></div>
        <div className="studio-banner-overlay"></div>
        <div className="container studio-banner-content">
          <a href="#" className="back-link" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar
          </a>
          <h1 className="studio-title">{est.name}</h1>
          <div className="studio-meta">
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
              </svg>
              {est.address}
            </div>
            <div className="meta-item text-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#F2C94C">
                <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" />
              </svg>
              <span className="font-bold">{est.rating}</span>
              <span className="text-muted">({est.ratingCount})</span>
            </div>
            <div className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {est.openTime} - {est.closeTime}
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <main className="studio-main">
        <div className="container layout-grid">
          
          {/* Coluna Esquerda */}
          <div className="left-column">
            <div className="services-section">
              <h2 className="section-title">Serviços</h2>
              <p className="section-subtitle">Escolha um serviço para ver os horários disponíveis.</p>
              <div className="services-list">
                {services.map((svc) => (
                  <div key={svc.id} className={`service-card ${selectedService?.id === svc.id ? "selected" : ""}`} onClick={() => setSelectedService(svc)}>
                    <div className="service-info">
                      <div className="service-header">
                        <h3>{svc.name}</h3>
                        {selectedService?.id === svc.id && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17L4 12" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="service-time">{svc.duration} min</span>
                    </div>
                    <div className="service-price">R$ {svc.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-section">
              <h2 className="section-title">Sobre</h2>
              <div className="about-content">
                <p>{est.description}</p>
              </div>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="right-column">
            <div className="booking-widget">
              <div className="widget-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 2V6M8 2V6M3 10H21" stroke="#F2C94C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>RESERVAR HORÁRIO</span>
              </div>

              {/* Seletor de Datas */}
              <div className="booking-section">
                <div className="booking-label">Escolha o dia</div>
                <div className="date-selector">
                  {dates.map((d) => (
                    <button key={d.value} className={`date-btn ${selectedDate?.value === d.value ? "active" : ""}`} onClick={() => { setSelectedDate(d); setSelectedTime(null); }}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid de Horários */}
              <div className="booking-section">
                <div className="booking-label">Horários disponíveis</div>
                <div className="time-grid">
                  {ALL_SLOTS.map((time) => {
                    const occupied = occupiedSlots.includes(time);
                    return (
                      <button
                        key={time}
                        className={`time-btn ${selectedTime === time ? "active" : ""} ${occupied ? "occupied" : ""}`}
                        onClick={() => !occupied && setSelectedTime(time)}
                        disabled={occupied}
                        title={occupied ? "Horário indisponível" : ""}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {booking.error && <p style={{ color: "#e74c3c", fontSize: "0.8rem", marginBottom: "8px" }}>{booking.error}</p>}
              {booking.success && <p style={{ color: "#4CAF50", fontSize: "0.8rem", marginBottom: "8px" }}>✅ Reserva realizada com sucesso!</p>}

              <button
                className={`btn-confirm-booking ${!isBookingReady || booking.loading ? "disabled" : "enabled"}`}
                disabled={!isBookingReady || booking.loading}
                onClick={handleConfirmBooking}
              >
                {booking.loading ? "Reservando..." : "Confirmar reserva"}
              </button>

              {!user && (
                <p className="login-warning">
                  <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Faça login</a> para reservar.
                </p>
              )}
            </div>
          </div>

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
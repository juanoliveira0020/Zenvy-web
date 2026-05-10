import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "../../../firebase/auth";
import { updateUserProfile, getUserBookings, updateBookingStatus } from "../../../firebase/db";
import { uploadAvatar } from "../../../firebase/storage";

function getStatusClass(status) {
  switch (status) {
    case "confirmado": return "status-confirmado";
    case "pendente": return "status-pendente";
    case "cancelado": return "status-cancelado";
    case "concluído": return "status-concluido";
    default: return "";
  }
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [activeTab, setActiveTab] = useState("perfil"); // "perfil" | "reservas"

  // Preenche formulário com dados do perfil
  useEffect(() => {
    if (profile) {
      setFormData({ name: profile.name || "", phone: profile.phone || "" });
      if (profile.avatarUrl) setAvatarUrl(profile.avatarUrl);
    }
  }, [profile]);

  // Carrega reservas do usuário
  useEffect(() => {
    if (!user) return;
    getUserBookings(user.uid)
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoadingBookings(false));
  }, [user]);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditAvatarClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setAvatarUrl(preview);

    try {
      const url = await uploadAvatar(user.uid, file);
      await updateUserProfile(user.uid, { avatarUrl: url });
      setAvatarUrl(url);
      await refreshProfile();
    } catch (err) {
      console.error("Erro ao fazer upload:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMsg("");
    try {
      await updateUserProfile(user.uid, formData);
      await refreshProfile();
      setSaveMsg("Dados atualizados com sucesso!");
    } catch (err) {
      setSaveMsg("Erro ao salvar. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await updateBookingStatus(bookingId, "cancelado");
      setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: "cancelado" } : b));
    } catch (err) {
      console.error("Erro ao cancelar:", err);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="aurea-container">
      <header className="header">
        <div className="container">
          <a href="/home" onClick={(e) => handleNavigation(e, "/home")} className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            <span className="logo-text">Zenvy.</span>
          </a>
          <nav className="header-nav">
            <ul>
              <li><a href="/home" onClick={(e) => handleNavigation(e, "/home")}>Explorar</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <span className="user-greeting">Olá, {formData.name.split(" ")[0] || "Usuário"}</span>
            <button onClick={handleLogout} className="btn btn-outline-subtle btn-pill">Sair</button>
          </div>
        </div>
      </header>

      <main className="profile-page">
        <div className="background-strip"></div>

        <div className="profile-card">
          {/* Cabeçalho */}
          <div className="profile-header">
            <div className="profile-avatar">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Foto de perfil" className="avatar-image" />
              ) : (
                <span className="avatar-initials">{formData.name.charAt(0) || "U"}</span>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: "none" }} />
              <button type="button" className="edit-avatar-btn" title="Alterar foto" onClick={handleEditAvatarClick}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="profile-title-group">
              <h2 className="card-title">Meu Perfil</h2>
              <p className="card-subtitle mb-0">Gerencie suas informações e reservas.</p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "24px", borderBottom: "1px solid #2a2a2a", paddingBottom: "0" }}>
            {["perfil", "reservas"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeTab === tab ? "#F2C94C" : "#666",
                  cursor: "pointer",
                  paddingBottom: "12px",
                  fontSize: "0.9rem",
                  fontWeight: activeTab === tab ? "600" : "400",
                  borderBottom: activeTab === tab ? "2px solid #F2C94C" : "2px solid transparent",
                  textTransform: "capitalize",
                  transition: "all 0.2s",
                }}
              >
                {tab === "perfil" ? "Dados Pessoais" : `Minhas Reservas (${bookings.length})`}
              </button>
            ))}
          </div>

          {activeTab === "perfil" && (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome completo</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Celular</label>
                  <input type="tel" id="phone" name="phone" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" value={user?.email || ""} disabled className="input-disabled" />
                <span className="form-hint">Para alterar o e-mail, entre em contato com o suporte.</span>
              </div>

              {saveMsg && <p style={{ color: saveMsg.includes("Erro") ? "#e74c3c" : "#4CAF50", fontSize: "0.875rem", marginBottom: "8px" }}>{saveMsg}</p>}

              <div className="profile-actions">
                <button type="submit" className={`btn btn-gold ${isSaving ? "loading" : ""}`} disabled={isSaving}>
                  {isSaving ? "Salvando..." : "Salvar alterações"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "reservas" && (
            <div>
              {loadingBookings ? (
                <p style={{ color: "#888", textAlign: "center" }}>Carregando reservas...</p>
              ) : bookings.length === 0 ? (
                <div style={{ textAlign: "center", color: "#666", padding: "32px 0" }}>
                  <p>Você ainda não fez nenhuma reserva.</p>
                  <button onClick={() => navigate("/categorias")} className="btn btn-gold" style={{ marginTop: "16px" }}>
                    Explorar categorias
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {bookings.map((b) => (
                    <div key={b.id} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "12px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                      <div>
                        <div style={{ fontWeight: "600", color: "#fff", marginBottom: "4px" }}>{b.establishmentName}</div>
                        <div style={{ color: "#aaa", fontSize: "0.85rem" }}>{b.serviceName} • {b.date} às {b.time}</div>
                        <div style={{ color: "#F2C94C", fontSize: "0.85rem", marginTop: "4px" }}>R$ {b.servicePrice}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span className={`status-badge ${getStatusClass(b.status)}`}>{b.status}</span>
                        {(b.status === "pendente" || b.status === "confirmado") && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e74c3c", background: "transparent", color: "#e74c3c", cursor: "pointer", fontSize: "0.8rem" }}
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
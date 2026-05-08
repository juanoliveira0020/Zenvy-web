import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Profile() {
  const navigate = useNavigate();
  
  // Referência para o input de arquivo oculto
  const fileInputRef = useRef(null);
  
  // Estados preenchidos com dados simulados do usuário
  const [formData, setFormData] = useState({
    name: "Alexandre Silva",
    email: "alexandre@email.com",
    phone: "(11) 98765-4321"
  });
  
  // Novo estado para armazenar a URL da imagem de perfil
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Navegação suave
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para abrir o seletor de arquivos
  const handleEditAvatarClick = (e) => {
    e.preventDefault(); // Evita que o form seja submetido se estiver dentro de um
    fileInputRef.current.click();
  };

  // Função para lidar com a seleção da imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Cria uma URL local para preview da imagem selecionada
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simula o tempo de salvamento na API
    setTimeout(() => {
      setIsSaving(false);
      alert("Dados atualizados com sucesso!");
    }, 1200);
  };

  const handleLogout = () => {
    // Lógica de logout aqui
    navigate("/login");
  };

  return (
    <div className="aurea-container">
      {/* HEADER LOGADO */}
      <header className="header">
        <div className="container">
          <a href="/home" onClick={(e) => handleNavigation(e, '/home')} className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.73 9.77L22 10.42L16.48 15.2L18.18 22L12 18.28L5.82 22L7.52 15.2L2 10.42L9.27 9.77L12 2Z" fill="#F2C94C" />
            </svg>
            <span className="logo-text">Zenvy.</span>
          </a>
          
          <nav className="header-nav">
            <ul>
              <li><a href="/home" onClick={(e) => handleNavigation(e, '/home')}>Explorar</a></li>
            </ul>
          </nav>
          
          <div className="header-actions">
            <span className="user-greeting">Olá, {formData.name.split(' ')[0]}</span>
            <button onClick={handleLogout} className="btn btn-outline-subtle btn-pill">Sair</button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL: PERFIL */}
      <main className="profile-page">
        <div className="background-strip"></div>
        
        <div className="profile-card">
          {/* Cabeçalho do Card de Perfil */}
          <div className="profile-header">
            <div className="profile-avatar">
              {/* Renderiza a imagem se existir, caso contrário renderiza as iniciais */}
              {avatarUrl ? (
                <img src={avatarUrl} alt="Foto de perfil" className="avatar-image" />
              ) : (
                <span className="avatar-initials">
                  {formData.name.charAt(0)}
                </span>
              )}
              
              {/* Input de arquivo oculto */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                style={{ display: "none" }} 
              />
              
              <button 
                type="button" 
                className="edit-avatar-btn" 
                title="Alterar foto"
                onClick={handleEditAvatarClick}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="profile-title-group">
              <h2 className="card-title">Meu Perfil</h2>
              <p className="card-subtitle mb-0">Gerencie suas informações pessoais.</p>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            {/* Row para agrupar inputs em telas grandes */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nome completo</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Celular</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                disabled // E-mail geralmente não é editado diretamente sem confirmação
                className="input-disabled"
              />
              <span className="form-hint">Para alterar o e-mail, entre em contato com o suporte.</span>
            </div>

            <div className="profile-actions">
              <button 
                type="submit" 
                className={`btn btn-gold ${isSaving ? 'loading' : ''}`}
                disabled={isSaving}
              >
                {isSaving ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
          </form>
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
              <li><a href="/termos">Termos de Uso</a></li>
              <li><a href="/privacidade">Privacidade</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
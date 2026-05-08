import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./assets/screens/home";

// TELAS
import Barbearia from "./assets/screens/barbearia";
import Barbearia_Detalhes from "./assets/screens/barbearia_detalhes";
import Cadastro from "./assets/screens/cadastro";
import Categorias from "./assets/screens/categorias";
import Login from "./assets/screens/login";
import Manicure from "./assets/screens/manicure";
import Manicure_Detalhes from "./assets/screens/manicure_detalhes";
import Spa from "./assets/screens/spar";
import Spa_Detalhes from "./assets/screens/spar_detalhes";
import DashboardEmpresa from "./assets/screens/empresas";
import Profile from "./assets/screens/perfil_user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME (PRIMEIRA TELA) */}
        <Route path="/" element={<Home />} />

        {/* DASHBOARD DA EMPRESA */}
        <Route path="/dashboard" element={<DashboardEmpresa />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* CATEGORIAS */}
        <Route path="/categorias" element={<Categorias />} />

        {/* CATEGORIAS ESPECÍFICAS */}
        <Route path="/categoria/barbearia" element={<Barbearia />} />
        <Route path="/categoria/manicure" element={<Manicure />} />
        <Route path="/categoria/spa" element={<Spa />} />
        {/* DETALHES */}
        <Route path="/barbearia/:id" element={<Barbearia_Detalhes />} />
        <Route path="/manicure/:id" element={<Manicure_Detalhes />} />
        <Route path="/spa/:id" element={<Spa_Detalhes />} />
        <Route path="/perfil" element={<Profile />} />

        {/* FALLBACK (opcional, mas recomendado) */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
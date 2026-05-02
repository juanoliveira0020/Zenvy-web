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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME (PRIMEIRA TELA) */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* CATEGORIAS */}
        <Route path="/categorias" element={<Categorias />} />

        {/* CATEGORIAS ESPECÍFICAS */}
        <Route path="/categoria/barbearia" element={<Barbearia />} />
        <Route path="/categoria/manicure" element={<Manicure />} />

        {/* DETALHES */}
        <Route path="/barbearia/:id" element={<Barbearia_Detalhes />} />
        <Route path="/manicure/:id" element={<Manicure_Detalhes />} />

        {/* FALLBACK (opcional, mas recomendado) */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
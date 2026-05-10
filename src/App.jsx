import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// TELAS
import Home from "./assets/screens/home";
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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PÚBLICA */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/categorias" element={<Categorias />} />

          {/* CATEGORIAS */}
          <Route path="/categoria/barbearia" element={<Barbearia />} />
          <Route path="/categoria/manicure" element={<Manicure />} />
          <Route path="/categoria/spa" element={<Spa />} />

          {/* DETALHES (públicas para visualizar, mas reserva exige login) */}
          <Route path="/barbearia/:id" element={<Barbearia_Detalhes />} />
          <Route path="/manicure/:id" element={<Manicure_Detalhes />} />
          <Route path="/spa/:id" element={<Spa_Detalhes />} />

          {/* PROTEGIDAS — apenas clientes logados */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute requiredType="cliente">
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* PROTEGIDAS — apenas empresas logadas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredType="empresa">
                <DashboardEmpresa />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
import React, { useContext, useEffect } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "./pages/auth/Login";
import { NotFound } from "./pages/notFount";

import { LayoutAdmin } from "./layout/LayoutAdmin";
import { DashBoard } from "./pages/DashBoard";
import { Productos } from "./pages/Mantenedor/Productos/Productos";

import { VentaFalsa } from "./pages/VentaFalsa";

import { ListarClientes } from "./pages/Mantenedor/Clientes/ListarUsuarios";
import { ListarAdministradores } from "./pages/Mantenedor/Administradores/ListarAdministradores";
import { ListarCategorias } from "./pages/Mantenedor/Categorias/ListarCategorias";
import { ListarEstados } from "./pages/Mantenedor/Estado/ListarEstados";

const App = () => {

  const RequireAuth = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? children : <Navigate to="/login" />;
  };


  return (

    <Router>
      <Routes>

        <Route path="/" element={<Login />} errorElement={< NotFound />} />
        <Route path="/login" element={<Login />} errorElement={< NotFound />} />



        <Route path="/homeAdmin" element={<RequireAuth> <LayoutAdmin /></RequireAuth>} errorElement={<NotFound />}>
          <Route path="/homeAdmin/" element={<DashBoard />} index />
          <Route path="/homeAdmin/crearProducto" element={<Productos />} />
          <Route path="/homeAdmin/ventaFalsa" element={<VentaFalsa />} />
          <Route path="/homeAdmin/verClientes" element={<ListarClientes />} />
          <Route path="/homeAdmin/verAdministradores" element={<ListarAdministradores />} />
          <Route path="/homeAdmin/verCategorias" element={<ListarCategorias />} />
          <Route path="/homeAdmin/verEstados" element={<ListarEstados />} />
        </Route>


      </Routes>
    </Router>


  )


}

export default App

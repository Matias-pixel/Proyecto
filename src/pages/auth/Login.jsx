import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import fondoLogin from '../../images/fondo-login.png';
import axios from "axios";
import Swal from "sweetalert2";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/accesos/auth/clientes', {
        email: email,
        password: password,
      });

      const cliente = response.data.user;

      console.log(cliente)
      if (cliente) {

        if (cliente.cliente.active === true) {
          dispatch({ type: "LOGIN", payload: cliente });
          if (cliente.cliente.role === 'administrador' || cliente.cliente.role === 'superadministrador') {
            window.location.replace('/homeAdmin')
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Usuario bloqueado",
          });
        }

      } else {
        Swal.fire({
          icon: "error",
          title: "Usuario no encontrado",
        });
      }

      // Aquí podrías manejar el caso de login exitoso

    } catch (error) {
      setPassword('');
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "Las credenciales son incorrectas",
      });
    }
  };

  return (
    <div className="flex h-screen">


      <div className="w-full md:w-5/12 flex flex-col items-center justify-center p-12 bg-white bg-opacity-90">
        <div className="mb-8"></div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
          BIENVENIDO ADMINISTRADOR
        </h1>

        <h2 className="text-xl text-center mb-4">
          Inicia Sesión con tus Credenciales
        </h2>

        <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
          <div className="max-w-xl w-full">
            <input
              className="w-full mt-8 py-1 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-cyan-950"
              id="email"
              placeholder="Correo electrónico"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="max-w-xl w-full">
            <input
              className="w-full mt-8 py-1 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-cyan-950"
              id="password"
              required
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="max-w-xl w-full bg-green-600 hover:bg-green-700 text-white mt-8 py-2 px-4 rounded"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </form>


        <p className="text-center w-full text-sm mt-20">©ExedentX 2024</p>
      </div>
      {/* Sección de la imagen que cubre toda la pantalla */}
      <div className="hidden md:flex w-full md:w-7/12">
        <img
          src={fondoLogin}
          className="w-full h-screen object-cover"
          alt="Background"
        />
      </div>
    </div>
  );
};

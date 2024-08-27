import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "flowbite-react";


import fondoLogin from '../../../images/fondo-login.png'
export const Login = () => {


    return (

        <div className="flex flex-wrap items-center justify-center">
        <div className="w-full md:w-5/12 flex flex-col items-center p-12">
          <div className="mb-8">
            {/* <img src='' className="h-24 w-24" alt="Logo por definir" /> */}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
            BIENVENIDO
          </h1>

          <h2 className="text-xl text-center mb-4">
            Inicia Sesión con tus Credenciales
          </h2>
          <form className="w-full items-center p-12" >
            <div className="max-w-xl w-full">
              <input
                className="w-full mt-8 py-1 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-cyan-950"
                id="email"
                placeholder="Correo electrónico"
                required
                type="email"
              />
            </div>

            <div className="max-w-xl w-full">
              <input
                className="w-full mt-8 py-1 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-cyan-950"
                id="password"
                required
                type="password"
            
                placeholder="Ingrese su contraseña"
             
              />
            </div>

            <div className="max-w-xl w-full text-sm text-gray-500 mt-4 text-center">
              <Link to="#" className="hover:underline">¿Olvidaste tu contraseña?</Link>
            </div>

            <button
              className="max-w-xl w-full bg-cyan-900 hover:bg-cyan-950 text-white mt-8 py-2 px-4 rounded"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="w-full text-sm text-gray-500 text-center mt-4">
            ¿No te encuentras registrado? <a href="#" className="hover:underline">Registrate Aquí</a>
          </div>

          <p className="text-center w-full text-sm mt-20">©ExedentX 2024</p>
        </div>

        <div className="w-full md:w-7/12 hidden md:flex">
          <img
            src={fondoLogin}
            className="w-full h-screen object-cover"
            alt="Background"
          />
        </div>

        
      </div>
   
    )
}
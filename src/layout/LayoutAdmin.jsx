import { Button, Dropdown, Tooltip, Avatar } from "flowbite-react";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";
import { PiRecycle } from "react-icons/pi";
import { Sidebar } from "flowbite-react";
import { useState, useContext } from 'react';
import { HiOutlineChartPie, HiUsers, HiOutlineChartBar, HiShieldExclamation, HiOutlineClipboardList, HiOutlineMenu, HiOutlineLogout } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export const LayoutAdmin = () => {
  const { dispatch } = useContext(AuthContext);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGOUT" });
      await axios.post('http://localhost:3000/accesos/auth/clientes/logout');
      localStorage.clear();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: "Ocurrió un error al cerrar sesión. Por favor, inténtalo de nuevo.",
      });
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between w-full py-4 px-8 h-[8vh] z-50 bg-green-600">
        <div className="flex gap-5 text-center">
          <a href="#" className="flex items-center text-2xl text-pink-50 font-bold">
            ExedentX <span className="text-sm ml-1 pt-5"><PiRecycle /></span>
          </a>
        </div>

        <nav className="flex justify-between gap-10">
          {/* Mostrar el Dropdown solo en pantallas pequeñas */}

          <Tooltip content='Menú' >
            <Dropdown
              arrowIcon={false}
              inline
              label={<HiOutlineMenu alt="User settings" className="lg:hidden xl:hidden " rounded />}

            >
              <Dropdown.Header>
                <span className="block text-sm font-medium text-center text-gray-900 dark:text-white">
                  Opciones
                </span>
              </Dropdown.Header>
              <div className="grid grid-cols-3 gap-3 p-4 w-96 h-60 justify-items-center">
                {/* Opciones del dropdown */}
                <a className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 flex flex-col items-center text-center" href="/homeAdmin/">
                  <HiOutlineChartPie className="text-gray-500 w-6 h-6 mb-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-400">Dashboard</span>
                </a>
                <a className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 flex flex-col items-center text-center" href="/homeAdmin/crearProducto">
                  <HiOutlineChartBar className="text-gray-500 w-6 h-6 mb-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-400">Productos</span>
                </a>
                <a className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 flex flex-col items-center text-center" href="/homeAdmin/verCategorias">
                  <HiOutlineClipboardList className="text-gray-500 w-6 h-6 mb-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-400">Categorias</span>
                </a>
                <a className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 flex flex-col items-center text-center" href="/homeAdmin/verClientes">
                  <HiUsers className="text-gray-500 w-6 h-6 mb-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-400">Clientes</span>
                </a>
                <a className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 flex flex-col items-center text-center" href="/homeAdmin/verAdministradores">
                  <HiShieldExclamation className="text-gray-500 w-6 h-6 mb-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-400">Administradores</span>
                </a>
                <button className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 flex flex-col items-center text-center" onClick={handleLogout}>
                  <HiOutlineLogout className="text-gray-500 w-6 h-6 mb-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-400">Cerrar sesión</span>
                </button>
              </div>

            </Dropdown>
          </Tooltip>


          {/* Tooltip para usuario */}

          <Tooltip content='Menú'>
            <Dropdown arrowIcon={false} inline label={<Avatar img={'/svg.svg'} className="hidden sm:block" alt="User settings" rounded />}>
              <Dropdown.Header>
                <span className="block text-sm">{user.cliente.names} {user.cliente.lastnames}</span>
                <span className="block truncate text-sm font-medium">{user.cliente.email}</span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to={'/homeAdmin/'}>Inicio</Dropdown.Item>
              <Dropdown.Item>Mi cuenta</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
            </Dropdown>
          </Tooltip>


        </nav>
      </header>

      <div className="flex h-[92vh]">
        {/* Sidebar solo visible en pantallas grandes */}
        <Sidebar
          aria-label="Sidebar with content separator example"
          className={`h-full w-64 fixed top-[8vh] left-0 transition-all duration-300 shadow-lg z-40 hidden lg:block`} // Mostrar solo en pantallas grandes
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item as={Link} to="/homeAdmin/" icon={HiOutlineChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/homeAdmin/crearProducto" icon={HiOutlineChartBar}>
                Productos
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/homeAdmin/verCategorias" icon={HiOutlineClipboardList}>
                Categoria
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/homeAdmin/verClientes" icon={HiUsers}>
                Clientes
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/homeAdmin/verAdministradores" icon={HiShieldExclamation}>
                Administradores
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>

        {/* Main content */}
        <main className={`flex-1 p-5 overflow-auto  lg:ml-[16rem] sm:ml-1`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

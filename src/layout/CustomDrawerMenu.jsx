
import { Button, Drawer, Sidebar } from "flowbite-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaComputer } from "react-icons/fa6";
import { PiDeskLight } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { BsNut } from "react-icons/bs";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { FaCarAlt } from "react-icons/fa";
import { VscTools } from "react-icons/vsc";
import { RiAccountPinCircleLine, RiLogoutBoxLine  } from "react-icons/ri";
import { AuthContext } from '../context/AuthContext'
import Swal from "sweetalert2";
import axios from "axios";
export const CustomDrawerMenu = ({ closeDrawer }) => {

   
    const isOpen = true;
    const { dispatch } = useContext(AuthContext);

    const handleLogout = async () => {

        try {
            dispatch({ type: "LOGOUT" });
            await axios.post('http://localhost:3000/accesos/auth/clientes/logout');
            localStorage.removeItem('user')
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

        <Drawer open={isOpen} onClose={closeDrawer} backdrop="false" position="left" className="w-full ">

            <Drawer.Header title="Menú" />


            <Drawer.Items>
                <Sidebar
                    aria-label="Sidebar with multi-level dropdown example"
                    className="[&>div]:bg-transparent [&>div]:p-0 w-full"
                >
                    <div className="flex h-screen flex-col justify-between py-2">
                        <div>
                            <p className="rounded-sm bg-green-600 text-xl text-pink-50 font-semibold">Categorías</p>
                            <Sidebar.Items className="w-full">
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item href="/homeCliente/productos/categoria/Accesorios Tecnológicos" icon={FaComputer}>
                                        Tecnología
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/homeCliente/productos/categoria/Mobiliario" icon={PiDeskLight}>
                                        Mobiliario
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/homeCliente/productos/categoria/Papelería y Suministros de Oficina" icon={IoNewspaperOutline}>
                                        Papelería
                                    </Sidebar.Item>
                                    <Sidebar.Item href="  /homeCliente/productos/categoria/Ropa y Uniformes" icon={GiClothes}>
                                        Ropa
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/homeCliente/productos/categoria/Equipos Industriales" icon={BsNut}>
                                        Equipos Industriales
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/homeCliente/productos/categoria/Electrodomésticos" icon={CgSmartHomeRefrigerator}>
                                        Electrodomésticos
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/homeCliente/productos/categoria/Vehículos y Transporte" icon={FaCarAlt}>
                                        Vehículos
                                    </Sidebar.Item>
                                    <Sidebar.Item href="/homeCliente/productos/categoria/Materiales de Construcción" icon={VscTools}>
                                        Materiales de Construcción
                                    </Sidebar.Item>

                                </Sidebar.ItemGroup>

                                <Sidebar.ItemGroup>
                                    <Sidebar.Item href="/homeCliente/perfil" icon={RiAccountPinCircleLine}>
                                        Mi cuenta
                                    </Sidebar.Item>
                                    <Sidebar.Item   icon={RiLogoutBoxLine}>
                                        <button onClick={handleLogout}>Cerrar sesión</button>
                                    </Sidebar.Item>

                                </Sidebar.ItemGroup>

                            </Sidebar.Items>
                        </div>
                    </div>
                </Sidebar>

            </Drawer.Items>
        </Drawer >
    );
};

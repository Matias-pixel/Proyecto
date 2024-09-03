import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Tooltip, Navbar } from 'flowbite-react';
import { NavbarComponents } from '../components/Navbar';
import Hero from '../components/Hero';

export const Layout = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* <Navbar fluid rounded className="flex z-50 fixed w-full top-0 left-0 bg-[#1E1D3E] "> */}
                {/* <Navbar.Brand>
                    <Tooltip content="Menú">
                        
                    </Tooltip>
                </Navbar.Brand> */}

                {/* <Navbar.Collapse className="flex justify-center">
                    <Navbar.Link as={Link} to="/home" className="mx-4">
                        <Tooltip content="Inicio">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Tooltip>
                    </Navbar.Link>

                    <Navbar.Link as={Link} to="/login" className=" flex justify-end mx-4">
                        <Tooltip content="Iniciar sesión">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>

                        </Tooltip>
                    </Navbar.Link>
                </Navbar.Collapse> */}



            {/* </Navbar> */}
            <NavbarComponents />
            

            <div className='flex pt-20'> {/* Ajustar el padding-top para que coincida con la nueva altura del Navbar */}
                <main className='flex-grow ml-0 md:ml-56 mt-0 pl-5'>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

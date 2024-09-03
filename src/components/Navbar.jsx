import { Tooltip } from "flowbite-react";
import { useState } from "react";
import {
  RiCheckboxBlankCircleFill,
  RiMenu3Fill,
  RiCloseLine,
} from "react-icons/ri";

export const NavbarComponents = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="flex items-center justify-between xl:justify-start w-full py-4 px-8 h-[8vh] z-50 bg-green-600">
      <div className="xl:w-1/6 text-center -mt-4">
        <a href="#" className="text-2xl text-pink-50 font-bold relative p-1">
          ExedentX<span className="text-primary text-5xl">.</span>{" "}
          <RiCheckboxBlankCircleFill className="absolute -left-3 -bottom-3 text-primary -z-10" />
        </a>
      </div>
      <nav
        className={`fixed bg-green-600 w-[80%] md:w-[40%] xl:w-full h-full ${showMenu ? "left-0" : "-left-full"} top-0 xl:static flex-1 flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-10 transition-all duration-500 z-50`}
      >
        <div className="flex flex-col xl:flex-row items-center gap-10">
          {/* Aquí puedes agregar otros enlaces del menú si es necesario */}
        </div>

        <div className="flex justify-end w-full xl:w-auto">
          <Tooltip content="Iniciar sesión">
            <a href="/" className="xl:ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </a>
          </Tooltip>
        </div>
      </nav>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden text-2xl p-2"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
    </header>
  );
};


import { Button } from "flowbite-react";
import { RiMailFill} from "react-icons/ri";

export const ContactoComponent = () => {
    return (
        <div
            id="contacto"
            className="grid bg-gray-100 grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 p-8 md:p-12 xl:p-20"
        >
            <div className="flex flex-col gap-4">
                <h1 className="text-[30px] font-bold">Contactanos!</h1>
                <p className="text-[20px] text-gray-500">
                    ¿Tienes preguntas? No dude en contactarnos utilizando la siguiente información. ¡Estamos aquí para ayudar!
                </p>
                <form className="w-full mt-12">
                    <div className="relative">
                        <RiMailFill className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500 text-xl" />
                        <input
                            type="text"
                            className="w-full bg-gray-100 py-4 pl-10 pr-36 rounded-xl outline-none"
                            placeholder="Ingresa tu correo electrónico"
                        />
                        <Button
                            type="submit"
                            className="absolute font-semibold bg-green-600  px-6  text-white  top-1/2 -translate-y-1/2 right-2"
                        >
                            Enviar
                        </Button>
                    </div>
                </form>
            </div>
            {/* Services */}
            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>

                    <h3 className="text-[20px] font-bold">Técnico</h3>
                    <p className="text-gray-500">
                        ExcedentXTecnico@gmail.com
                    </p>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                    </svg>

                    <h3 className="text-[20px] font-bold">Comercial</h3>
                    <p className="text-gray-500">
                        ExcedentXComercial@gmail.com
                    </p>
                </div>
            </div>
        </div>
    );
};



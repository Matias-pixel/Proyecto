import { Button } from "flowbite-react";
import imagen from '../images/fondo-login.png';
import { RiSearchLine,RiContactsBook2Fill  } from "react-icons/ri";


const Hero = () => {

  


  return (
    <section id="home" className="min-h-[80vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${imagen})` }}>
      <div className="text-center p-8 xl:p-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl xl:text-7xl font-bold text-white xl:leading-[7.5rem]">
            Compra y Venta de articulos Excedentes: Calidad a Precios reducidos
          </h1>
          <p className="text-gray-200 text-xl xl:text-3xl leading-relaxed">
          Somos una página dedicada a la compra y venta de artículos excedentes, ofreciendo soluciones intuitivas y adaptadas a los objetivos comerciales de nuestros clientes. Proveemos servicios de alta calidad.
          </p>
          <div className="flex flex-col justify-center md:flex-row items-center gap-4">
            <Button className="w-full xl:w-auto bg-blue-600 text-white py-2 px-8 rounded-xl text-xl">
             <RiContactsBook2Fill className="mr-2" /> Contactanos
            </Button>
            <Button className="w-full xl:w-auto bg-green-600 text-white py-2 px-8 rounded-xl text-xl flex items-center">
              <RiSearchLine className="mr-2" /> Explora Productos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

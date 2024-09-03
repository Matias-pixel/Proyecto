
import { NavbarComponents } from "../components/Navbar";
import Hero from "../components/Hero";
import { InfoComponent } from "../components/Info";
import { FooterComponent } from "../components/Footer";
import { ContactoComponent } from "../components/Contacto";
import { QuienesSomosComponent } from "../components/QuienesSomosComponent";

export const Home = () => {
  return (
      <>
        <NavbarComponents />
        <Hero/>
        <QuienesSomosComponent />
        <InfoComponent />
        <ContactoComponent />
        <FooterComponent />
      </>
    );
}
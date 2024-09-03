
import { Footer } from "flowbite-react";
// import {
//   RiInstagramLine,
//   RiFacebookLine,
//   RiTwitterLine,
//   RiGithubLine,
// } from "react-icons/ri";

export const FooterComponent = () => {
  return (

    <Footer container className="bg-green-600 rounded-none">
      <div className="w-full text-center ">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-center">ExcedentX</h2>
          </div>

          {/* <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup> */}
        </div>
        <Footer.Divider />
        <Footer.Copyright className="text-black font-semibold " href="#" by="@ExcedentX" year={2024} />
      </div>
    </Footer>
  );
};



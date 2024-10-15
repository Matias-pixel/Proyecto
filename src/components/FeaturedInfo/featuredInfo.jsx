import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { PiArrowBendLeftUpLight } from "react-icons/pi";
import { PiArrowBendRightDownBold } from "react-icons/pi";
import axios from "axios";
export default function FeaturedInfo() {

  const [data, setData] = useState([]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript empiezan desde 0


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/finanzas');
        setData(response.data.ventas);
   
      } catch (error) {
        console.error('Error fetching ventas:', error);
      }
    };

    fetchData();
  }, []);



  const totalMesActual = Object.entries(data)
    .filter(([fechaVenta, _]) => {
      const [year, month] = fechaVenta.split('-').map(Number);
      return year === currentYear && month === currentMonth;
    })
    .reduce((total, [_, monto]) => total + monto, 0);

    const totalAñoActual = Object.entries(data)
    .filter(([fechaVenta, _]) => {
        const [year] = fechaVenta.split('-').map(Number);
        return year === currentYear;
    })
    .reduce((total, [_, monto]) => total + monto, 0);



  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle text-xl">Ventas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${totalMesActual}</span>
          
        </div>
        <span className="featuredSub">En el año</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Ventas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${totalAñoActual}</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <PiArrowBendRightDownBold className="featuredIcon negative" />
          </span> */}
        </div>
        <span className="featuredSub">En el mes</span>
      </div>
    </div>
  );
}

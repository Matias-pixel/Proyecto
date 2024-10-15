import { Button } from "flowbite-react"
import axios from "axios"


export const VentaFalsa = () =>{

    const ventaData = {
        monto: Number(10000),
        moneda: 'CLP',
        fechaVenta: '2022-12-06',
        nombreComprador: 'Daniel',
        producto: 'Telefono',
        cantidad: 2
    }


    const hacerVenta = async()=>{
        
        await axios.post('http://localhost:3000/finanzas/postVenta', ventaData);



    }


    return(

        <>
        
            <Button onClick={hacerVenta}>Hacer venta falsa</Button>
        
        </>
    )
}
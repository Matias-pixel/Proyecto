import axios from "axios"
import { useEffect, useState } from "react"
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import FeaturedInfo from "../components/FeaturedInfo/featuredInfo";
import { DataGrid } from "@mui/x-data-grid";


export const DashBoard = () => {

    const [data, setData] = useState([]);

    const [usuarios, setUsuarios] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/usuarios/getUsuariosByDate');
                const usuariosData = response.data.users.map((usuario) => ({
                    id: usuario.uid,
                    email: usuario.email,
                    lastLogin: usuario.lastLogin
                }))
                setUsuarios(usuariosData);
            } catch (error) {
                console.error('Error fetching ventas:', error);
            }
        };

        fetchData();
    }, []);

    const columnas = [
        {
            field: 'id',
            headerName: 'ID',
            width: 250
        },
        {
            field: 'email',
            headerName: 'Correo electrónico',
            width: 250
        },
        {
            field: 'lastLogin',
            headerName: 'última vez accedido',
            width: 300
        }
    ]

    // Convertir el objeto de ventas a un array para usarlo en el gráfico
    console.log('DATA', data)
    const ventas = Object.entries(data).map(([fechaVenta, monto]) => ({ fechaVenta, monto }));
    console.log('VENTAS', ventas)
    return (

        <>
            <div className="container mx-auto">
                <div className="max-w-full">
                    <div className="flex">
                        <FeaturedInfo />
                    </div>
                    <div className="container  rounded-md bg-slate-50">
                        <LineChart
                            className="pt-10"
                            width={1400}
                            height={400}
                            data={ventas}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <XAxis dataKey="fechaVenta" />
                            <YAxis dataKey="monto" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="monto" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>

                </div>


                <div className="container max-w-full pt-5">
                    <p className="text-xl">Último acceso por los usuarios</p>
                    <DataGrid
                        rows={usuarios}
                        columns={columnas}
                        getRowId={(row) => row.id}
                    />
                </div>
            </div>


        </>
    )

} 
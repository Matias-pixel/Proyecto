import axios from "axios";
import { useEffect, useState } from "react";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import FeaturedInfo from "../components/FeaturedInfo/featuredInfo";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";

export const DashBoard = () => {
    const [data, setData] = useState([]); // Datos de ventas
    const [usuarios, setUsuarios] = useState([]); // Datos de usuarios
    const [startDate, setStartDate] = useState(""); // Estado para la fecha de inicio
    const [endDate, setEndDate] = useState(""); // Estado para la fecha de fin

    const fetchData = async (start, end) => {
        try {
            const response = await axios.get(`http://localhost:3000/finanzas`, {
                params: { startDate: start, endDate: end } // Enviamos las fechas como parámetros
            });
            setData(response.data.ventas);
        } catch (error) {
            console.error('Error fetching ventas:', error);
        }
    };

    useEffect(() => {
        const fetchDataUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/usuarios/getUsuariosByDate');
                const usuariosData = response.data.users.map((usuario) => ({
                    id: usuario.uid,
                    email: usuario.email,
                    lastLogin: usuario.lastLogin
                }));
                setUsuarios(usuariosData);
            } catch (error) {
                console.error('Error fetching usuarios:', error);
            }
        };

        fetchDataUsuarios();
    }, []);

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === "start") {
            setStartDate(value);
        } else {
            setEndDate(value);
        }
    };

    const handleFetchData = () => {
        if (startDate && endDate) { // Verificar que las fechas estén definidas
            fetchData(startDate, endDate);
        } else {
            Swal.fire({
                icon: "warning",
                title: "Por favor, selecciona ambas fechas.",
            });
        }
    };

    const columnas = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'email', headerName: 'Correo electrónico', width: 250 },
        { field: 'lastLogin', headerName: 'Última vez accedido', width: 300 }
    ];

    // Convertir el objeto de ventas a un array para usarlo en el gráfico
    const ventas = Object.entries(data).map(([fechaVenta, monto]) => ({ fechaVenta, monto }));

    return (
        <>
            <div className="container mx-auto">
                <div className="max-w-full">
                    <div className="">
                        <FeaturedInfo />
                    </div>
                    <div className="container rounded-md bg-slate-50">
                        <div className="flex my-5 flex-col sm:flex-row space-x-4 ">
                            <input
                                type="date"
                                name="start"
                                value={startDate}
                                onChange={handleDateChange}
                                className="border p-2 rounded"
                            />
                            <input
                                type="date"
                                name="end"
                                value={endDate}
                                onChange={handleDateChange}
                                className="border p-2 rounded"
                            />
                            <button
                                onClick={handleFetchData} // Llama a la función para obtener datos
                                className="bg-green-600 text-white p-2 rounded"
                            >
                                Obtener Ventas
                            </button>
                        </div>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                className="pt-10"
                                data={ventas}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <XAxis dataKey="fechaVenta" />
                                <YAxis dataKey="monto" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="monto" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
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
    );
};

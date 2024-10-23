import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Delete } from '@mui/icons-material';

import { Button, TextInput } from "flowbite-react"




export const ListarClientes = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState(""); // Para la barra de búsqueda

    const [gun, setGun] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/clientes/allClientes');
                const clienteData = response.data.clientes.map((noti) => ({
                    id: noti.id,
                    ...noti.data,
                }));
                setUsuarios(clienteData);
            } catch (error) {
                console.error('Error fetching ventas:', error);
            }
        };
        fetchData();
    }, [gun]);

    // Filtrar usuarios según la búsqueda
    const filteredUsuarios = usuarios.filter((usuario) =>
        usuario.names.toLowerCase().includes(busqueda.toLowerCase())
    );



    const handleDelete = async (id, active) => {

        try {
            const result = await Swal.fire({
                title: `¿Estás seguro de querer ${active === false ? 'Habilitar' : 'deshabilitar'} al cliente?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `${active === false ? 'Habilitar' : 'deshabilitar'}`,
                confirmButtonColor: `${active === false ? '#00ff00' : '76ff03'}`
            });
            if (result.isConfirmed) {
                const body = { active: !active }
                const response = await axios.put(`http://localhost:3000/clientes/deshabilitar/${id}`, body)
                setGun(gun + 1)
                if (response.status === 200) {
                    Swal.fire({
                        title: '¡Éxito!',
                        text: active === false ? 'El cliente ha sido habilitado.' : 'El cliente ha sido deshabilitado.',
                        icon: 'success'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al cambiar el estado del cliente.',
                        icon: 'error'
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al cambiar el estado del cliente.',
                icon: 'error'
            });
        }


    };

    const columnas = [
        {
            field: 'id',
            headerName: 'ID',
            width: 300,
            renderCell: (params) => (
                <p className="text-normal font-semibold">{params.row.id}</p>
            )
        },
        {
            field: 'names',
            headerName: 'Nombre',
            width: 250,
            renderCell: (params) => (
                <p className="text-normal font-semibold">{params.row.names}</p>
            )
        },
        {
            field: 'lastnames',
            headerName: 'Apellidos',
            width: 250,
            renderCell: (params) => (
                <p className="text-normal font-semibold">{params.row.lastnames}</p>
            )
        },
        {
            field: 'email',
            headerName: 'Correo electrónico',
            width: 300,
            renderCell: (params) => (
                <p className="text-normal font-semibold">{params.row.email}</p>
            )
        },
        {
            field: 'role',
            headerName: 'Rol',
            width: 150,
            renderCell: (params) => (
                <p className="text-normal font-semibold">{params.row.role[0].toUpperCase() + params.row.role.substring(1)}</p>
            )
        },
        {
            field: 'active',
            headerName: 'Estado',
            width: 150,
            renderCell: (params) => (
                <div className="flex items-center">
                    {/* Círculo de color que cambia según el estado */}
                    <span className={`h-2.5 w-2.5 rounded-full mr-2 ${params.row.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {/* Texto que cambia según el estado */}
                    <span className="font-semibold">{params.row.active ? 'Activo' : 'Inactivo'}</span>
                </div>
            ),
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 100,
            renderCell: (params) => {
                const { id, active } = params.row;

                return (
                    <>
                        <div className="flex gap-1">

                            <Button onClick={() => { handleDelete(id, active) }} color="failure"> <Delete /></Button>

                        </div>
                    </>
                )
            }
        },
    ];

    return (
        <>
            <div className="container max-w-full pt-5">
                <p className="text-2xl font-bold">Todos los clientes</p>
                <div className="flex justify-between mt-2">
                    <div className="w-full sm:w-auto">
                        <TextInput
                            className="w-full sm:w-40 md:w-96"
                            id="base"
                            onChange={(e) => setBusqueda(e.target.value)}
                            value={busqueda}
                            type="text"
                            placeholder="Buscar cliente"
                            sizing="md"
                        />
                    </div>
                </div>



                <DataGrid
                    rows={filteredUsuarios}
                    className="mt-10"
                    columns={columnas}
                    getRowId={(row) => row.id}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    autoHeight
                />
            </div>
        </>
    );
};

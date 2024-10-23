import Swal from "sweetalert2"
import axios from "axios"
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextInput } from "flowbite-react";
import { Edit, Delete } from '@mui/icons-material';
import { ModalNewAdministrador } from "./ModalNewAdministrador";


export const ListarAdministradores = () => {
    const [openModal, setOpenModal] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState(""); // Para la barra de búsqueda


    const [gun, setGun] = useState(0)



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/');

                console.log(response)
                const clienteData = response.data.administradores.map((noti) => ({
                    id: noti.id,
                    ...noti.data,

                }));
                setUsuarios(clienteData)
            } catch (error) {
                console.error('Error fetching administradores:', error);
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
                title: `¿Estás seguro de querer ${active === false ? 'Habilitar' : 'deshabilitar'} al administrador?`,
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
                        text: active === false ? 'El administrador ha sido habilitado.' : 'El administrador ha sido deshabilitado.',
                        icon: 'success'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al cambiar el estado del administrador.',
                        icon: 'error'
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al cambiar el estado del administrador.',
                icon: 'error'
            });
        }
    };

    const abrirModal = () => {
        setOpenModal(true);
    };

    const cerrarModal = () => {
        setOpenModal(false);
    };



    const columnas = [
        {
            field: 'id',
            headerName: 'ID',
            width: 250,
            renderCell: (params) => (
                <p className="text-normal font-semibold">{params.row.id}</p>
            )
        },
        {
            field: 'names',
            headerName: 'Nombre',
            width: 150,
            renderCell: (params) => (
                <p className="text-normal font-semibold">{params.row.names}</p>
            )
        },
        {
            field: 'lastnames',
            headerName: 'Apellidos',
            width: 200,
            renderCell: (params) => (
                <p className="text-normal font-semibold">{params.row.lastnames}</p>
            )
        },
        {
            field: 'email',
            headerName: 'Correo electrónico',
            width: 220,
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
            width: 400,
            renderCell: (params) => {
                const { id, active } = params.row
                return (
                    <div className="flex gap-1">
                        {/* <Button onClick={() => handleEdit(params.row.id)} color="success"> <Edit /> Editar</Button> */}
                        <Button onClick={() => { handleDelete(id, active) }} color="failure"> <Delete /></Button>
                    </div>
                )
            }
        },
    ];




    return (

        <>
            <div className="container max-w-full pt-5">

                <p className="text-2xl font-bold">Todos los administradores</p>

                <div className="flex justify-between mt-2">
                    <div>

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
                    <div >
                        <Button onClick={() => { abrirModal() }} className="bg-green-600 text-xl font-bold">+ Agregrar administrador</Button>
                    </div>
                </div>
                <ModalNewAdministrador isOpen={openModal} onClose={cerrarModal} />



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
    )
}
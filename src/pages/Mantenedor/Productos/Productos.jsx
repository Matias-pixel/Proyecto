import { Button, TextInput } from "flowbite-react"
import { ModalNewProduct } from "./Components/ModalNewProduct"
import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid"; // Importa GridToolbarContainer y GridToolbarExport
import axios from "axios";
import { Edit, Delete } from '@mui/icons-material';
import Swal from "sweetalert2";
import { ModalEditProducto } from "./Components/ModalEditProducto";
import { Toolbar } from "@mui/material";

export const Productos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [busqueda, setBusqueda] = useState(""); // Para la barra de búsqueda
  const [productos, setProductos] = useState([]);

  const [gun, setGun] = useState(0);

  const [productoId, setProductoId] = useState('');
  const [openModalEditProducto, setOpenModalEditProducto] = useState(false);

  // Filtrar usuarios según la búsqueda
  const filteredProductos = productos.filter((productos) =>
    productos.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/productos/getAllProductos"
        );
        const productosData = response.data.productos.map((producto) => ({
          id: producto.id,
          ...producto.data
        }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error fetching productos:", error);
        Swal.fire({
          icon: "error",
          title: "Error al obtener los productos",
          text: "Hubo un problema al obtener los productos. Por favor, inténtalo de nuevo.",
        });
      }
    };
    fetchData();
  }, [gun]);

  const abrirModal = () => {
    setOpenModal(true);
  };

  const cerrarModal = () => {
    setOpenModal(false);
  };


  const abrirModalEditProducto = () => {
    setOpenModalEditProducto(true);
  }

  const cerrarModalEditProducto = () => {
    setOpenModalEditProducto(false);
  }



  // Funciones para los botones
  const handleEdit = (id) => {
    setProductoId(id);
    abrirModalEditProducto();
  };

  const handleDelete = async (id, active) => {

    try {
      const result = await Swal.fire({
        title: `¿Estás seguro de querer ${active === false ? 'Habilitar' : 'deshabilitar'} el producto?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `${active === false ? 'Habilitar' : 'deshabilitar'}`,
        confirmButtonColor: `${active === false ? '#00ff00' : '76ff03'}`
      });
      if (result.isConfirmed) {
        const body = { active: !active }
        const response = await axios.put(`http://localhost:3000/productos/deshabilitar/${id}`, body)
        setGun(gun + 1)
        if (response.status === 200) {
          Swal.fire({
            title: '¡Éxito!',
            text: active === false ? 'El producto ha sido habilitado.' : 'El producto ha sido deshabilitado.',
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al cambiar el estado de del cliente.',
            icon: 'error'
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al cambiar el estado de del cliente.',
        icon: 'error'
      });
    }
  };

  const columna = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
      renderCell: (params) => (
        <p className="text-normal font-semibold">{params.row.id}</p>
      )
    },
    {
      field: 'name',
      headerName: 'Nombre del producto',
      width: 200,
      renderCell: (params) => (
        <p className="text-normal font-semibold">{params.row.name}</p>
      )
    },
    {
      field: 'category',
      headerName: 'Categoria',
      width: 200,
      renderCell: (params) => (
        <p className="text-normal font-semibold">{params.row.category}</p>
      )
    },
    {
      field: 'brand',
      headerName: 'Marca',
      width: 200,
      renderCell: (params) => (
        <p className="text-normal font-semibold">{params.row.brand}</p>
      )
    },
    {
      field: 'price',
      headerName: 'Precio',
      width: 100,
      renderCell: (params) => (
        <p className="text-normal font-semibold">{params.row.price}</p>
      )
    },
    {
      field: 'total',
      headerName: 'Cantidad',
      width: 100,
      renderCell: (params) => (
        <p className="text-normal font-semibold">{params.row.total}</p>
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
        const { id, active } = params.row;
        return (
          <div className="flex gap-1">
            <Button onClick={() => handleEdit(id)} color="success"> <Edit /></Button>
            <Button onClick={() => { handleDelete(id, active) }} color="failure"> <Delete /></Button>
          </div>
        )
      }
    },
  ]



  return (
    <div className="max-w-full pt-5">

      <p className="text-2xl font-bold">Todos los productos</p>

      <div className="grid gap-4 xl:grid-cols-2 md:grid-cols-1">
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
        <div className="flex mt-0  xl:justify-end xl:pt-5 ">
          <Button onClick={() => { abrirModal() }} className="text-xl bg-green-600 font-bold">+ Agregrar producto</Button>
        </div>
      </div>

      < ModalNewProduct isOpen={openModal} onClose={cerrarModal} />

      <ModalEditProducto isOpen={openModalEditProducto} onClose={cerrarModalEditProducto} id={productoId} />



      <DataGrid
        rows={filteredProductos}
        className="mt-10"
        columns={columna}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50, 100]}

      />
    </div>
  )
}
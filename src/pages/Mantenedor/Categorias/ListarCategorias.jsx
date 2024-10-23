import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid"; // Importa GridToolbarContainer y GridToolbarExport
import { Button, TextInput } from "flowbite-react";
import { Edit, Delete } from '@mui/icons-material';
import { ModalNewCategory } from "./ModalNewCategory";
import { ModalEditCategory } from "./ModalEditCategory";


// Barra de herramientas personalizada
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport /> {/* Agregamos la opción de exportación */}
    </GridToolbarContainer>
  );
}

export const ListarCategorias = () => {
  const [openModal, setOpenModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [busqueda, setBusqueda] = useState(""); // Para la barra de búsqueda
  const [openModalEditCategoria, setOpenModalEditCategoria] = useState(false);
  const [gun, setGun] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categorias/getCategoria');
        const categoriaData = response.data.categorias.map((cate) => ({
          id: cate.id,
          ...cate.data,
        }));
        setCategorias(categoriaData);
      } catch (error) {
        console.error('Error fetching administradores:', error);
      }
    };

    fetchData();
  }, [gun]);

  // Filtrar usuarios según la búsqueda
  const filterCategoria = categorias.filter((categoria) =>
    categoria.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleDelete = async (id, active) => {
    try {
      const result = await Swal.fire({
        title: `¿Estás seguro de querer ${active === false ? 'Habilitar' : 'Deshabilitar'} la categoría?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `${active === false ? 'Habilitar' : 'Deshabilitar'}`,
        confirmButtonColor: `${active === false ? '#00ff00' : '76ff03'}`
      });
      if (result.isConfirmed) {
        const body = { active: !active };
        const response = await axios.put(`http://localhost:3000/categorias/deshabilitar/${id}`, body);
        setGun(gun + 1);
        if (response.status === 200) {
          Swal.fire({
            title: '¡Éxito!',
            text: active === false ? 'La categoría ha sido habilitada.' : 'La categoría ha sido deshabilitada.',
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al cambiar el estado de la categoría.',
            icon: 'error'
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al cambiar el estado.',
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

  const abrirModalEditCategoria = () => {
    setOpenModalEditCategoria(true);
  };

  const cerrarModalEditCategoria = () => {
    setOpenModalEditCategoria(false);
  };

  const handleEdit = (id) => {
    setProductoId(id);
    abrirModalEditCategoria();
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
      field: 'name',
      headerName: 'Nombre',
      width: 300,
      renderCell: (params) => (
        <p className="text-normal font-semibold">{params.row.name}</p>
      )
    },
    {
      field: 'active',
      headerName: 'Estado',
      width: 300,
      renderCell: (params) => (
        <div className="flex items-center">
          <span className={`h-2.5 w-2.5 rounded-full mr-2 ${params.row.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
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
            <Button onClick={() => handleEdit(id)} color="success"><Edit /></Button>
            <Button onClick={() => { handleDelete(id, active); }} color="failure"><Delete /></Button>
          </div>
        );
      }
    },
  ];

  return (
    <>
      <div className="container max-w-full pt-5">
        <p className="text-2xl font-bold">Todas las categorias</p>

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
          <div className="flex mt-0  xl:justify-end xl:pt-5">
            <Button onClick={abrirModal} className="text-xl font-bold bg-green-600">+ Agregar categoria</Button>
          </div>
        </div>

        <ModalNewCategory isOpen={openModal} onClose={cerrarModal} />
        <ModalEditCategory isOpen={openModalEditCategoria} onClose={cerrarModalEditCategoria} id={productoId} />

        <div style={{ height: 600, width: '100%' }} className="mt-10">
          <DataGrid
            rows={filterCategoria}
            columns={columnas}
            getRowId={(row) => row.id}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50, 100]}
            components={{
              Toolbar: CustomToolbar, // Utilizamos la barra de herramientas personalizada
            }}
          />
        </div>
      </div>
    </>
  );
};

import { Button, Label, Modal, TextInput, Textarea, FileInput, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
export const ModalNewProduct = ({ isOpen, onClose }) => {

    const [categorias, setCategorias] = useState([])

    const [estados, setEstados] = useState([])
    // Estados para los inputs
    const [formState, setFormState] = useState({
        name: '',
        category: '',
        estado: '',
        brand: '',
        price: '',
        details: '',
        total: '',
        active: true,
        file: null,
    });

    const { name, category, brand, price, details, total, file, estado } = formState;

    const resetForm = () => {
        setFormState({
            name: '',
            category: '',
            brand: '',
            price: '',
            details: '',
            total: '',
            file: null,
            estado: '',
            active: true
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !category || !brand || !price || !details || !total || !file || !estado) {
            Swal.fire({
                icon: "error",
                title: "Error al crear el producto!",
                text: "Faltan datos en la solicitud.",
            });
        } else {
            try {
                // Crear el objeto FormData
                console.log(formState)
                const formData = new FormData();
                formData.append("name", name);
                formData.append("category", category);
                formData.append("brand", brand);
                formData.append("price", price);
                formData.append("details", details);
                formData.append("total", total);
                formData.append("file", file);
                formData.append('active', true)
                formData.append('estado', estado)

                console.log('FORMSTATE', formState)
                await axios.post("http://localhost:3000/productos/crearProducto", formData);
                Swal.fire({
                    icon: "success",
                    title: "Éxito!",
                    text: "El producto fue añadido con éxito."
                });
                resetForm();
                // Cerrar el modal
                onClose();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error al crear el producto!",
                });
                console.log('El error es: ', error)
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categorias/getCategoriaActive');
                const categoriaData = response.data.categorias.map((cate) => ({
                    id: cate.id,
                    ...cate.data,
                }));
                setCategorias(categoriaData)
            } catch (error) {
                console.error('Error fetching categorias:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/estados/Dos');

                // console.log('RESPONSE',response)
                const estadoData = response.data.estados.map((cate) => ({
                    id: cate.id,
                    ...cate.data,
                }));
                setEstados(estadoData)
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <Modal size={'3xl'} dismissible show={isOpen} onClose={handleClose}>
            <Modal.Header>Subir nuevo producto</Modal.Header>
            <Modal.Body>
                <form encType="multipart/form-data" onSubmit={handleSubmit} method="post">
                    <div className="space-y-6">
                        {/* Nombre del Producto */}
                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
                            <div>
                                <Label htmlFor="productName" value="Nombre del producto" />
                                <TextInput
                                    id="productName"
                                    className="pt-3"
                                    value={name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Categoría */}
                            <div>
                                <Label htmlFor="category" value="Categoría del producto" />
                                <Select className="pt-3" id="category" value={category} onChange={(e) => setFormState({ ...formState, category: e.target.value })} required>
                                    <option value=""></option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.name}>
                                            {categoria.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        {/* Marca y Precio */}
                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
                            <div>
                                <Label htmlFor="brand" value="Marca del producto" />
                                <TextInput
                                    id="brand"
                                    value={brand}
                                    onChange={(e) => setFormState({ ...formState, brand: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="price" value="Precio del producto" />
                                <TextInput
                                    id="price"
                                    value={price}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">

                            {/* Cantidad */}

                            <div>
                                <Label htmlFor="total" value="Cantidad" />
                                <TextInput
                                    id="total"
                                    value={total}
                                    type="number"
                                    min={0}
                                    onChange={(e) => setFormState({ ...formState, total: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Categoría */}
                            <div>
                                <Label htmlFor="category" value="Estado del producto" />
                                <Select id="category" value={estado} onChange={(e) => setFormState({ ...formState, estado: e.target.value })} required>
                                    <option value=""></option>
                                    {estados.map((estado) => (
                                        <option key={estado.id} value={estado.name}>
                                            {estado.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                        </div>


                        {/* Detalles del producto */}
                        <div>
                            <Label htmlFor="productDetails" value="Detalles del producto" />
                            <Textarea
                                id="productDetails"
                                placeholder="Detalles técnicos del producto..."
                                value={details}
                                onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                                rows={4}
                                required
                            />
                        </div>

                        {/* Cargar archivo */}
                        <div className="flex w-full items-center justify-center">
                            <Label
                                htmlFor="dropzone-file"
                                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Haz clic para cargar</span> o arrastra y suelta
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Solo JPG y PNG</p>
                                </div>
                                <FileInput
                                    id="dropzone-file"
                                    className="hidden"
                                    onChange={(e) => setFormState({ ...formState, file: e.target.files[0] })}
                                    required
                                />
                            </Label>
                        </div>
                    </div>

                    <Button className="mt-3" type="submit">
                        Añadir producto
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

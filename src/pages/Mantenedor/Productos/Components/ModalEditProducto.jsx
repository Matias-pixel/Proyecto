import { Button, Label, Modal, TextInput, Textarea, FileInput, ToggleSwitch, Select } from "flowbite-react";
import axios from 'axios';
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export const ModalEditProducto = ({ isOpen, onClose, id }) => {
    const [switch2, setSwitch2] = useState(false);
    const [categorias, setCategorias] = useState([])
    const [formState, setFormState] = useState({
        name: '',
        category: '',
        brand: '',
        price: '',
        details: '',
        total: '',
        file: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/productos/getProductoById/${id}`
                );


                const productoData = response.data.producto.data;


                setFormState({
                    ...formState,
                    name: productoData.name,
                    category: productoData.category,
                    brand: productoData.brand,
                    details: productoData.details,
                    price: productoData.price,
                    total: productoData.total
                });
            } catch (error) {
                console.log("El error es: ", error);
            }
        };
        fetchData();
    }, [isOpen, id]);

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
                console.error('Error fetching administradores:', error);
            }
        };

        fetchData();
    }, []);

    const { name, category, brand, price, details, total, file } = formState;



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("category", category);
        formData.append("brand", brand);
        formData.append("details", details);
        formData.append('price', price);
        formData.append('total', total);

        try {
            if (formState.name === "" || formState.brand === "" || formState.category === '' || formState.details === '' || formState.price === '' || formState.total === '') {
                Swal.fire({
                    icon: "error",
                    title: "Error al actualizar el producto.",
                    text: "Debe llenar todos los campos antes de actualizar el producto!",
                });
            } else {
                await axios.put(`http://localhost:3000/categorias/putProducto/${id}`, formData);
                Swal.fire({
                    icon: "success",
                    title: "Producto actualizado"
                });
                onClose();
            }
        } catch (error) {
            console.log("El error es: ", error);
            Swal.fire({
                icon: "error",
                title: "Error al actualizar el producto",
            });
        }
    }





    return (

        <Modal size={'3xl'} dismissible show={isOpen} onClose={onClose}>
            <Modal.Header>Editar producto</Modal.Header>
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
                                   
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.name}>
                                            {categoria.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        {/* Marca  */}
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
                                    onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Cantidad */}
                        <div>
                            <Label htmlFor="total" value="Cantidad" />
                            <TextInput
                                id="total"
                                value={total}
                                onChange={(e) => setFormState({ ...formState, total: e.target.value })}
                                required
                            />
                        </div>

                        {/* Detalles del producto */}
                        <div>
                            <Label htmlFor="productDetails" value="Detalles del producto" />
                            <Textarea
                                id="productDetails"
                                value={details}
                                rows={4}
                                onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                                required
                            />
                        </div>
                        {/* BOTON PARA EDITAR ARCHIVO */}
                        <div className="flex max-w-md flex-col items-start gap-4">

                            <ToggleSwitch checked={switch2} label="Quieres editar el archivo?" onChange={setSwitch2} />

                        </div>
                        {/* Cargar archivo */}

                        {switch2 && (
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
                        )}

                    </div>

                    <Button className=" w-full mt-5" type="submit">
                        Actualizar producto
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}
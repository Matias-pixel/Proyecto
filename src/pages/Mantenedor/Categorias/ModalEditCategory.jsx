import { Button, Label, Modal, TextInput, Textarea, FileInput, ToggleSwitch, Select } from "flowbite-react";
import axios from 'axios';
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export const ModalEditCategory = ({ isOpen, onClose, id }) => {

    const [formState, setFormState] = useState({
        name: ''

    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/categorias/byId/${id}`
                );


                const categoriaData = response.data.categoria.data;
                console.log(response)

                setFormState({
                    ...formState,
                    name: categoriaData.name,
                });
            } catch (error) {
                console.log("El error es: ", error);
            }
        };
        fetchData();
    }, [isOpen, id]);


    const { name } = formState;



    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            if (formState.name === "" ) {
                Swal.fire({
                    icon: "error",
                    title: "Error al actualizar el producto.",
                    text: "Debe llenar todos los campos antes de actualizar el producto!",
                });
            } else {
                await axios.put(`http://localhost:3000/categorias/update/${id}`, formState);
                Swal.fire({
                    icon: "success",
                    title: "Categoria actualizada"
                });
                onClose();
            }
        } catch (error) {
            console.log("El error es: ", error);
            Swal.fire({
                icon: "error",
                title: "Error al actualizar la categoria",
            });
        }
    }





    return (

        <Modal size={'md'} dismissible show={isOpen} onClose={onClose}>
            <Modal.Header>Editar categoría</Modal.Header>
            <Modal.Body>
                <form >
                    <div className="space-y-6">
                        {/* Nombre del Producto */}
                        <div className="grid  gap-5">
                            <div className="w-full">
                                <Label htmlFor="name" value="Nombre de la categoría" className="font-semibold" />
                                <TextInput
                                    id="name" 
                                    className="w-full pt-3"
                                    value={name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleSubmit} className=" w-full mt-5" type="submit">
                        Actualizar
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}
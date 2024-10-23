import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import axios from 'axios';
import Swal from "sweetalert2";
import { useState, useEffect } from "react";


export const ModalEditEstado = ({ isOpen, onClose, id }) => {
    const [formState, setFormState] = useState({
        name: '',
        description: ''

    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/estados/byId/${id}`
                );




                const estadoData = response.data.categoria.data;
               

                setFormState({
                    ...formState,
                    name: estadoData.name,
                    description: estadoData.description,
                });
            } catch (error) {
                console.log("El error es: ", error);
            }
        };
        fetchData();
    }, [isOpen, id]);


    const { name, description } = formState;


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formState.name === "") {
                Swal.fire({
                    icon: "error",
                    title: "Error al actualizar el estado.",
                    text: "Debe llenar todos los campos antes de actualizar el estado!",
                });
            } else {
                await axios.put(`http://localhost:3000/estados/edit/${id}`, formState);
                Swal.fire({
                    icon: "success",
                    title: "estado actualizado"
                });
                onClose();
            }
        } catch (error) {
            console.log("El error es: ", error);
            Swal.fire({
                icon: "error",
                title: "Error al actualizar el estado",
            });
        }
    }

    return (

        <Modal size={'md'} dismissible show={isOpen} onClose={onClose}>
            <Modal.Header>Editar el estado</Modal.Header>
            <Modal.Body>
                <form >
                    <div className="space-y-6">
                        {/* Nombre del estado */}
                        <div className="grid  gap-5">
                            <div className="w-full">
                                <Label htmlFor="name" value="Nombre del estado" className="font-semibold" />
                                <TextInput
                                    id="name"
                                    className="w-full pt-3"
                                    value={name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="productDetails" value="Detalles del estado" />
                            <Textarea
                                id="productDetails"

                                value={description}
                                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                                rows={4}
                                required
                            />
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
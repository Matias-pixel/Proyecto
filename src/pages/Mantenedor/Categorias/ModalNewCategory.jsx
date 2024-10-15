import { Button, Label, Modal, TextInput, Textarea, FileInput } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";



export const ModalNewCategory = ({ isOpen, onClose }) => {

    const [formState, setFormState] = useState({
        name: '',
        active: true

    });

    const { name, active } = formState;


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formState)
        try {

            if (!name) {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Debe llenar todos los datos!"
                });
            } else {
                axios.post('http://localhost:3000/categorias/create', formState)

                Swal.fire({
                    icon: "success",
                    title: "Categoria añadida",
                });
                resetForm();
                onClose();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Hubo un error al tratar de crear al administrador."
            });
        }


    };


    const resetForm = () => {
        setFormState({
            names: '',
            lastnames: '',
            email: '',

        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };







    return (
        <Modal dismissible show={isOpen} size={'sm'} onClose={handleClose}>
            <Modal.Header>Añadir nueva categoría</Modal.Header>
            <Modal.Body>
                <form>
                    <div className="space-y-3">
                        {/* Nombre de la categoria */}

                        <div>
                            <Label htmlFor="name" value="Nombre de la categoría" />
                            <TextInput
                                id="name"
                                className="pt-3"
                                value={name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                required
                            />
                        </div>

                    </div>
                    <div className="flex w-full justify-center">
                        <Button className="mt-16 w-64" onClick={handleSubmit}>
                            Añadir
                        </Button>

                    </div>

                </form>
            </Modal.Body>
        </Modal>
    )
}
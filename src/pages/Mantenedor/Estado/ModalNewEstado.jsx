
import { Button, Label, Modal, TextInput, Textarea, FileInput } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";


export const ModalNewEstado = ({ isOpen, onClose }) => {
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        active: true

    });

    const { name, description } = formState;

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
                axios.post('http://localhost:3000/estados/', formState)

                Swal.fire({
                    icon: "success",
                    title: "Estado añadido",
                });
                resetForm();
                onClose();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Hubo un error al tratar de crear el estado."
            });
        }


    };


    const resetForm = () => {
        setFormState({
            name: '',
            description: '',
          
       

        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (


        <>
            <Modal dismissible show={isOpen} size={'md'} onClose={handleClose}>
                <Modal.Header>Añadir nuevo estado</Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="space-y-3">
                            {/* Nombre de la categoria */}

                            <div>
                                <Label htmlFor="name" value="Nombre del estado" />
                                <TextInput
                                    id="name"
                                    className="pt-3"
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
                        <div className="flex w-full justify-center">
                            <Button className="mt-16 w-64" onClick={handleSubmit}>
                                Añadir
                            </Button>

                        </div>

                    </form>
                </Modal.Body>
            </Modal>


        </>
    )
}
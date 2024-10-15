import { Button, Label, Modal, TextInput, Textarea, FileInput } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";



export const ModalNewAdministrador = ({ isOpen, onClose }) => {
    const [formState, setFormState] = useState({
        names: '',
        lastnames: '',
        email: '',
        password: '',
        confirmpassword: '',
        role: 'administrador',
        active: true

    });

    const { names, lastnames, email, password, confirmpassword } = formState;



    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formState)
        try {

            if (!names || !lastnames || !email || !password) {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Debe llenar todos los datos!"
                });
            } else {
                if (password.length < 7) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "La contraseña debe tener al menos 6 caracteres!"
                    });
                } else {
                    if (password !== confirmpassword) {
                        Swal.fire({
                            icon: "error",
                            title: "Las contraseñas no coinciden",

                        });
                    } else {
                        axios.post('http://localhost:3000/admin/', formState)
                         
                        Swal.fire({
                            icon: "success",
                            title: "Administrador añadido",
                        });
                        resetForm();
                        onClose();
                    }
                }
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
        <Modal dismissible show={isOpen} onClose={handleClose}>
            <Modal.Header>Añadir nuevo administrador</Modal.Header>
            <Modal.Body>
                <form>
                    <div className="space-y-3">
                        {/* Nombre del administrador */}

                        <div>
                            <Label htmlFor="admName" value="Nombre del administrador" />
                            <TextInput
                                id="admName"
                                className="pt-3"
                                value={names}
                                onChange={(e) => setFormState({ ...formState, names: e.target.value })}
                                required
                            />
                        </div>

                        {/* Apellidos */}
                        <div>
                            <Label htmlFor="lastnames" value="Apellidos" />
                            <TextInput
                                id="lastnames"
                                className="pt-3"
                                value={lastnames}
                                onChange={(e) => setFormState({ ...formState, lastnames: e.target.value })}
                                required
                            />
                        </div>


                        {/* email */}

                        <div >
                            <Label htmlFor="email" value="Correo electrónico" />
                            <TextInput
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                required
                            />
                        </div>

                        <div >
                            <Label htmlFor="password" value="Contraseña" />
                            <TextInput
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                                required
                            />
                        </div>

                        {formState.password && (
                            <div >
                                <Label htmlFor="confirmpassword" value="Repite la contraseña" />
                                <TextInput
                                    id="confirmpassword"
                                    type="password"
                                    value={confirmpassword}
                                    onChange={(e) => setFormState({ ...formState, confirmpassword: e.target.value })}
                                    required
                                />
                            </div>

                        )}


                    </div>
                    <Button className="mt-3 w-full" onClick={handleSubmit}>
                        Añadir nuevo administrador
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    )


}
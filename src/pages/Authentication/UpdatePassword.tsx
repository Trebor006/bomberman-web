import React, {useState} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as CryptoJS from 'crypto-js';

const UpdatePassword = () => {
    const [correo, setCorreo] = useState('');
    const [contrasenaActual, setContrasenaActual] = useState('');
    const [contrasenaActualEncriptada, setContrasenaActualEncriptada] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [nuevaContrasenaEncriptada, setNuevaContrasenaEncriptada] = useState('');
    const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState('');
    // const [error, setError] = useState('');
    // const [successMessage, setSuccessMessage] = useState('');

    const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(event.target.value);
    };

    const handleContrasenaActualChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setContrasenaActual(event.target.value);
        setContrasenaActualEncriptada(encriptar(contrasenaActual));
    };

    const handleNuevaContrasenaChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNuevaContrasena(event.target.value);
        setNuevaContrasenaEncriptada(encriptar(nuevaContrasena));
    };

    const handleConfirmarNuevaContrasenaChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setConfirmarNuevaContrasena(event.target.value);
    };

    const encriptar = (password: string) => {
        return CryptoJS.SHA256(password).toString();
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {

        event.preventDefault();

        // Validación de la nueva contraseña
        // const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        //
        // if (!passwordPattern.test(nuevaContrasena)) {
        //     toast.error('La nueva contraseña debe tener al menos una mayúscula, un número, un símbolo y una longitud de al menos 8 caracteres.');
        //     return;
        // }

        // Validación de coincidencia de nueva contraseña
        if (nuevaContrasena !== confirmarNuevaContrasena) {
            toast.error('Las contraseñas nuevas no coinciden.');
            return;
        }

        try {
            // Llamar al servicio en el backend para actualizar la contraseña
            const response = await axios.post(
                'http://localhost:3001/bombers/actualizar-contrasena',
                {
                    correo,
                    contrasenaActualEncriptada,
                    nuevaContrasenaEncriptada
                }
            );

            if (response.data.success) {
                toast.success('Contraseña actualizada con éxito.');
                // window.location.href = "/";
            } else {
                toast.error('Error al actualizar la contraseña. Verifica tus credenciales actuales.');
            }
        } catch (error) {
            toast.error('Error al comunicarse con el servidor.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full sm:w-96">
                <h2 className="text-2xl font-bold mb-4">Actualizar Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="correo"
                            className="w-full mt-1 p-2 rounded border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            value={correo}
                            onChange={handleCorreoChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contrasenaActual" className="block text-sm font-medium text-gray-700">
                            Contraseña Actual
                        </label>
                        <input
                            type="password"
                            id="contrasenaActual"
                            className="w-full mt-1 p-2 rounded border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            value={contrasenaActual}
                            onChange={handleContrasenaActualChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nuevaContrasena" className="block text-sm font-medium text-gray-700">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="nuevaContrasena"
                            className="w-full mt-1 p-2 rounded border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            value={nuevaContrasena}
                            onChange={handleNuevaContrasenaChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmarNuevaContrasena" className="block text-sm font-medium text-gray-700">
                            Confirmar Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmarNuevaContrasena"
                            className="w-full mt-1 p-2 rounded border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            value={confirmarNuevaContrasena}
                            onChange={handleConfirmarNuevaContrasenaChange}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-primary text-white p-3 rounded hover:bg-opacity-90 transition duration-300"
                        >
                            Actualizar Contraseña
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default UpdatePassword;

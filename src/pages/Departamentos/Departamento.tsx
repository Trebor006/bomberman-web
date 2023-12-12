import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useLocation } from 'react-router-dom';

const Departamento = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const cargarDepartamento = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3001/departamentos/buscar?id=${id}`);
                    const departamento = response.data;
                    setNombre(departamento.nombre);
                    setDescripcion(departamento.descripcion);

                } catch (error) {
                    console.error('Error al cargar el departamento:', error);
                }
            }
        };

        setIsEditing(location.pathname.includes('editar') || location.pathname.includes('registrar'));

        cargarDepartamento();
    }, [id, location.pathname]);

    const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescripcion(event.target.value);
    };

    const handleGuardarClick = async () => {
        if (nombre === '' || descripcion === '') {
            toast.error('Por favor, complete todos los campos');
            return;
        }

        try {
            const departamentoData = {
                nombre,
                descripcion,
            };

            if (isEditing && id) {
                const response = await axios.put(`http://localhost:3001/departamentos/${id}`, departamentoData);
                toast.success('Área de trabajo actualizada exitosamente');
                console.log('Respuesta del servidor:', response.data);
            } else {
                const response = await axios.post('http://localhost:3001/departamentos/registrar', departamentoData);
                toast.success('Área de trabajo registrada exitosamente');
                console.log('Respuesta del servidor:', response.data);
            }

            setNombre('');
            setDescripcion('');
        } catch (error) {
            toast.error('Error al guardar el área de trabajo');
            console.error('Error al guardar el área de trabajo:', error);
        }
    };

    return (
        <div className="w-1/2 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Áreas de Trabajo</h2>
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre de Área:
                </label>
                <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={handleNombreChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    disabled={!isEditing}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                    Descripción:
                </label>
                <textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    disabled={!isEditing}
                />
            </div>
            <div className="flex justify-end gap-4.5">
                <a
                    href="/departaments"
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                    Cancelar
                </a>
                {isEditing && (
                    <button
                        onClick={handleGuardarClick}
                        className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                     Guardar
                    </button>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Departamento;

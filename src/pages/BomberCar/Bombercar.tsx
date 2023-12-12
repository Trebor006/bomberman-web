import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useLocation } from 'react-router-dom';

const Bombercar = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const cargarBombercar = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3001/bombercars/buscar?id=${id}`);
                    const bombercar = response.data;
                    setMarca(bombercar.marca);
                    setPlaca(bombercar.placa);
                    setModelo(bombercar.modelo);

                } catch (error) {
                    console.error('Error al cargar el departamento:', error);
                }
            }
        };

        setIsEditing(location.pathname.includes('editar') || location.pathname.includes('registrar'));

        cargarBombercar();
    }, [id, location.pathname]);

    const handlePlacaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaca(event.target.value);
    };

    const handleModeloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModelo(event.target.value);
    };

    const handleMarcaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarca(event.target.value);
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModelo(event.target.value);
    };

    const handleGuardarClick = async () => {
        if (placa === '' || modelo === '') {
            toast.error('Por favor, complete todos los campos');
            return;
        }

        try {
            const bombercarData = {
                placa: placa,
                modelo: modelo,
                marca: marca,
            };

            if (isEditing && id) {
                const response = await axios.put(`http://localhost:3001/bombercars/${id}`, bombercarData);
                toast.success('Carro Bombero actualizada exitosamente');
                console.log('Respuesta del servidor:', response.data);
            } else {
                const response = await axios.post('http://localhost:3001/bombercars', bombercarData);
                toast.success('Carro Bombero registrada exitosamente');
                console.log('Respuesta del servidor:', response.data);
            }

            setPlaca('');
            setModelo('');
            setMarca('');
        } catch (error) {
            toast.error('Error al guardar el Carro Bombero');
            console.error('Error al guardar el Carro Bombero:', error);
        }
    };

    return (
        <div className="w-1/2 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Carro Bombero</h2>
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Placa:
                </label>
                <input
                    type="text"
                    id="nombre"
                    value={placa}
                    onChange={handlePlacaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    disabled={!isEditing}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Modelo:
                </label>
                <input
                    type="text"
                    id="modelo"
                    value={modelo}
                    onChange={handleModeloChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    disabled={!isEditing}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Marca:
                </label>
                <input
                    type="text"
                    id="marca"
                    value={marca}
                    onChange={handleMarcaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    disabled={!isEditing}
                />
            </div>

            <div className="flex justify-end gap-4.5">
                <a
                    href="/bombercars"
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

export default Bombercar;

import React, {useEffect, useState} from 'react';
import {GrClose} from 'react-icons/gr';
import axios from "axios";
import {Link} from "react-router-dom";
import {IoEyeSharp} from "react-icons/io5";
import {BiDetail} from "react-icons/bi";
import {ComentarioDto} from "../../structure/comentario-dto";

interface CambiarEstadoProps {
    id: string | undefined;
    actualizarEstado: (estado: string, bomberCardId: string) => void;
    closeModalEstadoModal: () => void;
}

interface Bombercar {
    id: string;
    placa: string;
}

const CambiarEstado: React.FC<CambiarEstadoProps> = ({id, actualizarEstado, closeModalEstadoModal}) => {
    const [estado, setEstado] = useState('');
    const [comentario, setComentario] = useState('');
    const [bomberCarId, setBomberCarId] = useState('');
    const [bombercars, setBombercars] = useState<Bombercar[]>([]);

    useEffect(() => {
        const cargarBombercar = async () => {
                try {
                    const suggestionResponse = await axios.get(`https://resq-backend-app-hwn5h.ondigitalocean.app/bombercars/obtenerSugerencia?emergenciaId=` + id);
                    const sugested = suggestionResponse.data;
                    console.log("sugested " + sugested);
                    const response = await axios.get(`https://resq-backend-app-hwn5h.ondigitalocean.app/bombercars`);
                    const bombercarDetail = response.data;
                    setBombercars(bombercarDetail);
                    setBomberCarId(sugested);
                    console.log(bombercarDetail);
                } catch (error) {
                    console.error('Error al cargar el departamento:', error);
                }

        };
        cargarBombercar();
    }, []);

    const handleGuardar = () => {
        actualizarEstado(estado, bomberCarId);
        setEstado('');
        setBomberCarId('');
        setComentario('');
    };

    return (
        <div className="container mx-auto py-4">
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full border">
                    <button onClick={closeModalEstadoModal} className="relative right-0 float-right">
                        <GrClose/>
                    </button>
                    <h2 className="text-lg font-bold mb-4">Cambiar Estado</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-800 font-bold mb-2" htmlFor="estado">
                                Estado:
                            </label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                id="estado"
                                name="estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="">-- Selecionar Estado --</option>
                                <option value="ACEPTADA">ACEPTADA</option>
                                <option value="RECHAZADA">RECHAZADA</option>
                                <option value="PROCESADA">PROCESADA</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-800 font-bold mb-2" htmlFor="estado">
                                Carro Bombero asignado:
                            </label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                id="carrobombero"
                                name="carrobombero"
                                value={bomberCarId}
                                onChange={(e) => setBomberCarId(e.target.value)}
                            >
                                <option value="">-- Selecionar Carro Bombero --</option>
                                {bombercars &&
                                    bombercars
                                        .map((bombercar) => (
                                            <option value={bombercar.id}>{bombercar.placa}</option>
                                        ))}
                            </select>
                        </div>

                        {/*<div className="mb-4">*/}
                        {/*    <label className="block text-gray-800 font-bold mb-2" htmlFor="comentario">*/}
                        {/*        Comentario:*/}
                        {/*    </label>*/}
                        {/*    <textarea*/}
                        {/*        className="border border-gray-300 rounded-md px-3 py-2 w-full"*/}
                        {/*        id="comentario"*/}
                        {/*        name="comentario"*/}
                        {/*        style={{height: '250px'}}*/}
                        {/*        value={comentario}*/}
                        {/*        onChange={(e) => setComentario(e.target.value)}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <button
                            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={handleGuardar}
                        >
                            Guardar
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default CambiarEstado;

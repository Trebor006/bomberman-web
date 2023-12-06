import React, {useState} from 'react';
import {ComentarioDto} from '../../structure/comentario-dto';
import {GrClose} from "react-icons/gr";
import CambiarEstado from "./CambiarEstado";

interface ComentarioComponentProps {
    id: string | undefined;
    estadoEmergencia: string | undefined;
    comentarios: ComentarioDto[] | undefined;
    actualizarComentarios: () => void;
}

const ComentarioComponent = ({id, comentarios, estadoEmergencia, actualizarComentarios}: ComentarioComponentProps) => {
    const [showModal, setShowModal] = useState(false);
    const [showCambiarEstadoModal, setShowCambiarEstadoModal] = useState(false);
    const [nuevoComentario, setNuevoComentario] = useState({
        funcionario: '',
        departamento: '',
        comentario: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNuevoComentario({
            ...nuevoComentario,
            [event.target.name]: event.target.value,
        });
    };

    const handleGuardar = () => {
        const url = `http://localhost:3001/emergencias/agregarComentario?id=${id}`;

        nuevoComentario.funcionario = localStorage.getItem('nombre') || '';
        nuevoComentario.departamento = localStorage.getItem('departamento') || '';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoComentario),
        })
            .then((response) => {
                // Procesar la respuesta del backend
                // ...
                // Cerrar el modal si es necesario
                setShowModal(false);
                actualizarComentarios();
            })
            .catch((error) => {
                // Manejar errores
                console.error('Error al llamar al servicio en el backend:', error);
            });
    };

    function closeModal() {
        setShowModal(false);
    }

    function closeModalEstadoModal() {
        setShowCambiarEstadoModal(false);
    }

    const actualizarEstado = (estado: string, bomberCarId: string) => {
        // Lógica para actualizar el estado en el componente padre
        console.log('Nuevo estado:', estado);
        console.log('Nuevo bomberCarId:', bomberCarId);
        // Realiza las acciones necesarias con el estado y comentario


        const url = `http://localhost:3001/emergencias/actualizarEstado?id=${id}`;

        // nuevoComentario.funcionario = localStorage.getItem('nombre') || '';
        // nuevoComentario.departamento = localStorage.getItem('departamento') || '';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    funcionario: nuevoComentario.funcionario,
                    // departamento: nuevoComentario.departamento,
                    // comentario: comentario,
                    estado: estado,
                    bomberCarId: bomberCarId,
                }
            ),
        })
            .then((response) => {
                setShowCambiarEstadoModal(false);
                actualizarComentarios();
            })
            .catch((error) => {
                // Manejar errores
                console.error('Error al llamar al servicio en el backend:', error);
            });
    };


    return (
        <div className="container mx-auto py-4">
            {/*<h1 className="text-2xl font-bold mb-4">Lista de Comentarios</h1>*/}
            {/*<button*/}
            {/*    className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
            {/*    onClick={() => setShowModal(true)}*/}
            {/*>*/}
            {/*    Agregar Comentario*/}
            {/*</button>*/}

            {estadoEmergencia !== 'RECHAZADA' &&
                estadoEmergencia !== 'PROCESADA' &&
                <button
                    className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowCambiarEstadoModal(true)}
                >
                    Cambiar Estado
                </button>
            }


            <ul className="space-y-2">
                {comentarios && comentarios.map((comentario) => (
                    <li>
                        <div className="bg-gray-100 p-1 rounded-lg border-2">
                            <p className="text-gray-800 text-sm mb-2">{'Bomber: ' + comentario.funcionario}</p>
                            <p className="text-gray-800 text-sm mb-2">{'Departamento: ' + comentario.departamento}</p>
                            <p className="text-gray-800 text-sm mb-2">{'Comentario: ' + comentario.comentario}</p>
                            <p className="text-gray-800 text-sm mb-2">{'Fecha de creación: ' + comentario.createdAt}</p>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full border ">
                        <button onClick={closeModal} className="relative right-0 float-right "><GrClose/></button>
                        <h2 className="text-lg font-bold mb-4">Agregar Comentario</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-800 font-bold mb-2" htmlFor="comentario">
                                    Comentario:
                                </label>
                                <textarea
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                    id="comentario"
                                    name="comentario"
                                    style={{height: '250px'}}
                                    value={nuevoComentario.comentario}
                                    onChange={handleInputChange}
                                />
                            </div>
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
            )}

            {showCambiarEstadoModal &&
                <CambiarEstado id={id} actualizarEstado={actualizarEstado}
                               closeModalEstadoModal={closeModalEstadoModal}/>

            }
        </div>
    );
};

export default ComentarioComponent;

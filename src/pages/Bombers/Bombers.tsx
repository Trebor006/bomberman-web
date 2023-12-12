import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {IoEyeSharp} from "react-icons/io5";

interface Bomber {
    id: number;
    nombre: string;
    apellido: string;
    ci: string;
    celular: string;
    correo: string;
}

const Bombers = () => {
    const [bombers, setBombers] = useState<Bomber[]>([]);

    useEffect(() => {
        obtenerBombers();
    }, []);

    const obtenerBombers = async () => {
        try {
            const response = await axios.get<Bomber[]>('http://localhost:3001/bombers');
            setBombers(response.data);
        } catch (error) {
            console.error('Error al obtener los bombers:', error);
        }
    };

    const verBomber = (id: number) => {
        // Lógica para ver el bombero con el ID especificado
    };

    const editarBomber = (id: number) => {
        // Lógica para editar el bombero con el ID especificado
    };

    const darDeBajaBomber = (id: number) => {
        // Lógica para dar de baja el bombero con el ID especificado
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-end mb-4">
                <a
                    href="/bombers/registrar"
                    className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Agregar nuevo Bombero
                </a>
                <button >

                </button>
            </div>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-primary text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 text-white dark:text-white xl:pl-11">
                            Nombre
                        </th>
                        <th className="min-w-[150px] py-4 px-4 text-white dark:text-white">
                            Apellido
                        </th>
                        <th className="min-w-[150px] py-4 px-4 text-white dark:text-white">
                            CI
                        </th>
                        <th className="min-w-[150px] py-4 px-4 text-white dark:text-white">
                            Celular
                        </th>
                        <th className="min-w-[150px] py-4 px-4 text-white dark:text-white">
                            Correo
                        </th>
                        <th className="py-4 px-4 text-white dark:text-white">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {bombers.map((bomber) => (
                        <tr key={bomber.id} >
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium colortexttabla dark:text-white">
                                    {bomber.nombre}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="colortexttabla dark:text-white">{bomber.apellido}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="colortexttabla dark:text-white">{bomber.ci}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="colortexttabla dark:text-white">{bomber.celular}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="colortexttabla dark:text-white">{bomber.correo}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                    <button>
                                        <Link to={`/bombers/ver/${bomber.id}`}>
                                            <IoEyeSharp />
                                        </Link>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bombers;

import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {IoEyeSharp} from "react-icons/io5";

// Interfaz para el tipo de emergencia
interface TipoEmergencia {
    id: number;
    nombre: string;
    descripcion: string;
    color: string;
    departamento: string;
}

const TipoEmergencias = () => {
    const [tiposEmergencia, setTiposEmergencia] = useState<TipoEmergencia[]>([]);

    useEffect(() => {
        obtenerTiposEmergencia();
    }, []);

    const obtenerTiposEmergencia = async () => {
        try {
            const response = await fetch('https://resq-backend-app-hwn5h.ondigitalocean.app/tipo-emergencias');
            const data = await response.json();
            setTiposEmergencia(data);
        } catch (error) {
            console.error('Error al obtener los tipos de emergencia:', error);
        }
    };

    const verTipoEmergencia = (id: number) => {
        // Lógica para ver el tipo de emergencia con el ID especificado
    };

    const editarTipoEmergencia = (id: number) => {
        // Lógica para editar el tipo de emergencia con el ID especificado
    };

    const darDeBajaTipoEmergencia = (id: number) => {
        // Lógica para dar de baja el tipo de emergencia con el ID especificado
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-end mb-4">
                <a href="/complaintstype/registrar" className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Agregar nuevo Tipo de Emergencia
                </a>
            </div>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Nombre
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Descripción
                        </th>
                        {/*<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">*/}
                        {/*    Color*/}
                        {/*</th>*/}
                        {/*<th className="py-4 px-4 font-medium text-black dark:text-white">*/}
                        {/*    Departamento*/}
                        {/*</th>*/}
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tiposEmergencia.map((tipoEmergencia) => (
                        <tr key={tipoEmergencia.id}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                    {tipoEmergencia.nombre}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{tipoEmergencia.descripcion}</p>
                            </td>
                            {/*<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">*/}
                            {/*    <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: tipoEmergencia.color }}></div>*/}
                            {/*</td>*/}
                            {/*<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">*/}
                            {/*    <p className="text-black dark:text-white">{tipoEmergencia.departamento}</p>*/}
                            {/*</td>*/}
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                    <button>
                                        <Link to={`/complaintstype/ver/${tipoEmergencia.id}`}>
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

export default TipoEmergencias;

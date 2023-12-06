import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {IoEyeSharp} from "react-icons/io5";


// Interfaz para el departamento
interface Bombercar {
    id: string;
    marca: string;
    modelo: string;
    placa: string;
}

const Bombercars = () => {
    const [bombercars, setBombercars] = useState<Bombercar[]>([]);

    useEffect(() => {
        obtenerBombercars();
    }, []);

    const obtenerBombercars = async () => {
        try {
            const response = await fetch('https://resq-backend-app-hwn5h.ondigitalocean.app/bombercars');
            const data = await response.json();
            setBombercars(data);
        } catch (error) {
            console.error('Error al obtener los bombercars:', error);
        }
    };

    const verBombercar = (id: string) => {
        // Lógica para ver el departamento con el ID especificado
    };

    const editarDepartamento = (id: string) => {
        // Lógica para editar el departamento con el ID especificado
    };

    // const darDeBajaDepartamento = (id: number) => {
    //     // Lógica para dar de baja el departamento con el ID especificado
    // };

    return (
        <div
            className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-end mb-4">
                <a href="/bombercars/registrar"
                   className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Agregar nuevo Carro
                </a>
            </div>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Placa
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Marca
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Modelo
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    {bombercars.map((bombercar) => (
                        <tr key={bombercar.id}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                    {bombercar.placa}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{bombercar.marca}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{bombercar.modelo}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                    <button onClick={() => verBombercar(bombercar.id)}>
                                        <Link to={`/bombercars/ver/${bombercar.id}`}>
                                            <IoEyeSharp />
                                        </Link>
                                    </button>
                                    {/*<button onClick={() => editarDepartamento(bombercar.id)}>*/}
                                    {/*    <Link to={`/departaments/editar/${bombercar.id}`}>*/}
                                    {/*        Editar*/}
                                    {/*    </Link>*/}
                                    {/*</button>*/}
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

export default Bombercars;

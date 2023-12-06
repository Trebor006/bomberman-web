import React, {useContext, useEffect, useState} from "react";
import {GeneralContext} from "../pages/api/GeneralContext";


interface TipoEmergencia {
    id: number;
    nombre: string;
    descripcion: string;
    color: string;
    departamento: string;
}

interface estados {
    id: string;
    nombre: string;
}

const dataEstados: estados[] = [
    {id: '', nombre: '-- Selecionar Estado --'},
    {id: 'ACEPTADA', nombre: 'ACEPTADA'},
    {id: 'PROCESADA', nombre: 'PROCESADA'},
];
const MapFilter: React.FC = () => {

    const {setFiltroEstado, setFechaInicio, setFechaFin, setTipoEmergencia} = useContext(GeneralContext);
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
    const handleFiltroEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevoEstado = event.target.value;
        setFiltroEstado(nuevoEstado);
        console.log("Actualizado estado!!!" + nuevoEstado);
    };

    const handleFechaInicioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nuevaFechaInicio = event.target.value;
        setFechaInicio(nuevaFechaInicio);
        console.log("Actualizada Fecha de Inicio!!!" + nuevaFechaInicio);
    };

    const handleFechaFinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nuevaFechaFin = event.target.value;
        setFechaFin(nuevaFechaFin);
        console.log("Actualizada fecha fin!!!" + nuevaFechaFin);
    };

    const handleTipoEmergenciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevoTipo = event.target.value;
        setTipoEmergencia(nuevoTipo);
        console.log("Actualizado tipo de emergencia!!!" + nuevoTipo);
    };


    return (

        <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Filtro
                    </h3>
                </div>
                <form action="#">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Fecha Inicial
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        onChange={handleFechaInicioChange}
                                        className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Fecha Final
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        onChange={handleFechaFinChange}
                                        className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Tipo de Emergencia
                            </label>
                            <div className="relative z-20 bg-transparent dark:bg-form-input">
                                <select id="tipo_emergencia" onChange={handleTipoEmergenciaChange}
                                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                    <option value="">Seleccione un Tipo de Emergencia</option>
                                    {tiposEmergencia.map((option) => (
                                        <option key={option.nombre} value={option.nombre}>
                                            {option.nombre}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Estado de Emergencia
                            </label>
                            <div className="relative z-20 bg-transparent dark:bg-form-input">
                                <select id="estado"
                                        onChange={handleFiltroEstadoChange}
                                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                    {dataEstados.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.nombre}
                                        </option>
                                    ))}

                                </select>
                                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                            </div>
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                            Limpiar filtro
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )

};

export default MapFilter;


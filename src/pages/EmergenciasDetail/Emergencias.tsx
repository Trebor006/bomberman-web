import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import EmergenciaModal from "../../components/EmergenciaModal";
import {Emergencia} from "../../structure/emergencia";
import {IoChevronBackOutline, IoChevronForwardOutline, IoEyeSharp} from "react-icons/io5";
import io from 'socket.io-client';
import {BiDetail} from "react-icons/bi";
import "./Emergencias.css";

interface TipoEmergencia {
    id: number;
    nombre: string;
    descripcion: string;
    color: string;
    departamento: string;
}

interface EmergenciaResult {
    emergencias: Emergencia[];
    totalPaginas: number;
}

interface estados {
    id: string;
    nombre: string;
}

const dataEstados: estados[] = [
    {id: '', nombre: '-- Selecionar Estado --'},
    {id: 'PENDIENTE', nombre: 'PENDIENTE'},
    {id: 'ACEPTADA', nombre: 'ACEPTADA'},
    {id: 'RECHAZADA', nombre: 'RECHAZADA'},
    {id: 'PROCESADA', nombre: 'PROCESADA'},
];

const Emergencias = () => {
    const [tiposEmergencia, setTiposEmergencia] = useState<TipoEmergencia[]>([]);
    const [emergencias, setEmergencias] = useState<Emergencia[]>([]);
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        estado: '',
        tipoEmergencia: ''
    });

    const [sortConfig, setSortConfig] = useState({key: 'createdAt', direction: 'desc'});
    const [page, setPage] = useState<number>(1);
    const [pageSize, sePageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [renderPagination, setRenderPagination] = useState<boolean>(false);
    const [selectedEmergencia, setSelectedEmergencia] = useState<Emergencia | undefined>();

    //todo SockeT!!!
    // useEffect(() => {
    //     const socket = io('https://resq-backend-app-hwn5h.ondigitalocean.app');
    //
    //     socket.on('nuevaEmergencia', handleInsertEvent);
    //
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);
    //
    // const handleInsertEvent = (data: Emergencia) => {
    //     setEmergencias((prevDatos) => [data, ...prevDatos]);
    // };


    useEffect(() => {
        obtenerTiposEmergencia();
    }, []);

    const handleSort = (key: string) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});
    };

    const obtenerTiposEmergencia = async () => {
        try {
            const response = await fetch('https://resq-backend-app-hwn5h.ondigitalocean.app/tipo-emergencias/porDepartamento?departamento=' + localStorage.getItem('departamento'));
            const data = await response.json();
            setTiposEmergencia(data);
        } catch (error) {
            console.error('Error al obtener los tipos de emergencia:', error);
        }
    };

    useEffect(() => {
        filtrarEmergencias();
    }, []);

    useEffect(() => {
        console.log(" se disparo el cambio de estado en los filtros!!");
        filtrarEmergencias();
        setPage(1);
    }, [filtros, sortConfig]);

    const [showModal, setShowModal] = useState(false);
    const openModal = (emergencia: Emergencia) => {
        setSelectedEmergencia(emergencia);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const filtrarEmergencias = async () => {
        setRenderPagination(false);
        try {
            console.log("paginacion");
            console.log(page);

            const response = await axios.get<EmergenciaResult>('https://resq-backend-app-hwn5h.ondigitalocean.app/emergencias/busquedaPaginada', {
                params: {
                    ...filtros, pagina: page, porPagina: pageSize,
                    ordenadoPor: sortConfig.key, ordenadoDir: sortConfig.direction === 'asc' ? 1 : -1,
                    departamento: localStorage.getItem('departamento')
                }
            });
            const emergenciasResult = response.data;

            console.log(emergenciasResult);
            console.log(emergenciasResult.totalPaginas);

            setEmergencias(emergenciasResult.emergencias);
            // Actualizar la paginación con los nuevos datos
            setTotal(emergenciasResult.totalPaginas);

            // setPaginacion(prevState => ({...prevState, total: emergenciasResult.totalPaginas, page: 1}));
        } catch (error) {
            console.error('Error al filtrar las emergencias:', error);
        }

        setRenderPagination(true);
    };

    const cambiarPagina = (pageNumber: number) => {
        console.log("new Page number:" + pageNumber);
        setPage(pageNumber);
        filtrarEmergencias();
    };

    const verEmergencia = (titulo: string) => {
        // Lógica para ver la emergencia con el título especificado
    };

    const editarEmergencia = (titulo: string) => {
        // Lógica para editar la emergencia con el título especificado
    };

    const marcarComoResuelta = (titulo: string) => {
        // Lógica para marcar la emergencia como resuelta con el título especificado
    };

    const handleTipoEmergenciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevoTipo = event.target.value;
        setFiltros(prevState => ({...prevState, tipoEmergencia: event.target.value}))
        console.log("Actualizado tipo de emergencia!!!" + nuevoTipo);
    };

    const handleFiltroEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevoEstado = event.target.value;
        setFiltros(prevState => ({...prevState, estado: event.target.value}))
        console.log("Actualizado estado!!!" + nuevoEstado);
    };

    const renderizarBotonesPaginas = () => {
        const botones = [];
        for (let i = 1; i <= total; i++) {
            botones.push(
                <button
                    key={i}
                    onClick={() => cambiarPagina(i)}
                    className={`bg-primary text-white rounded px-4 py-2 font-medium ${
                        page === i ? 'bg-opacity-80' : ''
                    }`}
                >
                    {i}
                </button>
            );
        }

        setRenderPagination(false);
        return botones;
    };

    // @ts-ignore
    return (
        <div
            className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <input
                        type="date"
                        value={filtros.fechaInicio}
                        onChange={(e) => setFiltros(prevState => ({...prevState, fechaInicio: e.target.value}))}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white"
                    />
                    <input
                        type="date"
                        value={filtros.fechaFin}
                        onChange={(e) => setFiltros(prevState => ({...prevState, fechaFin: e.target.value}))}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white"
                    />
                    <select id="estado"
                            onChange={handleFiltroEstadoChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white">
                        {dataEstados.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.nombre}
                            </option>
                        ))}
                    </select>

                    <select id="tipo_emergencia" onChange={handleTipoEmergenciaChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white">
                        <option value="">Seleccione un Tipo de Emergencia</option>
                        {tiposEmergencia.map((option) => (
                            <option key={option.nombre} value={option.nombre}>
                                {option.nombre}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={filtrarEmergencias}
                        className="bg-primary text-white rounded px-4 py-2 font-medium">
                        Filtrar
                    </button>
                </div>

                {/*{*/}
                {/*    renderPagination && <BotonesPaginacion total={total} page={page} pageSize={pageSize} cambiarPagina={cambiarPagina}/>*/}
                {/*}*/}

                <div className="flex space-x-2">

                    <button
                        onClick={() => cambiarPagina(page - 1)}
                        disabled={page === 1}
                        className="bg-primary text-white rounded px-4 py-2 font-medium"
                    >
                        <IoChevronBackOutline/>
                    </button>
                    {renderPagination && renderizarBotonesPaginas()}
                    <button
                        onClick={() => cambiarPagina(page + 1)}
                        disabled={page >= total}
                        className="bg-primary text-white rounded px-4 py-2 font-medium"
                    >
                        <IoChevronForwardOutline/>
                    </button>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-primary text-left dark:bg-meta-4">
                        <th className="min-w-[120px] py-1 px-4 text-white dark:text-white xl:pl-11">
                        </th>

                        <th onClick={() => handleSort('createdAt')}
                            className="min-w-[120px] py-1 px-4 text-white dark:text-white xl:pl-11">
                            {sortConfig && sortConfig.key === 'createdAt' && (
                                <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                            )}
                            {' '} Fecha
                        </th>
                        {/*<th onClick={() => handleSort('titulo')}*/}
                        {/*    className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">*/}
                        {/*    {sortConfig && sortConfig.key === 'titulo' && (*/}
                        {/*        <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>*/}
                        {/*    )}*/}
                        {/*    {' '} Título*/}
                        {/*</th>*/}
                        <th onClick={() => handleSort('descripcion')}
                            className="min-w-[320px] py-4 px-4 text-white dark:text-white xl:pl-11">
                            {sortConfig && sortConfig.key === 'descripcion' && (
                                <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                            )}
                            {' '} Descripción
                        </th>
                        <th onClick={() => handleSort('tipoEmergencia')}
                            className="min-w-[220px] py-4 px-4 text-white dark:text-white xl:pl-11">
                            {sortConfig && sortConfig.key === 'tipoEmergencia' && (
                                <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                            )}
                            {' '} Tipo de Emergencia
                        </th>
                        <th onClick={() => handleSort('estado')}
                            className="min-w-[100px] py-4 px-4 text-white dark:text-white xl:pl-11">
                            {sortConfig && sortConfig.key === 'estado' && (
                                <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                            )}
                            {' '} Estado
                        </th>
                        <th className="min-w-[100px] py-4 px-4 text-white dark:text-white">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {emergencias &&
                        emergencias
                            .map((emergencia) => (
                                <tr key={emergencia._id}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        {/*<h5 className="font-medium text-black dark:text-white">*/}
                                        {/*    <img className='image-prueba' src={emergencia.imagenesUrls[0]}/>*/}
                                        {/*</h5>*/}
                                        <img className='image-prueba' src={emergencia.imagenesUrls[0]}/>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium dark:text-white">
                                            {emergencia.createdAt}
                                        </h5>
                                    </td>
                                    {/*<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">*/}
                                    {/*    <h5 className="font-medium text-black dark:text-white">*/}
                                    {/*        {emergencia.titulo}*/}
                                    {/*    </h5>*/}
                                    {/*</td>*/}
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="dark:text-white">
                                            {emergencia.descripcion}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="dark:text-white">
                                            {emergencia.tipoEmergencia}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="dark:text-white">{emergencia.estado}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button>
                                                <Link to={`/emergencia-detail/ver/${emergencia._id}`}>
                                                    <IoEyeSharp/>
                                                </Link>
                                            </button>

                                            <div>
                                                <button onClick={() => openModal(emergencia)}>
                                                    <BiDetail/>
                                                </button>
                                            </div>

                                            {/*<button*/}
                                            {/*    onClick={() => editarEmergencia(emergencia.titulo)}*/}
                                            {/*    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"*/}
                                            {/*>*/}
                                            {/*    Editar*/}
                                            {/*</button>*/}
                                            {/*<button*/}
                                            {/*    onClick={() => marcarComoResuelta(emergencia.titulo)}*/}
                                            {/*    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
                                            {/*>*/}
                                            {/*    Marcar como Resuelta*/}
                                            {/*</button>*/}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                    </tbody>
                </table>
            </div>
            {showModal && selectedEmergencia && (
                <EmergenciaModal emergencia={selectedEmergencia} closeModal={closeModal}/>
            )}
        </div>
    );
};

export default Emergencias;

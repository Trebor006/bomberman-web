import React, { useEffect, useState } from 'react';
import {listarAllEmergencias, listarEmergenciasPorGruposTipoEmergencia} from '../pages/api/emergencias';


interface EmergenciaPorTipoDTO {
    _id: string;
    total: string;
    aceptadas: string;

}



const EmergenciasTable: React.FC = () => {
    const [emergencias, setEmergencias] = useState<EmergenciaPorTipoDTO[]>([]);
    useEffect(() => {
        const getEmergencias = async () => {
            const emergenciasData = await listarEmergenciasPorGruposTipoEmergencia();
            setEmergencias(emergenciasData);
        };
        getEmergencias();


    }, []);

    return (
        <div
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">



        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
                Emergencias
            </h3>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }} >Tipo de Emergencia</th>
                    <th style={{ border: '1px solid black', padding: '8px' }} >Total</th>
                    <th style={{ border: '1px solid black', padding: '8px' }} >Aceptadas</th>
                </tr>
                </thead>
                <tbody>
                {emergencias.map((emergencia) => (
                    <tr key={emergencia._id}>
                        <td style={{ border: '1px solid black', padding: '8px' }} >{emergencia._id}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }} >{emergencia.total}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }} >{emergencia.aceptadas}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>

    );
};



export default EmergenciasTable;
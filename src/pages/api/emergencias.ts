import axios from 'axios';
import {EmergenciaAllDTO} from "../../structure/emergenciaAll-dto";


interface EmergenciaPorTipoDTO {
    _id: string;
    total: string;
    aceptadas: string;

}


export async function listarEmergenciasPorGruposTipoEmergencia(): Promise<EmergenciaPorTipoDTO[]> {
    try {
        const response = await axios.get('https://resq-backend-app-hwn5h.ondigitalocean.app/emergencias/listarportipo'); // Reemplaza la URL con la de tu API
        //console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error al obtener las emergencias:', error);
        return [];
    }
}

export async function listarAllEmergencias(
    estado: string,
    fechaInicio: string,
    fechaFin: string,
    tipoEmergencia: string,
): Promise<EmergenciaAllDTO[]> {
    try {
        const response = await axios.get('https://resq-backend-app-hwn5h.ondigitalocean.app/emergencias/listarall', {
            params: {
                estado: estado,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                tipoEmergencia: tipoEmergencia
            }
        });

        return response.data;

    } catch (error) {
        console.error('Error al obtener las emergencias:', error);
        return [];
    }
}



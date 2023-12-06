import {ComentarioDto} from "./comentario-dto";

export interface Emergencia {
    correo: string;
    titulo: string;
    descripcion: string;
    tipoEmergencia: string;
    colorMarker: string;
    estado: string;
    audioUrl: string;
    imagenesUrls: string[];

    _id: string;
    lon: string;
    lat: string;
    createdAt: string;
    comentarios: ComentarioDto[] | undefined;
}
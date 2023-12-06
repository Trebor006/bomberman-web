export interface EmergenciaAllDTO {
    _id: string;
    correo: string;
    titulo: string;
    descripcion: string;
    tipoEmergencia: string;
    colorMarker: string;
    imagenesUrls: string[];
    estado: string;
    lat: string;
    lon: string;
    createdAt: string;
}
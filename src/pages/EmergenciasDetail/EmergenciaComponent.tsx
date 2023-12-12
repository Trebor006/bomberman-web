import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation, useParams} from 'react-router-dom';
import {Loader} from "@googlemaps/js-api-loader";
import {Emergencia} from "../../structure/emergencia";
import Slider from "react-slick";
import {ComentarioDto} from "../../structure/comentario-dto";
import ComentarioComponent from "./ComentarioComponent";

const Emergencias = () => {
    const {id} = useParams<{ id: string }>();
    const location = useLocation();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoEmergencia, setTipoEmergencia] = useState('');
    const [estado, setEstado] = useState('');
    const [audioUrl, setAutioUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [photos, setPhotos] = useState<string[]>([]);
    const [comentarios, setComentarios] = useState<ComentarioDto[]|undefined>([]);

    const [map, setMap] = useState<google.maps.Map | null>(null);


    const audioRef = React.createRef();

   //  const reproducirAudio = () => {
   //      audioRef.current.play();
   //  }
   //
   // const detenerAudio = () => {
   //      audioRef.current.pause();
   //      audioRef.current.currentTime = 0;
   //  }



    const cargarEmergencia = async () => {
        if (id) {
            try {
                const response = await axios.get(`https://resq-backend-app-hwn5h.ondigitalocean.app/emergencias/buscar?id=${id}`);
                const emergencia: Emergencia = response.data;

                console.log('Emergencia: ' + JSON.stringify(emergencia));

                setTitulo(emergencia.titulo);
                setDescripcion(emergencia.descripcion);
                setTipoEmergencia(emergencia.tipoEmergencia);
                setEstado(emergencia.estado);
                setAutioUrl(emergencia.audioUrl);
                setPhotos(emergencia.imagenesUrls);
                setComentarios(emergencia.comentarios);
                console.log("latitud: " + emergencia.lat);
                console.log("longitud: " + emergencia.lon);

                mapInitial(emergencia.lon, emergencia.lat);

            } catch (error) {
                console.error('Error al cargar la emergencia:', error);
            }
        }
    };

    useEffect(() => {
        setIsEditing(location.pathname.includes('editar') || location.pathname.includes('registrar'));
        cargarEmergencia();

        // return () => {
        //     isMounted = false; // Actualizar la variable de referencia cuando el componente se desmonte
        // };

    }, [id, location.pathname]);

    const actualizarComentarios = () => {
        cargarEmergencia()
    };

    const handleTituloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitulo(event.target.value);
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescripcion(event.target.value);
    };

    const handleTipoEmergenciaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoEmergencia(event.target.value);
    };

    const handleEstadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.value);
    };

    const handleGuardarClick = async () => {
        if (titulo === '' || descripcion === '' || tipoEmergencia === '' || estado === '') {
            toast.error('Por favor, complete todos los campos');
            return;
        }

        try {
            const emergenciaData: Emergencia = {
                _id: "",
                correo: '',
                titulo: '',
                createdAt: '',
                descripcion: '',
                tipoEmergencia: '',
                estado: '',
                audioUrl: '',

                lon: '',
                lat: '',
                colorMarker: '',
                imagenesUrls: [],
                comentarios: [],
            };

            if (isEditing && id) {
                const response = await axios.put(`https://resq-backend-app-hwn5h.ondigitalocean.app/emergencia/${id}`, emergenciaData);
                toast.success('Emergencia actualizada exitosamente');
                console.log('Respuesta del servidor:', response.data);
            } else {
                const response = await axios.post('https://resq-backend-app-hwn5h.ondigitalocean.app/emergencia/registrar', emergenciaData);
                toast.success('Emergencia registrada exitosamente');
                console.log('Respuesta del servidor:', response.data);
            }

            setTitulo('');
            setDescripcion('');
            setTipoEmergencia('');
            setEstado('');

        } catch (error) {
            toast.error('Error al guardar la emergencia');
            console.error('Error al guardar la emergencia:', error);
        }
    };

    const initMap = (longitud: string, latitud: string) => {
        const loader = new Loader({
            apiKey: 'AIzaSyAV1ignyt-6YWXoHH2eSjjJrwLjwUu1Bww&libraries=drawing,visualization',
            version: 'weekly',
        });
        loader.load().then(() => {
            console.log("initMap Lon: " + longitud);
            console.log("initMap Lat: " + latitud);

            const santacruz = {lat: parseFloat(latitud), lng: parseFloat(longitud)};

            const mapElement = document.getElementById('map');
            // @ts-ignore
            const map = new google.maps.Map(mapElement, {
                center: santacruz,
                zoom: 18,
                styles: [
                    {
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#f5f5f5"
                            }
                        ]
                    },
                    {
                        elementType: "labels.icon",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                color: "#616161"
                            }
                        ]
                    },
                    {
                        elementType: "labels.text.stroke",
                        stylers: [
                            {
                                color: "#f5f5f5"
                            }
                        ]
                    },
                    {
                        featureType: "administrative.land_parcel",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                color: "#bdbdbd"
                            }
                        ]
                    },
                    {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#eeeeee"
                            }
                        ]
                    },
                    {
                        featureType: "poi",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                color: "#757575"
                            }
                        ]
                    },
                    {
                        featureType: "poi.medical",
                        stylers: [
                            {
                                visibility: "on"
                            }
                        ]
                    },
                    {
                        featureType: "poi.park",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#e5e5e5"
                            }
                        ]
                    },
                    {
                        featureType: "poi.park",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                color: "#9e9e9e"
                            }
                        ]
                    },
                    {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#ffffff"
                            }
                        ]
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                color: "#757575"
                            }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#dadada"
                            }
                        ]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                color: "#616161"
                            }
                        ]
                    },
                    {
                        featureType: "road.local",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                color: "#9e9e9e"
                            }
                        ]
                    },
                    {
                        featureType: "transit.line",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#e5e5e5"
                            }
                        ]
                    },
                    {
                        featureType: "transit.station",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#eeeeee"
                            }
                        ]
                    },
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [
                            {
                                color: "#c9c9c9"
                            }
                        ]
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.fill',
                        stylers: [
                            {
                                color: '#9e9e9e'
                            }
                        ]
                    }
                    // {
                    //     featureType: 'poi',
                    //     stylers: [{visibility: 'off'}],
                    // },
                ],
            });

            const marker = new google.maps.Marker({
                position: santacruz,
                map: map,  // Utilizar la variable `map` local en lugar del estado `map`.
                title: titulo,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'red',
                    fillOpacity: 1,
                    strokeColor: 'red',
                    strokeOpacity: 1,
                    scale: 8,
                }
            });

            setMap(map);
        });
    };


    const mapInitial = (longitud: string, latitud: string) => {
        const loader = new Loader({
            apiKey: 'AIzaSyAV1ignyt-6YWXoHH2eSjjJrwLjwUu1Bww&libraries=drawing,visualization',
            version: 'weekly',
        });

        loader
            .load()
            .then(() => {
                initMap(longitud, latitud);
            })
            .catch((error) => {
                console.error('Error al cargar el mapa:', error);
            });
    }

    return (
        <div className="">
            <div className="w-full bg-gray-100 rounded p-8 flex">
                <div className="w-1/3 pr-4">
                    <h2 className="text-lg font-semibold mb-4">Detalle de la Emergencia</h2>
                    {/*<div className="mb-4">*/}
                    {/*    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">*/}
                    {/*        Título:*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        id="titulo"*/}
                    {/*        value={titulo}*/}
                    {/*        onChange={handleTituloChange}*/}
                    {/*        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"*/}
                    {/*        disabled={!isEditing}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="mb-4">*/}
                    {/*    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">*/}
                    {/*        Descripción:*/}
                    {/*    </label>*/}
                    {/*    <textarea*/}
                    {/*        id="descripcion"*/}
                    {/*        value={descripcion}*/}
                    {/*        onChange={handleDescripcionChange}*/}
                    {/*        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 "*/}
                    {/*        disabled={!isEditing}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="mb-4">
                        <label htmlFor="tipoEmergencia" className="textdetail block text-sm font-medium text-gray-700">
                            Tipo de Emergencia:
                        </label>
                        <input
                            type="text"
                            id="tipoEmergencia"
                            value={tipoEmergencia}
                            onChange={handleTipoEmergenciaChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="estado" className="textdetail block text-sm font-medium text-gray-700">
                            Estado:
                        </label>
                        <input
                            type="text"
                            id="estado"
                            value={estado}
                            onChange={handleEstadoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                        />
                    </div>

                    {
                        audioUrl &&
                        <div className="mb-4">
                            <label htmlFor="estado" className="textdetail block text-sm font-medium text-gray-700">
                                Audio:
                            </label>
                            <a target="_blank" href={audioUrl} >Abrir Audio</a>
                        </div>
                    }


                    <div className="mb-4">
                        <label htmlFor="imagen" className="textdetail block text-sm font-medium text-gray-700">
                            Imagenes:
                        </label>
                        <Slider>
                            {photos && photos.map((url, index) => (
                                <div key={index}>
                                    <img src={url} alt={`Imagen ${index + 1}`}/>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="flex justify-end gap-4.5">
                        <a
                            href="/emergencias-detail"
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        >
                            Cancelar
                        </a>
                        {isEditing && (
                            <button
                                onClick={handleGuardarClick}
                                className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                                Guardar
                            </button>
                        )}
                    </div>
                    <ToastContainer/>
                </div>
                <div className="w-1/3 pl-4">
                    <h2 className="text-lg font-semibold mb-4">Ubicación de la Emergencia</h2>
                    <div id="map" style={{height: '600px'}}></div>
                </div>
                <div className="w-1/3 pl-4">
                    <ComentarioComponent comentarios={comentarios} id={id} estadoEmergencia={estado} actualizarComentarios={actualizarComentarios}/>
                </div>
            </div>
        </div>
    );
};

export default Emergencias;

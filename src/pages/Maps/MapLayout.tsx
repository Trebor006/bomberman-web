import Map from "../../components/Map";
import MapFilter from "../../components/MapFilter";
import PublicLayout from "../../layout/PublicLayout";
import EstadisticasEmergencia from "../../components/EstadisticasEmergencia";

const MapLayout = () => {

    return (
        <PublicLayout>
            <div className="flex">
                <div className="w-1/4">
                    <MapFilter/>
                </div>
                <div className="w-3/4">
                    <Map/>
                </div>

            </div>
            <EstadisticasEmergencia />
        </PublicLayout>
    );
};

export default MapLayout;

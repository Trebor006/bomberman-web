import DefaultLayout from '../../layout/DefaultLayout';
import Emergencias from "./Emergencias";
import Breadcrumb from "../../components/Breadcrumb";

const EmergenciasDetails = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Detalle de Emergencias" />
            <Emergencias/>
        </DefaultLayout>
    );
};

export default EmergenciasDetails;

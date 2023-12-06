import DefaultLayout from '../../layout/DefaultLayout';
import TipoEmergencias from "./TipoEmergencias";
import Breadcrumb from "../../components/Breadcrumb";

const TipoEmergenciaForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tipo de Emergencias" />
            <TipoEmergencias/>
        </DefaultLayout>
    );
};

export default TipoEmergenciaForm;

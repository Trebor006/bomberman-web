import DefaultLayout from '../../layout/DefaultLayout';
import TipoEmergencia from "./TipoEmergencia";
import Breadcrumb from "../../components/Breadcrumb";

const TipoEmergenciaForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Registrar Tipo Emergencia" />
            <TipoEmergencia/>
        </DefaultLayout>
    );
};

export default TipoEmergenciaForm;

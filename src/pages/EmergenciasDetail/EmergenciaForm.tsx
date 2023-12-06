import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from "../../components/Breadcrumb";
import Emergencias from "./EmergenciaComponent";

const FuncionarioForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Revisar Emergencia"/>
            <Emergencias/>
        </DefaultLayout>
    );
};

export default FuncionarioForm;

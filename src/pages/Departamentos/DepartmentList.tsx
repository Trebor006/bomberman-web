import DefaultLayout from '../../layout/DefaultLayout';
import Departamentos from "./Departamentos";
import Breadcrumb from "../../components/Breadcrumb";

const DepartmentForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Departamentos" />

            <Departamentos/>
        </DefaultLayout>
    );
};

export default DepartmentForm;

// Alumbrado
// Basura acumulada
// Baches
// Fugas de agua
// Plazas descuidadas
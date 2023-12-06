import DefaultLayout from '../../layout/DefaultLayout';
import Departamento from "./Departamento";
import Breadcrumb from "../../components/Breadcrumb";

const DepartmentForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Registrar Departamento" />
            <Departamento/>
        </DefaultLayout>
    );
};

export default DepartmentForm;

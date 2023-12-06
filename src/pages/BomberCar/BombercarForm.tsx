import DefaultLayout from '../../layout/DefaultLayout';
import Bombercar from "./Bombercar";
import Breadcrumb from "../../components/Breadcrumb";

const DepartmentForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Registrar Carro bombero" />
            <Bombercar/>
        </DefaultLayout>
    );
};

export default DepartmentForm;

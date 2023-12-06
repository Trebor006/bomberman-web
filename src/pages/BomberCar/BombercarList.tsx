import DefaultLayout from '../../layout/DefaultLayout';
import Bombercars from "./Bombercars";
import Breadcrumb from "../../components/Breadcrumb";

const DepartmentForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Carros Bomberos" />
            <Bombercars/>
        </DefaultLayout>
    );
};

export default DepartmentForm;

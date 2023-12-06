import DefaultLayout from '../../layout/DefaultLayout';
import Bombers from "./Bombers";
import Breadcrumb from "../../components/Breadcrumb";

const DepartmentForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Bomberos" />

            <Bombers/>
        </DefaultLayout>
    );
};

export default DepartmentForm;

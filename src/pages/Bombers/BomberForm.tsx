import DefaultLayout from '../../layout/DefaultLayout';
import Bomber from "./Bomber";
import Breadcrumb from "../../components/Breadcrumb";

const BomberForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Registrar Bombero" />
            <Bomber/>
        </DefaultLayout>
    );
};

export default BomberForm;

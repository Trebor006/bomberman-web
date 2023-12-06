import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import MapLayout from "./pages/Maps/MapLayout";
import DepartmentForm from "./pages/Departamentos/DepartmentForm";
import TipoEmergenciaForm from "./pages/TipoEmergencias/TipoEmergenciaForm";
import DepartmentList from "./pages/Departamentos/DepartmentList";
import TipoEmergenciaList from "./pages/TipoEmergencias/TipoEmergenciaList";
import BomberForm from "./pages/Bombers/BomberForm";
import BomberList from "./pages/Bombers/BomberList";
import EmergenciasDetails from "./pages/EmergenciasDetail/EmergenciasDetails";
import EmergenciaForm from "./pages/EmergenciasDetail/EmergenciaForm";
import BombercarForm from "./pages/BomberCar/BombercarForm";
import BombercarList from "./pages/BomberCar/BombercarList";
import UpdatePassword from "./pages/Authentication/UpdatePassword";


function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [logged, setLogged] = useState(localStorage.getItem('logged') === 'true' ? true : false);

    const preloader = document.getElementById('preloader');

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        // <p className=" text-center text-danger">Failed to lead app</p>
        null
    ) : (
        <>
            {/*{!logged ?*/}
            {/*    <Routes>*/}
            {/*        <Route path="/" element={<MapLayout/>}/>*/}
            {/*        <Route path="/login" element={<SignIn/>}/>*/}
            {/*        <Route path="/emergencias-detail" element={<EmergenciasDetails/>}/>*/}
            {/*    </Routes>*/}
            {/*    :*/}
                <Routes>
                    <Route path="/" element={<EmergenciasDetails/>}/>

                    <Route path="/updatepassword" element={<UpdatePassword/>}/>


                    <Route path="/departaments" element={<DepartmentList/>}/>
                    <Route path="/departaments/registrar" element={<DepartmentForm/>}/>
                    <Route path="/departaments/ver/:id" element={<DepartmentForm/>}/>
                    <Route path="/departaments/editar/:id" element={<DepartmentForm/>}/>

                    <Route path="/complaintstype" element={<TipoEmergenciaList/>}/>
                    <Route path="/complaintstype/registrar" element={<TipoEmergenciaForm/>}/>
                    <Route path="/complaintstype/ver/:id" element={<TipoEmergenciaForm/>}/>
                    <Route path="/complaintstype/editar/:id" element={<TipoEmergenciaForm/>}/>

                    <Route path="/bombers" element={<BomberList/>}/>
                    <Route path="/bombers/registrar" element={<BomberForm/>}/>
                    <Route path="/bombers/ver/:id" element={<BomberForm/>}/>
                    <Route path="/bombers/editar/:id" element={<BomberForm/>}/>

                    <Route path="/bombercars" element={<BombercarList/>}/>
                    <Route path="/bombercars/registrar" element={<BombercarForm/>}/>
                    <Route path="/bombercars/ver/:id" element={<BombercarForm/>}/>
                    <Route path="/bombercars/editar/:id" element={<BombercarForm/>}/>

                    <Route path="/maps" element={<MapLayout/>}/>
                    <Route path="/emergencias-detail" element={<EmergenciasDetails/>}/>
                    <Route path="/emergencia-detail/ver/:id" element={<EmergenciaForm/>}/>
                    <Route path="/emergencia-detail/editar/:id" element={<EmergenciaForm/>}/>

                </Routes>
            {/*}*/}
        </>
    );
}

export default App;

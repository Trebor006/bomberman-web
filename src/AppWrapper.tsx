import {GeneralProvider} from "./pages/api/GeneralContext";
import App from "./App";


function AppWrapper() {

    return (
        <GeneralProvider>
            <App/>
        </GeneralProvider>
    );
}

export default AppWrapper;

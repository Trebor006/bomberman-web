import Logo from '../images/logo/logo-icon.svg';
import React from "react";

const PublicHeader = (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
}) => {
    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
                <div className="hidden sm:block">
                    <div className="relative">
                        <img src={Logo} alt="Logo"/>
                    </div>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <a href="/login" className="flex items-center text-blue-500 hover:text-blue-700">
                        Iniciar sesión
                    </a>
                </div>
            </div>
        </header>
    );
};

export default PublicHeader;

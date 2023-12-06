import {useState} from 'react';
import {IoChevronBackOutline, IoChevronForwardOutline} from 'react-icons/io5';

interface BotonesPaginacionProps {
    total: number;
    pageSize: number;
    page: number;
    cambiarPagina: (page: number) => void;
}

const BotonesPaginacion = ({total, pageSize, page, cambiarPagina }: BotonesPaginacionProps) => {

    const renderizarBotonesPaginas = () => {
        const botones = [];
        for (let i = 1; i <= total; i++) {
            botones.push(
                <button
                    key={i}
                    onClick={() => cambiarPagina(i)}
                    className={`bg-primary text-white rounded px-4 py-2 font-medium ${
                        page === i ? 'bg-opacity-80' : ''
                    }`}
                >
                    {i}
                </button>
            );
        }

        return botones;
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => cambiarPagina(page - 1)}
                disabled={page === 1}
                className="bg-primary text-white rounded px-4 py-2 font-medium"
            >
                <IoChevronBackOutline/>
            </button>
            {renderizarBotonesPaginas()}
            <button
                onClick={() => cambiarPagina(page + 1)}
                disabled={page >= total}
                className="bg-primary text-white rounded px-4 py-2 font-medium"
            >
                <IoChevronForwardOutline/>
            </button>
        </div>
    );
};

export default BotonesPaginacion;

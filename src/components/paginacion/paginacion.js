import {useSelector, useDispatch} from "react-redux";
import { setPagActual } from "../../redux/actions";

import './paginacion.css';

const Paginacion = ({ totalPagina}) => {
    const dispatch = useDispatch(); //para enviar una acción
    const paginaActual = useSelector((state) => state.paginaActual); //suscripción al estado global

    const pageNumber = [];
    const paginado = (pageNum) => { 
        dispatch(setPagActual(pageNum));
        //setPaginaActual(pageNum);
    };

    for (let i = 1; i < totalPagina; i++) {
        pageNumber.push(i);
    }

    let page = () => {
        const mitad = Math.round(4/2);
        let hasta = 5;
        if (paginaActual + mitad >= totalPagina) {
            hasta = totalPagina;
        } 
        else if (paginaActual > mitad) {
            hasta = paginaActual + mitad
        }

        let desde = hasta - 5;
        if (desde < 0) desde = 0;

        return pageNumber.slice(desde, hasta);
    };

    const pageAnterior = () => {
        const newPageCurrent = paginaActual - 1;
        if (newPageCurrent === 0) return;
        dispatch(setPagActual(newPageCurrent));
        //setPaginaActual(newPageCurrent);
    }

    const pageSiguiente = () => {
        const PageCurrent = paginaActual + 1;
        if (PageCurrent === totalPagina) return;
        dispatch(setPagActual(PageCurrent));
        //setPaginaActual(PageCurrent);
    }

    return <nav className="page">
        {
            paginaActual > 1 ?
            <button onClick={() => pageAnterior()} className="">&laquo;</button>
            : null
        }
        {
            page().map( number => (
                <button onClick={() => paginado(number)} key={number} className={number===paginaActual ? "selected" : "noselected"}>{number}</button>
            ))
        }
        {
            paginaActual < totalPagina ?
            <button onClick={() => pageSiguiente()} className="">&raquo;</button>
            : null
        }
    </nav>;
}

export default Paginacion;
import { useState } from "react";
import {useSelector} from "react-redux";

import Paginacion from "../paginacion/paginacion";
import Card from "../card/card";
import './cards.css';

const Cards = () => {
    //const [paginaActual, setPaginaActual] = useState(1);
    const [paisesPorPag] = useState(10);
    const countries = useSelector((state) => state.countries); //suscripción al estado global
    const paginaActual = useSelector((state) => state.paginaActual); //suscripción al estado global

    const indiceUltimoPais = paginaActual * paisesPorPag;
    const indicePrimerPais = indiceUltimoPais - paisesPorPag;
    const paisActual = countries.slice(indicePrimerPais, indiceUltimoPais);

    const totalPagina = Math.ceil(countries.length/paisesPorPag);

    return <div className='cards'>
        <div className='cardsCard'>
            {paisActual?.map((country) => <Card country={country} key={country.id} />)}
        </div>
        <Paginacion totalPagina={totalPagina} />
    </div>;
}

export default Cards;
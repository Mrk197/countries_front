import {NavLink} from "react-router-dom";
import './card.css';

const Card = ({country}) => {
    return <div className='card'>
        <NavLink to={`/${country.id}`} className='navlink'>
        <img src={country.imagenBandera} alt='nombre'/>
        <h2>{country.nombre}</h2>
        <h3>{country.continente}</h3>
        </NavLink>
    </div>;
}

export default Card;
import {NavLink} from "react-router-dom";
import './card.css';

const CardActivity = ({activity}) => {
    return <div className='card'>
        <NavLink to={`#`} className='navlink'>
        <h2>{activity.nombre}</h2>
        <h3>{activity.Season.temporada}</h3>
        <p>Duración: {activity.duracion} horas</p>
        <p>Dificultad: {activity.Difficulty.dificultad}</p>
        </NavLink>
    </div>;
}

export default CardActivity;
import { useParams, NavLink } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { useEffect } from "react";
import styles from './detail.module.css';

import { getDetailCountry } from "../../redux/actions";

const Detail = () => {
    const {idCountry} = useParams(); 
    const dispatch = useDispatch();
    const country = useSelector((state) => state.country);



    useEffect(() => {
        dispatch(getDetailCountry(idCountry));
    }, []);

    return <div>
        <div className={styles.cardDetail}>
            <h1>{country.nombre}</h1>
            <img src={country.imagenBandera} alt={country.nombre} />
            <p>Capital: {country.capital}</p>
            <p>Continente: {country.continente}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Poblacion: {country.poblacion}</p>
            <p>Area: {country.area}</p>
            {country.Activities?.length>0 && <NavLink to={'/activities/'} className={styles.navlink}>Ver Actividades</NavLink>}
        </div>
    </div>;
}

export default Detail;
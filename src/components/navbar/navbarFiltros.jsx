import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import { useEffect } from "react";

import SearchBar from "../searchbar/searchbar";
import { orderByName, getSeasons, filterCountries } from "../../redux/actions";

import styles from './navbar.module.css';

const NavBarFiltros = () => {
    const dispatch = useDispatch();
    const temporadas = useSelector((state) => state.temporadas);
    const continentes = ["Africa", "Antarctica","Asia", "Europe", "Oceania","North America", "South America"];

    const handleSelect = (e) => {
        console.log("select", e.target.value);
        console.log(e.target.value[0]);
        dispatch(filterCountries(e.target.value.slice(1), e.target.value[0]));
    };

    useEffect(() => {
        dispatch(getSeasons());
    }, [dispatch]);

    useEffect(() => {
        document.getElementsByName("ordenar").selectedIndex = 0;
    }, []);

    return <div className={styles.navbar}>
        <div className={styles.menu}>
            <NavLink to="/home" className={({ isActive }) => (isActive ? styles.active : styles.navlink)}>Home</NavLink>
            <NavLink to="/newActivity" className={({ isActive }) => (isActive ? styles.active : styles.navlink)}>Nueva Actividad</NavLink>
            |<NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.navlink)}>Salir</NavLink>
        </div>
        <div className={styles.filtros}>    
            <div>
                <label>Filtrar: </label>
                <select name="filtrado" onChange={handleSelect}>
                    <option value="none" selected disabled hidden>-Elige una opción-</option>
                    <optgroup label="Por continente">
                        {continentes.map((continente) => {
                            return<option value={1+continente} key={continente}>{continente}</option>
                        })}
                    </optgroup>
                    <optgroup label="Por temporada">
                        {temporadas.map((temporada) => {
                            return<option value={2+temporada.temporada} key={temporada.id}>{temporada.temporada}</option>
                        })}
                    </optgroup>
                </select>
            </div>
            <div>
                <label>Ordenar: </label>
                <select name="ordenar" onChange={(e) => dispatch(orderByName(e.target.value))} >
                    <option value="none" selected disabled hidden>- -</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>
            </div>
        </div>
        <SearchBar />
    </div>;
}

export default NavBarFiltros;
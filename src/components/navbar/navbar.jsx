import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";

import { useEffect } from "react";

import { getSeasons } from "../../redux/actions";

import styles from './navbar.module.css';

const NavBar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSeasons());
    }, [dispatch]);

    return <div className={styles.navbar}>
        <div className={styles.menu}>
            <NavLink to="/home" className={({ isActive }) => (isActive ? styles.active : styles.navlink)}>Home</NavLink>
            <NavLink to="/newActivity" className={({ isActive }) => (isActive ? styles.active : styles.navlink)}>Nueva Actividad</NavLink>
            |<NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.navlink)}>Salir</NavLink>
        </div>
    </div>;
}

export default NavBar;
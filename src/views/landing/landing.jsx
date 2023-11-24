import styles from './landing.module.css';
import {NavLink} from "react-router-dom";

const Landing = () => {
    return <div className={styles.landing}>
        <div className={styles.divText}>
            <h1 style={{color: '#F2F7A1'}}>CATALOGO DE PAISES</h1>
            <h2>Encuentra recomendaciones de actividades de acuerdo a el país donde te encuentras.</h2>
            <h2>Así como también puedes compartir tus propias experiencias.</h2>
            <h3>¡¡ Recomiendanos !!</h3>
            <NavLink to="/home" className={styles.navlink}>EXPLORAR</NavLink>
        </div>
        <div className={styles.divImg}>

        </div>
    </div>;
}

export default Landing;
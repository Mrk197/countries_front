import { useEffect } from "react";
import { useSelector} from "react-redux";
import styles from './activities.module.css';

import CardActivity from "../../components/cardActivity/cardActivity";

const Activities = () => {
    const country = useSelector((state) => state.country);

    useEffect(() => {
        
    }, []);

    return <div>
        <div className={styles.cardActivities}>
            <h1>{country.nombre}</h1>
            <h4>Actividades</h4>
            <div>
                {country.Activities?.map((activity) => <CardActivity activity={activity} />)}
            </div>
        </div>
    </div>;
}

export default Activities;

import { useEffect } from 'react';
import {useDispatch} from "react-redux";

import { getCountries } from '../../redux/actions';
import Cards from '../../components/cards/cards';
import styles from './home.module.css';

const Home = () => {
    const dispatch = useDispatch(); //para enviar una acción

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    return <div className={styles.home}>
        <Cards />
    </div>;
}

export default Home;
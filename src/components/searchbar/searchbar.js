import { useState } from 'react';
import {useDispatch} from "react-redux";
import { searchCountryByName, getCountries } from '../../redux/actions';

import './searchbar.css';

const SearchBar = () => {
    const [namePais, setnamePais] = useState("");
    const dispatch = useDispatch(); //para enviar una acción

    const handleSearch = () => {
        const search = document.getElementById("search").value;
        setnamePais(search);
    };

    const submit = () => {
        dispatch(searchCountryByName(namePais));
        setnamePais("");
    }

    const clear = () => {
        dispatch(getCountries());
    }

    return <div className='searchbar'>
        <input type="search" id="search" name="search" onChange={handleSearch} value={namePais} placeholder='Buscar país por nombre' />
        {namePais !== "" && <button onClick={submit}>Buscar País</button>}
        {namePais === "" && <button onClick={clear}>Mostrar Todos</button>}
    </div>;
}

export default SearchBar;
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getSeasons, getDifficulty } from "../../redux/actions";
import './form.css';
import axios from "axios";
const {REACT_APP_URL_API} = process.env;

const Form = () => {
    const dispatch = useDispatch();
    const temporadas = useSelector((state) => state.temporadas);
    const dificultad = useSelector((state) => state.dificultad);
    const countries = useSelector((state) => state.allCountries);
    //const [disabled, setDissabled] = useState(true);

    const [newActividad, setnewActividad] = useState({
        nombre: '',
        duracion: '',
        temporada: '',
        dificultad: '',
        idCountry: []
    });

    const [errors, setErrors] = useState({});

    const validate = (newActividad) => {
        let errors = {};
        if (newActividad.nombre === ''){
            errors.nombre = "Debes llenar este campo";
        };
        if (newActividad.duracion > 24){
            errors.duracion = "Dato no valido"; 
        }
        if (newActividad.duracion === ''){
            errors.duracion = "Debes llenar este campo"; 
        }
        if (newActividad.temporada === ''){
            errors.temporada = "Selecciona una opción"; 
        }
        if (newActividad.dificultad === ''){
            errors.dificultad = "Selecciona una opción"; 
        }
        if ( Object.keys(newActividad.idCountry).length  === 0) {
            errors.idCountry = "Debes selecionar un pais"; 
        }
        return errors;
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        // if (e.target.name == "idCountry") {
        //     setnewActividad({
        //         ...newActividad,
        //         idCountry: [...newActividad.idCountry, e.target.value]
        //     });
        // }
        // else{
            setnewActividad({
                ...newActividad,
                [e.target.name]:e.target.value
            });
        //}
    };

    const countrySelected = () => {
        const newid =  document.getElementsByName("idCountry")[0].value;
        const exist = newActividad.idCountry.includes(newid);
        if (!exist) {
            setnewActividad({
                ...newActividad,
                idCountry: [...newActividad.idCountry, newid]
            });
        }
    };

    const deleteid = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        const newIdCountry = newActividad.idCountry.filter(id => id !==  e.target.id);
        setnewActividad({
            ...newActividad,
            idCountry: [...newIdCountry]
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/activities`, newActividad);
            alert("Se creo la actividad " + response.data.nombre);
            setnewActividad({
                nombre: '',
                duracion: '',
                temporada: '',
                dificultad: '',
                idCountry: []
            });
        } catch (error) {
            alert(error.response.data);
        }
    };

    useEffect(() => {
        dispatch(getSeasons());
        dispatch(getDifficulty());
    },[dispatch]);

    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            document.getElementById('add').disabled = false;
        }
        else{
            document.getElementById('add').disabled = true;
        }
    }, [errors]);

    useEffect(() =>{
        function checkErrors() {            
            setErrors(validate(newActividad));
        }
        checkErrors();
        console.log(newActividad);
    }, [newActividad]);

    return <div className="form">
            <h2>Nueva Actividad</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" name="nombre" value={newActividad.nombre} onChange={handleInputChange} placeholder="Nombre de la actividad" />
                    <span>{errors.nombre}</span>
                </div>
                <div>
                    <label>Duracion: </label>
                    <input type="number" name="duracion" value={newActividad.duracion} onChange={handleInputChange} placeholder="En horas" />
                    <span>{errors.duracion}</span>
                </div>
                <div>
                    <label>Temporada: </label>
                    <select name="temporada" onChange={handleInputChange}>
                        <option>- -</option>
                        {temporadas.map((temporada) => {
                            return<option value={temporada.id} key={temporada.id}>{temporada.temporada}</option>
                        })}
                    </select>
                    <span>{errors.temporada}</span>
                </div>
                <div>
                    <label>Dificultad: </label>
                    <select name="dificultad" onChange={handleInputChange}>
                        <option>- -</option>
                        {dificultad.map((dificultad) => {
                            return<option value={dificultad.id} key={dificultad.id}>{dificultad.dificultad}</option>
                        })}
                    </select>
                    <span>{errors.dificultad}</span>
                </div>
                <div>
                    <label>País: </label>
                    <input type="text" name="idCountry" list="items1"/>
                    <input type="button" value="Agregar" onClick={countrySelected}/>
                    <datalist id="items1">
                        {countries.map(country => {
                            return<option value={country.id}>{country.nombre}</option>
                        })}
                    </datalist>
                    <span>{errors.idCountry}</span>
                </div>
                <div className="listIdCountries">
                    {newActividad.idCountry.map(id => <div>{id}<button id={id} onClick={deleteid}>x</button> </div>)}
                </div>
                <input id="add" type="submit" value="Agregar" disabled/>
            </form>
    </div>;
}

export default Form;
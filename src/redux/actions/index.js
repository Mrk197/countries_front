import axios from "axios";
import { actionsTypes } from "./actions_types";
const {REACT_APP_URL_API} = process.env;

export const getCountries = () => {
    return async function(dispatch) {
        try {
            const response = await axios(`${REACT_APP_URL_API}/countries`);
            
            return dispatch({
                type: actionsTypes.GET_COUNTRIES,
                payload: response.data
            });
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const searchCountryByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios(`${REACT_APP_URL_API}/countries?name=${name}`);
            return dispatch({
                type: actionsTypes.SEARCH_COUNTRIES,
                payload: response.data
            });
        } catch (error) {
            alert(error.response.data);
        }
    }

};

export const filterCountries = (filterValue, filterType) => {
    return async function (dispatch) {
        const response = await axios(`${REACT_APP_URL_API}/countries`);
        const verifySeason = (activities, filterValue) =>{
            const result = activities.filter( activity => activity.Season.temporada === filterValue);
            if(result.length > 0) return true;
            return false;
        };
        if (filterType === "1") {
            const filterByContinent = response.data.filter(country => country.continente.toLowerCase() === filterValue.toLowerCase());
            return dispatch({
                type: actionsTypes.FILTER_COUNTRIES,
                payload: filterByContinent
            });
        }
        else{
            const filterBySeason = response.data.filter(country => verifySeason(country.Activities, filterValue));
            return dispatch({
                type: actionsTypes.FILTER_COUNTRIES,
                payload: filterBySeason
            });
        }
    }
};

export const setPagActual = (page) => {
    return{
        type: actionsTypes.SET_PAGINA_ACTUAL,
        payload: page
    }
};

export const orderByName = (orderFilter) => {
    return{
        type: actionsTypes.ORDER_BY_NAME,
        payload: orderFilter
    }
};

export const getSeasons = () => {
    return async function (dispatch) {
        const response = await axios(`${REACT_APP_URL_API}/activities/season`);
        return dispatch({
            type: actionsTypes.GET_SEASONS,
            payload: response.data
        });
    }
};

export const getDifficulty = () => {
    return async function (dispatch) {
        const response = await axios(`${REACT_APP_URL_API}/activities/difficulty`);
        return dispatch({
            type: actionsTypes.GET_DIFFICULTY,
            payload: response.data
        });
    }
};

export const getDetailCountry = (idCountry) => {
    return async function (dispatch) {
        try {
            const response = await axios(`${REACT_APP_URL_API}/countries/${idCountry}`);
            return dispatch({
                type: actionsTypes.GET_DETAIL_ACTIVITY,
                payload: response.data
            });
        } catch (error) {
            //console.log(error);
            alert(error.response.data)
        }
    }
};
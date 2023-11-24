import { actionsTypes } from "../actions/actions_types";

let initialState = {
    allCountries:[],
    countries: [],
    country: [],
    paginaActual: 1,
    continentes: [],
    temporadas: [],
    dificultad: [],
};

function rootReducer(state=initialState, action){
    console.log(action);
    switch (action.type) {
        case actionsTypes.GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                countries: action.payload
            }
        case actionsTypes.SEARCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                paginaActual: 1
            }
        case actionsTypes.FILTER_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                paginaActual: 1
            }
        case actionsTypes.SET_PAGINA_ACTUAL:
            return{
                ...state,
                paginaActual: action.payload
            }
        case actionsTypes.ORDER_BY_NAME:
            const orderedByName = [...state.countries];
            orderedByName.sort((a,b) => {
                if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                    return action.payload === "a-z" ? -1 : 1;
                }
                if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                    return action.payload === "a-z" ? 1 : -1;
                }
                return 0;
            });
            return{
                ...state,
                countries: orderedByName,
                paginaActual: 1
            }
        case actionsTypes.GET_SEASONS:
            return{
                ...state,
                temporadas: action.payload
            }
        case actionsTypes.GET_DIFFICULTY:
            return{
                ...state,
                dificultad: action.payload
            }
        case actionsTypes.GET_DETAIL_ACTIVITY:
            return {
                ...state,
                country: action.payload
            }
        default:
            return state;
    }
};

export default rootReducer;
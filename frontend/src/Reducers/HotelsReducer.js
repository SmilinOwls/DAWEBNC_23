import {GET_HOTEL_FAILURE, GET_HOTEL_SUCCESS, GET_HOTEL_REQUEST, SEARCH_HOTEL} from '../Constants/HotelsConstant';

const initialState = {
    hotels: [],
    searchHotels: [],
    isLoading: false,
    error: null
};

function hotelsReducer(state=initialState, action){
    switch(action.type){
        case GET_HOTEL_REQUEST:{
            return {...state, isLoading:true, error: null}
        }
        case GET_HOTEL_SUCCESS: {
            return {...state, isLoading:false, hotels: action.payload}
        }
        case GET_HOTEL_FAILURE:{
            return {...state, isLoading: false, error: action.error}
        }
        case SEARCH_HOTEL:
            return {...state, hotels: [], searchHotels: action.payload, isLoading: false, error: null}
        default:
            return state;
    }
};

export default hotelsReducer;
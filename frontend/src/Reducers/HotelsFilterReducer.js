import {GET_HOTEL_FILTER_FAILURE, GET_HOTEL_FILTER_REQUEST, GET_HOTEL_FILTER_SUCCESS, FILTER_HOTEL_BY_SORT} from '../Constants/HotelsConstant';

const initialState = {
    hotelsFilter: [],
    isLoading: false,
    error: null
};

export function hotelsFilterReducer(state=initialState, action){
    switch(action.type){
        case GET_HOTEL_FILTER_REQUEST:
            return {...state, isLoading: true}
        case GET_HOTEL_FILTER_SUCCESS:
            return {...state, isLoading: false, hotelsFilter: action.payload}
        case GET_HOTEL_FILTER_FAILURE:
            return {...state, isLoading: false, error: action.error}
            case FILTER_HOTEL_BY_SORT:
                switch(action.payload){
                    case "rate_lth":
                        return {...state, hotelsFilter: state.hotelsFilter.sort((a, b) => a.ratings - b.ratings)};
                    case "rate_htl":
                       return {...state, hotelsFilter: state.hotelsFilter.sort((a, b) => b.ratings - a.ratings)};
                    default: 
                        return state;
                }
        default:
            return state;
    }
}
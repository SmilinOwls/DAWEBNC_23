import {GET_SITE_DETAIL_FAILURE, GET_SITE_DETAIL_REQUEST, GET_SITE_DETAIL_SUCCESS} from '../Constants/SitesConstants'
const initialState = {
    detailSite: [],
    isLoading: false,
    error: null
}

function detailSiteReducer(state=initialState, action){
    switch(action.type){
        case GET_SITE_DETAIL_REQUEST:{
            return {...state, isLoading:true, error: null}
        }
        case GET_SITE_DETAIL_SUCCESS: {
            return {...state, isLoading:false, detailSite: action.payload}
        }
        case GET_SITE_DETAIL_FAILURE:{
            return {...state, isLoading: false, error: action.error}
        }
        default:
            return state;
    }
};

export default detailSiteReducer
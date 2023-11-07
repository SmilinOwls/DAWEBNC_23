import {GET_BLOG_FAILURE, GET_BLOG_REQUEST, GET_BLOG_SUCCESS} from '../Constants/BlogsConstant';

const initialState = {
    blogs: [],
    isLoading: false,
    error: null
};

function blogsReducer(state=initialState, action){
    switch(action.type){
        case GET_BLOG_REQUEST:{
            return {...state, isLoading:true, error: null}
        }
        case GET_BLOG_SUCCESS: {
            return {...state, isLoading:false, blogs: action.payload}
        }
        case GET_BLOG_FAILURE:{
            return {...state, isLoading: false, error: action.error}
        }
        default:
            return state;
    }
};

export default blogsReducer;
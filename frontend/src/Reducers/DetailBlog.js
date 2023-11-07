import {GET_DETAIL_BLOG_FAILURE, GET_DETAIL_BLOG_SUCCESS, GET_DETAIL_BLOG_REQUEST} from '../Constants/BlogsConstant'

const initialState = {
   detailBlog: [],
   isLoading: false,
   error: null
}

function detailBlogReducer(state=initialState, action){
    switch(action.type){
        case GET_DETAIL_BLOG_REQUEST:{
            return {...state, isLoading:true, error: null}
        }
        case GET_DETAIL_BLOG_SUCCESS: {
            return {...state, isLoading:false, detailBlog: action.payload}
        }
        case GET_DETAIL_BLOG_FAILURE:{
            return {...state, isLoading: false, error: action.error}
        }
        default:
            return state;
    }
};

export default detailBlogReducer
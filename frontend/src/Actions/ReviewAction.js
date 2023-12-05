import {CREATE_REVIEW_FAILURE, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_REQUEST} from '../Constants/HotelsConstant';
import axios from '../Services/axios';

export function createReviewHotels(review, hotelId){
    return async (dispatch) => {
        dispatch({type: CREATE_REVIEW_REQUEST})
        try {
            const data = {
                rating: Number(review.rating),
                comment: review.comment
            }
            const userInfo = JSON.parse(localStorage.getItem("user"));
            const method = "post";
            let url = `/place/${hotelId}/review`;
            const headers = {
                "Content-Type": "application/json",
            };
            if(userInfo){
                const {accessToken} = userInfo
                headers.token = `Bearer ${accessToken}`
            }
            
            await axios({ url, method, data, headers }).then((response) => {
                dispatch({type: CREATE_REVIEW_SUCCESS, payload: response.data})
            })
            
        } catch (error) {
            dispatch({type: CREATE_REVIEW_FAILURE, payload: error})
        }
    }
}
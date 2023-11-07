import {
  GET_HOTEL_FAILURE,
  GET_HOTEL_SUCCESS,
  GET_HOTEL_REQUEST,
  GET_HOTEL_FILTER_FAILURE,
  GET_HOTEL_FILTER_SUCCESS,
  GET_HOTEL_FILTER_REQUEST,
  GET_DETAIL_HOTEL_FAILURE,
  GET_DETAIL_HOTEL_SUCCESS,
  GET_DETAIL_HOTEL_REQUEST,
  GET_ROOMS_HOTEL_FAILURE,
  GET_ROOMS_HOTEL_REQUEST,
  FILTER_HOTEL_BY_SORT,
  GET_ROOMS_HOTEL_SUCCESS,
  SEARCH_HOTEL
} from "../Constants/HotelsConstant";
import hotelApi from "../Services/hotelApi";

export function getHotels() {
  return async (dispatch) => {
    dispatch({ type: GET_HOTEL_REQUEST });
    try {
      const { data } = await hotelApi.getHotels();
      dispatch({ type: GET_HOTEL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_HOTEL_FAILURE,
        error: { error },
      });
    }
  };
}

export function getHotelsFilter(ratings = "", options = "") {
  return async (dispatch) => {
    dispatch({ type: GET_HOTEL_FILTER_REQUEST });
    try {
      const { data } = await hotelApi.getHotelsFilter(ratings, options);
      dispatch({ type: GET_HOTEL_FILTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_HOTEL_FILTER_FAILURE,
        error: { error },
        //payload: { error: error.response.data },
      });
    }
  };
};

export function getDetailHotel(hotelId){
  return async (dispatch) => {
    dispatch({ type: GET_DETAIL_HOTEL_REQUEST });
    try {
      const { data } = await hotelApi.getDetailHotel(hotelId);
      dispatch({ type: GET_DETAIL_HOTEL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_DETAIL_HOTEL_FAILURE,
        error: { error },
        //payload: { error: error.response.data },
      });
    }
  };
};

export function getRoomByHotel(hotelId){
  return async (dispatch) => {
    dispatch({ type: GET_ROOMS_HOTEL_REQUEST });
    try {
      const { data } = await hotelApi.getRoomsByHotel(hotelId);
      dispatch({ type: GET_ROOMS_HOTEL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ROOMS_HOTEL_FAILURE,
        error: { error },
        //payload: { error: error.response.data },
      });
    }
  };
};

export function filterHotelBySort(str){
    return (dispatch) => {
        dispatch({type: FILTER_HOTEL_BY_SORT, payload: str})
    }
}

export function searchHotel(keyword){
  return async(dispatch) => {
    try {
      const {data} = await hotelApi.searchHotel(keyword);
      dispatch({type: SEARCH_HOTEL, payload: data});
    } catch (error) {
        console.log(error);
    }
     
  }
}

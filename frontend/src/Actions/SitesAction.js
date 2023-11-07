import {
  GET_SITE_FAILURE,
  GET_SITE_SUCCESS,
  GET_SITE_REQUEST,
  GET_SITE_DETAIL_FAILURE,
  GET_SITE_DETAIL_REQUEST,
  GET_SITE_DETAIL_SUCCESS,
  GET_PLACE_SITE_FAILURE,
  GET_PLACE_SITE_REQUEST, 
  GET_PLACE_SITE_SUCCESS
} from "../Constants/SitesConstants";
import siteApi from "../Services/siteApi";

export function getSites() {
  return async (dispatch) => {
    dispatch({type: GET_SITE_REQUEST})
    try {
      const { data } = await siteApi.getSites();
      dispatch({ type: GET_SITE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SITE_FAILURE,
        error: { error },
      });
    }
  };
}

export function getDetailSite(id) {
  return async (dispatch) => {
    dispatch({ type: GET_SITE_DETAIL_REQUEST });
    try {
      const { data } = await siteApi.getSiteById(id);
      dispatch({ type: GET_SITE_DETAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SITE_DETAIL_FAILURE,
        error: { error },
      });
    }
  };
}

export function getPlaceBySite(id){
  return async (dispatch) => {
    dispatch({type: GET_PLACE_SITE_REQUEST})
    try {
      const { data } = await siteApi.getPlaceBySite(id);
      dispatch({ type: GET_PLACE_SITE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_PLACE_SITE_FAILURE,
        error: { error },
      });
    }
  }
}
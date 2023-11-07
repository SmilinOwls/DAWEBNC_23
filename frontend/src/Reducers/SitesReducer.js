import {
  GET_SITE_FAILURE,
  GET_SITE_SUCCESS,
  GET_SITE_REQUEST,
  GET_PLACE_SITE_FAILURE, 
  GET_PLACE_SITE_REQUEST,
  GET_PLACE_SITE_SUCCESS
} from "../Constants/SitesConstants";
const initialState = {
  sites: [],
  isLoading: false,
  error: null,
};

export function sitesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SITE_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_SITE_SUCCESS: {
      return { ...state, isLoading: false, sites: action.payload };
    }
    case GET_SITE_FAILURE: {
      return { ...state, isLoading: false, error: action.error };
    }
    default:
      return state;
  }
}

const initialPlace = {
  placeSites: [],
  isLoading: false,
  error: null,
};

export function placeSiteReducer(state = initialPlace, action) {
  switch (action.type) {
    case GET_PLACE_SITE_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_PLACE_SITE_SUCCESS: {
      return { ...state, isLoading: false, placeSites: action.payload };
    }
    case GET_PLACE_SITE_FAILURE: {
      return { ...state, isLoading: false, error: action.error };
    }
    default:
      return state;
  }
}

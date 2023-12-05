import {
  GET_DETAIL_HOTEL_FAILURE,
  GET_DETAIL_HOTEL_SUCCESS,
  GET_DETAIL_HOTEL_REQUEST,
  GET_ROOMS_HOTEL_FAILURE,
  GET_ROOMS_HOTEL_REQUEST,
  GET_ROOMS_HOTEL_SUCCESS,
} from "../Constants/HotelsConstant";

const initialState = {
  detailHotel: [],
  isLoading: false,
  error: null,
};

const initialRoom = {
  roomByHotel: [],
  loading: false,
  error: null,
}

function detailHotelReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAIL_HOTEL_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_DETAIL_HOTEL_SUCCESS: {
      return { ...state, isLoading: false, detailHotel: action.payload };
    }
    case GET_DETAIL_HOTEL_FAILURE: {
      return { ...state, isLoading: false, error: action.error };
    }
    default:
      return state;
  }
}

function getRoomByHotelReducer(state = initialRoom, action){
    switch (action.type) {
        case GET_ROOMS_HOTEL_REQUEST: {
          return { ...state, loading: true, error: null };
        }
        case GET_ROOMS_HOTEL_SUCCESS: {
          return { ...state, loading: false, roomByHotel: action.payload };
        }
        case GET_ROOMS_HOTEL_FAILURE: {
          return { ...state, loading: false, error: action.error };
        }
        default:
          return state;
      }
}

export { detailHotelReducer, getRoomByHotelReducer };

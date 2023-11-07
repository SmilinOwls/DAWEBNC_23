import {GET_DETAIL_ROOM_FAILURE, GET_DETAIL_ROOM_SUCCESS, GET_DETAIL_ROOM_REQUEST} from '../Constants/RoomConstant';

const initialState={
    detailRoom: [],
    isLoading: false,
    error: null
}

function detailRoomReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DETAIL_ROOM_REQUEST: {
        return { ...state, isLoading: true, error: null };
      }
      case GET_DETAIL_ROOM_SUCCESS: {
        return { ...state, isLoading: false, detailRoom: action.payload };
      }
      case GET_DETAIL_ROOM_FAILURE: {
        return { ...state, isLoading: false, error: action.error };
      }
      default:
        return state;
    }
  };

  export default detailRoomReducer
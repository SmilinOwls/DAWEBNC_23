import {GET_DETAIL_ROOM_FAILURE, GET_DETAIL_ROOM_SUCCESS, GET_DETAIL_ROOM_REQUEST} from '../Constants/RoomConstant';
import roomApi from '../Services/roomApi';

export function getDetailRoom(roomId){
    return async (dispatch) => {
      dispatch({ type: GET_DETAIL_ROOM_REQUEST });
      try {
        const { data } = await roomApi.getDetailRoom(roomId);
        dispatch({ type: GET_DETAIL_ROOM_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: GET_DETAIL_ROOM_FAILURE,
          error: { error },
          //payload: { error: error.response.data },
        });
      }
    };
  };
  
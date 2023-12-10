import {
  GET_CLASSROOM_REQUEST,
  GET_CLASSROOM_SUCCESS,
  GET_CLASSROOM_FAILURE,
  CREATE_CLASSROOM_REQUEST,
  CREATE_CLASSROOM_SUCCESS,
  CREATE_CLASSROOM_FAILURE,
} from "../Constants/ClassroomConstant";

import classroomApi from "../Services/classroomApi";

export function getClassroom() {
  return async (dispatch) => {
    dispatch({ type: GET_CLASSROOM_REQUEST });
    try {
      const { data } = await classroomApi.getClassroom();
      dispatch({ type: GET_CLASSROOM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_CLASSROOM_FAILURE,
        error: { error },
      });
    }
  };
}

export function createClassroom(data) {
  return async (dispatch) => {
    dispatch({ type: CREATE_CLASSROOM_REQUEST });
    try {
      const response = await classroomApi.createClassroom(data);
      dispatch({ type: CREATE_CLASSROOM_SUCCESS, payload: response });
    } catch (error) {
      dispatch({
        type: CREATE_CLASSROOM_FAILURE,
        error: { error },
      });
    }
  };
}

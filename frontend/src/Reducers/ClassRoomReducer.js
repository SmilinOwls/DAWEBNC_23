import {
  GET_CLASSROOM_REQUEST,
  GET_CLASSROOM_SUCCESS,
  GET_CLASSROOM_FAILURE,
  CREATE_CLASSROOM_REQUEST,
  CREATE_CLASSROOM_SUCCESS,
  CREATE_CLASSROOM_FAILURE,
} from "../Constants/ClassroomConstant";

const initialState = {
  classrooms: [],
  isLoading: false,
  error: null,
};

function classRoomReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSROOM_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_CLASSROOM_SUCCESS: {
      return { ...state, isLoading: false, hotels: action.payload };
    }
    case GET_CLASSROOM_FAILURE: {
      return { ...state, isLoading: false, error: action.error };
    }
    case CREATE_CLASSROOM_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case CREATE_CLASSROOM_SUCCESS: {
      return { ...state, isLoading: false, hotels: action.payload };
    }
    case CREATE_CLASSROOM_FAILURE: {
      return { ...state, isLoading: false, error: action.error };
    }
    default:
      return state;
  }
}

export default classRoomReducer;

import { GET_CLASSROOM, UPDATE_CLASSROOM, DELETE_CLASSROOM } from '../Constants/AdminConstant';

export default function ClassroomAdminReducer(state = [], action) {
  switch (action.type) {
    case GET_CLASSROOM:
      return state.length !== 0 ?  state : action.classroom;
    case UPDATE_CLASSROOM:
        const data = [...state];
        const idx = data.findIndex(classroom => classroom._id === action.classroom._id);
        if(idx > -1){
            data.splice(idx, 1, {
                ...action.classroom,
            });
        } else{
            data.push(action.classroom);
        }
      return data;
    case DELETE_CLASSROOM:
      return state.filter(classroom => classroom._id !== action._id);
    default:
      return state;
  }
}
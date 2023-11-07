import { GET_ROOM, ADD_ROOM, UPDATE_ROOM, DELETE_ROOM } from '../Constants/AdminConstant';

export default function RoomAdminReducer(state = [], action) {
  switch (action.type) {
    case GET_ROOM:
      return state.length !== 0 ?  state : action.rooms;
    case ADD_ROOM:
      return [...state, action.room];
    case UPDATE_ROOM:
        const data = [...state];
        const idx = data.findIndex(room => room._id === action.room._id);
        if(idx > -1){
            data.splice(idx, 1, {
                ...action.room,
            });
        } else{
            data.push(action.room);
        }
      return data;
    case DELETE_ROOM:
      return state.filter(room => room._id !== action._id);
    default:
      return state;
  }
}
import { GET_USER, UPDATE_USER, DELETE_USER } from '../Constants/AdminConstant';

export default function UserAdminReducer(state = [], action) {
  switch (action.type) {
    case GET_USER:
      return state.length !== 0 ?  state : action.users;
    case UPDATE_USER:
        const data = [...state];
        const idx = data.findIndex(user => user._id === action.user._id);
        if(idx > -1){
            data.splice(idx, 1, {
                ...action.user,
            });
        } else{
            data.push(action.user);
        }
      return data;
    case DELETE_USER:
      return state.filter(user => user._id !== action._id);
    default:
      return state;
  }
}
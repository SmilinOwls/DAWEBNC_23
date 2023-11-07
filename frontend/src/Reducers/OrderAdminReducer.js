import { GET_ORDER, UPDATE_ORDER, DELETE_ORDER } from '../Constants/AdminConstant';

export default function OrderAdminReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDER:
      return state.length !== 0 ?  state : action.orders;
    case UPDATE_ORDER:
        const data = [...state];
        const idx = data.findIndex(order => order._id === action.order._id);
        if(idx > -1){
            data.splice(idx, 1, {
                ...action.order,
            });
        } else{
            data.push(action.order);
        }
        
      return data;
    case DELETE_ORDER:
      return state.filter(order => order._id !== action._id);
    default:
      return state;
  }
}
import { GET_PLACE, ADD_PLACE, UPDATE_PLACE, DELETE_PLACE } from '../Constants/AdminConstant';

export default function HotelAdminReducer(state = [], action) {
  switch (action.type) {
    case GET_PLACE:
      return state.length !== 0 ? state : action.places;
    case ADD_PLACE:
      return [...state, action.place];
    case UPDATE_PLACE:
      const data = [...state];
      const idx = data.findIndex(place => place._id === action.place._id);
      if (idx > -1) {
        data.splice(idx, 1, {
          ...action.place,
        });
      } else {
        data.push(action.place);
      }
      return data;
    case DELETE_PLACE:
      return state.filter(place => place._id !== action._id);
    default:
      return state;
  }
}
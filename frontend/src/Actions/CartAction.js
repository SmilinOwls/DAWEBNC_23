import {ADD_CART_ITEM, REMOVE_CART_ITEM, SAVE_PAYMENT_METHOD, SAVE_USER_INFO} from '../Constants/CartConstants';
import roomApi from '../Services/roomApi'

export const addToCart = (roomId, qnt, numOfDays) => {
   return async(dispatch) => {
      const {data} = await roomApi.getDetailRoom(roomId);
      const cart = {
        room: data._id,
        title: data.title,
        image: data?.photos[0],
        price: data.price,
        maxGuests: data.maxGuests,
        numOfDays,
        qnt
      }
      dispatch({type: ADD_CART_ITEM, payload: cart})
   }
}

export const removeFromCart = (id) => {
   return (dispatch) => {
      dispatch({type: REMOVE_CART_ITEM, payload: id})
   }
};

export const saveUserInfo = (data) => {
   return (dispatch) => {
    dispatch({type: SAVE_USER_INFO, payload: data})
   }
};

export const savePaymentMethod = (data) => {
    return (dispatch) => {
       dispatch({type: SAVE_PAYMENT_METHOD, payload: data})
    }
 }
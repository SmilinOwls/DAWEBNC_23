import {ADD_WISHLIST_ITEM, REMOVE_WISHLIST_ITEM} from '../Constants/WishlistConstant';
import hotelApi from '../Services/hotelApi';

export const addToWishList = (hotelId, qnt) => {
    return async(dispatch) => {
       const {data} = await hotelApi.getDetailHotel(hotelId);
       const cart = {
         hotel: data._id,
         name: data.name,
         placePic: data.placePic,
         address: data.address,
         ratings: data.ratings,
         qnt
       }
       dispatch({type: ADD_WISHLIST_ITEM, payload: cart})
    }
 }
 
 export const removeFromwishlist = (id) => {
    return (dispatch) => {
       dispatch({type: REMOVE_WISHLIST_ITEM, payload: id})
    }
 };
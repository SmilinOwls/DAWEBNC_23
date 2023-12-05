import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromwishlist} from '../../Actions/WishlistAction';
import CartItem from './CartItem';
import "./style.css";

const CartItems = () => {
    const {wishlistItems} = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const handleRemoveWWishlist = (id) => {
        dispatch(removeFromwishlist(id))
    }
  return (
    <div className='cart-items'>
    {wishlistItems.map((item) =>(
      <CartItem 
         key={item.name}
         wishlist={item}
         handleRemoveCart = {() => handleRemoveWWishlist(item.hotel)}
      />
    ))}
    </div>
  )
}

export default CartItems;
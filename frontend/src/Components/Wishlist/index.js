import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getShowCart} from '../../Actions/SidebarAction';
import EmptyCartImg from '../../Assets/images/empty-room.jpg';
import CartItems from '../CartItems'
import "./style.css";


const Wishlist = () => {
  const {isShowCart} = useSelector((state) => state.sidebar);
    const {wishlistItems} = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const closeCart = () =>{
        const action = getShowCart(false);
        dispatch(action);
    };

  return (
    <div className={isShowCart ? 'cart active' : 'cart'}>
    <div onClick={closeCart} className='cart__overlay'></div>
    <div className='cart__container'>
        <div className='cart__heading'>
            <h2>Favourite Hotels</h2>
            <div className={!isShowCart ? 'cart__close active' : 'cart__close'} onClick={closeCart}></div>
        </div>
        {wishlistItems.length <= 0 && (
            <>
                <img alt="Empty" src={EmptyCartImg} width={200} height={200} style={{margin: "0 auto", height: "300px", width: "100%"}}></img>
            </> 
        )}
        <CartItems />
    </div>
</div>
  )
}

export default Wishlist
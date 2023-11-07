import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
import { addToWishList } from "../../Actions/WishlistAction";
import { MdDeleteForever } from "react-icons/md";
import Image from "../RoomGallery/Image";
import "./CartItem.css";

const CartItem = ({ wishlist, handleRemoveCart }) => {
  const { hotel, placePic, name, address, qnt, ratings } = wishlist;
  const [quantity, setQnt] = useState(qnt);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(addToWishList(hotel, quantity));
  }, [quantity]);

  const handleNavigate = () => {
    history.push(`hotel/${hotel}`);
  }

  return (
    <div id={hotel} className="cart-item">
      <div className="cart-item__img">
        <Image src={placePic} />
      </div>
      <div className="cart-item__content">
        <div className="cart-item__name">{name}</div>
        <div className="cart-item__price">{address}</div>
        <div className="cart-item__count flex justify-between">
          <p>Ratings: {ratings}</p>
          <div className="text-blue-600 cursor-pointer" onClick={handleNavigate}>View</div>
        </div>
      </div>
      <button className="cart-item__rm" onClick={handleRemoveCart}>
        <MdDeleteForever />
      </button>
    </div>
  );
};

export default CartItem;

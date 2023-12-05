import React from "react";
import {Link} from 'react-router-dom'
import "./HotelCard.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {useDispatch} from 'react-redux'
import "react-lazy-load-image-component/src/effects/blur.css";
import {AiFillStar} from "react-icons/ai";
import {MdOutlineFavoriteBorder} from 'react-icons/md';
import {addToWishList} from '../../Actions/WishlistAction';

const HotelCard = (props) => {
  const { placePic, ratings, address, name, extraInfo, _id } = props;
  const dispatch = useDispatch();
  const handleAddToWishlist = (id, qnt) => {
    dispatch(addToWishList(id, qnt))
}
  return (
    <div className="shop-product">
      <div className="shop-product__img-wrapper">
        <LazyLoadImage
          effect="blur"
          src={placePic}
          className="shop-product__img"
          alt={name}
          width="100%"
          height="100%"
        ></LazyLoadImage>
        <div className="shop-product__rate">
          <AiFillStar />
          <span>{ratings}</span>
        </div>
      </div>

      <div className="shop-product__content">
        <div className="shop-product__name">{name}</div>
        <p className="shop-product__description">{address}</p>
        <div className="shop-product__extra">
            <p>{extraInfo.length > 50 ? extraInfo.slice(0, 50) + "..." : extraInfo + "..."}</p>
          </div>
      </div>
      <div className="card-bottom">
        <button className="shop-product__btn__book rounded-lg">
          <Link to={`/hotel/${_id}`}>Book Now</Link>
        </button>
      </div>
      <div className="shop-product__btns">
        <div className="shop-product__btn" onClick={() => handleAddToWishlist(_id, 1)}>
          <MdOutlineFavoriteBorder />
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

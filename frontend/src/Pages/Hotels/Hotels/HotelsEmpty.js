import React from 'react';
import "./HotelsEmpty.css";
import HandleImage from '../../../utils/HandleImage'
import EmptyShop from '../../../Assets/images/empty-shop.svg';

function HotelsEmpty() {
  return (
    <div className='shop-empty'>
        <img src={HandleImage(EmptyShop)} alt="Empty-shop-img"/>
        <h2 className='shop-empty__title'>
        There is no hotels you looking for
        </h2>
    </div>
  )
}

export default HotelsEmpty
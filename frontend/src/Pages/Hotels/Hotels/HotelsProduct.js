import React from 'react';
import "./styles.css"
import HotelHandle from './HotelHandle'
import HotelList from './HotelList'

const HotelsProduct = () => {
  return (
    <div className='hotel-content'>
        <HotelHandle />
        <HotelList />
    </div>
  )
}

export default HotelsProduct
import React, {useEffect, useState} from 'react';
import "./HotelList.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useDispatch, useSelector} from 'react-redux';

import {getHotelsFilter} from '../../../Actions/HotelsAction';
import HotelCard from '../../../Components/HotelCard/HotelCard';
import HotelsEmpty from './HotelsEmpty';
import Paginate from './Paginate';

const HotelList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelPerPage] = useState(9);
  const {hotelsFilter, isLoading} = useSelector((state) => state.getHotelsFilter);
  const dispatch = useDispatch();
  const indexOfLastPost = currentPage * hotelPerPage;
  const indexOfFirstPost = indexOfLastPost - hotelPerPage;
  const currentHotels = hotelsFilter.slice(indexOfFirstPost, indexOfLastPost);

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage !== Math.ceil(hotelsFilter.length / hotelPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  useEffect(() => {
    dispatch(getHotelsFilter())
  
  }, []);

  if(isLoading){
    return (
      <div className='spinner'>
          <CircularProgressbar value={100} maxValue={1} text={`${100}%`}/>
        </div>
    )
  }
  return (
    <>
      {hotelsFilter.length <= 0 && <HotelsEmpty />}
      <div className='hotel-products'>
         {hotelsFilter && currentHotels.map((item) => (
                <HotelCard key={item._id} {...item}/>
          ))}
      </div>
      <Paginate 
           currentPage={currentPage}
           postsPerPage={hotelPerPage}
           totalHotels={hotelsFilter.length}
           handlePaginate={handlePaginate}
           handleNextPage={handleNextPage}
           handlePreviousPage={handlePreviousPage}
      />
    </>
   
  )
}

export default HotelList
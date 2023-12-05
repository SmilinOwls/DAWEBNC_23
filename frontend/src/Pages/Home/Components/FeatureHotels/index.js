import React, {useEffect} from 'react';
import {getHotels} from '../../../../Actions/HotelsAction';
import {useDispatch, useSelector} from 'react-redux'
import { Col } from 'reactstrap'
import HotelCard from './HotelCard';

const FeatureHotels = () => {
    const {hotels, isLoading} = useSelector((state) => state.hotels);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHotels());
    }, []);
  return (
    <>
         {
        isLoading && <h4>Loading........</h4>
       }
       {
        !isLoading && hotels.slice(0, 8).map((hotel) => (
            <Col key={hotel._id} lg='3' md='6' sm='6' className='mb-4'>
                <HotelCard hotel={hotel}/>
            </Col>
        ))
       }
    </>
  )
}

export default FeatureHotels
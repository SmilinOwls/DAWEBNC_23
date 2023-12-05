import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import AccountNav from './AccountNav';
import {getMyOrder} from '../../Actions/BookingAction';
import BookingDate from '../../Components/BookingDate';
import Image from '../../Components/RoomGallery/Image'

const AccountBooking = () => {
  const {myOrder} = useSelector((state) => state.myOrder);
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(getMyOrder())
  }, []);
  
  return (
    <div className='mb-4'>
      <AccountNav />
      <p className='text-[30px] font-semibold text-[#F2BE22] text-center'>My Rooms</p>
      <div className='mx-4'>
        {myOrder?.length > 0 && myOrder.map(booking => (
          <div key={booking._id} className='mb-3 border border-gray-200 rounded-lg'>
            <p className='text-[20px] mb-2 px-3'>Occupier: {booking.userInfo.fullName}</p>
            <p className='text-[20px] mb-2 px-3'>Phone: {booking.userInfo.phone}</p>
            <p className='text-[20px] mb-3 px-3'>Paid: {new Date(booking.paidAt).toLocaleDateString('en-US')}</p>
            {booking.cart.map((item) => (
              <Link to={`/account/bookings/${item._id}`} className="flex mx-3 gap-4 bg-gray-200 rounded-2xl overflow-hidden no-underline">
                 <div className="w-48">
                 <Image src={item.image} className='object-cover'/>
                </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{item.title}</h2>
                <div className="text-xl">
                  <BookingDate booking={booking} className="mb-2 mt-4 text-gray-500" />
                  <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span className="text-2xl">
                      Total price: ${booking.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountBooking
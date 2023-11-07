import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { addDays, differenceInCalendarDays } from "date-fns";
import { getDetailRoom } from "../../Actions/RoomAction";
import {addToCart, saveUserInfo} from '../../Actions/CartAction';
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import RoomGallery from "../../Components/RoomGallery/RoomGallery";
import { DateRangePicker } from "react-date-range";
import { AiOutlineCheck, AiFillStar } from "react-icons/ai";
import {BsStarHalf} from 'react-icons/bs';

const DetailRoom = () => {
  const { roomId } = useParams();
  const { detailRoom, isLoading } = useSelector((state) => state.detailRoom);
  const [error, setError] = useState("")
  const {price} = detailRoom || 0;
  const [user, setUser] = useState({});
  const [fixedPrice, setFixedPrice] = useState(price);
  const [prevId, setPrevId] = useState('');
  const [qnt, setQnt] = useState(1);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [days, setDays] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const dispatch = useDispatch();
  const history = useHistory();
  let nightOfDays = 0;

  if(days.length > 0){
    nightOfDays = differenceInCalendarDays(new Date(days[0].endDate), new Date(days[0].startDate));
  }

 const handleDecreaseQnt = () => {
      qnt > 1 && setQnt(qnt - 1);
    };
  const handleIncreaseQnt = () => {
      setQnt(qnt + 1);
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setUser(user => ({
        ...user,
        [name]: value
      }));
    }

  const handleAddToCart = (id, qnt, numOfDays) => {
      const data = {
         fullName: user.fullName,
         phone: user.phone,
         IdentifyCard: user.IndentifyCard
      }
      dispatch(saveUserInfo(data));
      localStorage.setItem("numOfGuest", numberOfGuests);
      localStorage.setItem("checkIn", new Date(days[0].startDate.toLocaleDateString("en-US")));
      localStorage.setItem("checkOut", new Date(days[0].endDate.toLocaleDateString("en-US")))
      dispatch(addToCart(id, qnt, numOfDays));
      if(Object.keys(user).length === 3){
        history.push('/payment');
      }else{
        setError("Fields must be completed")
      }
  }

  useLayoutEffect(() =>{
    if(qnt > 1){
        setQnt(qnt);
        setFixedPrice(((price * nightOfDays) || 0) *qnt);
    }else {
        setFixedPrice((((price * nightOfDays) || 0) * 1).toFixed(2));
    };

    setPrevId(roomId);
}, [price, prevId, qnt, roomId]);

  useEffect(() => {
    dispatch(getDetailRoom(roomId));
  }, [roomId, getDetailRoom]);

  return (
    <div className="mt-8 px-8 pt-8">
      <p className="text-[25px] font-semibold">{detailRoom.title}</p>
      <RoomGallery room={detailRoom} />
      <div className="lg:flex lg:gap-8 my-8 lg:my-4">
        <div className="px-4 lg:border-r lg:border-gray-300 lg:w-1/2">
          <h2 className="font-semibold text-[25px] mb-3">Description</h2>
          <p className="text-[20px] leading-tight">Type: {detailRoom.typeRoom}</p>
          <p className="text-[20px] leading-tight">{detailRoom.description}</p>
        </div>
        <div className="lg:w-1/2">
          <h2 className="font-semibold text-[25px] mb-3">Perks</h2>
          {detailRoom?.perks?.map((item, index) => (
            <div key={index}>
              <div className="flex">
                <AiOutlineCheck className="font-semibold" />
                <p className="ml-3 text-[20px] leading-tight">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="font-semibold py-3 text-[20px]">
        Select check in/check out:
      </h2>
      <div className="flex items-center justify-center">
        <DateRangePicker
          onChange={(item) => setDays([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={days}
          direction="horizontal"
        />
      </div>
      <div className="lg:flex lg:gap-2">
      <div className="py-3 px-4 lg:w-1/2">
        <div>
        <div className="font-semibold text-[20px] py-3">
          <label>Number of guests:</label>
        </div>
          <input 
              type="number"
              placeholder="Enter your number"
              value={numberOfGuests}
              onChange={ev => setNumberOfGuests(ev.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2" 
          />
          {numberOfGuests > detailRoom.maxGuests || numberOfGuests < 0 ? (<p className="text-red-400">The number of guests cannot exceed the allowed number</p>) : (<></>)}
          <p className="mt-4 font-semibold text-[20px]">Select number of this room: </p>
          <div className="mt-3">
            <button disabled={qnt === 1} onClick={handleDecreaseQnt} className="border text-[18px] mr-3 px-2 py-1 border-gray-500 bg-white text-black rounded-lg hover:text-[#F79327]">
               -
            </button>
            <span className="mr-3">{qnt}</span>
            <button disabled={qnt === detailRoom.countInStock} onClick={handleIncreaseQnt} className="border text-[18px] px-2 py-1 border-gray-500 bg-white text-black rounded-lg hover:text-[#F79327]">
               +
            </button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2">
            <form onSubmit={handleAddToCart}>
                 <div className="mb-3">
                    <div className="font-semibold text-[20px] py-3">
                      <label>Fullname: </label>
                    </div>
                    <input
                        type="text"
                        placeholder='Full Name'
                        id='fullName'
                        name="fullName"
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />

                 </div>
                 <div className="mb-3">
                    <div className="font-semibold text-[20px] py-3">
                      <label>Phone: </label>
                    </div>
                    <input
                        type="text"
                        name="phone"
                        placeholder='Phone'
                        id='phone'
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />

                 </div>
                 <div>
                    <div className="font-semibold text-[20px] py-3">
                      <label>Indentify Card: </label>
                    </div>
                    <input
                        type="text"
                        placeholder='Indentify Card'
                        id='indentifyCard'
                        name="IndentifyCard"
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    />

                 </div>
                 {error && (<p className="text-red-500 text-[22px] mt-4">Note: {error}!!!</p>)}
            </form>
      </div>
      </div>
      
      <div>
        <div className="mt-8 lg:mt-6 lg:border-t lg:border-gray-300 lg:flex lg:gap-8">
          <div className="px-4 lg:border-r lg:border-gray-300 lg:w-1/2 my-6">
            <p className="text-[20px] leading-tight">
              Max of number guests: {detailRoom.maxGuests}
            </p>
            <p  className="text-[20px] leading-tight">Number of bed: {detailRoom.numOfBed}</p>
            <p className="text-[20px] leading-tight">In Stock: {detailRoom.countInStock} rooms</p>
          </div>
          <div className="lg:w-1/2 lg:my-6 lg:justify-end lg:items-center">
            <div className="flex text-[#F6FA70] text-[20px]">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              {detailRoom.ratings === 5 ? <AiFillStar /> : <BsStarHalf />}
              <span style={{ margin: "0 7px", fontSize: "22px", color: 'black' }}>
                {detailRoom.ratings}/5 Ratings
              </span>
            </div>
            <div>
              <p className="font-semibold text-[22px] text-red-700">Price: ${fixedPrice || 0}</p>
              <button
                onClick={() => handleAddToCart(detailRoom._id, qnt, nightOfDays)} 
                className="w-full border bg-[#faa935] border-[#faa935] rounded-lg px-3 py-2 text-[#000]  font-semibold hover:text-red-700 transition-all"
                
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRoom;

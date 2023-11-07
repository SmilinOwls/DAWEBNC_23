import React, {useState, useEffect} from 'react';
import "./DetailPost.css";
import {useSelector, useDispatch} from 'react-redux';
import {createReviewHotels} from '../../../Actions/ReviewAction'
import {BsStar} from 'react-icons/bs'

function DetailPost({colors, id}) {
  const [areaValue, setAreaValue] = useState("");
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("user"))

  const handleSelectedStar = (pos) => {
    setSelectedStar(pos);
  };

  const handleHoveredStar = (pos) => {
    setHoveredStar(pos);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!areaValue.trim()) return;
    if(areaValue === "") return;
    const obj = {
      rating: selectedStar,
      comment: areaValue
    };
    
    dispatch(createReviewHotels(obj, id));
    setAreaValue('');
    setSelectedStar(0);
  }



  return (
    <>
    <div className='detail-tab-user'>
        <img
          className='rounded-full w-[40px] h-[40px]'
          src={userInfo.profilePic ? userInfo.profilePic : "https://i.pravatar.cc/150?img=56"}
          alt='Avatar'
        />

        <form onSubmit={handleSubmit} className='detail-tab-user__form'>
          <div className='detail-tab-user__row'>
            <div className='detail-tab-user__rate'>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <BsStar
                    key={index}
                    onClick={() => handleSelectedStar(index + 1)}
                    onMouseOver={() => handleHoveredStar(index + 1)}
                    onMouseLeave={() => handleHoveredStar(0)}
                    style={{
                      fill:
                        index < (selectedStar || hoveredStar)
                          ? colors.yellow
                          : colors.blur,
                    }}
                  />
                ))}
            </div>
            <span className='detail-tab-user__msg'>(Please choose an one)</span>
          </div>
          <textarea
            className='detail-tab-user__textarea'
            placeholder='Type your comment here...'
            onChange={(e) => setAreaValue(e.target.value)}
            value={areaValue}
          />
          <button type='submit' className='primary-btn red'>
              Post comment
          </button>
        </form>
      </div>
    </>
  )
}

export default DetailPost
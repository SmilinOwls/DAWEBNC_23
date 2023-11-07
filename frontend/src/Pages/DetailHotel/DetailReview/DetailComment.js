import React from 'react'
import "./DetailComment.css";
import DetailPost from './DetailPost';
import {BsStar} from 'react-icons/bs'
const colors = {
    yellow: "#fbb403",
    blur: "#F24C3D"
  };

const DetailComment = ({detailHotel}) => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="detail-tab__comment mb-6">
        <div  className='detail-tab-comment__container'>
        {detailHotel.reviews && detailHotel.reviews.map(({ name, comment, rating}, index) => (
          <div key={index} className="detail-tab-comment__customer">
            <img
              className="rounded-full w-[40px] h-[40px]"
              src={userInfo.profilePic ? userInfo.profilePic : "https://i.pravatar.cc/150?img=56"}
              alt="Avatar"
            />
            <div className="detail-tab-comment__wrapper">
              <div className="detail-tab-comment__row">
                <h4 className="detail-tab-comment__name">{name}</h4>
              </div>
              <div className="detail-tab-comment__stars flex">
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <BsStar
                      key={index}
                      style={{
                        fill: index < rating ? colors.yellow : colors.blur,
                      }}
                    />
                  ))}
              </div>
              <p className="detail-tab-comment__content">{comment}</p>
            </div>
          </div>
        ))}
        </div>
        {userInfo ? (<DetailPost colors={colors} id={detailHotel._id}/>) : (
          <h2 style={{marginTop: "15px"}}>You must be login to comment !!!</h2>
        )}
    </div>
  )
}

export default DetailComment
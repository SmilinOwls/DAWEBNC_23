import React from "react";
import "./DetailMain.css";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf, BsFillCalendar2PlusFill, BsBuildingFillCheck } from "react-icons/bs";
import {MdCleaningServices} from 'react-icons/md'
const DetailMain = ({ hotel }) => {
  const { name, address, description, ratings } = hotel;
  return (
    <div className="detail-content">
      <h2 className="detail-content__title">{name}</h2>
      <div className="detail-content__rate">
        <div className="detail-content__stars">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          {ratings === 5 ? <AiFillStar /> : <BsStarHalf />}
          <span style={{margin: '0 7px', fontSize: "22px"}}>{ratings}/5 Ratings</span>
        </div>

        <div className="detail-content__reviews">
          <span className="detail-content__reviews-qnt">30</span>
          <span> Reviews</span>
        </div>
      </div>

      <div className="detail-content__tags">
        <div className="detail-content__tag">
          <span className="detail-content__tag-label">Address:</span>
          <span className="detail-content__tag-detail category">
            {address}
          </span>
        </div>
      </div>

      <p className="detail-content__description">{description}</p>
      <div className="detail-content__commits">
        <div className="detail-content__commit">
          <BsFillCalendar2PlusFill />
          <span>Hygiene Plus</span>
        </div>
        <div className="detail-content__commit">
          <BsBuildingFillCheck />
          <span>Check-in/out [private]</span>
        </div>
        <div className="detail-content__commit">
          <MdCleaningServices />
          <span>Cleaner Services</span>
        </div>
      </div>
    </div>
  );
};

export default DetailMain;

import React from "react";
import "./HotelCard.css";
import { Card, CardBody } from "reactstrap";
import {Link} from 'react-router-dom'
const HotelCard = ({ hotel }) => {
  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={hotel.placePic} alt="hotel-img" />
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i> {hotel.address}
            </span>

            <span className="tour__ratinf d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i> {hotel.ratings}
            </span>
           
          </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <h5 className="tour__title" style={{display: "block"}}>{hotel.name}</h5>
            </div>
          <div className="card__bottom">
            <button className="btn booking__btn">
              <Link to={`hotel/${hotel._id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default HotelCard;

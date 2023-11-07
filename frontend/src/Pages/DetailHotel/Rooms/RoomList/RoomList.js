import React from "react";
import { Container, Row, Col } from "reactstrap";
import { BsCheck2Circle } from "react-icons/bs";
import {Link} from 'react-router-dom'
const RoomList = ({ room }) => {
  
  const { photos, ratings, price, perks, title, _id } = room;
  return (
    <Container>
      <section className="w-full">
        <div className="flex justify-between mb-2">
          <div>
            <p className="text-[22px] font-semibold">{title}</p>
            <p className="text-cyan-600 font-semibold">Recommended</p>
          </div>
          <div className="flex items-center">
            <p className="mr-2 font-semibold">Ratings</p>
            <p className="border width-[30px] height-[30px] border-cyan-500 rounded-[50%] text-center px-2">
              {ratings}
            </p>
          </div>
        </div>
        <Row>
          <Col lg={4} md={4} xs={12}>
            <div className="grid gap-2 mt-3">
              <div className="col-span-2">
                <img src={photos[0]} alt="room" className="w-full" />
              </div>
              <div>
                <img src={photos[1]} alt="room" className="w-full" />
              </div>
              <div>
                <img src={photos[2]} alt="room" className="w-full" />
              </div>
            </div>
            <div className="mt-2 text-center">
              <Link
                to={`/room/${_id}`}
                className="text-[#FFE569] font-semibold hover:text-[#B70404] transition-all no-underline text-[22px]"
              >
                Detail
              </Link>
            </div>
          </Col>
          <Col lg={4} md={4} xs={12}>
            <div className="mt-3 border-r-2 border-[#ddd]">
              <p className="text-[20px] font-semibold">Benefits</p>
              <p className="text-[#FFE569] font-semibold">
                Your price includes:{" "}
              </p>
              {perks.map((item) => (
                <div className="flex items-center mt-2">
                  <BsCheck2Circle />
                  <p className="ml-2">{item}</p>
                </div>
              ))}
            </div>
          </Col>
          <Col lg={4} md={4} xs={12}>
            <div className="mt-3">
              <p className="text-[20px] font-semibold">Price per night</p>
              <p className="mt-3 text-[#FF0060] text-[22px] font-semibold">
                ${price}
              </p>
              <button 
                className="border border-[#faa935] rounded-lg px-3 py-2 text-[#faa935] font-semibold hover:bg-[#faa935] hover:text-[#000] transition-all"
                
              >
                Booking
              </button>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default RoomList;

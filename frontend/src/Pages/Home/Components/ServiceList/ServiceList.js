import React from "react";
import "./ServiceList.css";
import { Col } from "reactstrap";
import { servicesData } from "../../../../utils/fakeData";
const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
              <div className="service__item">
                <div className="service__img">
                  <img src={item.imgUrl} alt="" />
                </div>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </Col>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ServiceList;

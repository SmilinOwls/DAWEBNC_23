import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import hero01 from "../../Assets/images/Course.png";
import hero02 from "../../Assets/images/what-is-ui.jpg";
import heroVideo from "../../Assets/images/Mern.png";
import "./styles.css";

const Classroom = () => {
  const [classroomList, setClassroomList] = useState([]);
  const history = useHistory();
  const handleCreateClass = () => {
    history.push("/create-class");
  };
  return (
    <div className="h-[1200px] w-full px-[60px]">
      <section className="mb-5 pb-4 border-b border-[#efefef]">
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <h3 className="section__subtitle">Know Before you started</h3>
                </div>
                <h1>
                  Learn HTML5 , CSS3 , Web Apps &
                  <span className="highlight">More</span>
                </h1>
                <p>
                  Learn How To Build Websites & Apps Write A Code Or Start A
                  Business
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={hero01} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <img src={heroVideo} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={hero02} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="flex items-center justify-end pl-5 mb-10">
        <button
          className="px-3 py-2 rounded-lg flex items-center justify-center hover:bg-[#6DB9EF] bg-[#3081D0] text-white text-[16px] font-semibold"
          onClick={handleCreateClass}
        >
          Create Class
        </button>
      </div>
      {classroomList.length > 0 ? (
        <div></div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-[22px] font-bold text-center">
            No classes created
          </p>
        </div>
      )}
    </div>
  );
};

export default Classroom;

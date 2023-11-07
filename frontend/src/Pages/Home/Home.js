import React from "react";
import "./Home.css";
import { Col, Container, Row } from "reactstrap";
import hero01 from "../../Assets/images/hero-img01.jpg";
import hero02 from "../../Assets/images/hero-img02.png";
import world from "../../Assets/images/world.png";
import heroVideo from "../../Assets/videos/hero-video.mp4";
import experience from "../../Assets/images/experience.jpg";
import Searchbar from "./Components/SearchBar/Searchbar";
import Process from "./Components/Process/Process";
import ServiceList from "./Components/ServiceList/ServiceList";
import Reviews from "./Components/Reviews/Reviews";
import Contact from "./Components/Contact/Contact";
import FeatureHotels from "./Components/FeatureHotels";
import FeatureSites from "./Components/FeatureSites/FeatureSites";

const Home = () => {
  return (
    <>
      <section >
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <h3 className="section__subtitle">Know Before you go</h3>
                  <img src={world} alt="" />
                </div>
                <h1>
                  Traveling opens the door to creating
                  <span className="highlight">memories</span>
                </h1>
                <p>Are you dreaming of a place to stay? We are here!</p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={hero01} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={hero02} alt="" />
              </div>
            </Col>
            <Searchbar />
          </Row>
        </Container>
      </section>
      <Process />
      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <h3 className="section__subtitle">Sites</h3>
              <h2 className="testimonial__title">Top destinations in Vietnam</h2>
            </Col>
            <Col lg='12'>
              <FeatureSites />
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className='services__ttle'>We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <h3 className="section__subtitle">Hotels</h3>
              <h2 className="testimonial__title">Featured homes recommended for you</h2>
            </Col>
            <FeatureHotels />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="experience__content">
              <h3 className="section__subtitle">Experience</h3>

                <h2>With our all experience <br /> we will serve you</h2>
                <p>
                    Stay in our world of comfort and style
                  <br />
                  Experience the difference services
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>60+</span>
                  <h6>Hotels</h6>
                </div>

                <div className="counter__box">
                  <span>100+</span>
                  <h6>Special Services</h6>
                </div>

                <div className="counter__box">
                  <span>4</span>
                  <h6>Years experiecne</h6>
                </div>
              </div>
            </Col>

            <Col lg='6'>
              <div className="experience__img">
                <img src={experience} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <h3 className="section__subtitle">Reviews</h3>
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>
            <Col lg='12'>
              <Reviews />
            </Col>
          </Row>
        </Container>
      </section>
      <Contact />
    </>
  );
};

export default Home;

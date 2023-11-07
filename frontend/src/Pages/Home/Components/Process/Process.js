import React, {useEffect, useRef} from 'react';
import gsap from 'gsap'
import "./Process.css";
import HandleImage from '../../../../utils/HandleImage';
import {WorkData} from '../../../../utils/fakeData';
import {Container, Row, Col} from 'reactstrap'


const Process = () => {
    let containerRef = useRef(null);
    let captionRef = useRef(null);
    let headingRef = useRef(null);
    let stepOneRef = useRef(null);
    let stepTwoRef = useRef(null);
    let stepThreeRef = useRef(null);
    let stepFourRef = useRef(null);
    let stepRef = [stepOneRef, stepTwoRef, stepThreeRef, stepFourRef];

    // useEffect(() =>{
    //     const line = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: containerRef,
    //             start: "20% bottom"
    //         }
    //     });

    //     line.from(captionRef, {
    //         x: 20,
    //         opacity: 0,
    //         duration: 0.7,
    //       })
    //         .from(headingRef, { x: -20, opacity: 0, duration: 0.8 }, "-=0.2")
    //         .from(stepRef[0], { y: 20, opacity: 0, duration: 0.8 }, "-=0.2")
    //         .from(stepRef[1], { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
    //         .from(stepRef[2], { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
    //         .from(stepRef[3], { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");
    // }, []);

  return (
    <section ref={(el) => containerRef = el} className="home-work" style={{overflowX: "hidden"}}>
    <Container>
        <div ref={(el) => captionRef = el} className="" style={{color: "#FFE569", fontWeight: "700", fontSize: "25px"}}>
            Book Now
        </div>
        <h2 ref={(el) => headingRef = el} className="" style={{color: "#FFF5B8", fontWeight: "600", fontSize: "18px"}}>
            How it works
        </h2>

        <div className='home-work__steps'>
            <Row>    
                {WorkData.map(({img, step, content, arrow}, index) =>(
                    <Col key={index} lg={3} sm={6} xs={12}>
                        <div ref={(el) => stepRef[index] = el} className="home-work__step">
                            <div className='home-work__thumb'>
                                <div className='home-work__thumb-wrapper'>
                                    <img  className='home-work__img' src={HandleImage(img)} alt="image step" width={200} height={200}>
                                    </img>
                                    <span>Step 0{step}</span>
                                    <div
                                     style={{ backgroundImage: `url(${arrow})` }}
                                     className="home-work__thumb-arrow"
                                    ></div>
                                </div>
                            </div>
                            <div className="home-work__content">{content}</div>
                        </div>
                       
                    </Col>
                ))}
            </Row>
        </div>
    </Container>
</section>
  )
}

export default Process
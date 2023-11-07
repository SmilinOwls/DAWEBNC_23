import React from 'react'
import mail from '../../../../Assets/images/mail.jpg';
import {Container, Row, Col} from 'reactstrap';
import "./Contact.css"
const Contact = () => {
  return (
    <section className='newsletter'>
    <Container>
        <Row>
            <Col lg='6'>
                <div className="newsletter__content">
                    <h2>Subscribe now to get useful traveling information</h2>

                    <div className="newsletter__input">
                        <input type="email" placeholder='Enter your email'  />
                        <button className="btn newsletter__btn">Subscribe</button>
                    </div>

                    <p>We live for vacationers and travelers who love a good deal, fun, and adventure</p>
                </div>
            </Col>

            <Col lg='6'>
                <div className="newsletter__img">
                    <img src={mail} alt="" />
                </div>
            </Col>
        </Row>
    </Container>
</section>
  )
}

export default Contact
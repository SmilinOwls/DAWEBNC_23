import React from 'react';
import './hotels.css'
import {Container, Row, Col} from 'reactstrap'
import HotelsProduct from './Hotels/HotelsProduct';
import HotelFilter from './HotelFilter/HotelFilter';

const Hotels = () => {
  return (
    <section className='hotel'>
        <section className="common__section">
            <Container>
                <Row>
                    <Col lg='12'>
                        <h2>All Hotels</h2>
                    </Col>
                </Row>
            </Container>
        </section>
        <Container>
            <div className='hotel__container'>
                <HotelFilter />
                <HotelsProduct />
            </div>
        </Container>
    </section>
  )
}

export default Hotels
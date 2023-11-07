import React, {useRef} from 'react';
import './Searchbar.css';
import { Col, Form, FormGroup } from 'reactstrap'

const Searchbar = () => {
    const locationRef = useRef('')
    const siteRef = useRef('')
    const ratingRef = useRef(0)
  return (
    <Col lg='12'>
    <div className="search__bar">
      <Form className='d-flex align-items-center gap-4'>
        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
          <span><i className='ri-map-pin-line'></i></span>
          <div>
            <h6>Location</h6>
            <input type="text" placeholder='Where are you going?' ref={locationRef} />
          </div>
        </FormGroup>

        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
          <span><i className='ri-map-pin-time-line'></i></span>
          <div>
            <h6>Site</h6>
            <input type="text" placeholder='Site (Vung Tau)' ref={siteRef} />
          </div>
        </FormGroup>

        <FormGroup className='d-flex gap-3 form__group form__group-last'>
          <span><i className='ri-group-line'></i></span>
          <div>
            <h6>Rating</h6>
            <input type="number" placeholder='0' ref={ratingRef} />
          </div>
        </FormGroup>

        <span className="search__icon" type='submit '>
          <i className='ri-search-line'></i>
        </span>
      </Form>
    </div>
  </Col>
  )
}

export default Searchbar
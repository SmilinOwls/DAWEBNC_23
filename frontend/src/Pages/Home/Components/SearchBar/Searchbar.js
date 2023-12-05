import React, { useRef } from "react";
import "./Searchbar.css";
import { Col, Form, FormGroup } from "reactstrap";

const Searchbar = () => {
  const locationRef = useRef("");
  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center justify-between gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <div>
              <h6>Courses</h6>
              <input
                type="text"
                placeholder="What do you want to learn ?"
                ref={locationRef}
              />
            </div>
          </FormGroup>

          <span className="search__icon" type="submit ">
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default Searchbar;

import React, { useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import HotelCard from "../../Components/HotelCard/HotelCard";

const SearchResult = () => {
  const location = useLocation();
  console.log(location);
  const [search] = useState(location.state);
  console.log(search.length);

  return (
    <div>
      <section className="common__section">
        <Container>
          <Row>
            <Col lg="12">
              <h2>Tour Search Result</h2>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {search.length === 0 ? (
              <h4 className="text-center">No Hotel Found</h4>
            ) : (
              search.map((tour) => (
                <Col lg="3" md="6" sm="12" className="mb-4" key={tour._id}>
                  <HotelCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default SearchResult;

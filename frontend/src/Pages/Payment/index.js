import React, { useState } from "react";
import HandleImage from "../../utils/HandleImage";
import "./style.css";
import { Col, Row, Container } from "reactstrap";
import CheckoutPayment from "./Components/CheckoutPayment";
import CheckoutAside from "./Components/CheckoutAside";
const Payment = () => {
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <section className="common_payment">
        <Container>
          <Row>
            <Col lg="12">
              <h2>Payment</h2>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="checkout-content" style={{ overflowX: "hidden" }}>
        <div className="checkout-content__left">
          {userInfo ? (
            <>
              <CheckoutPayment
                setIsCheckoutSuccess={setIsCheckoutSuccess}
                setIsPurchased={setIsPurchased}
              />
            </>
          ) : (
            <h2 style={{ marginTop: "15px", color: "#F24C3D" }}>
              You must be login to checkout !!!
            </h2>
          )}
        </div>
        <div className="checkout-content__right" style={{ paddingTop: "60px" }}>
          <CheckoutAside />
        </div>
      </div>
    </>
  );
};

export default Payment;

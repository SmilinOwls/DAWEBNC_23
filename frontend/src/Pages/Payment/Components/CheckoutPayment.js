import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import {useHistory} from 'react-router-dom';
import { createOrder, updateStatusOrder } from "../../../Actions/BookingAction";
import { savePaymentMethod } from "../../../Actions/CartAction";
import useTotalPrice from "../../../utils/usePrice";
import PaypalCheckoutButton from "./PaypalCheckoutButton";

const CheckoutPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const history = useHistory();
  const { userAddress, cartItems } = useSelector((state) => state.cart);
  const checkIn = localStorage.getItem("checkIn") || "";
  const checkOut = localStorage.getItem("checkOut") || "";
  const numOfGuest = localStorage.getItem("numOfGuest") || 0;
  const dispatch = useDispatch();
  const { totalPrice, discount } = useTotalPrice();

  const handleCreateOrder = () => {
    dispatch(savePaymentMethod(paymentMethod));
    const orderData = {
      userInfo: userAddress || JSON.parse(localStorage.getItem("userAddress")),
      cart: cartItems,
      paymentMethod: paymentMethod,
      checkIn: checkIn,
      checkOut: (checkOut),
      numOfGuest: numOfGuest,
      taxPrice: 0,
      totalPrice: totalPrice,
    };
    dispatch(createOrder(orderData));
    localStorage.removeItem("cart");
    localStorage.removeItem("checkIn");
    localStorage.removeItem("checkOut");
    localStorage.removeItem("userAddress");
    history.push("/thank-you")
  };
  return (
    <>
      <div className="">
        <div className="">
          <p className="text-[22px] font-semibold text-center mb-4">
            Billing Information
          </p>
          <p className="text-[20px] mb-3">Full name: {userAddress.fullName}</p>
          <p className="text-[20px] mb-3">Phone: {userAddress.phone}</p>
          <p className="text-[20px] mb-3">
            Indentify Card: {userAddress.IdentifyCard}
          </p>
          <hr />
          <p className="text-[20px] font-semibold text-center mb-3">
            Payment Method
          </p>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Select Payment</option>
            <option value="PayPal">PayPal or Credit Card</option>
            <option value="COD">Pay At The Hotel</option>
          </select>
          <div className="mt-3">
            <PaypalCheckoutButton className={`${paymentMethod === "COD" ? "cursor-not-allowed" : ""}`}  handleCreateOrder={handleCreateOrder} />
            <button
              disabled={paymentMethod==="PayPal"}
              onClick={handleCreateOrder}
              className="bg-[#F2BE22] text-black rounded-xl border px-3 py-2 w-full"
            >
              Pay At hotel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPayment;

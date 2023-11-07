import React from "react";
import EmptyCart from "../../../Assets/images/empty-cart.png";
import useTotalPrice from "../../../utils/usePrice";
import "./CheckoutAside.css";
const CheckoutAside = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const maxGuest = localStorage.getItem("numOfGuest") || 0;
  const checkOut = localStorage.getItem("checkOut") || "";
  const checkIn = localStorage.getItem("checkIn") || "";
  const { totalPrice, discount } = useTotalPrice();
  return (
    <aside className="mb-3">
      {cartItems.length > 0 ? (
        <ul className="checkout-products">
          {cartItems.map(({ id, title, image, qnt, price, numOfGuest }) => (
            <>
              <li key={id} className="checkout-product">
                <div className="checkout-product__img">
                  <img src={image} alt="Checkout product" />
                  <span className="checkout-product__qnt">{qnt}</span>
                </div>
                <div className="checkout-product__content">
                  <h3 className="checkout-product__name">{title}</h3>
                </div>
                <span className="checkout-product__price">${price}</span>
              </li>
              <div className="mt-3">
                  <p className="text-[20px] mr-2">Max of Guest: {maxGuest === 0 ? numOfGuest : maxGuest}</p>
              </div>
              <div className="mt-3">
                  <p className="text-[20px] mr-2">Check in: {new Date(checkIn).toLocaleDateString('en-US')}</p>
              </div>
              <div className="mt-3">
                  <p className="text-[20px] mr-2">Check out: {new Date(checkOut).toLocaleDateString('en-US')}</p>
              </div>
            </>
          ))}
        </ul>
      ) : (
        <>
          <img
            src={EmptyCart}
            width={200}
            height={200}
            style={{ margin: "0 auto" }}
          ></img>
        </>
      )}

      <div className="checkout-detail">
        <div className="checkout-detail__row">
          <span className="checkout-detail__label">Discount</span>
          <span className="checkout-detail__content">${discount}</span>
        </div>
        <div className="checkout-detail__row">
          <span className="checkout-detail__label">Taxes (estimated)</span>
          <span className="checkout-detail__content">$0</span>
        </div>
      </div>
      <hr />
      <div className="checkout-total">
        <span className="checkout-total__label">Total</span>
        <span className="checkout-total__price">${totalPrice}</span>
      </div>
    </aside>
  );
};

export default CheckoutAside;

import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  ORDER_STATUS_FAILURE,
  ORDER_STATUS_SUCCESS,
  ORDER_STATUS_REQUEST,
  MY_ORDER_FAILURE,
  MY_ORDER_SUCCESS,
  MY_ORDER_REQUEST,
} from "../Constants/BookingConstant";
import axios from "../Services/axios";
import axiosClient from "../Services/axiosClient";

export const createOrder = (order) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const data = {
        userInfo: order.userInfo,
        cart: order.cart,
        paymentMethod: order.paymentMethod,
        taxPrice: order.taxPrice,
        totalPrice: order.totalPrice,
        checkOut: order.checkOut,
        checkIn: order.checkIn,
        numOfGuest: Number.parseInt(order.numOfGuest),
      };
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const method = "post";
      let url = '/book';
      const headers = {
        "Content-Type": "application/json",
      };
      if (userInfo) {
        const { accessToken } = userInfo;
        headers.token = `Bearer ${accessToken}`;
      }

      await axios({ url, method, data, headers}).then((response) => {
        console.log(response);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
      });
    } catch (error) {
      console.log("err->", error.response.data)
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error.response.data });
    }
  };
};

export const updateStatusOrder = (order, status) => {
  return async (dispatch) => {
    dispatch({ type: ORDER_STATUS_REQUEST });
    try {
      const data = {
        status: status,
      };
      const method = "put";
      let url = `/book/status/${order._id}`;
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const headers = {
        "Content-Type": "application/json",
      };
      if (userInfo) {
        const { accessToken } = userInfo;
        headers.token = `Bearer ${accessToken}`;
      }

      await axios({ url, method, data, headers }).then((response) => {
        dispatch({ type: ORDER_STATUS_SUCCESS, payload: response.data });
      });
    } catch (error) {
      dispatch({ type: ORDER_STATUS_FAILURE, payload: error });
    }
  };
};
export const getMyOrder = () => {
  return async (dispatch) => {
    dispatch({ type: MY_ORDER_REQUEST });
    try {
      let url = "/api/book/me";
      const { data } = await axiosClient.get(url);
      dispatch({ type: MY_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: MY_ORDER_FAILURE, payload: error });
    }
  };
};

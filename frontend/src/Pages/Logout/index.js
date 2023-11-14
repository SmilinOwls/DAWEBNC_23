import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../Actions/AuthAction";
import axios from "../../Services/axios";

const LogOut = () => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const handleUpdateStatus = async (user) => {
    try {
      const data = {
        username: user.username,
        phone: user.phone,
        email: user.email,
        profilePic: user.profilePic,
        isOnline: false,
      };
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const method = "put";
      let url = `/user/me/status`;
      const headers = {
        "Content-Type": "application/json",
      };
      if (userInfo) {
        const { accessToken } = userInfo;
        headers.token = `Bearer ${accessToken}`;
      }

      await axios({ url, method, data, headers }).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUpdateStatus(userInfo);
    dispatch(logout());
  }, []);
  return <Redirect to="/"></Redirect>;
};

export default LogOut;

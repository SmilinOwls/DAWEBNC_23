import axios from "axios";
//https://winshop-server.onrender.com/
const instance = axios.create({
  baseURL: "https://booking-4t.onrender.com/api/",
});

export default instance;
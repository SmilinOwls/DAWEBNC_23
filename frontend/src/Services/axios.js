import axios from "axios";
//https://winshop-server.onrender.com/
const instance = axios.create({
  baseURL: "https://elearning-g2i8.onrender.com/api",
});

export default instance;

import axios from "axios";
//https://elearning-g2i8.onrender.com
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default instance;

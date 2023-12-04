import axios from "axios";
//https://winshop-server.onrender.com/
const instance = axios.create({
  baseURL: "https://btvn03.onrender.com/api",
});

export default instance;

import axios from "axios";
//https://winshop-server.onrender.com/
const instance = axios.create({
  baseURL: "https://travelgo-a9qu.onrender.com/api/",
});

export default instance;

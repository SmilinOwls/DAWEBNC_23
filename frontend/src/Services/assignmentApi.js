import axios from "./axios";
import { configAxios } from "../utils/customUser";

const assignmentApi = {
  createAssignment: async (data) => {
    try {
      const response = await axios.post("/assignment/", data, configAxios);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default assignmentApi;

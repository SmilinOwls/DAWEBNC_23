import axios from "./axios";
import axiosClient from "./axiosClient";
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
  getAssignmentByClass: async (id) => {
    return axiosClient.get(`/api/assignment/${id}`);
  },
};

export default assignmentApi;

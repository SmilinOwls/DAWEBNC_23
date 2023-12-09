import axiosClient from "./axiosClient";
import axios from "./axios";
import { configAxios } from "../utils/customUser";

const classroomApi = {
  createClassroom: async (data) => {
    try {
      const response = await axios.post(
        "/classroom/role-teacher",
        data,
        configAxios
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getClassroom: () => {
    return axiosClient.get("/api/classroom");
  },
  getClassroomByCreatedUser: () => {
    return axiosClient.get("/api/classroom/created_user");
  },
};

export default classroomApi;

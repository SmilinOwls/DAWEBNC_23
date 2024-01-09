import axios from "./axios";
import {configAxios} from '../utils/customUser';

const adminApi = {
  async getAllUsers() {
        try {
            const response = await axios.get(`/user/admin`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
  async updateUser(user){
        try {
            const response = await axios.put(`/user/admin/${user._id}`,user, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async deleteUser(id){
        try {
            const response = await axios.delete(`/user/admin/${id}`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllClassesByUserId(id) {
        try {
            const response = await axios.get(`/classroom/teacher/${id}`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getClassByCreatedUser(id) {
        try {
            const response = await axios.get(`/room`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllOrders() {
        try {
            const response = await axios.get(`/book`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async deleteOrder(id){
        try {
            const response = await axios.delete(`/book/admin/${id}`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllSites() {
        try {
            const response = await axios.get(`/site`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async deleteReview(id) {
        try {
            const response = await axios.delete(`/place/user/review/${id}`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllClassroom() {
        try {
            const response = await axios.get(`/classroom`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async updateClassroom(classroom){
        try {
            const response = await axios.put(`/classroom/admin/${classroom._id}`,classroom, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async deleteClassroom(id) {
        try {
            const response = await axios.delete(`/classroom/admin/${id}`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default adminApi;
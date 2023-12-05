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
    async getAllPlaces() {
        try {
            const response = await axios.get(`/place`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getPlaceById(id) {
        try {
            const response = await axios.get(`/place/${id}`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async addPlace(place) {
        try {
            const response = await axios.post(`/place/admin`,place, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async updatePlace(place){
        try {
            const response = await axios.put(`/place/admin/${place._id}`, place, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async deletePlace(id){
        try {
            const response = await axios.delete(`/place/admin/${id}`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllRooms() {
        try {
            const response = await axios.get(`/room`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async addRoom(room) {
        try {
            const response = await axios.post(`/room/admin`,room, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async updateRoom(room){
        try {
            const response = await axios.put(`/room/admin/${room._id}`,room, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async deleteRoom(id){
        try {
            const response = await axios.delete(`/room/admin/${id}`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllBlogs() {
        try {
            const response = await axios.get(`/blog`, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async addBlog(blog) {
        try {
            const response = await axios.post(`/blog/admin`,blog, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async updateBlog(blog){
        try {
            const response = await axios.put(`/blog/admin/${blog._id}`,blog, configAxios);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async deleteBlog(id){
        try {
            const response = await axios.delete(`/blog/admin/${id}`, configAxios);
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
    }
};

export default adminApi;
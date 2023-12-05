import axiosClient from './axiosClient';

const blogApi = {
    getBlogs: () => {
        return axiosClient.get("/api/blog/");
    },
    getDetailBlog: (blogId) => {
        return axiosClient.get(`/api/blog/${blogId}`)
    } 
}

export default blogApi;
import axiosClient from './axiosClient';

const authApi = {
    loginUser: (value) => {
        return axiosClient.post("/api/auth/login", value);
    },
    registerUser: (value) => {
        return axiosClient.post("/api/auth/register", value)
    },
    verifyResetToken: (value) => {
        return axiosClient.post("api/auth/verify", value);
    },
    forgotPassword: (value) => {
        return axiosClient.post("/api/auth/forgot-password", value)
    },
    resetPassword: (value) => {
        return axiosClient.put("/api/auth/password/reset", value);
    }
};

export default authApi;
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
    },
    sendActiveAccountMail: (value) => {
        return axiosClient.post("/api/auth/accout-activate", value);
    },
    logInUserViaGoogle: (value) => {
        return axiosClient.post("/api/auth/login/google", value);
    },
};

export default authApi;
import axiosClient from './axiosClient';

const siteApi = {
    getSites: () => {
        return axiosClient.get("/api/site/");
    },
    getSiteById: (siteId) => {
        return axiosClient.get("/api/site/" + siteId);
    },
    getPlaceBySite: (id) => {
        return axiosClient.get("/api/place/site/" + id);
    }
}

export default siteApi;
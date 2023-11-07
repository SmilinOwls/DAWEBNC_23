import axiosClient from './axiosClient'

const roomApi = {
    getDetailRoom: (roomId) => {
        return axiosClient.get('/api/room/' + roomId);
    }
};

export default roomApi;
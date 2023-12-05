import { GET_ROOM, ADD_ROOM, UPDATE_ROOM, DELETE_ROOM } from '../Constants/AdminConstant';
import adminApi from '../Services/AdminApi';

export const getRoom = () => {

    return (dispatch) => {
        adminApi.getAllRooms().then((rooms) => {
            dispatch({
                type: GET_ROOM,
                rooms: rooms
            });
        }).catch((error) => {
            throw error;
        })
    }
};

export const addRoom = (room) => {
    return (dispatch) => {
        adminApi.addRoom(room).then((room) => {
            dispatch({
                type: ADD_ROOM,
                room: room
            });
        }).catch((error) => {
            throw error;
        })
    }
};

export const updateRoom = (room) => {

    return (dispatch) => {
        adminApi.updateRoom(room).then((room) => {
            dispatch({
                type: UPDATE_ROOM,
                room: room
            });
        }).catch((error) => {
            throw error;
        })
    }
};

export const deleteRoom = _id => {

    return (dispatch) => {
        adminApi.deleteRoom(_id).then(({success, message}) => {
            dispatch({
                type: DELETE_ROOM,
                _id
            });
        }).catch((error) => {
            console.log(error);
        })
    }
};
import { GET_USER, UPDATE_USER, DELETE_USER } from '../Constants/AdminConstant';
import adminApi from '../Services/AdminApi';

export const getUser = () => {
    return (dispatch) => {
        adminApi.getAllUsers().then((users) => {
            dispatch({
                type: GET_USER,
                users: users
            });
        }).catch((error) => {
            throw error;
        })
    }
};


export const updateUser = (user) => {
    return (dispatch) => {
        adminApi.updateUser(user).then(() => {
            dispatch({
                type: UPDATE_USER,
                user: user
            });
        }).catch((error) => {
            throw error;
        })
    }
};

export const deleteUser = _id => {
    return (dispatch) => {
        adminApi.deleteUser(_id).then(() => {
            dispatch({
                type: DELETE_USER,
                _id
            });
        }).catch((error) => {
            throw error;
        })
    }
};
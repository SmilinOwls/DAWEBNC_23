import { GET_CLASSROOM, UPDATE_CLASSROOM, DELETE_CLASSROOM } from '../Constants/AdminConstant';
import adminApi from '../Services/AdminApi';

export const getClassroom = () => {
    return (dispatch) => {
        adminApi.getAllClassroom().then((classroom) => {
            console.log("class", classroom);
            dispatch({
                type: GET_CLASSROOM,
                classroom: classroom
            });
        }).catch((error) => {
            throw error;
        })
    }
};


export const updateClassroom = (classroom) => {
    return (dispatch) => {
        adminApi.updateClassroom(classroom).then(() => {
            dispatch({
                type: UPDATE_CLASSROOM,
                classroom: classroom
            });
        }).catch((error) => {
            throw error;
        })
    }
};

export const deleteClassroom = _id => {
    return (dispatch) => {
        adminApi.deleteClassroom(_id).then(() => {
            dispatch({
                type: DELETE_CLASSROOM,
                _id
            });
        }).catch((error) => {
            throw error;
        })
    }
};
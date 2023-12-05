import { GET_PLACE, ADD_PLACE, UPDATE_PLACE, DELETE_PLACE } from '../Constants/AdminConstant';
import adminApi from '../Services/AdminApi';

export const getPlace = () => {
    return (dispatch) => {
        adminApi.getAllPlaces().then((places) => {
            dispatch({
                type: GET_PLACE,
                places: places
            });
        }).catch((error) => {
            throw error;
        })
    }
};

export const addPlace = (place) => {
    return (dispatch) => {
        adminApi.addPlace(place).then((place) => {
            dispatch({
                type: ADD_PLACE,
                place: place
            });
        }).catch((error) => {
            throw error;
        })
    }
};

export const updatePlace = (place) => {
    return (dispatch) => {
        adminApi.updatePlace(place).then((place) => {
            dispatch({
                type: UPDATE_PLACE,
                place: place
            });
        }).catch((error) => {
            throw error;
        })
    }

};

export const deletePlace = (_id, messageApi) => {
    return (dispatch) => {
        adminApi.deletePlace(_id).then(() => {
            dispatch({
                type: DELETE_PLACE,
                _id
            });
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error.response.data.message,
              });
        })
    }
};
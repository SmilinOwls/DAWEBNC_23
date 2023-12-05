import { GET_ORDER, UPDATE_ORDER, DELETE_ORDER } from '../Constants/AdminConstant';
import adminApi from '../Services/AdminApi';

export const getOrder = () => {

  return (dispatch) => {
    adminApi.getAllOrders().then(({orders}) => {
      dispatch({
        type: GET_ORDER,
        orders: orders
      });
    }).catch((error) => {
      throw error;
    })
  }
};

export const updateOrder = (order) => {

  return (dispatch) => {
    adminApi.updateOrder(order).then(() => {
      dispatch({
        type: UPDATE_ORDER,
        order: order
      });
    }).catch((error) => {
      throw error;
    })
  }
};

export const deleteOrder = _id => {
  return (dispatch) => {
    adminApi.deleteOrder(_id).then(() => {
      dispatch({
        type: DELETE_ORDER,
        _id
      });

    }).catch((error) => {
      throw error;
    })
  }
};
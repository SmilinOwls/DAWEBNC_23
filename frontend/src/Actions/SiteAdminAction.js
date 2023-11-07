import { GET_SITE } from '../Constants/AdminConstant';
import adminApi from '../Services/AdminApi';

export const getSite = () => {
    return (dispatch) => {
        adminApi.getAllSites().then((sites) => {
            dispatch({
                type: GET_SITE,
                sites: sites
            });
        }).catch((error) => {
            throw error;
        })
    }
};
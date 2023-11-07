import { GET_SITE } from '../Constants/AdminConstant';

export default function SiteAdminReducer(state = [], action) {
  switch (action.type) {
    case GET_SITE:
      return state.length !== 0 ?  state : action.sites;
    default:
      return state;
  }
}
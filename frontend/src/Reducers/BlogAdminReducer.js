import { GET_BLOG, UPDATE_BLOG, DELETE_BLOG, ADD_BLOG }from '../Constants/AdminConstant';

export default function BlogAdminReducer(state = [], action) {
  switch (action.type) {
    case GET_BLOG:
      return state.length !== 0 ?  state : action.blogs;
    case ADD_BLOG:
      return [...state, action.blog];
    case UPDATE_BLOG:
        const data = [...state];
        const idx = data.findIndex(blog => blog._id === action.blog._id);
        if(idx > -1){
            data.splice(idx, 1, {
                ...action.blog,
            });
        } else{
            data.push(action.blog);
        }
      return data;
    case DELETE_BLOG:
      return state.filter(blog => blog._id !== action._id);
    default:
      return state;
  }
}
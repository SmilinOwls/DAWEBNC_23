import {ADD_WISHLIST_ITEM, REMOVE_WISHLIST_ITEM} from '../Constants/WishlistConstant';

const initialState = {
    wishlistItems: JSON.parse(localStorage.getItem("wishlist")) || [],
}

function wishlistReducer(state=initialState, action){
    switch(action.type){
        case ADD_WISHLIST_ITEM: {   
            const item = action.payload;
            const existsItem = state.wishlistItems.find((x) => x.hotel === item.hotel);
            if(existsItem){
                const  newCart = state.wishlistItems.map((x) => x.hotel === existsItem.hotel ? item : x);
                localStorage.setItem("wishlist", JSON.stringify(newCart));
                return {...state, wishlistItems: newCart}
                
            }else{
                const newCart =  [...state.wishlistItems, item];
                localStorage.setItem("wishlist", JSON.stringify(newCart));
                return {...state, wishlistItems: newCart}
            }
          
        }
        case REMOVE_WISHLIST_ITEM: {
            const newCart = state.wishlistItems.filter(x => x.hotel !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(newCart));
            return {...state, wishlistItems: newCart}
        }
        default: 
           return state
        
    }
};

export default wishlistReducer;
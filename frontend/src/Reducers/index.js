import {combineReducers} from 'redux';
import hotelsReducer from './HotelsReducer';
import {placeSiteReducer, sitesReducer} from './SitesReducer';
import { hotelsFilterReducer } from './HotelsFilterReducer';
import blogsReducer from './BlogsReducer';
import detailSiteReducer from './DetailSiteReducer';
import detailBlogReducer from './DetailBlog';
import {detailHotelReducer, getRoomByHotelReducer} from './DetailHotelReducer';
import detailRoomReducer from './DetailRoomReducer';
import {loginReducer, registerReducer, logoutReducer} from './AuthReducer'
import reviewReducer from './ReviewReducer';
import cartReducer from './CartReducer';
import { myOrderList, orderReducer } from './BookingReducer';
import wishlistReducer from './WishlistReducer';
import addSidebarReducer from './SidebarReducer';
import HotelAdminReducer from './HotelAdminReducer';
import RoomAdminReducer from './RoomAdminReducer';
import BlogAdminReducer from './BlogAdminReducer';
import OrderAdminReducer from './OrderAdminReducer';
import UserAdminReducer from './UserAdminReducer';
import SiteAdminReducer from './SiteAdminReducer';

const rootReducer = combineReducers({
    hotels: hotelsReducer,
    sites: sitesReducer,
    getHotelsFilter: hotelsFilterReducer,
    blogs: blogsReducer,
    detailSite: detailSiteReducer,
    detailBlogs: detailBlogReducer,
    detailHotel: detailHotelReducer,
    placeSite: placeSiteReducer,
    roomAtHotel: getRoomByHotelReducer,
    detailRoom: detailRoomReducer,
    register: registerReducer,
   login: loginReducer,
   logout: logoutReducer,
   review: reviewReducer,
   cart: cartReducer,
   wishlist: wishlistReducer,
   sidebar: addSidebarReducer,
   order: orderReducer,
   myOrder: myOrderList,
   hotelAdmin: HotelAdminReducer,
   roomAdmin: RoomAdminReducer,
   blogAdmin: BlogAdminReducer,
   orderAdmin: OrderAdminReducer,
   userAdmin: UserAdminReducer,
   siteAdmin: SiteAdminReducer,
});

export default rootReducer;
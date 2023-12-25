import { userReducer } from "./userReducer";
import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./CODReducer";
import { wishlistReducer } from "./wishlistReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;

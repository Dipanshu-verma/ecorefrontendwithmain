import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { cart, product} from "./reducer/product";
import { auth } from "./reducer/auth";


const rootreducer = combineReducers({
    products:product,
    cart:cart,
    auth:auth,
})


export const store =  legacy_createStore(rootreducer,applyMiddleware(thunk))
  
 

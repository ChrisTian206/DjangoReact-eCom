import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'
import { userRegisterReducer } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})

//Bc cartItem stored in localStorage is JSON stringified, we gotta cover it back to JSON
//get and check if exist. If yes, parse it; if not, set empty
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromLocalStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage },
    userInfo: { userInfo: userInfoFromLocalStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(...middleware)
))

export default store;
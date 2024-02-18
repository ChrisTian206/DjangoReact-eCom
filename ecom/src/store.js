import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers } from './reducers/productReducers'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
})

const initialState = {}

const middleware = [thunkMiddleware]

const store = createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(...middleware)
))

export default store;
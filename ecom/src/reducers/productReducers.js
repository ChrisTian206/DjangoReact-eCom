import {
    PRODUCT_LIST_REQUESTED,
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUESTED,
    PRODUCT_DETAILS_FAILED,
    PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'

export const productListReducers = (state = { products: [] }, action) => {
    console.log('Current state:', state);
    console.log('Action:', action);

    switch (action.type) {
        case PRODUCT_LIST_REQUESTED:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAILED:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productDetailsReducers = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUESTED:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAILED:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
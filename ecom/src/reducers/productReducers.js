import {
    PRODUCT_LIST_REQUESTED,
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_SUCCESS
} from '../constants/productConstants'

export const productListReducers = (state = { products: [] }, action) => {
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
import {
    PRODUCT_LIST_REQUESTED,
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_SUCCESS
} from '../constants/productConstants'

export const productListReducers = (state = { product: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUESTED:
            return { loading: true, product: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_LIST_FAILED:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
import axios from 'axios'
import {
    PRODUCT_LIST_REQUESTED,
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUESTED,
    PRODUCT_DETAILS_FAILED,
    PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUESTED })

        const { data } = await axios.get(`api/products/`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAILED,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUESTED })

        const { data } = await axios.get(`api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILED,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}


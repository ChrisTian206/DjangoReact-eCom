import axios from 'axios'
import {
    PRODUCT_LIST_REQUESTED,
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_SUCCESS
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
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
    }
}


import axios from 'axios'
import { CART_REMOVE_ITEM, CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity: data.quantity
        }
    })

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.CART_ADD_ITEM))
} 
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            //initiating cartItems as empty array in the parameter
            //doesn't seem to work well.
            if (!state.cartItems) state.cartItems = [];

            // console.log('Current state:', state);
            // console.log('Action:', action);
            // console.log(Array.isArray(state.cartItems))

            //This payload is the actual product order:
            // payload: {
            //     product: data._id,
            //     name: data.name,
            //     image: data.image,
            //     price: data.price,
            //     countInStock: data.countInStock,
            //     qty,
            // }
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)


            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }


        case CART_REMOVE_ITEM:
            return {
                ...state,
                // action.payload in this case would just be the product id
                //keep those product who does not match what's in the payload
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        default:
            return state
    }
}
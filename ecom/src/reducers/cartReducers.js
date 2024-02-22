import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            //initiating cartItems as empty array in the parameter
            //doesn't seem to work well.
            if (!state.cartItems) state.cartItems = [];

            console.log('Current state:', state);
            console.log('Action:', action);
            console.log(Array.isArray(state.cartItems))

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

        default:
            return state
    }
}
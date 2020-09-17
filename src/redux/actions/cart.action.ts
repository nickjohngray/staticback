import {createAction} from 'redux-actions';
import {ICartItem} from '../../typings';

export enum CartActions {
    ADD_TO_CART = 'CART/ADD_TO_CART',
    REMOVE_FROM_CART = 'CART/REMOVE_FROM_CART',
    EMPTY_CART = 'CART/EMPTY_CART'
}

export const addToCart = createAction(CartActions.ADD_TO_CART, (cartItem: ICartItem) => cartItem);

export const removeFromCart = createAction(CartActions.REMOVE_FROM_CART, (cartItem: ICartItem) => cartItem);
// tslint:disable-next-line:no-empty
export const emptyCart = createAction(CartActions.EMPTY_CART, () => {});

export type emptyCartAction = ReturnType<typeof emptyCart>;
export type addToCartAction = ReturnType<typeof addToCart>;
export type removeFromCartAction = ReturnType<typeof removeFromCart>;

export default CartActions;

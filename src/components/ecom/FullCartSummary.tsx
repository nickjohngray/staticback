import {globalHistory} from '@reach/router';
import {getCartItemsByType, getCartTotal, getNextCartItemId, getTotal} from 'components/ecom/util';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import {PayPalButton} from 'react-paypal-button-v2';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {addToCart, emptyCart, removeFromCart} from '../../redux/actions/cart.action';
import {ICartItem, ICartItemsByType, IState} from '../../typings';
import {faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const CURRENCY_CODE = 'USD';

interface CartSummaryProps {
    addToCart: (cartItem: ICartItem, id: number) => void;
    emptyCart: () => void;
    cartItemsByType: ICartItemsByType[];
    cartItems: ICartItem[];
    cartTotal: number;
    nextCartItemId: number;
    removeFromCart: (cartItem: ICartItem) => void;
}

class FullCartSummary extends React.Component<CartSummaryProps> {
    constructor(props: CartSummaryProps) {
        super(props);
    }

    render = () => (
        <div className="full-cart-summary">
            <div className="row header">
                <div className="column product-name">Name</div>
                <div className="column">Unit $</div>
                <div className="column">Qty</div>
                <div className="column">Total</div>
                <div className="column actions">Actions</div>
            </div>
            {this.props.cartItemsByType.map((cartItem, key: number) => (
                <div className="row detail" key={key}>
                    <div className="column product-name">
                        {cartItem.items[0].product.title}
                        {cartItem.isVariation && (
                            <span className="variation-name">
                                <i>{cartItem.variationName}</i>
                            </span>
                        )}
                    </div>

                    <div className="column">
                        <span className="mobile">Unit cost: </span>
                        {cartItem.items[0].product.price}
                    </div>
                    <div className="column">
                        <span className="mobile">Qty: </span>
                        {cartItem.items.length}
                    </div>
                    <div className="column">
                        <span className="mobile">Total: </span>${getTotal(cartItem.items).toFixed(2)}{' '}
                    </div>
                    <div className="column actions">
                        <button
                            onClick={() =>
                                this.props.addToCart(cloneDeep(cartItem.items[0]), this.props.nextCartItemId)
                            }
                        >
                            <FontAwesomeIcon icon={faPlusCircle} title="Add 1 to cart" />
                        </button>
                        <button onClick={() => this.props.removeFromCart(cartItem.items[0])}>
                            <FontAwesomeIcon icon={faMinusCircle} title="Remove 1 from cart" />
                        </button>
                        <button
                            onClick={() =>
                                cartItem.items.forEach(item => {
                                    this.props.removeFromCart(item);
                                })
                            }
                        >
                            X
                        </button>
                    </div>
                </div>
            ))}
            <hr></hr>
            <h2>Total Cost: ${this.props.cartTotal}</h2>
            <button
                onClick={() =>
                    window.confirm('Are you sure you want to empty your cart?') ? this.onEmptyCart() : undefined
                }
            >
                Empty Cart
            </button>
            <div>
                <p />
                Your products will be delivered to the address specified in PayPal
                <PayPalButton
                    style={{maxWidth: '200px'}}
                    disabled={this.props.cartTotal === 0}
                    createOrder={(object, actions) => this.makeOrder(object, actions)}
                    /* currency={'NZ'}*/
                    amount="0.01"
                    shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    // @ts-ignore
                    onSuccess={(details, data) => {
                        window.alert(`Transaction completed by " + ${details.payer.name.given_name}`);
                    }}
                    options={{
                        clientId: 'ATeqz4rbYuHJ0etl1xPmTT-pK_K-PNyJQfx7EW4yhSe5pWXjzQJlQnFMGQ2_Ut9188R7zvNCNdS04qzD',
                        debug: 'true'
                    }}
                />
            </div>
        </div>
    );

    onEmptyCart = () => {
        this.props.emptyCart();
        setTimeout(() => globalHistory.navigate('/'), 250);
    };

    // @ts-ignore
    makeOrder = (object, actions) => {
        const x = this.getPurchaseUnits();
        return actions.order.create({
            purchase_units: x
        });
    };

    getPurchaseUnits = () => [
        {
            amount: {
                value: this.props.cartTotal.toString(),
                currency_code: CURRENCY_CODE,
                breakdown: {
                    item_total: {value: this.props.cartTotal.toString(), currency_code: CURRENCY_CODE}
                }
            },
            items: this.props.cartItemsByType.map(cartItem => this.getOrderLine(cartItem))
        }
    ];

    getOrderLine = (cartItem: ICartItemsByType) => {
        return {
            name: cartItem.isVariation ? cartItem.productKey : cartItem.items[0].product.title,
            unit_amount: {value: cartItem.items[0].product.price.toFixed(2), currency_code: 'USD'},
            quantity: cartItem.items.length.toString()
        };
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addToCart: (cartItem: ICartItem, id: number) => {
        cartItem.id = id;
        dispatch(addToCart(cartItem));
    },
    emptyCart: () => {
        dispatch(emptyCart());
    },
    removeFromCart: (cartItem: ICartItem) => {
        dispatch(removeFromCart(cartItem));
    }
});

export default connect(
    (state: IState) => ({
        cartItemsByType: getCartItemsByType(state.cart.items),
        cartItems: state.cart.items,
        cartTotal: state.cart.items.length > 0 ? getCartTotal(state.cart.items).toFixed(2) : 0,
        nextCartItemId: getNextCartItemId(state.cart.items)
    }),
    mapDispatchToProps
)(FullCartSummary);

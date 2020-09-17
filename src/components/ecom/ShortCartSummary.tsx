import {Link} from '@reach/router';
import {getCartTotal} from 'components/ecom/util';
import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {emptyCart} from '../../redux/actions/cart.action';
import {ICartItem, IStore} from '../../typings';
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface IProps {
    latestProduct: ICartItem;
    cartCount: number;
    cartTotal: number;
    emptyCart: () => void;
    URL: string;
}

interface IState {
    activePage: string;
}

class ShortCartSummary extends React.Component<IProps, IStore> {
    constructor(props: IProps) {
        super(props);
    }

    render = () => (
        <div className={'short-cart-summary'}>
            {this.props.cartCount > 0 && this.props.URL !== '/checkout' && (
                <>
                    <Link to="/checkout" title="Checkout">
                        <FontAwesomeIcon icon={faCartArrowDown} />
                        &nbsp;{this.props.cartCount}
                    </Link>
                </>
            )}
        </div>
    );
}

const getLastAddedProduct = (items: ICartItem[]): ICartItem => {
    if (items.length === 1) return items[0];

    return items.reduce((latestItem, item) => {
        return item.id > latestItem.id ? item : latestItem;
    }, items[0]);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    emptyCart: () => {
        dispatch(emptyCart());
    }
});

export default connect(
    (state: IStore) => ({
        latestProduct: getLastAddedProduct(state.cart.items),
        cartCount: state.cart.items.length,
        cartTotal: state.cart.items.length > 0 ? getCartTotal(state.cart.items) : 0,
        URL: state.history.URL
    }),
    mapDispatchToProps
)(ShortCartSummary);

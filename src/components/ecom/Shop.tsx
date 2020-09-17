import {getNextCartItemId} from 'components/ecom/util';
import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {addToCart} from '../../redux/actions/cart.action';
import {ICartItem, IProduct, IShop, IStore} from '../../typings';
import Product from './Product';

interface IProps extends IShop {
    addToCart: (cartItem: ICartItem, id: number) => void;
    nextCartItemId: number;
    products: Array<IProduct>;
}

class Shop extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render = () => (
        <div className="shop">
            <div className="products">
                {this.props.products.map((prod, key) => (
                    <Product
                        type={prod.type}
                        title={prod.title}
                        description={prod.description}
                        image={prod.image}
                        price={prod.price}
                        variations={prod.variations}
                        key={key}
                        onAddToCart={cartItem => {
                            this.props.addToCart(cartItem, this.props.nextCartItemId);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addToCart: (cartItem: ICartItem, id: number) => {
        cartItem.id = id;
        dispatch(addToCart(cartItem));
    }
});

export default connect(
    (state: IStore) => ({
        nextCartItemId: getNextCartItemId(state.cart.items)
    }),
    mapDispatchToProps
)(Shop);

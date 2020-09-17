import {combineReducers} from 'redux';
import cart from './cart.reducer';
import history from './history.reducer';
import localize from './localize.reducer';
import shop from './shop.reducer';

export default combineReducers({
    localize: localize,
    cart,
    history,
    shop
});

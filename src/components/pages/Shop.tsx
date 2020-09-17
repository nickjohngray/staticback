import React from 'react';
import Shop from './../ecom/Shop';
import {getProducts} from 'components/pages/manifestUtil';

export default () => (
    <div className="page">
        <h1 className="center-text">Merchandise</h1>
        <Shop products={getProducts()} />
    </div>
);

import React from 'react';
import Shop from './../ecom/Shop';
import {getProducts} from 'components/pages/manifestUtil';
//todo bound porudcts to a page and treat it the same so
// useRouteData can be used
//import {useRouteData} from 'react-static';
//import {IPage} from '../../typings';

export default () => {
    //const routeData = useRouteData();
    // const page: IPage = routeData.page;

    return (
        <div className="page">
            <h1 className="center-text">Merchandise</h1>
            <Shop products={getProducts()} />
        </div>
    );
};

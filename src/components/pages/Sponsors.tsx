import React from 'react';
import ImageLinkList from './../ImageLinkList';
import {getPage} from 'components/pages/pageUtil';

export default () => (
    <div className={'page center-it sponsors'}>
        <h1>Sponsors</h1>
        <ImageLinkList images={getPage('sponsors').images} />
    </div>
);

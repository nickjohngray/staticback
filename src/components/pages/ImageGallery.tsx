import React from 'react';
import FBGallery from '../FBGallery';
import {getPage} from 'components/pages/pageUtil';

export default () => (
    <div className="page">
        <h1 className="center-text">Image Gallery</h1>
        <FBGallery FBAccessToken={getPage('image-gallery').FBAccessToken} />
    </div>
);

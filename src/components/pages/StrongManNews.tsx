import React from 'react';
import SectionList from 'components/SectionList';
import {getPage} from 'components/pages/pageUtil';

export default () => (
    <div className={'page center-it sponsors'}>
        <h1>News</h1>
        <SectionList sections={getPage('news').sections} />
    </div>
);

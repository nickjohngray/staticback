import React from 'react';
import SectionList from 'components/SectionList';
import {getPage} from 'components/pages/manifestUtil';

export default () => (
    <div className={'page center-it '}>
        <h1>Athletes</h1>
        <SectionList sections={getPage('athletes').sections} />
    </div>
);

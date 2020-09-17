// Dont remove this file React Static needs to be called 404
import React from 'react';
import Incredible from 'components/IncredibileEditor.tsx/Incredible';
import {getPage} from 'components/pages/manifestUtil';
export default () => {
    return (
        <div className={'page center-it '}>
            <Incredible data={getPage('404').incredibleData} />
        </div>
    );
};

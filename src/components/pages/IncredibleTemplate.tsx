import React from 'react';
import Incredible from 'components/IncredibileEditor.tsx/Incredible';
import {IIncredibleItem, IPage} from '../../typings';
import {useRouteData} from 'react-static';

const IncredibleTemplate = () => {
    const data = useIncredible();

    return (
        <div className={'page center-it '}>
            <Incredible data={data} />
        </div>
    );
};

const useIncredible = (): IIncredibleItem => {
    const routeData = useRouteData();
    const page: IPage = routeData.page;

    if (!page) {
        throw 'No Page data found, can\'t build Incredible template';
    }
    const data: IIncredibleItem = page.incredibleData;

    if (!data) {
        throw 'No Incredible data found for page ' + page.name;
    }
    return data;
};

export default IncredibleTemplate;

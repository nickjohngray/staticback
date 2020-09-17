import React from 'react';
import {getPage} from 'components/pages/manifestUtil';
import Incredible from 'components/IncredibileEditor.tsx/Incredible';
import {IIncredibleItem, IPage} from '../../typings';
import {useRouteData} from 'react-static';
import RichText from 'components/RichText/RichText';
import {createEditor, Node as INode} from 'slate';

export default () => {
    const routeData = useRouteData();

    const page: IPage = routeData.page;
    const data: INode[] = page.richTextData;

    return <div className={'page center-it '}>{<RichText json={data} />}</div>;
};

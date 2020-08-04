import {IManifest, IPage} from '../../typings';
import {useSiteData} from 'react-static';

export const getPage = (pageName: string) => {
    const manifest: IManifest = useSiteData();
    const page: IPage = manifest.pages.find(page => page.path === pageName);
    return page;
};

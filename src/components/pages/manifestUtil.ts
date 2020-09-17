import {IManifest, IPage, IProduct} from '../../typings';
import {useSiteData} from 'react-static';

export const getPage = (pagePath: string): IPage => {
    const manifest: IManifest = useSiteData();
    const page: IPage = manifest.pages.find(page => page.path === pagePath);
    return page;
};

export const getProducts = () => {
    const manifest: IManifest = useSiteData();
    const products: Array<IProduct> = manifest.products;
    return products;
};

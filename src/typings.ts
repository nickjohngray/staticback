import {Node as INode} from 'slate';
import {SizeProp as IFontAwesomeSize} from '@fortawesome/fontawesome-svg-core';

export interface IPage {
    name: string;
    path: string;
    images?: IImage[];
    sections?: ISection[];
    FBAccessToken?: string;
    richTextData?: INode[];
    incredibleData?: IIncredibleItem;
}

export type IIncredibleItem = {
    title: string;
    br: boolean;
    file: string;
    size?: IFontAwesomeSize;
    style: {};
    type: ITypes;
    children: Array<IIncredibleItem>;
    href?: string;
    placeholder?: string;
    icon?: string;
    text?: string;
};

export type ITypes = 'row' | 'col' | 'h1' | 'h2' | 'linkWithIcon' | 'text' | 'pdf' | 'p' | 'a' | 'richText';

export enum types {
    row = 'row',
    col = 'col',
    h1 = 'h1',
    h2 = 'h2',
    text = 'text',
    linkWithIcon = 'linkWithIcon',
    pdf = 'pdf',
    p = 'p',
    a = 'a',
    richText = 'richText'
}

export interface ISection {
    image?: IImage;
    header: string;
    body: string;
    sections?: ISection[];
    list?: string[];
    link?: string;
    opener?: ISectionOpener;
}

export interface ISectionOpener {
    type: OPENER_TYPE;
    open: boolean;
}

export enum OPENER_TYPE {
    TAB = 'TAB',
    EXPANDER = 'EXPANDER'
}

export interface IImage {
    src: string;
    url?: string;
}

export interface IManifest {
    appName: string;
    imagePath: string;
    pages: IPage[];
    products: IProduct[];
    FBAccessToken: string;
    id: string;
}

export interface ICart {
    items: ICartItem[];
}

export interface IHistory {
    URL: string;
}

/* a new id is made for each product added to the cart
  and a copy of the product definition
  if the product has a variations that the user has selected
  these will also be added

*/
export interface ICartItem {
    id: number;
    product: IProduct;
    selectedVariations: ISingleVariation[];
}

export interface IProduct {
    title: string;
    description: INode[];
    image: string;
    type: string;
    variations: Variation[];
    price?: number;
}

export interface ICartItemsByType {
    productKey: string;
    items: ICartItem[];
    isVariation: boolean;
    variationName: string;
}

/*export interface ProductVariation {
    name: string,
    value: string
}*/

export type ISingleVariation = {
    name: string;
    option: VariationItem;
};

export type Variation = {
    title: string;
    item: VariationItem[];
};

export type VariationItem = {
    optionValue: string;
    image?: string;
    price?: number;
};

/*export enum PRODUCT_TYPES {
    TSHIRT = 'TSHIRT',
    RING = 'RING'
}*/

export type IShop = {
    products: IProduct[];
};

export interface IStore {
    localize: any;
    cart: ICart;
    shop: IShop;
    history: IHistory;
}

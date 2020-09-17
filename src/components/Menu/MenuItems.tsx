import {Link} from '@reach/router';
import React, {FC} from 'react';
import {connect} from 'react-redux';
import {useSiteData} from 'react-static';
import {IManifest, IPage, IStore} from '../../typings';

interface IProps {
    URL: string;
    cartCount: number;
}

const MenuItems: FC<IProps> = ({URL, cartCount}) => {
    const manifest: IManifest = useSiteData();

    return (
        <>
            {manifest.pages.map((page: IPage, key: number) => {
                let makeLink = true;

                if ((cartCount === 0 && page.path === 'checkout') || page.path === '404') {
                    makeLink = false;
                }

                return (
                    makeLink && (
                        <Link key={key} className={page.path === fixURL(URL) ? 'active' : null} to={page.path}>
                            {page.name}
                        </Link>
                    )
                );
            })}
        </>
    );
};

const fixURL = (url: string) => {
    if (url !== '/') {
        return url.substring(1);
    } else {
        return url;
    }
};

export default connect((state: IStore) => ({
    URL: state.history.URL,
    cartCount: state.cart.items.length
}))(MenuItems);

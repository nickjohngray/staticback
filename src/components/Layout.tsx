import {globalHistory, HistoryListenerParameter, Router} from '@reach/router';
import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {Routes, useSiteData} from 'react-static';
import {Dispatch} from 'redux';
import {changeURL} from '../redux/actions/history.action';
import {loadShop} from '../redux/actions/shop.action';
import {IHistory, IManifest} from '../typings';
import ShortCartSummary from './ecom/ShortCartSummary';
import Header from './Header';
import ContentToggler from 'components/blockout/ContentToggler';

interface IProps {
    changeURL: (url: IHistory) => void;
    loadShop: () => void;
}

const Layout: FC<IProps> = ({changeURL, loadShop}) => {
    loadShop();

    globalHistory.listen((history: HistoryListenerParameter) => {
        try {
            changeURL({URL: history.location.pathname});
        } catch {}
    });

    return (
        <div id="content">
            <Header />
            <Router>
                <Routes path="*" />
                <Routes default />
            </Router>
            <footer>
                <ShortCartSummary />
                <ContentToggler className="privacy_policy" title="Privacy Policy">
                    <p>We collect personal information from you, including information about your:</p>
                    <ul>
                        <li>name</li>
                        <li>contact information</li>
                    </ul>
                    <p>We collect your personal information in order to:</p>
                    <ul>
                        <li>Send buyer their products</li>
                    </ul>
                    <p>
                        You have the right to ask for a copy of any personal information we hold about you, and to ask
                        for it to be corrected if you think it is wrong. If you’d like to ask for a copy of your
                        information, or to have it corrected, please contact us at&nbsp;.
                    </p>
                </ContentToggler>
            </footer>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeURL: (url: IHistory) => {
        dispatch(changeURL(url));
    },
    loadShop: () => {
        const manifest: IManifest = useSiteData();
        dispatch(loadShop(manifest));
    }
});

export default connect(
    () => ({}),
    mapDispatchToProps
)(Layout);

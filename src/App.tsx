import Layout from 'components/Layout';
import React, {FC, useEffect} from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import {LocalizeProvider} from 'react-localize-redux';
import {Provider} from 'react-redux';
import {Root} from 'react-static';
import './app.css';
import store from './redux/store';

const App: FC = () => {
    return (
        <React.Suspense fallback={<em>Loading...</em>}>
            <Provider store={store}>
                <Root>
                    <LocalizeProvider store={store}>
                        <Layout></Layout>
                    </LocalizeProvider>
                </Root>
            </Provider>
        </React.Suspense>
    );
};

export default App;

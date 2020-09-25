//todo covert to ts
import React from 'react';
import manifest from './manifest.json';
import fs from 'fs';
import path from 'path';

// this uses fs so the app gets reloaded when the manifest changes
const getManifest = async () =>
    JSON.parse(await fs.readFileSync(path.resolve(process.cwd(), 'manifest.json'), 'utf8'));

 const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default {
    entry: 'index.tsx',
    productionSourceMaps: true,
    getSiteData: async () => (
        await getManifest()
    ),
    getRoutes: async () => {
        try {
            if(isDev) {
                console.log('build routes');
            }
            const m = await getManifest();
            if(isDev) {
               console.log('manifest data = ' + JSON.stringify(m));
           }

            return m.pages.map((page) => {
                if(isDev) {
                    console.log('build route for');
                    console.log('page name ' + page.name);
                    console.log('template ' + page.template);
                }
                return (
                    {
                        // todo rename page.template to templatePath
                        // todo rename path to routePath
                        path: page.path,
                        template: page.template,  //'src/components/pages/IncredibleTemplate' : page.template
                        // give access to site data
                        /* getData: async () => ({*/

                        getData: () => ({
                            page
                        })
                    }
                );
            });
        } catch (error) {
            console.error('Error while building the routes!', error.message);
            process.exit(1);
        }
    },
    Document: class CustomHtml extends React.Component {
        render() {
            const {
                Html,
                Head,
                Body,
                children,
                renderMeta
            } = this.props;
            return (
                <Html lang='en-US' manifest="/appcache">
                    <Head>

                        <meta charSet='UTF-8'/>
                        {/*  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
                            <meta http-equiv="Pragma" content="no-cache"/>
                            <meta http-equiv="Expires" content="0"/>*/}
                        <link rel='apple-touch-icon' sizes='57x57' href='/apple-icon-57x57.png'/>
                        <link rel='apple-touch-icon' sizes='60x60' href='/apple-icon-60x60.png'/>
                        <link rel='apple-touch-icon' sizes='72x72' href='/apple-icon-72x72.png'/>
                        <link rel='apple-touch-icon' sizes='76x76' href='/apple-icon-76x76.png'/>
                        <link rel='apple-touch-icon' sizes='114x114' href='/apple-icon-114x114.png'/>
                        <link rel='apple-touch-icon' sizes='120x120' href='/apple-icon-120x120.png'/>
                        <link rel='apple-touch-icon' sizes='144x144' href='/apple-icon-144x144.png'/>
                        <link rel='apple-touch-icon' sizes='152x152' href='/apple-icon-152x152.png'/>
                        <link rel='apple-touch-icon' sizes='180x180' href='/apple-icon-180x180.png'/>
                        <link rel='icon' type='image/png' sizes='192x192' href='/android-icon-192x192.png'/>
                        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'/>
                        <link rel='icon' type='image/png' sizes='96x96' href='/favicon-96x96.png'/>
                        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png'/>
                        <link rel='manifest' href='/manifest.json'/>
                        <meta name='msapplication-TileColor' content='#ffffff '/>
                        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png'/>
                        <meta name='theme-color' content='#ffffff'/>
                        <meta name='viewport' content='width=device-width, initial-scale=1'/>
                        <link href='https://fonts.googleapis.com/css?family=Open+Sans” rel=“stylesheet'/>
                        <link href='https://fonts.googleapis.com/css?family=Montserrat&display=swap'
                              rel='stylesheet'/>
                        <link href='https://fonts.googleapis.com/css?family=Montserrat:700&display=swap'
                              rel='stylesheet'/>
                        <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap'
                              rel='stylesheet'/>

                    </Head>
                    <Body>{children}</Body>
                </Html>
            );
        }
    },


    plugins: [
        [
            'react-static-plugin-file-watch-reload',
            {
                paths: 'manifest.json'
            }
        ],
        ['react-static-plugin-typescript', {typeCheck: false}],
        'react-static-plugin-reach-router',
        path.resolve(process.cwd(), 'plugins_x', 'react-static-plugin-fix-universal-component')

    ],
    resolve: {
        alias: {
            config: 'manifest'
        }
    },
    devServer: {
        contentBase: ['.'],
        // allow hot reload to work from cms
        //todo could get clients ip here to only allow them to hot reload
        disableHostCheck: true
    }
};

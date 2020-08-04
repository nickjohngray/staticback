import React from 'react'
import manifest from './manifest.json'
import fs from 'fs'
import path from "path";

const getManifest = async () =>
    JSON.parse( await fs.readFileSync(   path.resolve(process.cwd(), 'manifest.json'), 'utf8'))


export default {
  entry: 'index.tsx',
  productionSourceMaps: true,
  getSiteData: async () => (
      await getManifest()
  ),
  getRoutes: async () => {
    try {
      return (await getManifest()).pages.map((page) => (
          {
            path: page.path,
            template: page.template
          }
      ))
    } catch (error) {
      console.error('Error while building the routes!', error.message)
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
          <Html lang='en-US'>
            <Head>
              <meta charSet='UTF-8'/>
              <link rel='apple-touch-icon' sizes='57x57' href='/apple-icon-57x57.png' />
              <link rel='apple-touch-icon' sizes='60x60' href='/apple-icon-60x60.png' />
              <link rel='apple-touch-icon' sizes='72x72' href='/apple-icon-72x72.png' />
              <link rel='apple-touch-icon' sizes='76x76' href='/apple-icon-76x76.png' />
              <link rel='apple-touch-icon' sizes='114x114' href='/apple-icon-114x114.png' />
              <link rel='apple-touch-icon' sizes='120x120' href='/apple-icon-120x120.png' />
              <link rel='apple-touch-icon' sizes='144x144' href='/apple-icon-144x144.png' />
              <link rel='apple-touch-icon' sizes='152x152' href='/apple-icon-152x152.png' />
              <link rel='apple-touch-icon' sizes='180x180' href='/apple-icon-180x180.png' />
              <link rel='icon' type='image/png' sizes='192x192'  href='/android-icon-192x192.png' />
              <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
              <link rel='icon' type='image/png' sizes='96x96' href='/favicon-96x96.png' />
              <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
              <link rel='manifest' href='/manifest.json' />
              <meta name='msapplication-TileColor' content='#ffffff ' />
              <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
              <meta name='theme-color' content='#ffffff' />
              <meta name='viewport' content='width=device-width, initial-scale=1'/>
              <link href='https://fonts.googleapis.com/css?family=Open+Sans” rel=“stylesheet'/>
              <link href='https://fonts.googleapis.com/css?family=Montserrat&display=swap' rel='stylesheet'/>
              <link href='https://fonts.googleapis.com/css?family=Montserrat:700&display=swap' rel='stylesheet'/>
              <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap' rel='stylesheet'/>
            </Head>
            <Body>{children}</Body>
          </Html>
      )
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

  ],
  resolve: {
    alias: {
      config: 'manifest',
    },
  },
  devServer: {
    contentBase: ['.'],
  },
}

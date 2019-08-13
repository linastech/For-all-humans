const withPlugins = require('next-compose-plugins')
const defaultGetLocalIdent = require('css-loader/lib/getLocalIdent');
const path = require('path')

module.exports = withPlugins(
  [
    require('next-progressbar' ),
    require('next-images'),
    // CSS loader
    [
      require('@zeit/next-css'),
      {
        cssModules: true,
        cssLoaderOptions: {
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
          getLocalIdent: (loaderContext, localIdentName, localName, options) => {
            return loaderContext.resourceQuery == "?raw" ? localName : defaultGetLocalIdent(loaderContext, localIdentName, localName, options)
          }
        }
      }
    ],
    // SASS loader
    [
      require('@zeit/next-sass'), 
      {
        sassLoaderOptions: {
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
          getLocalIdent: (loaderContext, localIdentName, localName, options) => {
            return loaderContext.resourceQuery == "?raw" ? localName : defaultGetLocalIdent(loaderContext, localIdentName, localName, options)
          }
        }
      }
    ]
  ],
  //next.config.js goes here, webpack as well
  {
    env: {
      
    },
    serverRuntimeConfig: {},
    publicRuntimeConfig: {},
    distDir: 'build',
    useFileSystemPublicRoutes: false,
    webpack (config, { buildId, dev, isServer, defaultLoaders, webpack }) {

      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }

      // config.resolve.alias['@navRoutes'] = path.join(__dirname, './routes/employee/navigation')
      config.resolve.alias['@router'] = path.join(__dirname, './routes')
      config.resolve.alias['@styles'] = path.join(__dirname, './static/styles')
      config.resolve.alias['@components'] = path.join(__dirname, './components')
      config.resolve.alias['@layouts'] = path.join(__dirname, './layouts')
      config.resolve.alias['@layouts'] = path.join(__dirname, './layouts')
      config.resolve.alias['@images'] = path.join(__dirname, './static/images')
      config.resolve.alias['@modules'] = path.join(__dirname, './node_modules') 
      config.resolve.alias['@lib'] = path.join(__dirname, './lib') 
      config.resolve.alias['@redux'] = path.join(__dirname, './lib/redux') 

      return config
    }
  }
)
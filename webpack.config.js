const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
    module.exports = require('./webpack-config/webpack.config.dev');
} else if (environment === 'production') {
    module.exports = require('./webpack-config/webpack.config.prod');
} else {
    module.exports = require('./webpack-config/webpack.config.example');
}
module.exports = {
    entry: [
        './src-react/resources/js/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ["es2015" , "react" , "stage-1"]
            }
        }],
        preLoaders: [
            { test: /\.json$/, loader: 'json' }
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist'
    }
};

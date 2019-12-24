module.exports = {
    entry: {
        DailySummary: './dailySummary/dailysummary',
        DailyTransaction:'./dailyTransaction/daily',
        MonthlyTransaction:'./monthlyTransaction/monthly',
   },
    target: 'node',
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        chunkFilename: "[id].bundle.js"
    },
    externals: { './config': 'require("./config")' },
    //     module: {
    //        loaders: [
    //         {test: /\.js$/,
    //           loader: "uglify"},
    //         {test: /\.json$/, 
    //           loader: "json"},
    //        ]
    //    },
};
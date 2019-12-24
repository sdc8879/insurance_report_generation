let squery = require('./query');
let mailer = require('../sendemail')
let db = require('../dbconnection');
let createReport = require('./createReport');


let query = squery.dailyQuery();

db.executeQuery(query.dailyQueryString).then((dailyQueryResult) => {
    console.log('dailyQueryResult--->', dailyQueryResult)
    return dailyQueryResult;
}).then((result) => {
    
    createReport.Report(result, 'Daily Transactions').then((result) => {
        console.log('createReport result--->', result);
        return result;
    }).then((result) => {
        var subjectLine="Insurance Transaction (Daily)";
        mailer.sendEmail(result,subjectLine).then((result) => {
            console.log('sendEmail result---->', result);
            db.dbend();
        })
    })
}).catch((error) => {
    console.log('error--->', error);
    console.log('error in db.executeQuery of Daily Transaction');
    db.dbend();
});

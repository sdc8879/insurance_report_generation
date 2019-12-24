let squery = require('./query');
let mailer = require('../sendemail')
let db = require('../dbconnection');
let createReport = require('./createReport');


let query = squery.monthlyQuery();

db.executeQuery(query.monthlyQueryString).then((dailyQueryResult) => {
    console.log('dailyQueryResult--->', dailyQueryResult)
    return dailyQueryResult;
}).then((result) => {
    createReport.Report(result, 'Monthly Transaction').then((result) => {
        console.log('createReport result--->', result);
        return result;
    }).then((result) => {
        var subjectLine="Insurance Transactions (Monthly)"
        mailer.sendEmail(result,subjectLine).then((result) => {
            console.log('sendEmail result---->', result);
            db.dbend();
        })
    })
}).catch((error) => {
    console.log('error--->', error);
    console.log('error in db.executeQuery Monthly Transaction');
    db.dbend();
});

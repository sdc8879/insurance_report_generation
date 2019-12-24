
const report = require('./dailyReport');
const mailer=require('../sendemail')
const db=require('../dbconnection')
// module.exports.DailySummary = function () {

        report.dailyReport().then((result) => {
            // resolve(result);
            console.log('dailyReport result1--->', result);


            var finalresultstring = '';
            finalresultstring = "<html> " +
                "<head> " +
                "<style> " +
                "table, th, td { " +
                " border: 2px solid black; " +
                "border-collapse: collapse; " +
                "margin: 0 auto;" +
                "} " +
                "th, td { " +
                " padding: 5px; " +
                "text-align:center; " +
                "} " +
                "</style> " +
                "</head> " +
                "<body> " +
                "<br>" +
                result +
                "<br>" +
                "</body>" +
                "</html>"
            // res.json(finalresultstring);
            console.log('finalresultstring--->', finalresultstring);
            return finalresultstring;

        }).then((result) => {
            var subjetLine="Insurance Sales Summary";
                mailer.sendEmail(result,subjetLine)
                    .then((output) => {
                        console.log('final output-->', output);
                        db.dbend();
                    }).catch((error) => {
                        console.log('error is -->',error);
                        console.log('error in sendEmail Promise')
                        db.dbend();
                        // reject(error);
                    })
            })
            .catch((error) => {
                console.log('error is -->',error);
                console.log('errorin dailyReport Promise')
                db.dbend();
                // reject(error);
            });
// }
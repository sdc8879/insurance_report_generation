
const db = require('../dbconnection');

const jsonFun = require('./jsonFunctionality');
const createTable = require('./createTable');
const calTopInsurance = require('./topInsurance');
const squery = require('./sqlquery');
const calSummTotal = require('./calSummayTotal');
module.exports.dailyReport = function (query1) {

    return new Promise((resolve, reject) => {

        try {
            var rquery = squery.reportQuery();

            db.executeQuery(rquery.reportquery1).then((query1_result) => {

                // console.log('executeQuery result->', query1_result);

                if (query1_result.length > 0) {


                    jsonFun.jsonFunctionality(query1_result)
                        .then((jsonFunctionality_output) => {
                            // console.log('jsonFunctionality output -->', jsonFunctionality_output);
                            createTable.createTable(jsonFunctionality_output).then((createTable_output_string) => {
                                console.log('createTable_output---->', createTable_output_string);

                                return createTable_output_string;
                                // calTopInsurance.topInsurance().then((topInsurance_result) => {
                                //     var htmlString1 = createTable_output + topInsurance_result;
                                //     resolve(htmlString1);
                                // }).catch((err) => {
                                //     console.log('error in topInsurance promise ');
                                //     db.dbend();
                                //     reject(err);
                                // });
                                // resolve(createTable_output);
                            }).then((result) => {
                                var string1 = ''
                                calSummTotal.calSummaryTotal().then((calSummaryTotalResult) => {
                                    string1 = "<tr><th colspan='3'>Total</th>" +
                                        "<th>" + Number(calSummaryTotalResult[0].total_policy_count).toFixed(2) + "</th>" +
                                        "<th>" + Number(calSummaryTotalResult[0].total_gta_amount).toFixed(2) + "</th>" +
                                        "<th>" + Number(calSummaryTotalResult[0].total_policy_daily_count).toFixed(2) + "</th>" +
                                        "<th>" +Number(calSummaryTotalResult[0].total_gta_daily_amount).toFixed(2) + "</th></tr></table>"
                                    var string2 = result + string1;
                                    console.log('string2--->', string2);
                                    return string2;
                                }).then((result) => {

                                    console.log('result@@@@@@', result)

                                    calTopInsurance.topInsurance().then((topInsurance_result) => {
                                        console.log('topInsurance_result ******', topInsurance_result);
                                        var htmlString1 = result + topInsurance_result;
                                        // console.log('htmlString------------------>');
                                        console.log(htmlString1)
                                        resolve(htmlString1);
                                    })
                                        .catch((err) => {
                                            console.log('error in topInsurance promise ');
                                            db.dbend();
                                            reject(err);
                                        });
                                    // resolve(createTable_output);
                                }).catch((err) => {
                                    console.log(err);
                                    console.log('err calSummaryTotal promise catch ')
                                    db.dbend();
                                    reject(err);
                                })
                            }).catch((err) => {
                                console.log('Error In createTable Promise');
                                db.dbend();
                                reject(err);
                            });
                        }).catch((err) => {
                            console.log('Error In jsonFunctionality Promise');
                            db.dbend();
                            reject(err);
                        });
                }
            }).catch((err) => {
                console.log('err', err);
                console.log('Error In executeQuery Promise');
                db.dbend();
                reject(err);
            });
        }
        catch (err) {
            console.log('Error In dailyReport Promise');
            console.log('error is===>', err);
            db.dbend();
            reject(err);
        }
    });
}
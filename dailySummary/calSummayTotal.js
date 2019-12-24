const db = require('../dbconnection');

const squery = require('./sqlquery');

module.exports.calSummaryTotal = function () {

  return  new Promise((resolve, reject) => {
        var rquery = squery.reportQuery();
        db.executeQuery(rquery.reportCalTotalquery).then((result) => {
            console.log('calSummaryTotal dbexecuteQuery result-->', result);
            resolve(result);
        }).catch((error) => {
            console.log(error);
            console.log('error in calSummaryTotal executeQuery');
            db.dbend();
            reject(error);
        })
    })
}
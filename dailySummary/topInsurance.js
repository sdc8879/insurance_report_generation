let db = require('../dbconnection');
var dateFormat = require('dateformat');
module.exports.topInsurance = function () {

    var htmlString = "";
    return new Promise((resolve, reject) => {

        var noOfPolicyQuery = "SELECT COUNT(`INSURANCE_TRANSACTIONS`.`TRANSACTION_ID`)AS NoOfpolicy " +
            "FROM `INSURANCE_TRANSACTIONS` " +
            "JOIN " +
            "`IP_PAYMENT_TRANSACTION` " +
            "ON IP_PAYMENT_TRANSACTION.`TRANSACTION_ID`=INSURANCE_TRANSACTIONS.TRANSACTION_ID " +
            "WHERE IP_PAYMENT_TRANSACTION.status=1";

        var daysQuery = "SELECT DATEDIFF(MAX(CREATED_TIME), MIN(CREATED_TIME)) AS totaldiff FROM IP_PAYMENT_TRANSACTION ";

        var toptenQuery = " SELECT (SELECT PARTNER_NAME FROM IP_PARTNER_MANAGEMENT WHERE IP_PID=T.Partner) AS partnername, " +
            "(SELECT POLICY_CATEGORY_TITLE FROM IP_POLICY_CATEGORY_MANAGEMENT WHERE IP_PCM=T.Category ) AS categoryname, " +
            "( SELECT IP_TITLE FROM IP_PRODUCTS  WHERE IP_ID=T.IP_ID ) AS policyname ,COUNT(*)AS policycount, SUM(T.GRAND_TOTAL_AMOUNT) AS gtaamount " +
            "FROM INSURANCE_TRANSACTIONS T GROUP BY  T.Category,T.Partner,policyname ORDER BY COUNT(*) DESC LIMIT 10 ;"

        var avg = 0;
        try {
            db.executeQuery(noOfPolicyQuery).then((result1) => {
                // console.log('result1---->', result1);

                db.executeQuery(daysQuery).then((result2) => {
                    // console.log('result1---->', result1[0].NoOfpolicy);
                    // console.log('result2---->', result2[0].totaldiff);

                    avg = (Number(result1[0].NoOfpolicy) / Number(result2[0].totaldiff)).toFixed(2);
                    // console.log('avg---', avg);
                    htmlString = "<br><br><h3 align='center'>No.of Insurance Sales Daily Avg:-" + avg + "</h3>";


                    db.executeQuery(toptenQuery).then((result3) => {
                        // console.log('result3---', result3);
                        var reportArray = Array.from(result3);

                        htmlString = htmlString + "<h3 align='center'>Top 10 Insurance of  "+getTillDate()+"</h3>";

                        var topInsu_Html = '';
                        var topInsu_head = "";
                        var topInsu_row = '';
                        topInsu_head = "<table style='width:60%'>" +
                            "<tr>" +
                            "<th>Partner</th>" +
                            "<th>Category</th>" +
                            "<th>Policy Name</th>" +
                            "<th>Order Count</th>" +
                            "<th>Amount</th>" +
                            "</tr>";

                        for (let i = 0; i < reportArray.length; i++) {
                            topInsu_row = topInsu_row +
                                "<tr>" +
                                "<td>" + reportArray[i].partnername + "</td>" +
                                "<td>" + reportArray[i].categoryname + "</td>" +
                                "<td>" + reportArray[i].policyname + "</td>" +
                                "<td>" + reportArray[i].policycount.toFixed(2) + "</td>" +
                                "<td>" + reportArray[i].gtaamount.toFixed(2) + "</td>" +
                                "<tr>";
                        }
                        topInsu_Html = topInsu_head + topInsu_row + "</table>";
                        return topInsu_Html;
                    }).then((topInsu_Html) => {
                        var finalString = htmlString + topInsu_Html;
                        // console.log('finalString---->', finalString);
                        resolve(finalString);
                    }).catch((err) => {
                        console.log('error in topInsurance executequery toptenQuery');
                        db.dbend();
                        reject(error);
                    });
                }).catch((err) => {
                    console.log('error in topInsurance executequery daysQuery');
                    db.dbend();
                    reject(error);
                });

            }).catch((err) => {
                console.log('error in topInsurance executequery noOfPolicyQuery');
                db.dbend();
                reject(error);
            });
        } catch (error) {
            console.log('error in topInsurance ');
            db.dbend();
            reject(error);
        }
    })
}
getTillDate=function(){
    var d=new Date();
    var yesterday=dateFormat(d.setDate(d.getDate() - 1), "dd-mmm-yyyy");
    console.log('yesterday-->',yesterday);
    return yesterday;
}
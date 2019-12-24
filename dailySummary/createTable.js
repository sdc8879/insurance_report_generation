var dateFormat = require('dateformat');
exports.createTable = function (result) {

    return new Promise(function (resolve, reject) {

        // console.log('dailyReport ---', result);

        try {


            var dailyReport_arr = [];
            dailyReport_arr = Array.from(result);
            // console.log('dailyReport_arr', dailyReport_arr);
            // resolve(dailyReport_arr);
            var catrow = 0;
            var str1 = '';
            var str2 = '';
            var str3 = '';
            var str4 = '';

            var str5 = '';
            var str6 = '';

            var str7 = '';
            var str8 = '';
            var str9 = '';
            var str10 = '';

            for (let i = 0; i < dailyReport_arr.length; i++) {


                var partnerrow = 0;
                for (let j = 0; j < dailyReport_arr[i].categoryname.length; j++) {
                    // console.log('partnerrow before-->', partnerrow);
                    partnerrow = partnerrow + dailyReport_arr[i].categoryname[j].policy.length;
                }
                // console.log('partnerrow', partnerrow);

                if (dailyReport_arr[i].categoryname.length == 1) {
                    catrow = partnerrow * 1;

                    if (partnerrow == 1 && catrow == 1) {
                        // str1 = ''
                        str1 = str1 + "<tr>" +
                            "<td rowspan='" + partnerrow + "'>" + dailyReport_arr[i].partnername + "</td>" +
                            "<td rowspan='" + catrow + "'>" + dailyReport_arr[i].categoryname[0].policy_cat_name + "</td>"

                        str1 = str1 + "<td>" + dailyReport_arr[i].categoryname[0].policy[0].policy_name + "</td>" +
                            "<td>" + dailyReport_arr[i].categoryname[0].policy[0].policy_count + "</td>" +
                            "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[0].policy_gta_amount).toFixed(2) + "</td>"
                        "<td>" + dailyReport_arr[i].categoryname[0].policy[0].policy_daily_count + "</td>" +
                            "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[0].gta_daily_amount).toFixed(2) + "</td>"
                            + "</tr>"

                        // console.log('str1-->', str1);

                    }

                    if (partnerrow == catrow && partnerrow != 1 && catrow != 1) {
                        // str21='';
                        str2 = str2 + "<tr>" +
                            "<td rowspan='" + partnerrow + "'>" + dailyReport_arr[i].partnername + "</td >" +
                            "<td rowspan='" + catrow + "'>" + dailyReport_arr[i].categoryname[0].policy_cat_name + "</td>" +
                            "<td>" + dailyReport_arr[i].categoryname[0].policy[0].policy_name + "</td>" +
                            "<td>" + dailyReport_arr[i].categoryname[0].policy[0].policy_count + "</td>" +
                            "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[0].policy_gta_amount).toFixed(2) + "</td>" +
                            "<td>" + dailyReport_arr[i].categoryname[0].policy[0].policy_daily_count + "</td>" +
                            "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[0].gta_daily_amount).toFixed(2) + "</td>" +
                            "</tr>"

                        for (let l = 1; l < dailyReport_arr[i].categoryname[0].policy.length; l++) {
                            str2 = str2 + "<tr><td>" + dailyReport_arr[i].categoryname[0].policy[l].policy_name + "</td>" +
                                "<td>" + dailyReport_arr[i].categoryname[0].policy[l].policy_count + "</td>" +
                                "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[l].policy_gta_amount).toFixed(2) + "</td>" +
                                "<td>" + dailyReport_arr[i].categoryname[0].policy[l].policy_daily_count + "</td>" +
                                "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[l].gta_daily_amount).toFixed(2) + "</td>" +
                                "</tr>";
                        }
                        // console.log('str2-->', str2);
                    }
                }
                if (dailyReport_arr[i].categoryname.length > 1) {

                    var str3 = '';

                    str3 = str3 + "<tr>" +
                        "<td rowspan='" + partnerrow + "'>" + dailyReport_arr[i].partnername + "</td >" +
                        "<td rowspan='" + dailyReport_arr[i].categoryname[0].policy.length + "'>" + dailyReport_arr[i].categoryname[0].policy_cat_name + "</td>" +
                        "<td>" + dailyReport_arr[i].categoryname[0].policy[0].policy_name + "</td>" +
                        "<td>" + dailyReport_arr[i].categoryname[0].policy[0].policy_count + "</td>" +
                        "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[0].policy_gta_amount).toFixed(2) + "</td>" +
                        "<td>" + dailyReport_arr[i].categoryname[0].policy[0].policy_daily_count + "</td>" +
                        "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[0].gta_daily_amount).toFixed(2) + "</td>" +
                        "</tr>"

                    // console.log('str31--', str31);

                    if (dailyReport_arr[i].categoryname[0].policy.length > 1) {


                        for (let m = 1; m < dailyReport_arr[i].categoryname[0].policy.length; m++) {
                            str3 = str3 + "<tr><td>" + dailyReport_arr[i].categoryname[0].policy[m].policy_name + "</td>" +
                                "<td>" + dailyReport_arr[i].categoryname[0].policy[m].policy_count + "</td>" +
                                "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[m].policy_gta_amount).toFixed(2) + "</td>" +
                                "<td>" + dailyReport_arr[i].categoryname[0].policy[m].policy_daily_count + "</td>" +
                                "<td>" + Number(dailyReport_arr[i].categoryname[0].policy[m].gta_daily_amount).toFixed(2) + "</td>" +
                                "</tr>";
                        }

                        // console.log('str31 1->', str31);

                        str41 = '';
                        for (let n = 1; n < dailyReport_arr[i].categoryname.length; n++) {

                            // console.log('$$$$$', a[i].categoryname[n]);


                            if (dailyReport_arr[i].categoryname[n].policy.length > 1) {

                                str4 = str4 + "<tr>" +
                                    "<td rowspan='" + dailyReport_arr[i].categoryname[n].policy.length + "'>" + dailyReport_arr[i].categoryname[n].policy_cat_name + "</td>" +
                                    "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_name + "</td>" +
                                    "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_count + "</td>" +
                                    "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[0].policy_gta_amount).toFixed(2) + "</td>" +
                                    "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_daily_count + "</td>" +
                                    "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[0].gta_daily_amount).toFixed(2) + "</td>" +
                                    "</tr>"

                                for (let q = 1; q < dailyReport_arr[i].categoryname[n].policy.length; q++) {
                                    str4 = str4 + "<tr><td>" + dailyReport_arr[i].categoryname[n].policy[q].policy_name + "</td>" +
                                        "<td>" + dailyReport_arr[i].categoryname[n].policy[q].policy_count + "</td>" +
                                        "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[q].policy_gta_amount).toFixed(2) + "</td>" +
                                        "<td>" + dailyReport_arr[i].categoryname[n].policy[q].policy_daily_count + "</td>" +
                                        "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[q].gta_daily_amount).toFixed(2) + "</td>" +
                                        "</tr>";
                                }

                                // console.log('str4', str4);
                            }
                            if (dailyReport_arr[i].categoryname[n].policy.length == 1) {
                                str4 = str4 + "<tr>" +
                                    "<td rowspan='" + dailyReport_arr[i].categoryname[n].policy.length + "'>" + dailyReport_arr[i].categoryname[n].policy_cat_name + "</td>"

                                str4 = str4 + "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_name + "</td>" +
                                    "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_count + "</td>" +
                                    "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[0].policy_gta_amount).toFixed(2) + "</td>" +
                                    "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_daily_count + "</td>" +
                                    "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[0].gta_daily_amount).toFixed(2) + "</td>" +
                                    + "</tr>";
                            }


                        }

                        // console.log('str3+str4---->', dailyReport_arr[i] + '----->' + str3 + str4);
                        str5 = str5 + str3 + str4;
                    }

                    if (dailyReport_arr[i].categoryname[0].policy.length == 1) {

                        // console.log('@@@@@$$$$$$$', str31);
                        str6 = '';
                        for (let n = 1; n < dailyReport_arr[i].categoryname.length; n++) {
                            // console.log('!!!!!!!!', dailyReport_arr[i].categoryname[n]);

                            if (dailyReport_arr[i].categoryname[n].policy.length > 1) {

                                // console.log('dailyReport_arr[i].categoryname[n].policy.length->',dailyReport_arr[i].categoryname[n].policy.length)
                                str6 = str6 + "<tr>" +
                                    "<td rowspan='" + dailyReport_arr[i].categoryname[n].policy.length + "'>" + dailyReport_arr[i].categoryname[n].policy_cat_name + "</td>" +
                                    "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_name + "</td>" +
                                    "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_count + "</td>" +
                                    "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[0].policy_gta_amount).toFixed(2) + "</td>" +
                                    "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_daily_count + "</td>" +
                                    "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[0].gta_daily_amount).toFixed(2) + "</td>" +
                                    "</tr>"
                                // console.log('nnnnnn----->',n+'aaaaa',str71);

                                for (let q = 1; q < dailyReport_arr[i].categoryname[n].policy.length; q++) {
                                    str6 = str6 + "<tr><td>" + dailyReport_arr[i].categoryname[n].policy[q].policy_name + "</td>" +
                                        "<td>" + dailyReport_arr[i].categoryname[n].policy[q].policy_count + "</td>" +
                                        "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[q].policy_gta_amount).toFixed(2) + "</td>" +
                                        "<td>" + dailyReport_arr[i].categoryname[n].policy[q].policy_daily_count + "</td>" +
                                        "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[q].gta_daily_amount).toFixed(2) + "</td>" +
                                        "</tr>";
                                }

                                // console.log('str31***str71---->', str31+str71);
                            }

                            if (dailyReport_arr[i].categoryname[n].policy.length == 1) {

                                // console.log('^^^^^------>', dailyReport_arr[i].categoryname[n].policy_cat_name);
                                // console.log('&&&&&------>', dailyReport_arr[i].categoryname[n].policy);

                                str6 = str6 + "<tr>" +
                                    "<td rowspan='" + dailyReport_arr[i].categoryname[n].policy.length + "'>" + dailyReport_arr[i].categoryname[n].policy_cat_name + "</td>"

                                str6 = str6 + "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_name + "</td>" +
                                    "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_count + "</td>" +
                                    "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[0].policy_gta_amount).toFixed(2) + "</td>"
                                "<td>" + dailyReport_arr[i].categoryname[n].policy[0].policy_daily_count + "</td>" +
                                    "<td>" + Number(dailyReport_arr[i].categoryname[n].policy[0].gta_daily_amount).toFixed(2) + "</td>"
                                    + "</tr>";
                            }

                        }
                        // console.log('str3---str6', dailyReport_arr[i] + '------>' + str3 + str6);
                        str7 = str7 + str3 + str6;
                    }

                }
                var str8 = str1 + str2 + str5 + str7;

            }


            var htmlHead = '';
            var htmlHead = "<h2>" + "</h2>" +
                "<table style='width:90%'> " +
                "<tr><th colspan='7'>Insurance Sales Summary Report</th></tr> " +
                "<tr>" +
                "<th colspan='3'></th>" +
                "<th colspan='2'>Till Date  " + getTillDate() + "</th>" +
                "<th colspan='2'>Yesterday's  " + getTillDate() + "</th>" +
                "<tr>" +
                "<th>Partner</th>" +
                "<th>Category</th>" +
                "<th>Policy Name</th>" +
                "<th>Order Count</th>" +
                "<th>Amount</th>" +
                "<th>Order Count</th>" +
                "<th>Amount</th>" +
                "</tr>" + str8;
            // "</tr>" + str8+"<tr><th colspan='3'>Insurance Sales Summary Report</th></tr> " 
            // "</tr>" + str8 + "</table>";

            resolve(htmlHead);
        } catch (error) {
            // console.log('error-->', error);
            reject(error);
        }

        // console.log('var 81===', str8);
    });
}

getTillDate = function () {
    var d = new Date();
    var yesterday = dateFormat(d.setDate(d.getDate() - 1), "dd-mmm-yyyy");
    console.log('yesterday-->', yesterday);
    return yesterday;
}
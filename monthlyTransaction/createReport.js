module.exports.Report = function (result, reportType) {
    return new Promise((resolve, reject) => {
        console.log('data -->', result);

        try {

            if (result.length > 0) {

                var data = [];

                data = Array.from(result);

                var reportHtml = "";
                var reportHead = '';
                var reportRow = '';
                reportHead = "<h3 align='center'>" + reportType + "</h3>" +
                    "<table style='width:100%'>" +
                    "<tr>" +
                    "<th>Member Name</th>" +
                    "<th>JP Number</th>" +
                    "<th>Date Of Birth</th>" +
                    "<th>Policy Details</th>" +
                    "<th>Premium Amount</th>" +
                    "<th>Order Amount</th>" +
                    "<th>PG Amount</th>" +
                    "<th>Policy Status</th>" +
                    "<th>Payment Status</th>" +
                    "<th>Date</th>" +
                    "</tr>";

                for (let i = 0; i < data.length; i++) {
                    reportRow = reportRow +
                        "<tr>" +
                        "<td>" + data[i].MEMBER_NAME + "</td>" +
                        "<td>" + data[i].JP_NUMBER + "</td>" +
                        "<td>" + data[i].MD_DATE_OF_BIRTH + "</td>" +
                        "<td>" + data[i].POLICY_DETAILS + "</td>" +
                        "<td>" + data[i].PREMIUM_AMOUNT + "</td>" +
                        "<td>" + data[i].ORDER_AMOUNT + "</td>" +
                        "<td>" + data[i].PG_AMOUNT + "</td>" +
                        "<td>" + data[i].POLICY_STATUS + "</td>" +
                        "<td>" + data[i].PAYMENT_STATUS + "</td>" +
                        "<td>" + data[i].DATE + "</td>" +
                        "<tr>";
                }
                reportHtml = reportHead + reportRow + "</table>";
                var htmlString = '';
                htmlString = "<html> " +
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
                    reportHtml +
                    "<br>" +
                    "</body>" +
                    "</html>"
                console.log('reportHtml---->', reportHtml);
                resolve(htmlString);
            } else {
                let reportHead = "<h3 align='center'>" + reportType + "</h3>";
                reportHtml = reportHead+"<br>NO RECORD FOUND";
                var htmlString = '';
                htmlString = "<html> " +
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
                    reportHtml +
                    "<br>" +
                    "</body>" +
                    "</html>"
                console.log('reportHtml---->', reportHtml);
                resolve(htmlString);

            }
        }
        catch (error) {
            console.log('error is===>', error);
            console.log('Report function')
            db.dbend();
            reject(error);
        }
    });
}
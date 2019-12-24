    module.exports.monthlyQuery = function () {
    var monthlyQueryString= `SELECT CONCAT(INSURANCE_TRANSACTIONS.MD_TITLE,' ',
    INSURANCE_TRANSACTIONS.MD_FNAME,' ',INSURANCE_TRANSACTIONS.MD_LNAME) AS MEMBER_NAME,
    INSURANCE_TRANSACTIONS.JP_NUMBER,
    DATE_FORMAT(INSURANCE_TRANSACTIONS.MD_DATE_OF_BIRTH,"%M %d %Y") AS MD_DATE_OF_BIRTH,
    INSURANCE_TRANSACTIONS.IP_ID,
    CONCAT((SELECT IP_PARTNER_MANAGEMENT.PARTNER_NAME FROM IP_PARTNER_MANAGEMENT WHERE IP_PARTNER_MANAGEMENT.IP_PID=INSURANCE_TRANSACTIONS.PARTNER),'-->',
    (SELECT IP_POLICY_CATEGORY_MANAGEMENT.POLICY_CATEGORY_TITLE FROM  IP_POLICY_CATEGORY_MANAGEMENT WHERE IP_POLICY_CATEGORY_MANAGEMENT.IP_PCM=INSURANCE_TRANSACTIONS.CATEGORY),'-->',
    (SELECT IP_PRODUCTS.IP_TITLE FROM IP_PRODUCTS WHERE IP_ID=INSURANCE_TRANSACTIONS.IP_ID ))AS POLICY_DETAILS,
    INSURANCE_TRANSACTIONS.PREMIUM_AMOUNT,
    IP_PAYMENT_TRANSACTION.ORDER_AMOUNT,
    IFNULL(IP_PAYMENT_TRANSACTION.AMOUNT_FROMPG,0) AS PG_AMOUNT,
    (CASE WHEN INSURANCE_TRANSACTIONS.POLICY_STATUS=1 THEN 'Pushed'
    WHEN INSURANCE_TRANSACTIONS.POLICY_STATUS=0 THEN 'Not Pushed'
    END)AS POLICY_STATUS,
    (CASE WHEN IP_PAYMENT_TRANSACTION.PAYMENT_STATUS=1 THEN 'Success'
    WHEN IP_PAYMENT_TRANSACTION.PAYMENT_STATUS=2 THEN 'Failed'
    WHEN IP_PAYMENT_TRANSACTION.PAYMENT_STATUS=0 THEN 'Pending'
    END)AS PAYMENT_STATUS,
    DATE_FORMAT(INSURANCE_TRANSACTIONS.CREATED_TIME,"%M %d %Y") AS DATE

    FROM INSURANCE_TRANSACTIONS
    JOIN IP_PRODUCTS ON
    IP_PRODUCTS.IP_ID=INSURANCE_TRANSACTIONS.IP_ID
    JOIN IP_PAYMENT_TRANSACTION ON
    IP_PAYMENT_TRANSACTION.TRANSACTION_ID=INSURANCE_TRANSACTIONS.TRANSACTION_ID
    WHERE INSURANCE_TRANSACTIONS.CREATED_TIME BETWEEN (CURRENT_DATE() - INTERVAL 1 MONTH) AND CURRENT_DATE()
    ORDER BY INSURANCE_TRANSACTIONS.CREATED_TIME DESC;`;

    return {
        "monthlyQueryString":monthlyQueryString
    };
}
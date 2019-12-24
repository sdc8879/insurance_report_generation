
module.exports.reportQuery = function () {




    // var reportquery1 = "SELECT A.PARTNER_NAME AS partner_name,A.CATEGORY_NAME AS policycategory,A.POLICY_TITLE AS policy_title ,A.COUNTS AS policy_count ,A.TOTAL AS gta_amount,D.COUNTS AS policy_daily_count,D.TOTAL AS gta_daily_amount " +
    //     "FROM (SELECT (SELECT PARTNER_NAME FROM IP_PARTNER_MANAGEMENT WHERE IP_PID=T.Partner) AS PARTNER_NAME, " +
    //     " (SELECT POLICY_CATEGORY_TITLE FROM IP_POLICY_CATEGORY_MANAGEMENT WHERE IP_PCM=T.Category ) AS CATEGORY_NAME, " +
    //     " ( SELECT IP_TITLE FROM IP_PRODUCTS  WHERE IP_ID=T.IP_ID ) AS POLICY_TITLE , " +
    //     "COUNT(*)AS COUNTS, SUM(T.GRAND_TOTAL_AMOUNT) AS TOTAL " +
    //     "FROM INSURANCE_TRANSACTIONS T " +
    //     "WHERE CREATED_TIME < CURDATE() - 1 " +
    //     "GROUP BY  T.Category, T.Partner, POLICY_TITLE " +
    //     "ORDER BY COUNT(*) DESC " +
    //     " ) A "+
    // "LEFT JOIN " +
    //     "(SELECT(SELECT PARTNER_NAME FROM IP_PARTNER_MANAGEMENT WHERE IP_PID = T.Partner) AS PARTNER_NAME, " +
    //     "(SELECT POLICY_CATEGORY_TITLE FROM IP_POLICY_CATEGORY_MANAGEMENT WHERE IP_PCM = T.Category) AS CATEGORY_NAME, " +
    //     "(SELECT IP_TITLE FROM IP_PRODUCTS  WHERE IP_ID = T.IP_ID ) AS POLICY_TITLE, " +
    //     "COUNT(*)AS COUNTS, SUM(T.GRAND_TOTAL_AMOUNT) AS TOTAL " +
    //     "FROM INSURANCE_TRANSACTIONS T " +
    //     "WHERE CREATED_TIME  BETWEEN CURDATE() - 1 AND CURDATE() " +
    //     "GROUP BY  T.Category, T.Partner, POLICY_TITLE, T.IP_ID " +
    //     "ORDER BY COUNT(*) DESC " +
    //     " ) D ON A.POLICY_TITLE = D.POLICY_TITLE ;"


    var reportquery1 = `SELECT A.PARTNER_NAME AS partner_name,A.CATEGORY_NAME AS policycategory,A.POLICY_TITLE AS policy_title ,IFNULL(A.COUNTS,0) AS policy_count ,IFNULL(A.TOTAL,0) AS gta_amount,IFNULL(D.COUNTS,0) AS policy_daily_count,IFNULL(D.TOTAL,0) AS gta_daily_amount
    FROM (
    
     SELECT (SELECT PARTNER_NAME FROM IP_PARTNER_MANAGEMENT WHERE IP_PID=T.Partner) AS PARTNER_NAME,
   (SELECT POLICY_CATEGORY_TITLE FROM IP_POLICY_CATEGORY_MANAGEMENT WHERE IP_PCM=T.Category ) AS CATEGORY_NAME,
   ( SELECT IP_TITLE FROM IP_PRODUCTS  WHERE IP_ID=T.IP_ID ) AS POLICY_TITLE ,
   COUNT(*)AS COUNTS, SUM(T.GRAND_TOTAL_AMOUNT) AS TOTAL 
   FROM INSURANCE_TRANSACTIONS T INNER JOIN IP_PAYMENT_TRANSACTION IPT  ON T.TRANSACTION_ID=IPT.TRANSACTION_ID
    WHERE(T.CREATED_TIME < CURDATE()) AND IPT.PAYMENT_STATUS=1
    GROUP BY  T.Category,T.Partner,POLICY_TITLE -- ,T.IP_ID 
    ORDER BY COUNT(*) DESC
    ) A
     LEFT JOIN 
     (
         SELECT (SELECT PARTNER_NAME FROM IP_PARTNER_MANAGEMENT WHERE IP_PID=T.Partner) AS PARTNER_NAME,
   (SELECT POLICY_CATEGORY_TITLE FROM IP_POLICY_CATEGORY_MANAGEMENT WHERE IP_PCM=T.Category ) AS CATEGORY_NAME,
   ( SELECT IP_TITLE FROM IP_PRODUCTS  WHERE IP_ID=T.IP_ID ) AS POLICY_TITLE ,
   COUNT(*)AS COUNTS, SUM(T.GRAND_TOTAL_AMOUNT) AS TOTAL 
   FROM INSURANCE_TRANSACTIONS T INNER JOIN IP_PAYMENT_TRANSACTION IPT  ON T.TRANSACTION_ID=IPT.TRANSACTION_ID
    WHERE T.CREATED_TIME  BETWEEN CURDATE()-1 AND CURDATE() AND IPT.PAYMENT_STATUS=1
    GROUP BY  T.Category,T.Partner,POLICY_TITLE,T.IP_ID  
    ORDER BY COUNT(*) DESC  
     ) D ON A.POLICY_TITLE=D.POLICY_TITLE`;

     var reportCalTotalquery=`SELECT SUM(abc.policy_count)      AS total_policy_count, 
     SUM(abc.gta_amount)        AS total_gta_amount, 
     SUM(abc.policy_daily_count)AS total_policy_daily_count, 
     SUM(abc.gta_daily_amount)  AS total_gta_daily_amount 
FROM  (SELECT A.partner_name      AS partner_name, 
            A.category_name     AS policycategory, 
            A.policy_title      AS policy_title, 
            IFNULL(A.counts, 0) AS policy_count, 
            IFNULL(A.total, 0)  AS gta_amount, 
            IFNULL(D.counts, 0) AS policy_daily_count, 
            IFNULL(D.total, 0)  AS gta_daily_amount 
     FROM   (SELECT (SELECT PARTNER_NAME 
                     FROM   IP_PARTNER_MANAGEMENT 
                     WHERE  IP_PID = T.PARTNER)  AS PARTNER_NAME, 
                    (SELECT POLICY_CATEGORY_TITLE 
                     FROM   IP_POLICY_CATEGORY_MANAGEMENT 
                     WHERE  IP_PCM = T.CATEGORY) AS CATEGORY_NAME, 
                    (SELECT IP_TITLE 
                     FROM   IP_PRODUCTS 
                     WHERE  IP_ID = T.IP_ID)     AS POLICY_TITLE, 
                    COUNT(*)                     AS COUNTS, 
                    SUM(T.GRAND_TOTAL_AMOUNT)    AS TOTAL 
             FROM   INSURANCE_TRANSACTIONS T 
             WHERE  CREATED_TIME < CURDATE() - 1 
             GROUP  BY T.CATEGORY, 
                       T.PARTNER, 
                       policy_title -- ,T.IP_ID  
             ORDER  BY COUNT(*) DESC) A 
            LEFT JOIN (SELECT (SELECT PARTNER_NAME 
                               FROM   IP_PARTNER_MANAGEMENT 
                               WHERE  IP_PID = T.PARTNER)  AS PARTNER_NAME, 
                              (SELECT POLICY_CATEGORY_TITLE 
                               FROM   IP_POLICY_CATEGORY_MANAGEMENT 
                               WHERE  IP_PCM = T.CATEGORY) AS CATEGORY_NAME, 
                              (SELECT IP_TITLE 
                               FROM   IP_PRODUCTS 
                               WHERE  IP_ID = T.IP_ID)     AS POLICY_TITLE, 
                              COUNT(*)                     AS COUNTS, 
                              SUM(T.grand_total_amount)    AS TOTAL 
                       FROM   INSURANCE_TRANSACTIONS T 
                       WHERE  CREATED_TIME BETWEEN CURDATE() - 1 AND CURDATE() 
                       GROUP  BY T.CATEGORY, 
                                 T.PARTNER, 
                                 policy_title, 
                                 T.IP_ID 
                       ORDER  BY COUNT(*) DESC) D 
                   ON A.policy_title = D.policy_title)abc`
    return {
        "reportquery1": reportquery1,
        "reportCalTotalquery":reportCalTotalquery
    };
}


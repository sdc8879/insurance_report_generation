
var mysql = require('mysql');
var config = require('./config');


var connection = mysql.createConnection({
    host: config.mysqlconnection.host,
    user: config.mysqlconnection.user,
    password: config.mysqlconnection.password,
    database: config.mysqlconnection.database
});

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('connected');
    }
});

exports.executeQuery = function (query) {

    console.log('query---',query);

    
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, rows) {
            if (err) {
                reject(err);
            };

            resolve(rows);
        });
    });
}
exports.dbend=function(){
 connection.end();   
}
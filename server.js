const express = require('express');
const app = express();
const report = require('./reportcontroller')

app.get('/', (req, res) => {
    // res.send('Hello World!!!!')
    // report.generateReport().then((result) => {
    //     console.log('result--->',result);
    //     res.send(result);
    // }).catch((error) => {
    //     console.log('error--->',error);
    // });

});

app.listen(3000, () => {
    console.log('listening on port 3000!');
    report.generateReport().then((result) => {
        console.log('result--->',result);
    }).catch((error) => {
        console.log('error--->',error);
    });

});


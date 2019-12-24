var nodemailer = require('nodemailer');
var config = require('./config')
module.exports.sendEmail = function (htmlString,subjectLine) {


    return new Promise((resolve, reject) => {
        /*NODEMAILER............... */

        console.log('htmlString--->', htmlString);
        try {
            const transporter = nodemailer.createTransport({
                host: config.smtp.host, // hostname
                port: config.smtp.port, // secure:true for port 465, secure:false for port 587
                // secure: true, // port for secure SMTP
                auth: {
                    user: config.smtp.auth.user,
                    pass: config.smtp.auth.pass
                }
            });
            var mailOptions = {
                from: config.smtp.mailOptions.from,
                to: config.smtp.mailOptions.to,
                // rajesh.kurkute@vernost.in',
                subject:subjectLine,
                // text: 'Daily Report',
                html: htmlString
            };


            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject(error)
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(info);
                }
            });
        }
        catch (error) {
            console.log('error is--', error);
            console.log('error in sendEmail try ')
        }
    });

}
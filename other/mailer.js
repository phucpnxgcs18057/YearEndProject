const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dummytestphucer@gmail.com',
        pass: 'Cooljoez123',
    }
});

let mailOptions = {
    from: '',
    to: 'dummytestphucer@gmail.com',
    subject: '',
    text: '',
};

transporter.sendMail(mailOptions, function(err, data){
    if(err){
        console.log('Error Occurs!')
    } else {
        console.log('Email Sent!')
    }
});
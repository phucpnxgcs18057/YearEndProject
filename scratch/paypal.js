var express = require('express');
var request = require('request');
var Router = express.Router();
// Add your credentials:
// Add your client ID and secret
var CLIENT =
    'AfJxopT7DHUA7X_oL0y1Wqu0frHKgIbU5cjHLBDzDpIU8npO-gkRGtm8pA6Mu0DpOBmv4jT_t_Qjdj1O';
var SECRET =
    'ECz95_R97Qwy0JRX1r2fuSPl3fGFKnQKKz1qPSjoBZEjJYMBiJv-Re6eDXOTh6BaSvmOMXpmoiGInbtb';
var PAYPAL_API = 'https://api-m.sandbox.paypal.com';

Router
    // Set up the payment:
    // 1. Set up a URL to handle requests from the PayPal button
    .post('/my-api/create-payment/', function (req, res) {
        // 2. Call /v1/payments/payment to set up the payment
        const amount = req.query.amount;
        request.post(PAYPAL_API + '/v1/payments/payment',
            {
                auth:
                {
                    user: CLIENT,
                    pass: SECRET
                },
                body:
                {
                    intent: 'sale',
                    payer:
                    {
                        payment_method: 'paypal'
                    },
                    transactions: [
                        {
                            amount:
                            {
                                total: amount,
                                currency: 'USD'
                            }
                        }],
                    redirect_urls:
                    {
                        return_url: 'http://localhost:3000',
                        cancel_url: 'http://localhost:3000'
                    }
                },
                json: true
            }, function (err, response) {
                if (err) {
                    console.error(err);
                    return res.sendStatus(500);
                }
                // 3. Return the payment ID to the client
                res.json(
                    {
                        id: response.body.id
                    });
            });
    })
    // Execute the payment:
    // 1. Set up a URL to handle requests from the PayPal button.
    .post('/my-api/execute-payment/', function (req, res) {
        // 2. Get the payment ID and the payer ID from the request body.
        var paymentID = req.body.paymentID;
        var payerID = req.body.payerID;
        var amount = req.body.amount;
        // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
        request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
            '/execute',
            {
                auth:
                {
                    user: CLIENT,
                    pass: SECRET
                },
                body:
                {
                    payer_id: payerID,
                    transactions: [
                        {
                            amount:
                            {
                                total: amount,
                                currency: 'USD'
                            }
                        }]
                },
                json: true
            },
            function (err, response) {
                if (err) {
                    console.error(err);
                    return res.sendStatus(500);
                }
                // 4. Return a success response to the client
                res.json(
                    {
                        status: 'success'
                    });
            });
    })
// Run `node ./server.js` in your terminal

module.exports = Router;
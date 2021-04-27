const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var {connectDB} = require("./other/database");
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require("./other/passport");
const payPalRouter = require("./scratch/paypal");
connectDB();

// const dotenv = require('dotenv');
// dotenv.config({ path: path.join(__dirname, 'other', "config.env") });

//importing routes
const resourceRoutes = require('./routes/resource');
const userTypeRoutes = require('./routes/userType');
const userRoutes = require('./routes/user');
const depRoutes = require('./routes/department');
const libraryRoutes = require('./routes/library');
// const donationRoutes = require('./routes/donation');
const clientRoutes = require('./routes/client');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');
app.set('views',
    [__dirname + '/views/admin',
    // __dirname + '/views/mod',
    // __dirname + '/views/student',
    // __dirname + '/views/tutor',
    // __dirname + '/views/dashboard/partials/question',
    __dirname + '/views/frontend',
    ]
);

// middleware & static files
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/images'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: "process.env.SESS_SECRET",
    resave: false,
    saveUninitialized: true,
    maxAge: 3600 * 1000,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());


//routing

//client routes
app.use('/', clientRoutes);

//paypal routes
app.use('/paypal', payPalRouter);

//resource routes
app.use('/resources', resourceRoutes);

//user routes
app.use('/users', userRoutes);

//user type routes
app.use('/user-types', userTypeRoutes);

//department routes
app.use('/departments', depRoutes);

//library routes
app.use('/library', libraryRoutes);

// //donation routes
// app.use('/donations', donationRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404');
});

module.exports = app;
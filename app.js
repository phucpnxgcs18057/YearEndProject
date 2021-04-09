const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const resourceRoutes = require('./api/routes/resource');
const typeRoutes = require('./api/routes/usertype');
const userRoutes = require('./api/routes/user');


//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://admin:test123456@projectcluster.g4aec.mongodb.net/project?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
app.set('views',
    [__dirname + '/views/dashboard/admin',
    __dirname + '/views/dashboard/mod',
    __dirname + '/views/dashboard/student',
    __dirname + '/views/dashboard/tutor',
    __dirname + '/views/dashboard/partials/resource',
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/courses-single', (req, res) => {
    res.render('courses-single');
});

app.get('/forget', (req, res) => {
    res.render('forget');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/demo', (req, res) => {
    res.render('resources');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

//resource routes
app.use('/resources', resourceRoutes);

//user routes
app.use('/users', userRoutes);

//user type routes
app.use('/types', typeRoutes);

//question routes
app.get('/questions', (req, res) => {
    res.render('create');
})

//404 page
app.use((req, res) => {
    res.status(404).render('404');
});

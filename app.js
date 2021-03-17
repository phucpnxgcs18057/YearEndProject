const express = require('express');
const path = require('path');
//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/public', express.static('public'));

//listen for requests
app.listen(3000);

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

app.get('/resources', (req, res) => {
    res.render('resources');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

//404 page
app.use((req, res) => {
    res.status(404).render('404');
});

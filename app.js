const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const Resource = require('./models/resource');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://admin:test123456@projectcluster.g4aec.mongodb.net/project?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
app.set('views', 
    [   __dirname + '/views/dashboard/admin',  
        __dirname + '/views/dashboard/mod',
        __dirname + '/views/dashboard/student',
        __dirname + '/views/dashboard/tutor',
        __dirname + '/views/frontend',
    ]
);


// middleware & static files
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

//mongoose and mongo sandbox routes
app.get('/add-resource', (req,res) => {
    const resource = new Resource({
        ResourceName: 'Test Resource 2',
        ResourceContent: 'This is the content of the test resource!',
        ResourceType: 'Document'
    });

    resource.save()
     .then((result) => {
        res.send(result)
     })
     .catch((err) => {
         console.log(err);
     });
});

app.get('/all-resources', (req,res) => {
    Resource.find()
     .then((result) => {
         res.send(result);
     })
     .catch((err) => {
        console.log(err);
    });
})

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

app.get('/admin', (req, res) => {
    res.render('createuser');
});

app.get('/admin-1', (req, res) => {
    res.render('viewdonation');
});

app.get('/student', (req, res) => {
    res.render('studentindex');
});

//404 page
app.use((req, res) => {
    res.status(404).render('404');
});

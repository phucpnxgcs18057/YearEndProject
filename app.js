const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//importing routes
const resourceRoutes = require('./api/routes/resource');
const typeRoutes = require('./api/routes/usertype');
const userRoutes = require('./api/routes/user');
const schoolRoutes = require('./api/routes/school');
const stypeRoutes = require('./api/routes/schooltype');
const depRoutes = require('./api/routes/department');
const courseRoutes = require('./api/routes/course');


const Resource = require("./api/models/resource");


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
    .then((result) => {
        console.log("Server is now running on port 3000");
        app.listen(3000)
    })
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
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));

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

//school type routes
app.use('/school-types', stypeRoutes);


//school routes
app.use('/schools', schoolRoutes);

//department routes
app.use('/departments', depRoutes);

//course routes
app.use('/courses', courseRoutes);

//resource routes
app.get('/resources/view', async (req, res) => {
    const resources = await Resource.find();
    res.render('view', { resources });
});
app.get('/resources/create', (req, res) => {
    res.render('create');
});
app.get('/resources/edit', async (req, res) => {
    const id = req.query.resourceId;
    const resource = await Resource.findById(id);
    res.render('edit', { resourceID: id, resource });
});

app.get('/resources/detail', async (req, res) => {
    const id = req.query.resourceId;
    const resource = await Resource.findById(id);
    res.render('detail', { resource });
});

//404 page
app.use((req, res) => {
    res.status(404).render('404');
});

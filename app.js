const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const Resource = require('./api/models/resource');
// const Type = require('./models/usertype');
// const Department = require('./models/department');
// const School = require('./models/school');
// const Course = require('./models/course');
// const uCourse = require('./models/ucourse');
// const Question = require('./models/question');


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
    [__dirname + '/views/dashboard/admin',
    __dirname + '/views/dashboard/mod',
    __dirname + '/views/dashboard/student',
    __dirname + '/views/dashboard/tutor',
    __dirname + '/views/dashboard/partials/resource',
    __dirname + '/views/frontend',
    ]
);

//Define storage for the images and document files
// // Document files
// const storage_file = multer.diskStorage({
//     //File destination
//     destination: function (req, file, cb) {
//         cb(null, '/public/uploads/files')
//     },

//     //Add back extension
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });

// //Upload parameters for multer
// const upload_file = multer({
//     storage: storage_file,
//     limits: {
//         fieldSize: 1024 * 1024 * 100,
//     }
// });

// //For image files
// const storage_image = multer.diskStorage({
//     //File destination
//     destination: (req, file, cb) => {
//         cb(null, '/public/uploads/images')
//     },

//     //Add back extension
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + file.originalname);
//     }
// });

// //Upload parameters for multer
// const upload_image = multer({
//     storage: storage_image,
//     limits: {
//         fieldSize: 1024 * 1024 * 10,
//     }
// });

// middleware & static files
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use(express.urlencoded({ extended: true }))

//mongoose and mongo sandbox routes
app.post('/add-school', (req, res) => {


    const resource = new Resource(req.body);

    resource.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-schools', (req, res) => {
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

app.get('/1', (req, res) => {
    res.render('create');
});

//404 page
app.use((req, res) => {
    res.status(404).render('404');
});

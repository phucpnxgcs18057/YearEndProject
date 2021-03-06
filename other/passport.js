const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const UserType = require('../models/usertype');
const { compare } = require("./bcrypt");

passport.serializeUser(function (user, done) {
   return done(null, user.id);
});

passport.deserializeUser( async function (id, done) {
    return await User.findById(id, function (err, user) {
    return done(err, user);
    })
        .populate("type")
        .exec()
        ;
});

passport.use(new LocalStrategy({
    usernameField: 'user_email',
    passwordField: 'user_password',
    passReqToCallback: true
},
    async function (req, user_email, user_password, done) {
        try {
            console.log({ user_email, user_password });

            const existedUser = await User.findOne({
                user_email
            })
            .populate("type")
            .exec()
            ;

            if (!compare(user_password, existedUser.user_password)) {
                console.log("Wrong password")
                return done(null, false)
            }

            if (existedUser) {
                return done(null, existedUser)
            } else {
                return done(null, false)
            }

        } catch (error) {
            console.log(error);
            return done(error, null)
        }
    }
));
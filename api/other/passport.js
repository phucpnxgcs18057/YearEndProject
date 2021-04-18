const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
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
            });

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
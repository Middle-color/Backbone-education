var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-registration', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        User.findOne({'local.email':  email}, function(err, user) {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, false, {message: 'Email `' + email + '` is already taken.'});
            } else {
                var newUser            = new User();
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser, {message: 'Email `' + email + '` registration succeess!'});
                });
            }
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        User.findOne({'local.email': email}, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: 'No user with email `' + email + '` found'});
            }

            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Oops! Wrong password'});
            }

            return done(null, user, {message: 'Authentication Succeeded'});
        });
    }));
};
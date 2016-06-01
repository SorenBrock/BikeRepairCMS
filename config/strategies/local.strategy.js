var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userCtrl = require('../../controllers/user.server.controller');

var LocalStrategyModule = function () {

    passport.use('local-admin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {

        userCtrl.findOneUser(username, function (errorMessage, user) {
            if (errorMessage) {
                return done(null, false, {
                    message: errorMessage
                });
            }

            if (user.password !== password) {
                return done(null, false, {
                    message: 'bad password'
                });
            }

            return done(null, user);
        });
    }));
};

module.exports = LocalStrategyModule;
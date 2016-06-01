var express = require('express');
var passport = require('passport');
var authRouter = express.Router();
var userCtrl = require('../controllers/user.local.controller');

var router = function () {

    authRouter.post('/registrer', function (req, res, next) {
        var user = req.body;
        userCtrl.createUser(user, function (err, user, info) {
            req.login(user, function (err) {
                if (!err) {
                    res.redirect('/profile');
                } else {
                    res.redirect('/login');
                }
            });
        });
    });

    authRouter.post('/signIn', function (req, res, next) {
        passport.authenticate('local-admin', function (err, user, info) {
            if (!user) {
                return res.render('login', {
                    message: info.message
                });
            }
            req.logIn(user, function () {
                return res.redirect('/profile/');
            });
        })(req, res, next);
    });

    authRouter.get('/signOut', function (req, res) {
        req.session.destroy();
        req.logout();
        res.redirect('/');
    });

    return authRouter;
};

module.exports = router;
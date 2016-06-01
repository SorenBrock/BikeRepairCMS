(function () {
    'use strict';

    var passport = require('passport');
    var mongoose = require('mongoose');
    var User = require('../models/user.server.model');

    var sendJSONresponse = function (res, status, content) {
        res.status(200);
        res.json({
            status: status,
            data: content
        });
    };

    exports.checkToken = function (req, res) {
        sendJSONresponse(res, 200, {
            message: 'token found'
        });
    };

    //Method for token login for admin-site
    exports.login = function (req, res) {
        if (!req.body.username || !req.body.password) {
            sendJSONresponse(res, 400, {
                message: 'All fields required'
            });
            return;
        }
        passport.authenticate('local-admin', function (err, user, info) {
            var token;
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }

            if (user) {
                if (user.isAdmin === null || user.isAdmin === false) {
                    sendJSONresponse(res, 400, {
                        message: 'Denied access: User is not Admin'
                    });
                } else {
                    token = user.generateJwt();
                    sendJSONresponse(res, 200, {
                        token: token
                    });
                }
            } else {
                sendJSONresponse(res, 401, info);
            }
        })(req, res);
    };

})();
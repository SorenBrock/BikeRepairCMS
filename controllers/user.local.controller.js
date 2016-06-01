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

    exports.createUser = function (user, done) {
        var entry = new User({});
        for (var prop in user) {
            if (user[prop] != null) {
                entry[prop] = user[prop];
            }
        }
        entry.save();
        done(null, entry, false);
    };

    exports.getUserById = function (req, res) {
        var userid = req.params.id;
        var query = User.findOne({
            '_id': userid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, result);
            }
        });
    };

    exports.updateUser = function (req, res) {
        var userid = req.params.id;
        var user = req.body;
        var query = User.findOne({
            '_id': userid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            //Updating the user
            for (var prop in user) {
                if (user[prop] != null) {
                    result[prop] = user[prop];
                }
            }
            result.save();
            sendJSONresponse(res, 200, {
                message: 'user updated'
            });

        });
    };

    exports.findOneUser = function (username, done) {
        var query = User.findOne({
            'username': username
        });
        query.exec(function (err, result) {
            if (err || !result) {
                done('User not found', null);
            } else {
                done(null, result);
            }
        });
    };

})();
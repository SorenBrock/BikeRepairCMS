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

    exports.createUser = function (req, res) {
        var user = req.body;
        var entry = new User({});
        for (var prop in user) {
            if (user[prop] != null) {
                entry[prop] = user[prop];
            }
        }
        entry.save();
        sendJSONresponse(res, 200, {
            message: 'user created'
        });
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

    exports.deleteUserById = function (req, res) {
        var userid = req.params.id;

        var queryIsMaster = User.findOne({
            '_id': userid
        }, {
            _id: 0,
            isMaster: 1
        });

        //Check if user is a masteruser
        queryIsMaster
            .exec(function (err, result) {
                if (result.isMaster != null && result.isMaster) {
                    sendJSONresponse(res, 400, {
                        message: 'Cannot delete a MasterUser'
                    });
                } else {

                    // Remove user
                    var query = User.remove({
                        '_id': userid
                    });
                    query.exec(function (err, result) {
                        if (err) {
                            sendJSONresponse(res, 404, err);
                        } else {
                            sendJSONresponse(res, 200, {
                                message: 'user deleted'
                            });
                        }
                    });
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

    exports.findUsers = function (req, res) {
        var query = User.find();
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, result);
            }
        });
    };

})();
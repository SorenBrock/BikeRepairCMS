(function () {
    'use strict';

    var mongoose = require('mongoose');
    var Content = require('../models/content.server.model');

    var sendJSONresponse = function (res, status, content) {
        res.status(200);
        res.json({
            status: status,
            data: content
        });
    };

    exports.createContent = function (req, res) {
        var content = req.body;
        var entry = new Content({});
        for (var prop in content) {
            if (content[prop] != null) {
                entry[prop] = content[prop];
            }
        }
        entry.save();
        sendJSONresponse(res, 200, {
            message: 'Content created'
        });
    };

    exports.getContentById = function (req, res) {
        var contentid = req.params.id;
        var query = Content.findOne({
                '_id': contentid
            })
            .populate('category', 'name')
            .populate('tags')
            .exec(function (err, result) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                } else {
                    sendJSONresponse(res, 200, result);
                }
            });
    };

    exports.deleteContentById = function (req, res) {
        var contentid = req.params.id;
        var query = Content.remove({
            '_id': contentid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, {
                    message: 'Content deleted'
                });
            }
        });
    };

    exports.updateContent = function (req, res) {
        var contentid = req.params.id;
        var content = req.body;
        var query = Content.findOne({
            '_id': contentid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            //Updating the content
            for (var prop in content) {
                if (content[prop] != null) {
                    result[prop] = content[prop];
                }
            }
            result.save();
            sendJSONresponse(res, 200, {
                message: 'content updated'
            });

        });
    };

    exports.findContent = function (req, res) {
        var query = Content.find()
            .populate('category')
            .exec(function (err, result) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                } else {
                    sendJSONresponse(res, 200, result);
                }
            });
    };

})();
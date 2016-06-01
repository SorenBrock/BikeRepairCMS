(function () {
    'use strict';

    var mongoose = require('mongoose');
    var Tag = require('../models/tag.server.model');

    var sendJSONresponse = function (res, status, content) {
        res.status(200);
        res.json({
            status: status,
            data: content
        });
    };

    exports.createTag = function (req, res) {
        var tag = req.body;
        var entry = new Tag({});
        for (var prop in tag) {
            if (tag[prop] != null) {
                entry[prop] = tag[prop];
            }
        }
        entry.save();
        sendJSONresponse(res, 200, {
            message: 'Tag created'
        });
    };

    exports.getTagById = function (req, res) {
        var tagid = req.params.id;
        var query = Tag.findOne({
            '_id': tagid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, result);
            }
        });
    };

    exports.deleteTagById = function (req, res) {
        var tagid = req.params.id;
        var query = Tag.remove({
            '_id': tagid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, {
                    message: 'Tag deleted'
                });
            }
        });
    };

    exports.updateTag = function (req, res) {
        var tagid = req.params.id;
        var tag = req.body;
        var query = Tag.findOne({
            '_id': tagid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            //Updating the tag
            for (var prop in tag) {
                if (tag[prop] != null) {
                    result[prop] = tag[prop];
                }
            }
            result.save();
            sendJSONresponse(res, 200, {
                message: 'tag updated'
            });

        });
    };

    exports.findTags = function (req, res) {
        var query = Tag.find();
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, result);
            }
        });
    };

})();
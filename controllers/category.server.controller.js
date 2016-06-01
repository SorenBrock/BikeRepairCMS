(function () {
    'use strict';

    var mongoose = require('mongoose');
    var Category = require('../models/category.server.model');

    var sendJSONresponse = function (res, status, content) {
        res.status(200);
        res.json({
            status: status,
            data: content
        });
    };

    exports.createCategory = function (req, res) {
        var category = req.body;
        var entry = new Category({});
        for (var prop in category) {
            if (category[prop] != null) {
                entry[prop] = category[prop];
            }
        }
        entry.save();
        sendJSONresponse(res, 200, {
            message: 'Category created'
        });
    };

    exports.getCategoryById = function (req, res) {
        var categoryid = req.params.id;
        var query = Category.findOne({
            '_id': categoryid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, result);
            }
        });
    };

    exports.deleteCategoryById = function (req, res) {
        var categoryid = req.params.id;
        var query = Category.remove({
            '_id': categoryid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, {
                    message: 'Category deleted'
                });
            }
        });
    };

    exports.updateCategory = function (req, res) {
        var categoryid = req.params.id;
        var category = req.body;
        var query = Category.findOne({
            '_id': categoryid
        });
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            //Updating the category
            for (var prop in category) {
                if (category[prop] != null) {
                    result[prop] = category[prop];
                }
            }
            result.save();
            sendJSONresponse(res, 200, {
                message: 'category updated'
            });

        });
    };

    exports.findCategories = function (req, res) {
        var query = Category.find();
        query.exec(function (err, result) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, result);
            }
        });
    };

})();
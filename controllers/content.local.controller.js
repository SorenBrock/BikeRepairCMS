(function () {
    'use strict';

    var async = require('async');
    var mongoose = require('mongoose');
    var Content = require('../models/content.server.model');
    var Category = require('../models/category.server.model');
    var Tag = require('../models/tag.server.model');

    exports.findContent = function (callback) {
        Content.find()
            .populate('category')
            .populate('tags')
            .exec(callback);
    };

    exports.findContentByTagOrCategoryId = function (paramsId) {

        this.callback = function (callback) {
            var query = [{
                category: paramsId
            }, {
                tags: paramsId
            }];
            Content.find().or(query)
                .populate('category')
                .populate('tags')
                .exec(callback);
        };
    };

    exports.findContentBySearch = function (searchfield) {
        var regex = new RegExp(searchfield, 'i');

        this.callback = function (callback) {
            async.series([
                function (callback) {
                    Category.find({
                        name: regex
                    }, {
                        isActive: true
                    }, {
                        _id: 1
                    }).exec(callback);
                },
                function (callback) {
                    Tag.find({
                        name: regex
                    }, {
                        _id: 1
                    }).exec(callback);
                }
         ], function (err, results) {
                var query = [{
                    name: regex,
                }, {
                    text: regex
                }, {
                    category: {
                        $in: results[0]
                    }
                }, {
                    tags: {
                        $in: results[1]
                    }
                }];
                Content.find().or(query)
                    .populate('category')
                    .populate('tags')
                    .exec(callback);
            });
        };
    };
})();
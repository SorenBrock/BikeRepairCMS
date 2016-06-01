(function () {
    'use strict';

    var mongoose = require('mongoose');
    var Tag = require('../models/tag.server.model');

    exports.findTags = function (callback) {
        Tag.find({
            isActive: true
        }).exec(callback);
    };

})();
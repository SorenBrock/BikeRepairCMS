(function () {
    'use strict';

    var mongoose = require('mongoose');
    var Category = require('../models/category.server.model');

    exports.findCategories = function (callback) {
        Category.find({
            isActive: true
        }).exec(callback);
    };

})();
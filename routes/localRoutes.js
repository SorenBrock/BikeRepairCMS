var async = require('async');
var express = require('express');
var localRouter = express.Router();
var contentCtrl = require('../controllers/content.local.controller');
var categoryCtrl = require('../controllers/category.local.controller');
var tagCtrl = require('../controllers/tag.local.controller');

var router = function () {

    localRouter.get('/', function (req, res) {
        res.render('index', {
            user: req.user
        });
    });

    localRouter.post('/articles', function (req, res) {
        var searchfield = req.body.searchfield;
        var calltoContentCtrl = new contentCtrl.findContentBySearch(searchfield);
        async.series([
            calltoContentCtrl.callback,
              categoryCtrl.findCategories,
              tagCtrl.findTags
        ], function (err, results) {
            res.render('articles', {
                articles: results[0],
                categories: results[1],
                tags: results[2],
                user: req.user
            });
        });
    });

    localRouter.get('/articles/:id', function (req, res) {
        var id = req.params.id;
        var calltoContentCtrl = new contentCtrl.findContentByTagOrCategoryId(id);
        async.series([
            calltoContentCtrl.callback,
            categoryCtrl.findCategories,
              tagCtrl.findTags
        ], function (err, results) {
            res.render('articles', {
                articles: results[0],
                categories: results[1],
                tags: results[2],
                user: req.user
            });
        });
    });

    localRouter.get('/articles', function (req, res) {
        async.series([
            contentCtrl.findContent,
            categoryCtrl.findCategories,
              tagCtrl.findTags
        ], function (err, results) {
            res.render('articles', {
                articles: results[0],
                categories: results[1],
                tags: results[2],
                user: req.user
            });
        });
    });

    localRouter.get('/login', function (req, res) {
        return res.render('login');
    });

    localRouter.get('/profile', function (req, res) {
        if (!req.user) {
            return res.redirect('/');
        }
        return res.render('profile', {
            user: req.user
        });

    });

    return localRouter;
};

module.exports = router;
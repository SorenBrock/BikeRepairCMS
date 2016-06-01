var express = require('express');
var passport = require('passport');
var jwt = require('express-jwt');
var apiRouter = express.Router();
var userCtrl = require('../controllers/user.server.controller');
var categoryCtrl = require('../controllers/category.server.controller');
var tagCtrl = require('../controllers/tag.server.controller');
var contentCtrl = require('../controllers/content.server.controller');
var loginCtrl = require('../controllers/login.server.controller');

var router = function () {

    var auth = jwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'payload'
    });

    apiRouter.post('/login', loginCtrl.login);
    apiRouter.get('/checkToken', auth, loginCtrl.checkToken);

    apiRouter.get('/getUsers', auth, userCtrl.findUsers);
    apiRouter.get('/getUserById/:id', auth, userCtrl.getUserById);
    apiRouter.put('/updateUser/:id', auth, userCtrl.updateUser);
    apiRouter.post('/createUser', auth, userCtrl.createUser);
    apiRouter.delete('/deleteUserById/:id', auth, userCtrl.deleteUserById);

    apiRouter.get('/getCategories', auth, categoryCtrl.findCategories);
    apiRouter.get('/getCategoryById/:id', auth, categoryCtrl.getCategoryById);
    apiRouter.put('/updateCategory/:id', auth, categoryCtrl.updateCategory);
    apiRouter.post('/createCategory', auth, categoryCtrl.createCategory);
    apiRouter.delete('/deleteCategoryById/:id', auth, categoryCtrl.deleteCategoryById);

    apiRouter.get('/getTags', auth, tagCtrl.findTags);
    apiRouter.get('/getTagById/:id', auth, tagCtrl.getTagById);
    apiRouter.put('/updateTag/:id', auth, tagCtrl.updateTag);
    apiRouter.post('/createTag', auth, tagCtrl.createTag);
    apiRouter.delete('/deleteTagById/:id', auth, tagCtrl.deleteTagById);

    apiRouter.get('/getContent', auth, contentCtrl.findContent);
    apiRouter.get('/getContentById/:id', auth, contentCtrl.getContentById);
    apiRouter.put('/updateContent/:id', auth, contentCtrl.updateContent);
    apiRouter.post('/createContent', auth, contentCtrl.createContent);
    apiRouter.delete('/deleteContentById/:id', auth, contentCtrl.deleteContentById);

    return apiRouter;
};

module.exports = router;
(function () {
    'use strict';

    dataService.$inject = ['$http', 'authentication'];

    function dataService($http, authentication) {

        var responsedata = function (response) {
            return response.data;
        };
        var responseerror = function (response) {
            return response.data;
        };

        // ******************* USER *******************

        var getUsers = function () {
            return $http.get('/api/getUsers', authentication.auth())
                .then(responsedata, responseerror);
        };

        var getUserById = function (userid) {
            return $http.get('/api/getUserById/' + userid, authentication.auth())
                .then(responsedata, responseerror);
        };

        var updateUser = function (user) {
            return $http.put('/api/updateUser/' + user._id, user, authentication.auth())
                .then(responsedata, responseerror);
        };

        var createUser = function (user) {
            return $http.post('/api/createUser', user, authentication.auth())
                .then(responsedata, responseerror);
        };

        var deleteUserById = function (userid) {
            return $http.delete('/api/deleteUserById/' + userid, authentication.auth())
                .then(responsedata, responseerror);
        };

        // ******************* CATEGORY *******************

        var getCategories = function () {
            return $http.get('/api/getCategories', authentication.auth())
                .then(responsedata, responseerror);
        };

        var createCategory = function (category) {
            return $http.post('/api/createCategory', category, authentication.auth())
                .then(responsedata, responseerror);
        };

        var getCategoryById = function (categoryid) {
            return $http.get('/api/getCategoryById/' + categoryid, authentication.auth())
                .then(responsedata, responseerror);
        };

        var updateCategory = function (category) {
            return $http.put('/api/updateCategory/' + category._id, category, authentication.auth())
                .then(responsedata, responseerror);
        };

        var deleteCategoryById = function (categoryid) {
            return $http.delete('/api/deleteCategoryById/' + categoryid, authentication.auth())
                .then(responsedata, responseerror);
        };

        // ******************* TAG *******************

        var getTags = function () {
            return $http.get('/api/getTags', authentication.auth())
                .then(responsedata, responseerror);
        };

        var createTag = function (tag) {
            console.log('createTag');
            return $http.post('/api/createTag', tag, authentication.auth())
                .then(responsedata, responseerror);
        };

        var getTagById = function (tagid) {
            return $http.get('/api/getTagById/' + tagid, authentication.auth())
                .then(responsedata, responseerror);
        };

        var updateTag = function (tag) {
            return $http.put('/api/updateTag/' + tag._id, tag, authentication.auth())
                .then(responsedata, responseerror);
        };

        var deleteTagById = function (tagid) {
            return $http.delete('/api/deleteTagById/' + tagid, authentication.auth())
                .then(responsedata, responseerror);
        };

        // ******************* CONTENT *******************

        var getContent = function () {
            return $http.get('/api/getContent', authentication.auth())
                .then(responsedata, responseerror);
        };

        var createContent = function (content) {
            return $http.post('/api/createContent', content, authentication.auth())
                .then(responsedata, responseerror);
        };

        var getContentById = function (contentid) {
            return $http.get('/api/getContentById/' + contentid, authentication.auth())
                .then(responsedata, responseerror);
        };

        var updateContent = function (content) {
            return $http.put('/api/updateContent/' + content._id, content, authentication.auth())
                .then(responsedata, responseerror);
        };

        var deleteContentById = function (contentid) {
            return $http.delete('/api/deleteContentById/' + contentid, authentication.auth())
                .then(responsedata, responseerror);
        };

        return {
            getUsers: getUsers,
            deleteUserById: deleteUserById,
            createUser: createUser,
            getUserById: getUserById,
            updateUser: updateUser,
            getCategories: getCategories,
            createCategory: createCategory,
            getCategoryById: getCategoryById,
            updateCategory: updateCategory,
            deleteCategoryById: deleteCategoryById,
            getTags: getTags,
            createTag: createTag,
            getTagById: getTagById,
            updateTag: updateTag,
            deleteTagById: deleteTagById,
            getContent: getContent,
            createContent: createContent,
            getContentById: getContentById,
            updateContent: updateContent,
            deleteContentById: deleteContentById

        };
    }

    angular.module('app')
        .factory('dataService', dataService);

}());
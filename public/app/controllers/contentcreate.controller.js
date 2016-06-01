(function () {
    'use strict';

    contentcreateController.$inject = ['$location', '$routeParams', 'dataService'];

    function contentcreateController($location, $routeParams, dataService) {

        /*jshint validthis:true */
        var vm = this;

        vm.content = {
            name: '',
            text: '',
            category: '',
            tags: [],
            isActive: true
        };

        var dataCategories = function (response) {
            vm.categories = response.data;
        };

        var dataTags = function (response) {
            vm.tags = response.data;
        };

        dataService.getTags().then(dataTags);
        dataService.getCategories().then(dataCategories);

        vm.submit = function (content, contentForm) {
            if (contentForm.$valid) {
                dataService.createContent(content)
                    .then(function (data) {
                        console.log(data);
                        $location.url('contentlist/');
                    });
            }
        };

        vm.isFormValid = function (contentForm) {
            return !contentForm.$valid;
        };

        vm.cancel = function () {
            $location.url('contentlist/');
        };
    }

    angular
        .module('app')
        .controller('contentcreateController', contentcreateController);

}());
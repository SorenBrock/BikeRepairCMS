(function () {
    'use strict';

    contenteditController.$inject = ['$location', '$routeParams', 'dataService'];

    function contenteditController($location, $routeParams, dataService) {

        /*jshint validthis:true */
        var vm = this;
        var dataContent = function (response) {
            console.log(response.data);
            vm.content = response.data;
        };
        var dataCategories = function (response) {
            vm.categories = response.data;
        };
        var dataTags = function (response) {
            vm.tags = response.data;
        };

        dataService.getTags().then(dataTags);
        dataService.getCategories().then(dataCategories);
        dataService.getContentById($routeParams.contentid).then(dataContent);

        vm.submit = function (content, contentForm) {
            console.log(content);
            if (contentForm.$valid) {
                dataService.updateContent(content)
                    .then(function (data) {
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
        .controller('contenteditController', contenteditController);

}());
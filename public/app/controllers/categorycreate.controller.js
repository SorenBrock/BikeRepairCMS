(function () {
    'use strict';

    categorycreateController.$inject = ['$location', '$routeParams', 'dataService'];

    function categorycreateController($location, $routeParams, dataService) {

        /*jshint validthis:true */
        var vm = this;

        vm.category = {
            name: '',
            description: '',
            isActive: true
        };

        vm.submit = function (category, categoryForm) {
            if (categoryForm.$valid) {
                dataService.createCategory(category)
                    .then(function (data) {
                        console.log(data);
                        $location.url('categorylist/');
                    });
            }
        };

        vm.isFormValid = function (categoryForm) {
            return !categoryForm.$valid;
        };

        vm.cancel = function () {
            $location.url('categorylist/');
        };
    }

    angular
        .module('app')
        .controller('categorycreateController', categorycreateController);

}());
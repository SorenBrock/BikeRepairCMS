(function () {
    'use strict';

    categoryeditController.$inject = ['$location', '$routeParams', 'dataService'];

    function categoryeditController($location, $routeParams, dataService) {

        /*jshint validthis:true */
        var vm = this;
        var dataCategory = function (response) {
            vm.category = response.data;
        };

        dataService.getCategoryById($routeParams.categoryid).then(dataCategory);

        vm.submit = function (category, categoryForm) {
            if (categoryForm.$valid) {
                dataService.updateCategory(category)
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
        .controller('categoryeditController', categoryeditController);

}());
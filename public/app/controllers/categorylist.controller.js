(function () {
    'use strict';

    categorylistController.$inject = ['$location', '$route', 'dataService'];

    function categorylistController($location, $route, dataService) {

        /*jshint validthis:true */
        var vm = this;
        var dataCategory = function (response) {
            // primitiv error handling
            if (response.status !== 200) {
                $location.url('/');
            }
            vm.category = response.data;
        };

        dataService.getCategories().then(dataCategory);

        vm.deleteCategory = function (categoryid) {
            dataService.deleteCategoryById(categoryid)
                .then(function (data) {
                    console.log(data);
                    $route.reload();
                });
        };

        vm.createCategory = function () {
            $location.url('/categorycreate');
        };

        vm.editCategory = function (categoryid) {
            $location.url('/categoryedit/' + categoryid);
        };
    }

    angular
        .module('app')
        .controller('categorylistController', categorylistController);

}());
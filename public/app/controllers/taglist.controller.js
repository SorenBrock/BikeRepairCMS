(function () {
    'use strict';

    taglistController.$inject = ['$location', '$route', 'dataService'];

    function taglistController($location, $route, dataService) {

        /*jshint validthis:true */
        var vm = this;
        var dataTag = function (response) {
            // primitiv error handling
            if (response.status !== 200) {
                $location.url('/');
            }
            vm.tag = response.data;
        };

        dataService.getTags().then(dataTag);

        vm.deleteTag = function (tagid) {
            dataService.deleteTagById(tagid)
                .then(function (data) {
                    console.log(data);
                    $route.reload();
                });
        };

        vm.createTag = function () {
            $location.url('/tagcreate');
        };

        vm.editTag = function (tagid) {
            $location.url('/tagedit/' + tagid);
        };
    }

    angular
        .module('app')
        .controller('taglistController', taglistController);

}());
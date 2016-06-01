(function () {
    'use strict';

    contentlistController.$inject = ['$location', '$route', 'dataService'];

    function contentlistController($location, $route, dataService) {

        /*jshint validthis:true */
        var vm = this;
        var dataContent = function (response) {
            // primitiv error handling
            if (response.status !== 200) {
                $location.url('/');
            }
            vm.content = response.data;
        };

        dataService.getContent().then(dataContent);

        vm.deleteContent = function (contentid) {
            dataService.deleteContentById(contentid)
                .then(function (data) {
                    console.log(data);
                    $route.reload();
                });
        };

        vm.createContent = function () {
            $location.url('/contentcreate');
        };

        vm.editContent = function (contentid) {
            $location.url('/contentedit/' + contentid);
        };
    }

    angular
        .module('app')
        .controller('contentlistController', contentlistController);

}());
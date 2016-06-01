(function () {
    'use strict';

    tageditController.$inject = ['$location', '$routeParams', 'dataService'];

    function tageditController($location, $routeParams, dataService) {

        /*jshint validthis:true */
        var vm = this;
        var dataTag = function (response) {
            vm.tag = response.data;
        };

        dataService.getTagById($routeParams.tagid).then(dataTag);

        vm.submit = function (tag, tagForm) {
            if (tagForm.$valid) {
                dataService.updateTag(tag)
                    .then(function (data) {
                        console.log(data);
                        $location.url('taglist/');
                    });
            }
        };

        vm.isFormValid = function (tagForm) {
            return !tagForm.$valid;
        };

        vm.cancel = function () {
            $location.url('taglist/');
        };
    }

    angular
        .module('app')
        .controller('tageditController', tageditController);

}());
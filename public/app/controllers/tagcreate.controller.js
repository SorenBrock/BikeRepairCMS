(function () {
    'use strict';

    tagcreateController.$inject = ['$location', '$routeParams', 'dataService'];

    function tagcreateController($location, $routeParams, dataService) {

        /*jshint validthis:true */
        var vm = this;

        vm.tag = {
            name: '',
            isActive: true
        };

        vm.submit = function (tag, tagForm) {
            if (tagForm.$valid) {
                dataService.createTag(tag)
                    .then(function (data) {
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
        .controller('tagcreateController', tagcreateController);

}());
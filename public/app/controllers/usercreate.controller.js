(function () {
    'use strict';

    usercreateController.$inject = ['$location', '$routeParams', 'dataService'];

    function usercreateController($location, $routeParams, dataService) {

        /*jshint validthis:true */
        var vm = this;

        vm.user = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            email: '',
            isAdmin: true
        };

        vm.submit = function (user, userForm) {
            if (userForm.$valid) {
                dataService.createUser(user)
                    .then(function (data) {
                        console.log(data);
                        $location.url('userlist/');
                    });
            }
        };

        vm.isFormValid = function (userForm) {
            return !userForm.$valid;
        };

        vm.cancel = function () {
            $location.url('userlist/');
        };
    }

    angular
        .module('app')
        .controller('usercreateController', usercreateController);

}());
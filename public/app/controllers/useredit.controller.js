(function () {
    'use strict';

    usereditController.$inject = ['$location', '$routeParams', 'dataService'];

    function usereditController($location, $routeParams, dataService) {

        /*jshint validthis:true */
        var vm = this;
        var dataUser = function (response) {
            vm.user = response.data;
        };

        dataService.getUserById($routeParams.userid)
            .then(dataUser);

        vm.submit = function (user, userForm) {
            if (userForm.$valid) {
                dataService.updateUser(user)
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
        .controller('usereditController', usereditController);

}());
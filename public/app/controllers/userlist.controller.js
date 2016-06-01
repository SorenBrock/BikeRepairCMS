(function () {
    'use strict';

    userlistController.$inject = ['$location', '$route', 'dataService'];

    function userlistController($location, $route, dataService) {

        /*jshint validthis:true */
        var vm = this;
        var dataUsers = function (response) {
            // primitiv error handling
            if (response.status !== 200) {
                $location.url('/');
            }
            vm.users = response.data;
        };

        dataService.getUsers()
            .then(dataUsers);

        vm.deleteUser = function (userid) {
            dataService.deleteUserById(userid)
                .then(function (data) {
                    console.log(data);
                    $route.reload();
                });
        };

        vm.createUser = function () {
            $location.url('/usercreate');
        };

        vm.editUser = function (userid) {
            $location.url('/useredit/' + userid);
        };
    }

    angular
        .module('app')
        .controller('userlistController', userlistController);

}());
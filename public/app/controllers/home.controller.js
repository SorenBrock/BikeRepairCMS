(function () {
    angular.module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$location', 'authentication'];

    function homeController($location, authentication) {
        var vm = this;

        vm.isLoggedIn = function () {
            return authentication.isLoggedIn();
        };

        vm.currentUser = authentication.currentUser();

        vm.doLogout = function () {
            authentication.logout();
            $location.path('/login');
        };
    }
}());
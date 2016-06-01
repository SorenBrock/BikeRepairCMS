(function () {
    angular.module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$location', 'authentication'];

    function loginController($location, authentication) {
        var vm = this;

        vm.credentials = {
            username: '',
            password: ''
        };

        vm.isLoggedIn = function () {
            return authentication.isLoggedIn();
        };

        vm.onSubmit = function () {
            vm.formError = '';
            if (!vm.credentials.username || !vm.credentials.password) {
                vm.formError = 'All fields required, please try again';
                return false;
            } else {
                vm.doLogin();
            }
        };

        vm.doLogout = function () {
            authentication.logout();
            vm.formError = 'logout: ' + authentication.currentUser();

        };

        vm.doLogin = function () {
            vm.formError = '';
            authentication
                .login(vm.credentials)
                .error(function (err) {
                    vm.formError = err;
                })
                .then(function () {
                    vm.formError = authentication.currentUser();
                    $location.path('/');
                });
        };
    }

}());
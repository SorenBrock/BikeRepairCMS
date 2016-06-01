(function () {

    angular
        .module('app')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window', '$q', '$location'];

    function authentication($http, $window, $q, $location) {

        var getToken = function () {
            return $window.localStorage['token'];
        };

        var auth = function () {
            return {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            };
        };

        var saveToken = function (token) {
            $window.localStorage['token'] = token;
        };

        var isLoggedIn = function () {
            var token = getToken();
            if (token && token !== undefined) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;

            } else {
                return false;
            }
        };

        var checkToken = function () {
            return $http.get('/api/checkToken', auth())
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return response;
                });
        };

        // med indbygget promise
        var isUserLoggedIn = function () {
            var defer = $q.defer();
            checkToken().then(
                function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        //Do something
                        defer.resolve();
                    } else {
                        defer.reject();
                        $location.path('/login'); //redirect user to home.
                    }
                });
            return defer.promise;
        };

        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();

                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    name: payload.username
                };
            }
        };

        var register = function (user) {
            return $http.post('/api/register', user).success(function (response) {
                saveToken(response.data.token);
            });
        };

        var login = function (user) {
            return $http.post('/api/login', user).success(function (response) {
                var token = response.data.token;
                if (token !== undefined) {
                    saveToken(response.data.token);
                }
            });
        };

        var logout = function () {
            $window.localStorage.removeItem('token');
        };

        return {
            currentUser: currentUser,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            register: register,
            login: login,
            logout: logout,
            isUserLoggedIn: isUserLoggedIn,
            auth: auth
        };
    }

})();
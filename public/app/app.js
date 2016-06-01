(function () {
    'use strict';
    angular.module('app', ['ngRoute', 'checklist-model']).
    config(function ($routeProvider, $locationProvider) {
            //Requires base setting in index + change templateUrl
            $locationProvider.html5Mode(true);

            var isAuthorized = {
                user: function (authentication, $location) {
                    return authentication.isUserLoggedIn();
                }
            };

            $routeProvider
                .when('/login', {
                    controller: 'loginController',
                    controllerAs: 'login',
                    templateUrl: 'templates/login.html'
                })
                .when('/', {
                    controller: 'homeController',
                    controllerAs: 'home',
                    templateUrl: 'templates/home.html',
                    resolve: isAuthorized
                })
                .when('/userlist', {
                    controller: 'userlistController',
                    controllerAs: 'userlist',
                    templateUrl: 'templates/userlist.html',
                    resolve: isAuthorized
                })
                .when('/usercreate', {
                    controller: 'usercreateController',
                    controllerAs: 'usercreate',
                    templateUrl: 'templates/usercreate.html',
                    resolve: isAuthorized
                })
                .when('/useredit/:userid', {
                    controller: 'usereditController',
                    controllerAs: 'useredit',
                    templateUrl: 'templates/useredit.html',
                    resolve: isAuthorized
                })
                .when('/categorylist', {
                    controller: 'categorylistController',
                    controllerAs: 'categorylist',
                    templateUrl: 'templates/categorylist.html',
                    resolve: isAuthorized
                })
                .when('/categorycreate', {
                    controller: 'categorycreateController',
                    controllerAs: 'categorycreate',
                    templateUrl: 'templates/categorycreate.html',
                    resolve: isAuthorized
                })
                .when('/categoryedit/:categoryid', {
                    controller: 'categoryeditController',
                    controllerAs: 'categoryedit',
                    templateUrl: 'templates/categoryedit.html',
                    resolve: isAuthorized
                })
                .when('/taglist', {
                    controller: 'taglistController',
                    controllerAs: 'taglist',
                    templateUrl: 'templates/taglist.html',
                    resolve: isAuthorized
                })
                .when('/tagcreate', {
                    controller: 'tagcreateController',
                    controllerAs: 'tagcreate',
                    templateUrl: 'templates/tagcreate.html',
                    resolve: isAuthorized
                })
                .when('/tagedit/:tagid', {
                    controller: 'tageditController',
                    controllerAs: 'tagedit',
                    templateUrl: 'templates/tagedit.html',
                    resolve: isAuthorized
                })
                .when('/contentlist', {
                    controller: 'contentlistController',
                    controllerAs: 'contentlist',
                    templateUrl: 'templates/contentlist.html',
                    resolve: isAuthorized
                })
                .when('/contentcreate', {
                    controller: 'contentcreateController',
                    controllerAs: 'contentcreate',
                    templateUrl: 'templates/contentcreate.html',
                    resolve: isAuthorized
                })
                .when('/contentedit/:contentid', {
                    controller: 'contenteditController',
                    controllerAs: 'contentedit',
                    templateUrl: 'templates/contentedit.html',
                    resolve: isAuthorized
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
        .directive('confirmClick', function ($window) {
            var i = 0;
            return {
                restrict: 'A',
                priority: 1,
                compile: function (tElem, tAttrs) {
                    var fn = '$$confirmClick' + i++,
                        _ngClick = tAttrs.ngClick;
                    tAttrs.ngClick = fn + '($event)';

                    return function (scope, elem, attrs) {
                        var confirmMsg = attrs.confirmClick || 'Er du sikker?';

                        scope[fn] = function (event) {
                            if ($window.confirm(confirmMsg)) {
                                scope.$eval(_ngClick, {
                                    $event: event
                                });
                            }
                        };
                    };
                }
            };
        });

}());
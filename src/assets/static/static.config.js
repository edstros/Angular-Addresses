var app = angular
  .module('angularAddresses')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html'
      })
      /*    .when('/contact', {
        templateUrl: 'views/contact.html'
      })*/
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .otherwise({
        templateUrl: 'views/404.html'
      });
  });

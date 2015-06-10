var app = angular
  .module('angularAddresses')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'auth',
        resolve: {
          checkLogin: function ($rootScope, $location) {
            if ($rootScope.auth) {
              $location.path('/mycontacts');//as per sh.src but where does this go?
            }
          }
        }
      })
      .when('/logout', {
        template: '<h1>Logging out ... </h1>',
        conroller: 'LogoutCtrl'
      });
  });

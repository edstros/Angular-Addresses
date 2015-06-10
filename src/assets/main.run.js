var app = angular
  .module('angularAddresses')
  .run(function ($rootScope, $location, API_URL) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
      var fb = new Firebase(API_URL);
      $rootScope.auth = fb.getAuth(); //had fb.Auth
      if (nextRoute.$$route && nextRoute.$$route.private && !$rootScope.auth) {
        $location.path('/login');
      }
    });
  });

var app = angular
  .module('angularAddresses')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mycontacts', {
        templateUrl: 'views/mycontacts.html',
        conroller: 'People',
        controllerAs: 'main',
        private: true
      })
      .when('/mycontacts/new', {
        templateUrl: 'views/mycontacts.html',
        controller: 'NewPersonCtrl',
        controllerAs: 'main',
        private: true
      })
      .when('/mycontacts/:id', {
        templateUrl: 'views/contact.html',
        controller: 'PersonCtrl',
        controllerAs: 'main',
        private: true
      })
      .when('/mycontacts/:id/edit', {
        templateUrl: 'views/contact.html',
        controller: 'EditPersonCtrl',
        controllerAs: 'main',
        private: true
      });
  });

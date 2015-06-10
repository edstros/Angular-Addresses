var app = angular
  .module('angularAddresses')

app.controller('LoginCtrl', function ($rootScope, $scope, $location, API_URL) {
  debugger;
  var vm = this;
  vm.login = function () {
    //debugger stops on 105
    var fb = new Firebase(API_URL);
    fb.authWithPassword({
      email: vm.email,
      password: vm.password
    }, function (error, authData) {
      if (error) {
        console.log('Error', error)
      } else {
        $rootScope.auth = authData;///////my problem is apparently here
        console.log("Authenticated successfully with payload:", authData);//this doesn't show up
        $location.path('/mycontacts');
        $scope.$apply();
      }
    });
  };
  //debugger jumps to 121
  vm.register = function () {alert('button click?');};
});

var app = angular
  .module('angularAddresses', ['ngRoute'])

 
// EditPersonCtrl
app.controller('EditPersonCtrl', function ($scope, $routeParams, $location, Person) {
  var vm = this;
  vm.id = $routeParams.id;
  vm.onModalLoad = function () {
    $('#modal').modal('show');
    $('#modal').on('hidden.bs.modal', function (e) {
      $location.path('people/vm.id');
      $scope.$apply();
    });
  };
  vm.saveAddress = function () {
    Person.update(vm.id, vm.person, function () {
      $('#modal').modal('hide');
    });
  };
  Person.getOne(vm.id, function (person) {
    vm.person = person;
  });
});

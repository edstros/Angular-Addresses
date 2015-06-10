var app = angular
  .module('angularAddresses')
// NewPersonCtrl to add new person to mycontacts
app.controller('NewPersonCtrl', function ($location, $scope, Person) {
  var vm = this;
  vm.onModalLoad = function () {
    $('#modal').modal('show');
    $('#modal').on('hidden.bs.modal', function () {
      $location.path('/people');
      $scope.$apply();
    });
  };
  vm.saveContact = function () {
    Person.create(vm.person, function () {
      $('#modal').modal('hide');
    });
  };
  Person.getAll(function (mycontacts) {
    vm.mycontacts = mycontacts;
  });
});

var app = angular
  .module('angularAddresses')
app.controller('PersonCtrl', function ($routeParams, $location, Person) {
  var vm = this;
  vm.id = $routeParams.id;
  Person.getOne(vm.id, function (data) {
    vm.person = data;
  });
  vm.delete = function (id) {
    Person.delete(vm.id, function () {
      $location.path('/mycontacts');
    });
  };
  vm.onModalLoad = function () {};
});

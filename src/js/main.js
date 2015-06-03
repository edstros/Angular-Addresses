var app = angular.module('angularAddresses', []);

app.controller('Main', function () {
  var vm = this; //so that the
  vm.people = [
    {
      name: 'John',
      phone: '(111) 111-1111',
      twitter: '@john'
    },
    {
      name: 'Jennifer',
      phone: '(222) 222-2222',
      twitter: '@jenster'
    },
    {
      name: 'James',
      phone: '(333) 333-3333',
      twitter: '@jimbo'
    },
    {
      name: 'Chelsea',
      phone: '(444) 444-4444',
      twitter: '@chels'
    },
    {
      name: 'Edwin',
      phone: '(555) 555-5555',
      twitter: '@edstros'
    },
  ];
  vm.newPerson = {};
  vm.addNewContact = function () { //reference on the button in the html
    vm.people.push(vm.newPerson); //creates the new person in the table
    vm.newPerson = {}; // clears out the form
  };
  vm.removeContact = function (person) {
    console.log(person);
    console.log(vm.people);
    var index = vm.people.indexOf(person);
    vm.people.splice(index, 1);
  };

});

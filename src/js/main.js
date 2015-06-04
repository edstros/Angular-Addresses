var app = angular
  .module('angularAddresses', [])
  .filter('objToArr', function () {
    return function (obj) {
      if (obj) {
        return Object
          .keys(obj)
          .map(function (key) {
            obj[key]._id = key;
            return obj[key];
        console.log(key); //does not see this
        console.log(obj); //also does not see this
        });
      }
    };
  })
  .filter('ransomcase', function () {
    return function (string) {
      return string
        .split('')
        .map(function (char, i) {
          return i % 2 ? char.toUpperCase() : char.toLowerCase();
        })
        .join('');
    };
  });
app.controller('Main', function ($http) {
  var vm = this; //so that the app can grow and this can be used within local scope
  $http
    .get('https://addressangularity.firebaseio.com/people.json')
    .success(function (data) {
      vm.people = data;
    console.log(data); //sees the whole firebase
    });
  vm.newPerson = {};
  vm.addNewContact = function () { //reference on the button in the html
    $http
      .post('https://addressangularity.firebaseio.com/people.json', vm.newPerson)
      .success(function () {
        vm.people.push(vm.newPerson); //creates the new person in the table
        vm.newPerson = {}; // clears out the form
        $('#modal').modal('hide');
      });
  };
  vm.removeContact = function (id) {
    $http
      .delete('https://addressangularity.firebaseio.com/' + id + '.json')
      .success(function () {
        delete vm.people[id];
        console.log(id);//never sees this
        //var index = vm.people.indexOf(person);
          //vm.people.splice(index, 1);
      });
  };
});

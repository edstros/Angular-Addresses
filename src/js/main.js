var app = angular
  .module('angularAddresses', ['ngRoute'])
  .constant('API_URL', 'https://addressangularity.firebaseio.com')
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
      .when('/mycontacts', {
        templateUrl: 'views/mycontacts.html',
        conroller: 'Main',
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
      })
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
      })
      .otherwise({
        templateUrl: 'views/404.html'
      });
  })
  .run(function ($rootScope, $location, API_URL) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
      var fb = new Firebase(API_URL);
      $rootScope.auth = fb.getAuth(); //had fb.Auth
      if (nextRoute.$$route && nextRoute.$$route.private && !$rootScope.auth) {
        $location.path('/login');
      }
    });
  })
  .filter('objToArr', function () {
    return function (obj) {
      if (obj) {
        return Object
          .keys(obj)
          .map(function (key) {
            obj[key]._id = key;
            return obj[key];
            //            console.log(key); //this works now.
            //            console.log(obj); //also sees this
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
app.controller('LogoutCtrl', function ($rootScope, $scope, $location, API_URL) {
  var fb = new Firebase(API_URL);
  fb.unauth(function () {
    $rootScope.auth = null;
    $location.path('/login');
    $scope.$apply();
  });
});
app.controller('LoginCtrl', function ($rootScope, $scope, $location, API_URL) {
  var vm = this;
  vm.login = function () {
    debugger;
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
  vm.register = function () {};
});
app.controller('PersonCtrl', function ($routeParams, $location, Person) {
  var vm = this;
  var id = $routeParams.id;
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
// factory to add and edit mycontacts
app.factory('Person', function ($http, API_URL) {
  return {
    getOne(id, cb) {
        $http.get(API_URL + 'people/' + id + '/.json').success(cb);
      },
      getAll(cb) {
        $http.get(API_URL + '/people.json').success(cb);
      },
      create(data, cb) {
        $http.post(API_URL + '/people.json', data).success(cb);
      },
      update(id, data, cb) {
        $http.put(API_URL + '/people/' + id + '/.json').success(cb);
      }
  };
});
// NewPersonCtrl to add new person to mycontacts
app.controller('NewPersonCtrl', function ($location, $scope, Person) {
  var vm = this;
  vm.onModalLoad = function () {
    $('#modal').modal('show');
    $('#modal').on('hidden.bs.modal', function () {
      $location.path('/mycontacts');
      $scope.$apply();
    });
  };
  vm.saveContact = function () {
    Person.creative(vm.person, function () {
      $('#modal').modal('hide');
    });
  };
  Person.getAll(function (mycontacts) {
    vm.mycontacts = mycontacts;
  });
});
// EditPersonCtrl
app.controller('EditPersonCtrl', function ($scope, $routeParams, $location, Person) {
  var vm = this;
  vm.id = $routeParams.id;
  vm.onModalLoad = function () {
    $('#modal').modal('show');
    $('#modal').on('hidden.bs.modal', function (e) {
      $location.path('mycontacts/vm.id');
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
app.controller('Main', function ($http, $routeParams, API_URL) {
  var vm = this; //so that the app can grow and this can be used within local scope
  $http
    .get(API_URL + 'people.json')
    .success(function (data) {
      vm.people = data;
      //console.log(data); //sees the whole firebase
    });
  vm.newPerson = {};
  vm.addNewContact = function () { //reference on the button in the html
    $http
      .post(API_URL + 'people.json', vm.newPerson)
      .success(function () {
        vm.people.push(vm.newPerson); //creates the new person in the table
        vm.newPerson = {}; // clears out the form
        $('#modal').modal('hide');
      });
  };
  vm.removeContact = function (id) {
    $http
      .delete(API_URL + 'people/' + id._id + '.json')
      .success(function () {
        delete vm.people[id._id];
        console.log(id); //this works now
        //var index = vm.people.indexOf(person);
        //vm.people.splice(index, 1);
      });
  };
});

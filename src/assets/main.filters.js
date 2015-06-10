var app = angular
  .module('angularAddresses', ['ngRoute'])
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

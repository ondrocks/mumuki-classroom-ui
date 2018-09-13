
angular
  .module('classroom')
  .controller('HomeController', function ($scope, $state, $stateParams, Auth) {

    Auth.signin();

  });

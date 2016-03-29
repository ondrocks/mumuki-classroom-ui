
angular
  .module('classroom')
  .controller('HomeController', function ($scope, $state, Auth) {

    Auth.login = () => Auth.signin(() => $state.go('classroom.courses', {}, { reload: true }));

    Auth.login();

  });

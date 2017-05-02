
angular
  .module('classroom')
  .controller('HomeController', function ($scope, $state, $stateParams, Auth) {

    Auth.login = () => {
      Auth.signin(() => {
        $state.go('classroom.courses', $stateParams, { reload: true })
      });
    };

    Auth.login();

  });

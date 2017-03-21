
angular
  .module('classroom')
  .controller('NavbarController', function ($scope, hotkeys, Auth, Breadcrumb, Permissions) {

    $scope.signin = Auth.signin;
    $scope.signout = Auth.signout;
    $scope.profile = Auth.profile;
    $scope.imageUrl = Auth.imageUrl;
    $scope.isTeacher = Permissions.isTeacher;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.Breadcrumb = Breadcrumb;

    hotkeys
      .bindTo($scope)
      .add({
        combo: ['ctrl+down'],
        callback: () => {
          angular.element('ol.breadcrumb li.dropdown').addClass('open');
          angular.element('ol.breadcrumb li.dropdown input').focus();
        }
      })

  });

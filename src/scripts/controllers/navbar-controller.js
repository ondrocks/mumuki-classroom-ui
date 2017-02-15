
angular
  .module('classroom')
  .controller('NavbarController', function ($scope, Auth, Breadcrumb, Permissions) {

    $scope.signin = Auth.signin;
    $scope.signout = Auth.signout;
    $scope.profile = Auth.profile;
    $scope.isTeacher = Permissions.isTeacher;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.Breadcrumb = Breadcrumb;

  });

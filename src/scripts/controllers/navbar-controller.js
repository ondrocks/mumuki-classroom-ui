
angular
  .module('classroom')
  .controller('NavbarController', function ($scope, Auth, Breadcrumb) {

    $scope.signin = Auth.signin;
    $scope.signout = Auth.signout;
    $scope.profile = Auth.profile;
    $scope.isTeacher = Auth.isTeacher;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.Breadcrumb = Breadcrumb;

  });

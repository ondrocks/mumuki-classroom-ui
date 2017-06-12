
angular
  .module('classroom')
  .controller('NavbarController', function ($scope, $state, $sce, $filter, hotkeys, notifications, Auth, Breadcrumb, Permissions, Notification, Api) {

    Notification.set(notifications);
    $scope.Notification = Notification;
    $scope.signin = Auth.signin;
    $scope.signout = Auth.signout;
    $scope.profile = Auth.profile;
    $scope.imageUrl = Auth.imageUrl;
    $scope.isTeacher = Permissions.isTeacher;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.Breadcrumb = Breadcrumb;
    $scope.trust = (notification) => $sce.trustAsHtml($filter('translate')(notification.type.toLowerCase(), notification));

    $scope.goToAssignment = Notification.goToAssignment;

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

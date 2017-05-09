
angular
  .module('classroom')
  .controller('NotificationsController', function ($scope, $state, notifications, Notification) {

    $scope.Notification = Notification;

    $scope.notifications = notifications;

    $scope.goToPage = (page) => $state.go($state.current.name, {page})

  });

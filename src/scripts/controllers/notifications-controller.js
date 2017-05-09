
angular
  .module('classroom')
  .controller('NotificationsController', function ($scope, notifications, Notification) {

    $scope.Notification = Notification;

    $scope.notifications = notifications;

  });

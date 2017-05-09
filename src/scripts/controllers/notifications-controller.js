
angular
  .module('classroom')
  .controller('NotificationsController', function ($scope, notifications, Notification) {

    $scope.Notification = Notification;

    $scope.notifications = notifications;

    const pageOffset = 2;

    $scope.limit = () => pageOffset * 2 + 1;

    $scope.totalPages = () => _.ceil($scope.notifications.total / Notification.perPage);

    $scope.actualPage = () => $scope.notifications.page;
    $scope.begin = () => {
      const total = $scope.totalPages();
      const actual = $scope.actualPage();
      if (actual <= pageOffset + 1) {
        return 0;
      } else if (total - actual <= pageOffset) {
        return total - $scope.limit();
      } else {
        return actual - pageOffset - 1;
      }
    }

    $scope.pad = (page) => _.padStart(page.toString(), 2, '0');

    $scope.pages = () => _.range(1, $scope.totalPages() + 1);

    $scope.prevPage = () => Math.max($scope.actualPage() - 1, 1);
    $scope.nextPage = () => Math.min($scope.actualPage() + 1, $scope.totalPages());

  });

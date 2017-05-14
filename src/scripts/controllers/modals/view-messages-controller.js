angular
  .module('classroom')
  .controller('ViewMessagesController', function ($scope, $uibModalInstance, $sce, html, callback, Scroll, Api) {

    $scope.html = $sce.trustAsHtml(html);

    $scope.send = () => {
      $scope.cancel();
      callback();
    }

    $scope.cancel = () => {
      $uibModalInstance.close();
    }

    Scroll.bottom('.mu-view-messages .chat');

  });

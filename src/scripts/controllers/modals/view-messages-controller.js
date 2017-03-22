angular
  .module('classroom')
  .controller('ViewMessagesController', function ($scope, $uibModalInstance, $sce, html, callback, Scroll, Api) {

    $scope.html = $sce.trustAsHtml(html);

    $scope.cancel = () => {
      $uibModalInstance.close();
    }

    Scroll.bottom('.view-messages .chat');

  });

angular
  .module('classroom')
  .controller('ViewMessagesController', function ($scope, $uibModalInstance, $sce, html, callback, Api) {

    $scope.html = $sce.trustAsHtml(html);

    $scope.cancel = () => {
      $uibModalInstance.close();
    }

  });

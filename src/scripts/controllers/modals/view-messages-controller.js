angular
  .module('classroom')
  .controller('ViewMessagesController', function ($scope, $uibModalInstance, $sce, $timeout, html, callback, Api) {

    $scope.html = $sce.trustAsHtml(html);

    $scope.cancel = () => {
      $uibModalInstance.close();
    }

    $timeout(() => $('.view-messages .chat').scrollTop($('.view-messages .chat')[0].scrollHeight));

  });

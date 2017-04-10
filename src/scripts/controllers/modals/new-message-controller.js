angular
  .module('classroom')
  .controller('NewMessageController', function ($scope, $sce, $stateParams, $uibModalInstance, student, message, course, currentCode, callback, Api) {

    $scope.student = student;
    $scope.message = message;

    $scope.currentCode = $sce.trustAsHtml(currentCode);

    $scope.send = () => {
      return Api
        .newMessage($scope.message, course)
        .then(() => {
          $scope.cancel();
          return callback($scope.message.message);
        });
    }

    $scope.cancel = () => {
      $uibModalInstance.close();
    }

  });

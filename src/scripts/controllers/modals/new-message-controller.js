angular
  .module('classroom')
  .controller('NewMessageController', function ($scope, $stateParams, $uibModalInstance, student, message, course, callback, Api) {

    $scope.student = student;
    $scope.message = message;

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

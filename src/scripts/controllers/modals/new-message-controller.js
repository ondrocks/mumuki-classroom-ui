angular
  .module('classroom')
  .controller('NewMessageController', function ($scope, $sce, $stateParams, $uibModalInstance, student, message, course, callback, Api) {

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

    $scope.toggle = () => {
      angular.element('.modal-body, .modal-footer')[$scope.expanded ? 'show' : 'hide']();
      $scope.expanded = !$scope.expanded;
    }

  });

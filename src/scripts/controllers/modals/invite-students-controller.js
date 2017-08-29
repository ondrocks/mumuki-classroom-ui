angular
  .module('classroom')
  .controller('InviteStudentsController', function ($scope, $sce, $uibModalInstance, course, callback) {

    $scope.course = course;

    $scope.date = {
      expiration: moment().add(7, 'days')
    }

    $scope.send = () => {
      return callback($scope.date.expiration).then($scope.cancel)
    }

    $scope.cancel = () => {
      $uibModalInstance.close();
    }

  });

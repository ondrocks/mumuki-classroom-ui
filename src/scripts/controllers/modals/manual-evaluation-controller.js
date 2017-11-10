angular
  .module('classroom')
  .controller('ManualEvaluationController', function ($scope,
                                                      $sce,
                                                      $stateParams,
                                                      $uibModalInstance,
                                                      callback) {

    const SELECT_STATUS = {
      name: 'exercise_status_default',
      status: 'default'
    };

    let _currentStatus = SELECT_STATUS;

    $scope.comment = '';

    $scope.currentStatus = () => _currentStatus;

    $scope.status = [
      {
        name: 'exercise_status_passed',
        status: 'passed'
      },
      {
        name: 'exercise_status_passed_with_warnings',
        status: 'passed_with_warnings'
      },
      {
        name: 'exercise_status_failed',
        status: 'failed'
      },
      {
        name: 'exercise_status_errored',
        status: 'errored'
      }
    ]

    $scope.send = () => {
      return callback({comment: $scope.comment, status: _currentStatus.status})
        .then(() => $scope.cancel());
    }

    $scope.cancel = () => {
      $uibModalInstance.close();
    }

    $scope.toggle = () => {
      $scope.expanded = !$scope.expanded;
      angular.element('.modal-footer, .modal-body')[$scope.expanded ? 'hide' : 'show']();
    }

    $scope.sendManualEvaluationDisabled = () => {
      return _.isEmpty($scope.comment) || _currentStatus === SELECT_STATUS;
    }

    $scope.selectStatus = (status) => {
      _currentStatus = status;
    }
  });

angular
  .module('classroom')
  .controller('ManualCorrectionController', function ($scope,
                                                      $sce,
                                                      $stateParams,
                                                      $uibModalInstance,
                                                      assignment,
                                                      callback) {

    const SELECT_STATUS = {
      name: 'exercise_status_default',
      status: 'default'
    };

    let _currentStatus = SELECT_STATUS;

    $scope.assigment = assignment;
    $scope.lastSubmission = assignment.lastSubmission();
    $scope.correction = '';

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
      console.log($scope.correction);
    }

    $scope.cancel = () => {
      $uibModalInstance.close();
    }

    $scope.toggle = () => {
      angular.element('.modal-body, .modal-footer')[$scope.expanded ? 'show' : 'hide']();
      $scope.expanded = !$scope.expanded;
    }

    $scope.sendCorrectionDisabled = () => {
      return _.isEmpty($scope.correction) || _currentStatus === SELECT_STATUS;
    }

    $scope.selectStatus = (status) => {
      _currentStatus = status;
    }
  });

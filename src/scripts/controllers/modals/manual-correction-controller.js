angular
  .module('classroom')
  .controller('ManualCorrectionController', function ($scope,
                                                      $sce,
                                                      $stateParams,
                                                      $uibModalInstance,
                                                      assignment,
                                                      callback) {

    $scope.assigment = assignment;
    $scope.correction = '';

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

  });

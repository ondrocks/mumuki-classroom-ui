angular
  .module('classroom')
  .controller('ConfirmDialogController', function ($scope, $fancyModal, student, onYes) {

    $scope.student = student;

    $scope.yes = () => {
      onYes();
      $fancyModal.close();
    }

    $scope.no = () => {
      $fancyModal.close();
    }

  });

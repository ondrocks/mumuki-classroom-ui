angular
  .module('classroom')
  .controller('ConfirmDialogController', function ($scope, $fancyModal, text, onYes) {

    $scope.text = text;

    $scope.yes = () => {
      onYes();
      $fancyModal.close();
    }

    $scope.no = () => {
      $fancyModal.close();
    }

  });

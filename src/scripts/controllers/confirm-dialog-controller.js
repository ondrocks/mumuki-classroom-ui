angular
  .module('classroom')
  .controller('ConfirmDialogController', function ($scope, $fancyModal, title, text, onYesPromise) {

    $scope.title = title;
    $scope.text = text;

    $scope.yes = () => {
      onYesPromise().then(() => $fancyModal.close());
    }

    $scope.no = () => {
      $fancyModal.close();
    }

  });

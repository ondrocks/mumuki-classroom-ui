angular
  .module('classroom')
  .controller('ConfirmDialogController', function ($scope, $fancyModal, title, text, onYesPromise) {

    $scope.title = title;
    $scope.text = text;

    const spinnerOn = () => $scope.spin = true;
    const spinnerOff = () => $scope.spin = false;

    $scope.yes = () => {
      spinnerOn();
      onYesPromise()
        .then(() => spinnerOff())
        .then(() => $fancyModal.close());
    }

    $scope.no = () => {
      $fancyModal.close();
    }

  });

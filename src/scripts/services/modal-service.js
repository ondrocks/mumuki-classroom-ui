angular
  .module('classroom')
  .service('Modal', function ($fancyModal) {

    this.confirmDialog = (student, onYes) => $fancyModal.open({
      templateUrl: 'views/modals/confirm-dialog.html',
      controller: 'ConfirmDialogController',
      resolve: {
        student: () => student,
        onYes: () => onYes
      }
    });

  });

angular
  .module('classroom')
  .service('Modal', function ($fancyModal) {

    this.confirmDialog = (text, onYes) => $fancyModal.open({
      templateUrl: 'views/modals/confirm-dialog.html',
      controller: 'ConfirmDialogController',
      resolve: {
        text: () => text,
        onYes: () => onYes
      }
    });

  });

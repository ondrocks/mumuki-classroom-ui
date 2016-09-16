angular
  .module('classroom')
  .service('Modal', function ($fancyModal, Api) {

    this.confirmDialog = (student, onYes) => $fancyModal.open({
      templateUrl: 'views/modals/confirm-dialog.html',
      controller: 'ConfirmDialogController',
      resolve: {
        student: () => student,
        onYes: () => onYes
      }
    });

    this.transfer = (student, callback) => $fancyModal.open({
      templateUrl: 'views/modals/transfer-student.html',
      controller: 'TransferStudentController',
      resolve: {
        student: () => student,
        courses: () => Api.getCourses(),
        callback: () => callback
      }
    });

  });

angular
  .module('classroom')
  .service('Modal', function ($fancyModal, Api) {

    this.exportCourseDataToJson = (model, onYes) => $fancyModal.open({
      templateUrl: 'views/modals/export-course-data-to-json.html',
      controller: 'ExportCourseDataToJsonDialogController',
      resolve: {
        course: () => model,
        onYes: () => onYes
      }
    });

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

angular
  .module('classroom')
  .controller('ExportCourseDataToJsonDialogController', function ($scope, $fancyModal, course, onYes) {

    $scope.course = course;

    $scope.yes = () => {
      onYes().then(() => $fancyModal.close());
    }

    $scope.no = () => {
      $fancyModal.close();
    }

  });

angular
  .module('classroom')
  .controller('TransferStudentController', function ($scope, $stateParams, $fancyModal, student, courses, callback, Api) {

    $scope.student = student;
    $scope.courses = courses;

    $scope.transfer = (course) => {
      const destination = course.slug.split('/')[1]
      Api
        .transfer(student.social_id, $stateParams.course, destination)
        .then(() => $fancyModal.close())
        .then(() => callback());
    }

    $scope.cancel = () => {
      $fancyModal.close();
    }

  });


angular
  .module('classroom')
  .controller('StudentEditController', function ($scope, $state, $stateParams, student, toastr, Auth, Api, Domain) {
    $scope.student = student.data;

    $scope.isTextValid = (text) => {
      return !_.isEmpty((text || '').trim())
    };

    $scope.isEdit = true;
    $scope.titleKey = 'edit_student';

    $scope.isValid = () =>
      $scope.isTextValid($scope.student.first_name) &&
      $scope.isTextValid($scope.student.last_name) &&
      $scope.isTextValid($scope.student.personal_id);

    $scope.submit = () => {
      return Api
        .updateStudent($stateParams.course, $scope.student)
        .then(() => $state.go('classroom.courses.course.students', $stateParams, { reload: true }))
        .catch((res) => toastr.error(res.data.message));
    }
  });

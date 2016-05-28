
angular
  .module('classroom')
  .controller('TeachersController', function ($scope, $state, $stateParams, toastr, $filter, teachers, Auth, Api, Domain) {
    $scope.setCount(teachers.length);

    $scope.list = teachers;
    const course = $stateParams.course;
    const course_slug = `${Domain.tenant()}/${course}`;

    $scope.sortCriteria = (teacher) => teacher.fullName();

  });


angular
  .module('classroom')
  .controller('TeachersController', function ($scope, $state, $stateParams, teachers, Auth, Api, Domain) {
    $scope.setCount(teachers.length);

    $scope.list = teachers;
    const course = $stateParams.course;
    const course_slug = `${Domain.tenant()}/${course}`;

    $scope.isAdmin = () => Auth.isAdmin();

    $scope.sortCriteria = (teacher) => teacher.fullName();

  });

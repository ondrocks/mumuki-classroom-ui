
angular
  .module('classroom')
  .controller('TeachersController', function ($scope, $state, $stateParams, teachers, Auth, Api, Domain, Modal) {
    $scope.setCount(teachers.length);

    Breadcrumb.setCourse($stateParams.course);
    $scope.list = teachers;
    const course = $stateParams.course;
    const course_slug = `${Domain.tenant()}/${course}`;

    $scope.isAdmin = () => Auth.isAdmin();

    $scope.newTeacher = () => $state.go('classroom.courses.course.teachers.new', { course_slug });

    $scope.sortCriteria = (teacher) => teacher.fullName();

  });

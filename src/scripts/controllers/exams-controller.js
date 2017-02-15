
angular
  .module('classroom')
  .controller('ExamsController', function ($scope, $state, $stateParams, exams, Auth, Api, Modal, Breadcrumb, Permissions) {
    $scope.setCount(exams.length);

    Breadcrumb.setCourse($stateParams.course);
    $scope.list = exams;
    $scope.noItemsToShow = 'no_exams_to_show';
    $scope.inputPlaceholder = 'filter_available_exams';

    $scope.isTeacher = Permissions.isTeacher;
    $scope.isExam = true;
    $scope.sortCriteria = () => ['getName()'];

    $scope.open = (item) => {
      const params = { course: $stateParams.course, exam: item.id };
      return $state.go('classroom.courses.course.exams.edit', params);
    }

  });

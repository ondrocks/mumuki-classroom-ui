
angular
  .module('classroom')
  .controller('CourseController', function ($scope, $state, $stateParams, $location, $timeout, clipboard) {

    const tabs = {
      guides: 'classroom.courses.course.guides',
      students: 'classroom.courses.course.students',
      teachers: 'classroom.courses.course.teachers',
      exams: 'classroom.courses.course.exams'
    }
    $scope.tabs = _.keys(tabs);
    $scope.open = (tab) => $state.go(tabs[tab], $stateParams, { location: 'replace' });
    $scope.is = (tab) => $state.is(tabs[tab], $stateParams);

    $scope.setCount = (count) => $scope.count = count;

    const protocol = $location.protocol();
    const host = $location.host();
    const href = $state.href('classroom.students', { course: $stateParams.course })

    $scope.url = () => `${protocol}://${host}/${href}`;

    $scope.copy = () => {
      clipboard.copyText($scope.url());
      $scope.isCopied = true;
      $timeout(() => $scope.isCopied = false, 5000);
    };

  });


angular
  .module('classroom')
  .controller('CoursesController', function ($scope, $state, courses, Auth, Api) {

    $scope.list = courses;
    $scope.preTitle = _.capitalize(Api.subdomain.replace(/[.]$/g, ''));
    $scope.noItemsToShow = 'no_courses_to_show';
    $scope.inputPlaceholder = 'filter_available_courses';

    $scope.isAdmin = Auth.isAdmin;
    $scope.sortCriteria = () => ['slug'];

    $scope.open = (course) => {
      const slug = course.slug.split('/');
      $state.go('classroom.courses.course.guides', { org: slug[0], course: slug[1] })
    }

  });


angular
  .module('classroom')
  .controller('CoursesController', function ($scope, $state, courses, Auth, Api, Modal) {

    $scope.list = courses;
    $scope.preTitle = _.capitalize(Api.subdomain);
    $scope.noItemsToShow = 'no_courses_to_show';
    $scope.inputPlaceholder = 'filter_available_courses';

    $scope.isAdmin = Auth.isAdmin;
    $scope.isCourse = true;
    $scope.sortCriteria = () => ['getName()'];

    $scope.openPermissionsModal = (slug) => Modal.permissionsModal(slug);

    $scope.open = (course) => {
      const slug = course.slug.split('/');
      $state.go('classroom.courses.course.guides', { course: slug[1] })
    }

  });

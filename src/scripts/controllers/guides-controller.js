
angular
  .module('classroom')
  .controller('GuidesController', function ($scope, $state, $stateParams, guides) {
    $scope.setCount(guides.length);

    $scope.list = guides;
    $scope.preTitle = _.capitalize($stateParams.course.toUpperCase());
    $scope.noItemsToShow = 'no_guides_to_show';
    $scope.inputPlaceholder = 'filter_available_guides';

    $scope.sortCriteria = (guide) => ['language.name', 'name'];

    $scope.open = (guide) => {
      const [ org, repo ] = guide.slug.split('/');
      const course = $stateParams.course;
      $state.go('classroom.guideProgress', { org, repo, course });
    }

  });

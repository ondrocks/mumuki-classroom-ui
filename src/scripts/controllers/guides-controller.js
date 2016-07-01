
angular
  .module('classroom')
  .controller('GuidesController', function ($scope, $state, $stateParams, guides) {
    const mapChapter = _.flow(_.lowerCase, _.deburr);
    $scope.setCount(guides.length);

    $scope.dict = _.groupBy(guides, 'parent.type');
    $scope.chaptersAndLessons = _.groupBy($scope.dict.Lesson, (lesson) => mapChapter(lesson.parent.chapter.name));
    $scope.others = $scope.dict.undefined;
    $scope.preTitle = _.capitalize($stateParams.course.toUpperCase());
    $scope.noItemsToShow = 'no_guides_to_show';
    $scope.inputPlaceholder = 'filter_available_guides';

    $scope.sortCriteria = (guide) => ['parent.position', 'language.name', 'name'];

    $scope.open = (guide) => {
      const [ org, repo ] = guide.slug.split('/');
      const course = $stateParams.course;
      $state.go('classroom.courses.course.guides.guide', { org, repo, course });
    }

  });

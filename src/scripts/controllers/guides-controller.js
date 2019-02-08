
angular
  .module('classroom')
  .controller('GuidesController', function ($scope, $state, $stateParams, guides, Preferences, Breadcrumb, Notification, Domain) {
    Preferences($scope, 'lastChapter');
    if (_.isNil($scope.lastChapter)) $scope.lastChapter = { name: ''};
    $scope.setLastChapterOpened = (chapter) => { $scope.lastChapter = { name: chapter }};

    Breadcrumb.setCourse($stateParams.course);
    const mapChapter = _.flow(_.lowerCase, _.deburr);
    $scope.setCount(guides.length);
    $scope.actualChapter = (name) => name === $scope.lastChapter.name;

    $scope.dict = _.groupBy(guides, 'parent.type');
    $scope.chaptersAndLessons = _.groupBy($scope.dict.Lesson, (lesson) => mapChapter(lesson.parent.chapter.name));
    $scope.exams = $scope.dict.Exam;
    $scope.complements = $scope.dict.Complement;
    $scope.others = $scope.dict.undefined;
    $scope.noItemsToShow = 'no_guides_to_show';
    $scope.inputPlaceholder = 'filter_available_guides';

    $scope.sortCriteria = (guide) => ['parent.position', 'language.name', 'name'];
    $scope.present = (items) => !!items;

    $scope.open = (guide) => {
      const [ org, repo ] = guide.slug.split('/');
      $state.go('classroom.courses.course.guides.guide', _.defaults({ org, repo }, $stateParams));
    };

    const notifications = _.chain(Notification.get())
                           .filter({organization: Domain.tenant(), course: `${Domain.tenant()}/${$stateParams.course}` })
                           .groupBy('assignment.guide.slug')
                           .value();

    $scope.notifications = (guide) => {
      return _.get(notifications, guide.slug, []);
    }

  });

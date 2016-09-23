
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, $controller, data, Api, DevIcon, Guide, Breadcrumb) {

    $controller('ListHeaderController', {
      $scope: $scope,
      list: data.guideProgress,
      itemTemplate: 'views/templates/item-guide-progress.html',
      socialIdField: 'student.social_id'
    });

    const guide = Guide.from(data.guide);
    const guideProgressFetcher = $interval(() => Api.getGuideProgress($stateParams).then((data) => setGuideProgress(data.guideProgress)), 5000);

    Breadcrumb.setCourse($stateParams.course);
    Breadcrumb.setGuide(guide);

    const setGuideProgress = (guideProgress) => $scope.list = guideProgress;

    $scope.availableSortingCriterias = [
      { type: 'name', properties: ['student.last_name', 'student.first_name']},
      { type: 'progress', properties: ['stats.total', 'passedAverage()', 'student.last_name', 'student.first_name']},
      { type: 'last_submission_date', properties: ['-lastSubmission().created_at', 'student.last_name', 'student.first_name']}
    ];

    setGuideProgress(data.guideProgress);

    $scope.guide = guide;
    $scope.devicon = DevIcon.from;
    $scope.listBodyClass = 'col-md-4 col-sm-6';
    $scope.withDisabledStudents = false;

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));
  });

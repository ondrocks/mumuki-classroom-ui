
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, $controller, data, Api, DevIcon, Guide, Breadcrumb) {

    $controller('ListHeaderController', {
      $scope: $scope,
      list: students,
      socialIdField: 'student.social_id'
    });

    Breadcrumb.setGuide(guide);

    const guide = Guide.from(data.guide);
    const guideProgressFetcher = $interval(() => Api.getGuideProgress($stateParams).then((data) => setGuideProgress(data.guideProgress)), 5000);

    const setGuideProgress = (guideProgress) => $scope.list = guideProgress;

    $scope.availableSortingCriterias = [
      { type: 'name', properties: ['student.fullName()']},
      { type: 'progress', properties: ['stats.total', 'passedAverage()', 'student.fullName()']},
      { type: 'last_submission_date', properties: ['-lastSubmission().created_at', 'student.fullName()']}
    ];

    setGuideProgress(data.guideProgress);

    $scope.guide = guide;
    $scope.devicon = DevIcon.from;

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));
  });

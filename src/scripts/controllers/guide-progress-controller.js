
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, $controller, $timeout, data, Api, Guide, Breadcrumb, Humanizer, Notification, Domain) {

    $controller('ListHeaderController', {
      $scope: $scope,
      list: data.guideProgress,
      itemTemplate: 'views/templates/item-guide-progress.html',
      uidField: 'student.uid',
      responseField: 'guideProgress'
    });

    const guide = Guide.from(data.guide);
    const guideProgressFetcher = $interval(() => {
      Api
        .getGuideProgress($stateParams, $scope.params)
        .then((data) => setGuideProgress(data.guideProgress))
    }, 5000);

    Breadcrumb.setCourse($stateParams.course);
    Breadcrumb.setGuide(guide);

    const setGuideProgress = (guideProgresses) => {
      guideProgresses.forEach((guideProgress) => {
        const item = _.find($scope.list, (item) => item.student.uid === guideProgress.student.uid)
        if (item) _.merge(item, guideProgress);
        else $scope.list.push(guideProgress);
      });
    }

    $scope.Humanizer = Humanizer;
    $scope.totalCount = data.total;

    $scope.availableSortingCriteria = [ 'messages', 'name', 'progress', 'last_submission_date' ];

    setGuideProgress(data.guideProgress);

    $scope.guide = guide;
    $scope.withDetachedStudents = false;

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));

  });

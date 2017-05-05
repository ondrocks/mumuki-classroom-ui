
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, $controller, data, Api, Guide, Breadcrumb, Humanizer, Notification, Domain) {

    $controller('ListHeaderController', {
      $scope: $scope,
      list: data.guideProgress,
      itemTemplate: 'views/templates/item-guide-progress.html',
      uidField: 'student.uid'
    });

    const guide = Guide.from(data.guide);
    const guideProgressFetcher = $interval(() => Api.getGuideProgress($stateParams).then((data) => setGuideProgress(data.guideProgress)), 5000);

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

    $scope.availableSortingCriterias = [
      { type: 'name', properties: ['student.last_name', 'student.first_name']},
      { type: 'progress', properties: ['stats.total', 'passedAverage()', 'student.last_name', 'student.first_name']},
      { type: 'last_submission_date', properties: ['-lastSubmission().created_at', 'student.last_name', 'student.first_name']}
    ];

    setGuideProgress(data.guideProgress);

    $scope.guide = guide;
    $scope.withDetachedStudents = false;

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));

    const notifications = _.chain(Notification.get())
                           .filter({
                              organization: Domain.tenant(),
                              course: `${Domain.tenant()}/${$stateParams.course}`,
                              assignment: {
                                guide: {slug: guide.slug }
                              }
                           })
                           .groupBy('assignment.student.uid')
                           .value();

    $scope.notifications = (guideProgress) => {
      return _.get(notifications, guideProgress.student.uid, []);
    }


  });

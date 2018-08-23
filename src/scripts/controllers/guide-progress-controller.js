
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, $controller, $timeout, $httpParamSerializer, data, Api, Guide, Breadcrumb, Humanizer, Notification, Domain) {

    let queryOperands = [
      {text: 'more_than', symbol: '≥'},
      {text: 'less_than', symbol: '≤'},
      {text: 'close_to', symbol: '≈'}
    ];

    $scope.extraFilters = [
      { queryCriteria: 'passed_assignments', icon: 'fa fa-check-circle default-color', text: 'filter_passed_assignments', type: 'numeric', queryOperands: queryOperands},
      { queryCriteria: 'not_failed_assignments', icon: 'fa fa-exclamation-circle default-color', text: 'filter_not_failed_assignments', type: 'numeric', queryOperands: queryOperands}
    ];

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

    $scope.reportUrl = () => {
      let queryParams = $httpParamSerializer($scope.params);
      let { org, course, repo } = $stateParams;
      return `${Domain.classroomApiURL()}/courses/${course}/guides/${org}/${repo}/report?${queryParams}`;
    }

    setGuideProgress(data.guideProgress);

    $scope.guide = guide;
    $scope.withDetachedStudents = false;

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));

  });

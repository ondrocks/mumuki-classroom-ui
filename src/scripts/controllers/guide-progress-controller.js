
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, data, Api, DevIcon) {

    const guide = data.guide;

    const setGuideProgress = (guideProgress) => $scope.guideProgress = guideProgress;

    const guideProgressFetcher = $interval(() => Api.getGuideProgress($stateParams).then((data) => setGuideProgress(data.guideProgress)), 5000);

    setGuideProgress(data.guideProgress);

    $scope.guide = guide;
    $scope.devicon = DevIcon.from;
    $scope.sortType = 'progress';

    $scope.sortingCriteria = () => {
      return $scope.sortType === 'name' ?
        ['student.name'] :
        ['passedAverage()', 'exercises.length'];
    };

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));

  });

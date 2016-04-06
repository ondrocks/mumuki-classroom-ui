
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, data, Api, Auth, DevIcon, Guide, RememberSetting, Followers) {
    RememberSetting($scope, 'showDetails');
    RememberSetting($scope, 'sortType');
    RememberSetting($scope, 'onlyFollowers');

    Api.getFollowers(Auth.profile().email)
      .then((data) => Followers.setFollowers(_.map(data.data.followers, 'social_ids')[0]));

    const guide = Guide.from(data.guide);

    const setGuideProgress = (guideProgress) => $scope.guideProgress = guideProgress;

    const guideProgressFetcher = $interval(() => Api.getGuideProgress($stateParams).then((data) => setGuideProgress(data.guideProgress)), 5000);

    setGuideProgress(data.guideProgress);


    $scope.guide = guide;
    $scope.devicon = DevIcon.from;

    if (_.isNil($scope.sortType)) {
      $scope.sortType = 'progress';
    }

    $scope.sortingCriteria = () => {
      return $scope.sortType === 'name' ?
        ['student.last_name', 'student.first_name'] :
        ['passedAverage()', 'exercises.length'];
    };

    $scope.byFollowers = (guide_progress) => {
      if($scope.onlyFollowers) {
        return _.includes(Followers.followers, guide_progress.student.social_id);
      } else {
        return true;
      }

    }

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));
  });

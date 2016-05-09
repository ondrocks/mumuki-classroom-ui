
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, data, Api, Auth, DevIcon, Guide, RememberSetting, Followers) {
    RememberSetting($scope, 'showDetails');
    RememberSetting($scope, 'sortType');
    RememberSetting($scope, 'onlyFollowers');

    Api.getFollowers(Auth.profile().email)
      .then((data) => {
        return Followers.setFollowUps(data);
      });

    const guide = Guide.from(data.guide);

    const setGuideProgress = (guideProgress) => $scope.guideProgress = guideProgress;

    const guideProgressFetcher = $interval(() => Api.getGuideProgress($stateParams).then((data) => setGuideProgress(data.guideProgress)), 5000);

    const splitSlug = (slug) => slug.split('/')[1];

    setGuideProgress(data.guideProgress);


    $scope.guide = guide;
    $scope.devicon = DevIcon.from;

    if (_.isNil($scope.sortType)) {
      $scope.sortType = 'progress';
    }

    $scope.sortingCriteria = () => {
      return $scope.sortType === 'name' ?
        ['student.last_name', 'student.first_name'] :
        ['stats.total', 'passedAverage()', 'student.last_name', 'student.first_name'];
    };

    $scope.byFollowers = (guide_progress) => {
        return !$scope.onlyFollowers || Followers.isFollowing(guide_progress.course.slug, guide_progress.student.social_id);
    }

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));
  });

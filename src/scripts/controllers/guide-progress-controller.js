
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, data, Api, Auth, DevIcon, Guide, RememberSetting, Followers, Domain, Breadcrumb) {
    RememberSetting($scope, 'showDetails');
    RememberSetting($scope, 'sortType');
    RememberSetting($scope, 'onlyFollowers');

    Api
      .getFollowers(Auth.profile().email, $stateParams.course)
      .then((data) => Followers.setFollowUps(data));

    const guide = Guide.from(data.guide);

    Breadcrumb.setGuide(guide);

    const setGuideProgress = (guideProgress) => $scope.guideProgress = guideProgress;

    const guideProgressFetcher = $interval(() => Api.getGuideProgress($stateParams).then((data) => setGuideProgress(data.guideProgress)), 5000);

    const splitSlug = (slug) => slug.split('/')[1];
    const courseSlug = () => `${Domain.tenant()}/${$stateParams.course}`;

    setGuideProgress(data.guideProgress);

    $scope.guide = guide;
    $scope.devicon = DevIcon.from;

    if (_.isNil($scope.sortType)) {
      $scope.sortType = 'progress';
    }

    const sortingCriterias = {
      name: ['student.last_name', 'student.first_name'],
      progress: ['stats.total', 'passedAverage()', 'student.last_name', 'student.first_name'],
      date: ['-lastSubmission().created_at']
    };

    $scope.sortingCriteria = () => {
      return sortingCriterias[$scope.sortType];
    };

    $scope.byFollowers = (progress) => {
      return !$scope.onlyFollowers || Followers.isFollowing(courseSlug(), progress.student.social_id);
    }

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));
  });

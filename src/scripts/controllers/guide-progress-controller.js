
angular
  .module('classroom')
  .controller('GuideProgressController', function ($scope, $stateParams, $interval, data, Api, Auth, DevIcon, Guide, Preferences, Followers, Domain, Breadcrumb) {

    Preferences($scope, 'sortingType');

    if (_.isNil($scope.sortingType)) {
      $scope.sortingType = 'progress';
    }

    $scope.showDetails = Preferences.showDetails;
    $scope.toggleShowDetails = Preferences.toggleShowDetails;

    $scope.onlyFollowers = Preferences.onlyFollowers;
    $scope.toggleOnlyFollowers = Preferences.toggleOnlyFollowers;

    $scope.availableSortingCriterias = [
      { type: 'name', properties: ['student.last_name', 'student.first_name']},
      { type: 'progress', properties: ['stats.total', 'passedAverage()', 'student.last_name', 'student.first_name']},
      { type: 'last_submission_date', properties: ['-lastSubmission().created_at']}
    ];

    const splitSlug = (slug) => slug.split('/')[1];
    const courseSlug = () => `${Domain.tenant()}/${$stateParams.course}`;

    Api
      .getFollowers(Auth.profile().email, $stateParams.course)
      .then((data) => Followers.setFollowUps(data))
      .then(() => $scope.followUpsCount = Followers.count(courseSlug()));

    const guide = Guide.from(data.guide);

    Breadcrumb.setGuide(guide);

    const setGuideProgress = (guideProgress) => $scope.guideProgress = guideProgress;

    const guideProgressFetcher = $interval(() => Api.getGuideProgress($stateParams).then((data) => setGuideProgress(data.guideProgress)), 5000);

    setGuideProgress(data.guideProgress);

    $scope.guide = guide;
    $scope.devicon = DevIcon.from;

    $scope.sortingCriteria = () => _.find($scope.availableSortingCriterias, {type: $scope.sortingType}).properties;

    $scope.byFollowers = (progress) => {
      return !$scope.onlyFollowers() || Followers.isFollowing(courseSlug(), progress.student.social_id);
    }

    $scope.$on('$destroy', () => $interval.cancel(guideProgressFetcher));
  });

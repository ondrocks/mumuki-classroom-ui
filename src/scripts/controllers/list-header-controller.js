
angular
  .module('classroom')
  .controller('ListHeaderController', function ($scope, $stateParams, list, socialIdField, itemTemplate, Api, Auth, Preferences, Followers, Domain) {

    $scope.listOptions = {
      search: ''
    };

    $scope.options = {
      sortingType: null,
      isAscending: true
    };

    Preferences($scope, 'options');

    if (_.isNil($scope.options.sortingType)) $scope.options.sortingType = 'progress';

    $scope.withSortBy = true;
    $scope.withFilter = true;
    $scope.withDetails = true;
    $scope.withFollowers = true;

    $scope.list = list;
    $scope.showDetails = Preferences.showDetails;
    $scope.itemTemplate = itemTemplate;
    $scope.toggleShowDetails = Preferences.toggleShowDetails;

    $scope.onlyFollowers = Preferences.onlyFollowers;
    $scope.toggleOnlyFollowers = Preferences.toggleOnlyFollowers;

    $scope.toggleIsAscending = () => $scope.options.isAscending = !$scope.options.isAscending;

    $scope.course = () => $stateParams.course;
    $scope.courseSlug = () => `${Domain.tenant()}/${$scope.course()}`;

    Api
      .getFollowers(Auth.profile().email, $scope.course())
      .then((data) => Followers.setFollowUps(data))
      .then(() => $scope.followUpsCount = Followers.count($scope.courseSlug()));

    $scope.sortingCriteria = () => _.find($scope.availableSortingCriterias, {type: $scope.options.sortingType}).properties;

    $scope.isFollowing = (social_id) => Followers.isFollowing($scope.courseSlug(), social_id);
    $scope.byFollowers = (item) => !$scope.onlyFollowers() || Followers.isFollowing($scope.courseSlug(), _.get(item, socialIdField));

  });

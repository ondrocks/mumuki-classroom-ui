
angular
  .module('classroom')
  .controller('ListHeaderController', function ($scope, $stateParams, $filter, $timeout, list, uidField, itemTemplate, Api, Auth, Preferences, Followers, Domain, Permissions) {

    const filter = $filter('filter');

    $scope.listOptions = {
      search: ''
    };

    Preferences($scope, 'options');

    _.defaultsDeep($scope, { options: { sortingType: 'progress', isAscending: true }});

    $scope.actualPage = 1;
    $scope.itemsPerPage = 30;

    $scope.withSortBy = true;
    $scope.withFilter = true;
    $scope.withDetails = true;
    $scope.withFollowers = true;
    $scope.withDetachedStudents = Permissions.isTeacher();

    $scope.list = list;
    $scope.itemTemplate = itemTemplate;

    $scope.showDetails = Preferences.showDetails;
    $scope.toggleShowDetails = Preferences.toggleShowDetails;

    $scope.showDetachedStudents = Preferences.showDetachedStudents;
    $scope.toggleShowDetachedStudents = () => {
      Preferences.toggleShowDetachedStudents();
      $scope.params.page = 1;
      $scope.params.with_detached = $scope.showDetachedStudents();
    }

    $scope.onlyFollowers = Preferences.onlyFollowers;
    $scope.toggleOnlyFollowers = Preferences.toggleOnlyFollowers;

    const mapOrderBy = () => $scope.options.isAscending ? 'asc' : 'desc';

    $scope.params = {
      q: '',
      page: $scope.actualPage,
      per_page: $scope.itemsPerPage,
      sort_by: $scope.options.sortingType,
      with_detached: $scope.showDetachedStudents(),
      order_by: mapOrderBy()
    }

    $scope.toggleIsAscending = () => {
      $scope.options.isAscending = !$scope.options.isAscending;
      $scope.params.order_by = mapOrderBy();
    }

    $scope.course = () => $stateParams.course;
    $scope.courseSlug = () => `${Domain.tenant()}/${$scope.course()}`;

    Api
      .getFollowers($scope.course())
      .then((data) => Followers.setFollowUps(data))
      .then(() => $scope.followUpsCount = Followers.count($scope.courseSlug()));


    $scope.offset = () => $scope.itemsPerPage * ($scope.actualPage - 1);

    $scope.sortingCriteria = () => _.find($scope.availableSortingCriterias, {type: $scope.options.sortingType}).properties;

    $scope.isFollowing = (uid) => Followers.isFollowing($scope.courseSlug(), uid);
    $scope.byFollowers = (item) => !$scope.onlyFollowers() || Followers.isFollowing($scope.courseSlug(), _.get(item, uidField));
    $scope.byDetachedStudents = (item) => !item.detached || ($scope.withDetachedStudents && $scope.showDetachedStudents());

    $scope.selectPage = (n) => $scope.actualPage = n;

    $scope.filteredList = () => filter(filter($scope.list, $scope.listOptions.search), (item) => {
      return $scope.byDetachedStudents(item) && $scope.byFollowers(item);
    });

    $scope.$watch('options.sortingType', (newValue) => {
      $scope.params.sort_by = newValue;
    })

    let delayChange
    $scope.queryChange = () => {
      $timeout.cancel(delayChange);
      delayChange = $timeout(() => {
        $scope.params.page = 1;
        $scope.params.q = $scope.listOptions.search;
      }, 750);
    }

  });

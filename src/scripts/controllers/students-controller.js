
angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $stateParams, toastr, $filter, students, Auth, Followers, Api, Domain, Preferences) {

    Preferences($scope, 'sortingType');

    if (_.isNil($scope.sortingType)) {
      $scope.sortingType = 'progress';
    }

    $scope.showDetails = Preferences.showDetails;
    $scope.toggleShowDetails = Preferences.toggleShowDetails;

    $scope.onlyFollowers = Preferences.onlyFollowers;
    $scope.toggleOnlyFollowers = Preferences.toggleOnlyFollowers;

    $scope.availableSortingCriterias = [
      { type: 'name', properties: ['last_name', 'first_name']},
      { type: 'progress', properties: ['totalStats()', '-stats.failed', '-stats.passed_with_warnings', '-stats.passed', 'last_name', 'first_name']},
    ];

    $scope.sortingCriteria = () => _.find($scope.availableSortingCriterias, {type: $scope.sortingType}).properties;

    $scope.setCount(students.length);

    $scope.list = students;
    const course = $stateParams.course;
    const course_slug = `${Domain.tenant()}/${course}`;

    Api.getFollowers(Auth.profile().email, $stateParams.course)
      .then((data) => {
        return Followers.setFollowUps(data);
      });

    $scope.sortCriteria = (student) => student.fullName();

    $scope.stats = (student, field) => student.stats[field] * 100 / student.totalStats();

    $scope.isFollowing = (course, social_id) => Followers.isFollowing(course_slug, social_id);

    $scope.followClass = (social_id) => $scope.isFollowing(course_slug, social_id);

    $scope.followText = (social_id) => $scope.isFollowing(course_slug, social_id) ? 'unfollow' : 'follow';

    $scope.followAction = (social_id) => $scope.isFollowing(course_slug, social_id) ? $scope.unfollow(course, social_id) : $scope.follow(course, social_id)

    $scope.follow = (course, social_id) =>  {
    	return Api.follow(social_id, Auth.profile().email, course)
    		.then(() => Followers.addFollower(course_slug, social_id))
        .then(() => toastr.success($filter('translate')('do_follow')))
        .catch((e) => toastr.error(e));
    }

    $scope.unfollow = (course, social_id) =>  {
      return Api.unfollow(social_id, Auth.profile().email, course)
        .then(() => Followers.removeFollower(course_slug, social_id))
        .then(() => toastr.success($filter('translate')('unfollowing')))
        .catch((e) => toastr.error(e));
    }

    $scope.byFollowers = (student) => {
      return !$scope.onlyFollowers() || $scope.isFollowing(course_slug, student.social_id);
    }



  });

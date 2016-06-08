
angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $controller, toastr, $filter, students, Auth, Followers, Api) {

    $controller('ListHeaderController', {
      $scope: $scope,
      list: students,
      socialIdField: 'social_id'
    });

    $scope.availableSortingCriterias = [
      { type: 'name', properties: ['fullName()']},
      { type: 'progress', properties: ['totalStats()', '-stats.failed', '-stats.passed_with_warnings', '-stats.passed', 'fullName()']},
    ];

    $scope.setCount(students.length);
    $scope.stats = (student, field) => student.stats[field] * 100 / student.totalStats();

    $scope.followAction = (social_id) => $scope.isFollowing(social_id) ? $scope.unfollow(social_id) : $scope.follow(social_id);

    $scope.follow = (social_id) =>  {
    	return Api.follow(social_id, Auth.profile().email, $scope.course())
    		.then(() => Followers.addFollower($scope.courseSlug(), social_id))
        .then(() => toastr.success($filter('translate')('do_follow')))
        .catch((e) => toastr.error(e));
    }

    $scope.unfollow = (social_id) =>  {
      return Api.unfollow(social_id, Auth.profile().email, $scope.course())
        .then(() => Followers.removeFollower($scope.courseSlug(), social_id))
        .then(() => toastr.success($filter('translate')('unfollowing')))
        .catch((e) => toastr.error(e));
    }

  });

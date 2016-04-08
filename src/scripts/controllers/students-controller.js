
angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $stateParams, toastr, $filter, students, Auth, Followers, Api) {

    $scope.list = students;
    const course = $stateParams.course;

    Api.getFollowers(Auth.profile().email)
      .then((data) => Followers.setFollowers(_.groupBy(data.data.followers, "course")));

    $scope.sortCriteria = (student) => student.fullName();

    $scope.doFollow = (course, social_id) => Followers.doFollow(course, social_id);

    $scope.followClass = (social_id) => $scope.doFollow(course, social_id) ? 'danger' : 'info';

    $scope.followText = (social_id) => $scope.doFollow(course, social_id) ? 'unfollow' : 'follow';

    $scope.followAction = (social_id) => $scope.doFollow(course, social_id) ? $scope.unfollow(course, social_id) : $scope.follow(course, social_id)

    $scope.follow = (course, social_id) =>  {
    	return Api.follow(social_id, Auth.profile().email, course)
    		.then(() => Followers.addFollower(course, social_id))
        .then(() => toastr.success($filter('translate')('do_follow')))
        .catch((e) => toastr.error(e));
    }

    $scope.unfollow = (course, social_id) =>  {
      return Api.unfollow(social_id, Auth.profile().email, course)
        .then(() => Followers.removeFollower(course, social_id))
        .then(() => toastr.success($filter('translate')('unfollowing')))
        .catch((e) => toastr.error(e));
    }

  });

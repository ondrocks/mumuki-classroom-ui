
angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $stateParams, students, Auth, Followers, Api) {

    $scope.list = students;

    Api.getFollowers(Auth.profile().email)
      .then((data) => Followers.setFollowers(_.map(data.data.followers, 'social_ids')[0]));

    $scope.sortCriteria = (student) => student.fullName();

    $scope.doFollow = (social_id) => Followers.doFollow(social_id);

    $scope.followClass = (social_id) => $scope.doFollow(social_id) ? 'danger' : 'info';

    $scope.followText = (social_id) => $scope.doFollow(social_id) ? 'unfollow' : 'follow';

    $scope.followAction = (social_id) => $scope.doFollow(social_id) ? $scope.unfollow(social_id) : $scope.follow(social_id)

    $scope.follow = (social_id) =>  {
    	return Api.follow(social_id, Auth.profile().email)
    		.then(() => Followers.addFollower(social_id));
    }

    $scope.unfollow = (social_id) =>  {
      return Api.unfollow(social_id, Auth.profile().email)
        .then(() => Followers.removeFollower(social_id));
    }

  });


angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $controller, toastr, $filter, students, Auth, Followers, Api, Modal) {

    $controller('ListHeaderController', {
      $scope: $scope,
      list: students,
      itemTemplate: 'views/templates/item-student.html',
      socialIdField: 'social_id',
    });

    $scope.availableSortingCriterias = [
      { type: 'name', properties: ['last_name', 'first_name']},
      { type: 'progress', properties: ['totalStats()', '-stats.failed', '-stats.passed_with_warnings', '-stats.passed', 'last_name', 'first_name']},
      { type: 'signup_date', properties: ['created_at', 'last_name', 'first_name']},
    ];

    $scope.withDetails = false;
    $scope.isAdmin = Auth.isAdmin();
    $scope.listBodyClass = 'col-sm-12';
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

    $scope.edit = (social_id) => {
      const course = $scope.course();
      $state.go('classroom.students.edit', { social_id, course })
    }

    $scope.remove = (social_id) => {
      Modal.confirmDialog('you want to remove student from course?', () => {
        return Api
          .removeStudent(social_id, $scope.course())
          .then(() => $state.reload())
          .catch((e) => toastr.error(e));
      });
    }

  });

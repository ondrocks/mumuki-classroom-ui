
angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $controller, $stateParams, toastr, $filter, students, Auth, Followers, Api, Modal, Domain, Breadcrumb, Humanizer) {

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

    Breadcrumb.setCourse($stateParams.course);
    $scope.Humanizer = Humanizer;
    $scope.withDetails = false;

    $scope.isAdmin = (Auth.isAdmin() && Domain.tenant() !== 'digitalhouse') || Auth.isSuperUser(); // FIXME: private clients
    $scope.canTransfer = Auth.isAdmin();
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

    $scope.remove = (student) => {
      Modal.removeStudent(student, () => {
        return Api
          .removeStudent(student.social_id, $scope.course())
          .then(() => $state.reload())
          .catch((e) => toastr.error(e));
      });
    }

    $scope.attach = (student) => {
      Modal.attachStudent(student, () => {
        return Api
          .attachStudent(student.social_id, $scope.course())
          .then(() => $state.reload())
          .catch((e) => toastr.error(e));
      });
    };

    $scope.detach = (student) => {
      Modal.detachStudent(student, () => {
        return Api
          .detachStudent(student.social_id, $scope.course())
          .then(() => $state.reload())
          .catch((e) => toastr.error(e));
      });
    };

    $scope.transfer = (student) => {
      Modal.transfer(student, () => $state.reload());
    }

  });

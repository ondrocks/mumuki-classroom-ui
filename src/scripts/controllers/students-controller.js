
angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $controller, $stateParams, toastr, $filter, students, Auth, Followers, Api, Modal, Domain, Breadcrumb, Humanizer, Permissions) {

    $controller('ListHeaderController', {
      $scope: $scope,
      list: students,
      itemTemplate: 'views/templates/item-student.html',
      uidField: 'uid',
    });

    $scope.availableSortingCriterias = [
      { type: 'name', properties: ['last_name', 'first_name']},
      { type: 'progress', properties: ['totalStats()', '-stats.failed', '-stats.passed_with_warnings', '-stats.passed', 'last_name', 'first_name']},
      { type: 'signup_date', properties: ['created_at', 'last_name', 'first_name']},
      { type: 'last_submission_date', properties: ['lastSubmissionTime()', 'last_name', 'first_name']}
    ];

    Breadcrumb.setCourse($stateParams.course);
    $scope.Humanizer = Humanizer;

    $scope.withDetails = false;

    $scope.isOwner = Permissions.isOwner();
    $scope.canTransfer = Permissions.isJanitor();
    $scope.canDetach = Permissions.isJanitor();
    $scope.canAddStudent = Permissions.isJanitor();

    $scope.setCount(students.length);
    $scope.stats = (student, field) => student.stats[field] * 100 / student.totalStats();

    $scope.followAction = (uid) => $scope.isFollowing(uid) ? $scope.unfollow(uid) : $scope.follow(uid);

    $scope.follow = (uid) =>  {
      return Api.follow(uid, Auth.profile().email, $scope.course())
        .then(() => Followers.addFollower($scope.courseSlug(), uid))
        .then(() => toastr.success($filter('translate')('do_follow')))
        .catch((e) => toastr.error(e));
    }

    $scope.unfollow = (uid) =>  {
      return Api.unfollow(uid, Auth.profile().email, $scope.course())
        .then(() => Followers.removeFollower($scope.courseSlug(), uid))
        .then(() => toastr.success($filter('translate')('unfollowing')))
        .catch((e) => toastr.error(e));
    }

    $scope.edit = (uid) => {
      const course = $scope.course();
      $state.go('classroom.students.edit', _.defaults({ uid, course }, $stateParams))
    }

    $scope.remove = (student) => {
      Modal.removeStudent(student, () => {
        return Api
          .removeStudent(student.uid, $scope.course())
          .then(() => $state.reload())
          .catch((e) => toastr.error(e));
      });
    }

    $scope.attach = (student) => {
      Modal.attachStudent(student, () => {
        return Api
          .attachStudent(student.uid, $scope.course())
          .then(() => $state.reload())
          .catch((e) => toastr.error(e));
      });
    };

    $scope.detach = (student) => {
      Modal.detachStudent(student, () => {
        return Api
          .detachStudent(student.uid, $scope.course())
          .then(() => $state.reload())
          .catch((e) => toastr.error(e));
      });
    };

    $scope.transfer = (student) => {
      Modal.transfer(student, () => $state.reload());
    }

  });

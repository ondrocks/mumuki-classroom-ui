import * as _ from "lodash";

angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $controller, $stateParams, $timeout, toastr, $filter, students, Auth, Followers, Api, Modal, Domain, Breadcrumb, Humanizer, Permissions, Download) {

    $controller('ListHeaderController', {
      $scope: $scope,
      list: students.students,
      itemTemplate: 'views/templates/item-student.html',
      uidField: 'uid',
      apiEndpoint: $stateParams.course ? 'getStudents' : 'getAllStudents',
      responseField: "students"
    });

    $scope.availableSortingCriteria = ['name', 'progress', 'signup_date', 'last_submission_date'];

    if ($stateParams.course) {
      Breadcrumb.setCourse($stateParams.course);
    } else {
      //TODO: Students
    }

    $scope.Humanizer = Humanizer;

    $scope.withDetails = false;

    $scope.totalCount = students.total;
    $scope.isOwner = Permissions.isOwner();
    $scope.canTransfer = Permissions.isJanitor();
    $scope.canDetach = Permissions.isJanitor();
    $scope.canAddStudent = Permissions.isJanitor();

    //TODO: Uncouple from course controller
    $scope.setCount && $scope.setCount(students.total);

    $scope.stats = (student, field) => student.stats[field] * 100 / student.totalStats();

    $scope.followAction = (uid) => $scope.isFollowing(uid) ? $scope.unfollow(uid) : $scope.follow(uid);

    $scope.follow = (uid) => {
      return Api.follow(uid, $scope.course())
        .then(() => Followers.addFollower($scope.courseSlug(), uid))
        .then(() => toastr.success($filter('translate')('do_follow')))
        .catch((e) => toastr.error(e));
    };

    $scope.unfollow = (uid) => {
      return Api.unfollow(uid, $scope.course())
        .then(() => Followers.removeFollower($scope.courseSlug(), uid))
        .then(() => toastr.success($filter('translate')('unfollowing')))
        .catch((e) => toastr.error(e));
    };

    $scope.edit = (uid) => {
      const course = $scope.course();
      $state.go('classroom.students.edit', _.defaults({ uid, course }, $stateParams))
    };

    $scope.remove = (student) => {
      Modal.removeStudent(student, () => {
        return Api
          .removeStudent(student.uid, $scope.course())
          .then(() => $state.reload())
          .catch((e) => toastr.error(e));
      });
    };

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
    };

    $scope.exportStudents = () => {
      return Api
        .getAllStudents({})
        .then((data) => Download.json("students", data.students))
        .catch((e) => toastr.error(e));
    };

  });

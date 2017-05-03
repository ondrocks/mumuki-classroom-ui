
angular
  .module('classroom')
  .controller('NavbarController', function ($scope, $state, hotkeys, notifications, Auth, Breadcrumb, Permissions, Notification) {

    Notification.set(notifications);
    $scope.Notification = Notification;
    $scope.signin = Auth.signin;
    $scope.signout = Auth.signout;
    $scope.profile = Auth.profile;
    $scope.imageUrl = Auth.imageUrl;
    $scope.isTeacher = Permissions.isTeacher;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.Breadcrumb = Breadcrumb;

    $scope.goToAssignment = (notification) => {
      $state.go('classroom.courses.course.guides.guide.students', {
        course: notification.assignment.course,
        org: notification.assignment.guide.slug.split('/')[0],
        repo: notification.assignment.guide.slug.split('/')[1],
        student: notification.sender,
        eid: notification.assignment.exercise.eid
      });
    };

    hotkeys
      .bindTo($scope)
      .add({
        combo: ['ctrl+down'],
        callback: () => {
          angular.element('ol.breadcrumb li.dropdown').addClass('open');
          angular.element('ol.breadcrumb li.dropdown input').focus();
        }
      })

  });

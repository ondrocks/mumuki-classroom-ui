
angular
  .module('classroom')
  .controller('NavbarController', function ($scope, $state, hotkeys, notifications, Auth, Breadcrumb, Permissions, Notification, Api) {

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
      const [org, repo] = notification.assignment.guide.slug.split('/');
      const [__, course] = notification.assignment.course.split('/');
      Api.readNotification(notification.id)
        .then(() => Notification.remove(notification.id))
        .finally(() => {
          $state.go('classroom.courses.course.guides.guide.students', {
            course: course,
            org: org,
            repo: repo,
            student: notification.sender,
            eid: notification.assignment.exercise.eid,
            tab: 'messages'
          });
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


angular
  .module('classroom')
  .controller('NavbarController', function ($scope, $state, Auth) {

    $scope.signin = Auth.signin;
    $scope.signout = Auth.signout;
    $scope.profile = Auth.profile;
    $scope.isTeacher = Auth.isTeacher;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.userId = () => {
      console.log($state.params.student);
      return $state.params.student;
    }
    $scope.guideName = () => $state.params.repo;

    const defineRedirections = (name, state) => {
      $scope[`is${name}`] = () => $state.is(state, $state.params);
      $scope[`goTo${name}`] = () => $state.go(state, $state.params);
      $scope[`includes${name}`] = () => $state.includes(state);
    }

    defineRedirections('Courses', 'classroom.courses');
    defineRedirections('Guides', 'classroom.courses.course.guides');
    defineRedirections('Students', 'classroom.courses.course.students');
    defineRedirections('Guide', 'classroom.courses.course.guides.guide');
    defineRedirections('GuideExercise', 'classroom.courses.course.guides.guide.students');

  });

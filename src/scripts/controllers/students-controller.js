
angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $stateParams, students, Student) {

    $scope.list = _.map(students, Student.from);

  });

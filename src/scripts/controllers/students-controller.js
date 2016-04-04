
angular
  .module('classroom')
  .controller('StudentsController', function ($scope, $state, $stateParams, students) {

    $scope.list = students;

    $scope.sortCriteria = (student) => student.fullName() ;

  });

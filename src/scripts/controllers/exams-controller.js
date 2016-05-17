
angular
  .module('classroom')
  .controller('ExamsController', function ($scope, $state, exams, Auth, Api, Modal) {
    $scope.setCount(exams.length);

    $scope.list = exams;
    $scope.noItemsToShow = 'no_exams_to_show';
    $scope.inputPlaceholder = 'filter_available_exams';

    $scope.isAdmin = Auth.isAdmin;
    $scope.isExam = true;
    $scope.sortCriteria = () => ['getName()'];

  });

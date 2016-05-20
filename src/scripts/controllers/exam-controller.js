
angular
  .module('classroom')
  .controller('ExamController', function ($scope, $state, $stateParams, $filter, toastr) {

    const isBefore = () =>
      !!$scope.exam &&
      !!$scope.exam.end_time &&
      !!$scope.exam.start_time &&
      moment($scope.exam.start_time).isBefore(moment($scope.exam.end_time));

    $scope.isValidStartTime = () => isBefore();
    $scope.isValidEndTime = () => isBefore();
    $scope.isValidDuration = () => $scope.exam.duration > 0;

    $scope.isValidMandatoryFields = () =>
      $scope.isValidEndTime() &&
      $scope.isValidDuration() &&
      $scope.isValidStartTime();

    $scope.isValid = () => $scope.isValidMandatoryFields();

    $scope.getExam = () => {
      throw new Error('Not Implemented');
    }

    $scope.getExamInLocalTime = (localExam) => {
      localExam.start_time = moment(localExam.start_time).toDate();
      localExam.end_time = moment(localExam.end_time).toDate();
      return localExam;
    }

    $scope.create = () => {
      return $scope
        .submit($stateParams.course, $scope.getExam($scope.exam))
        .then(() => $state.go('classroom.courses.course.exams', $stateParams, { reload: true }))
        .then(() => toastr.success($filter('translate')('exam_updated')))
        .catch((res) => toastr.error(res.data.message));
    }

  });

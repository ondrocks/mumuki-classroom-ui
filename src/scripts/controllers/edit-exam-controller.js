
angular
  .module('classroom')
  .controller('EditExamController', function ($scope, $state, $stateParams, $filter, exam, students, toastr, Api, Breadcrumb) {

    Breadcrumb.setExam(exam);

    const isSelected = (student, newVal) => {
      student.isSelected = newVal
    };

    const allStudents = (selected) => {
      _.forEach($scope.students, (st) => isSelected(st, selected))
    };

    const getExamInLocalTime = (localExam) => {
      localExam.start_time = moment(localExam.start_time).toDate();
      localExam.end_time = moment(localExam.end_time).toDate();
      return localExam;
    }

    const getExam = () => {
      $scope.exam.social_ids = _($scope.students).filter('isSelected').map('social_id').value();
      return getExamInLocalTime($scope.exam);
    }

    _.forEach(exam.social_ids, (social_id) => {
      const student = _.find(students, { social_id });
      if (student) student.isSelected = true;
    })

    $scope.exam = getExamInLocalTime(exam);
    $scope.students = students;

    $scope.isValidStartTime = () => moment($scope.exam.start_time).isBefore($scope.exam.end_time);
    $scope.isValidEndTime = () => moment($scope.exam.start_time).isBefore($scope.exam.end_time);
    $scope.isValidDuration = () => $scope.exam.duration > 0;

    $scope.isValid = () =>
      $scope.isValidEndTime() &&
      $scope.isValidDuration() &&
      $scope.isValidStartTime();

    $scope.sortCriteria = (student) => student.fullName();

    $scope.toggle = (student) => isSelected(student, !student.isSelected);
    $scope.selectAll = () => allStudents(true);
    $scope.unselectAll = () => allStudents(false);

    $scope.allSelected = () => _.every($scope.students, 'isSelected');

    $scope.create = () => {
      const exam = getExam();
      return Api
        .updateExam($stateParams.course, exam)
        .then((res) => $state.go('classroom.courses.course.exams', $stateParams, { reload: true }))
        .then(() => toastr.success($filter('translate')('exam_updated')))
        .catch((res) => toastr.error(res.data.message));
    }

  });

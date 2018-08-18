
angular
  .module('classroom')
  .controller('EditExamController', function ($scope, $state, $timeout, $controller, clipboard, exam, students, Api, Breadcrumb, Domain) {

    angular.extend(this, $controller('ExamController', { $scope: $scope }));

    $scope.students = students.students;

    $scope.students
      .filter((student) => _(exam.uids).includes(student.uid))
      .forEach((student) => student.isSelected = true)

    Breadcrumb.setExam(exam);

    const isSelected = (student, newVal) => {
      student.isSelected = newVal
    };

    const allStudents = (selected) => {
      _.forEach($scope.students, (st) => isSelected(st, selected))
    };

    $scope.getExam = () => {
      $scope.exam.uids = _($scope.students).filter('isSelected').map('uid').value();
      return $scope.getExamInLocalTime($scope.exam);
    }

    $scope.exam = $scope.getExamInLocalTime(exam);
    $scope.exam_type = 'edit_exam';

    $scope.passing_criterion = $scope.fromExamCriterion($scope.exam.passing_criterion);

    $scope.submit = (course, exam) => Api.updateExam(course, exam);

    $scope.sortCriteria = (student) => student.fullName();

    $scope.toggle = (student) => isSelected(student, !student.isSelected);
    $scope.selectAll = () => allStudents(true);
    $scope.unselectAll = () => allStudents(false);

    $scope.allSelected = () => _.every($scope.students, 'isSelected');

    $scope.openExamInLaboratory = () => Domain.openExamInLaboratory($state.params.exam);

    $scope.url = () => Domain.examURL($scope.exam.id);

    $scope.copy = () => {
      clipboard.copyText($scope.url());
      $scope.isCopied = true;
      $timeout(() => $scope.isCopied = false, 5000);
    };

  });


angular
  .module('classroom')
  .controller('EditExamController', function ($scope, $controller, exam, students, Api, Breadcrumb) {

    angular.extend(this, $controller('ExamController', { $scope: $scope }));

    _.forEach(exam.social_ids, (social_id) => {
      const student = _.find(students, { social_id });
      if (student) student.isSelected = true;
    })

    Breadcrumb.setExam(exam);

    const isSelected = (student, newVal) => {
      student.isSelected = newVal
    };

    const allStudents = (selected) => {
      _.forEach($scope.students, (st) => isSelected(st, selected))
    };

    $scope.getExam = () => {
      $scope.exam.social_ids = _($scope.students).filter('isSelected').map('social_id').value();
      return $scope.getExamInLocalTime($scope.exam);
    }

    $scope.exam = $scope.getExamInLocalTime(exam);
    $scope.students = students;
    $scope.exam_type = 'edit_exam';

    $scope.submit = (course, exam) => Api.updateExam(course, exam);

    $scope.sortCriteria = (student) => student.fullName();

    $scope.toggle = (student) => isSelected(student, !student.isSelected);
    $scope.selectAll = () => allStudents(true);
    $scope.unselectAll = () => allStudents(false);

    $scope.allSelected = () => _.every($scope.students, 'isSelected');

  });

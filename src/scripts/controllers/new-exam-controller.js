
angular
  .module('classroom')
  .controller('NewExamController', function ($scope, $controller, guides, Auth, Api) {

    angular.extend(this, $controller('ExamController', { $scope: $scope }));

    $scope.exam_type = 'new_exam';
    $scope.isAdmin = Auth.isAdmin;
    $scope.guides = guides;
    $scope.isNew = true;

    $scope.selected = {};
    $scope.exam = {
      start_time: '',
      end_time: '',
      duration: '',
      name: '',
      slug: '',
      language: '',
      social_ids: []
    };

    $scope.isValid = () => $scope.isValidMandatoryFields() && $scope.isValidGuide();
    $scope.isValidGuide = () => isValid('name') && isValid('slug') && isValid('language');

    const isValid = (field) => {
      return !_.isEmpty(_.get($scope.selected.guide, field, '').trim());
    }

    $scope.getExam = () => {
      $scope.exam.slug = $scope.selected.guide.slug;
      $scope.exam.name = $scope.selected.guide.name;
      $scope.exam.language = $scope.selected.guide.language;
      return $scope.getExamInLocalTime($scope.exam);
    }

    $scope.fullName = (guide) => guide && `${guide.name} - ${guide.slug}`;

    $scope.submit = (course, exam) => Api.createExam(course, exam);

  });

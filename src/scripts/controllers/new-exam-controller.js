
angular
  .module('classroom')
  .controller('NewExamController', function ($scope, $state, $filter, toastr, Auth, Api) {

    $scope.isAdmin = Auth.isAdmin;
    $scope.exam = {
      start_time: '',
      end_time: '',
      duration: '',
      name: '',
      slug: '',
      language: '',
      social_ids: []
    };

    const isValidField = (field) => !_.isEmpty(($scope.asyncSelected[field] || '').trim());

    $scope.isValidStartTime = () => moment($scope.exam.start_time).isBefore($scope.exam.end_time);
    $scope.isValidEndTime = () => moment($scope.exam.start_time).isBefore($scope.exam.end_time);
    $scope.isValidDuration = () => $scope.exam.duration > 0;

    $scope.isValidGuide = () => isValidField('name') && isValidField('slug') && isValidField('language');

    $scope.isValid = () =>
      $scope.isValidEndTime() &&
      $scope.isValidDuration() &&
      $scope.isValidStartTime() &&
      $scope.isValidGuide();

    $scope.getGuides = (input) =>
      Api.getBibliothecaGuides().then(_.partialRight($filter('filter'), input))

    const getExam = () => {
      $scope.exam.slug = $scope.asyncSelected.slug;
      $scope.exam.name = $scope.asyncSelected.name;
      $scope.exam.language = $scope.asyncSelected.language;
    }

    $scope.fullName = (guide) => guide && `${guide.name} - ${guide.slug}`;

    $scope.create = () => {
      const exam = getExam();
      return Api
        .createExam(exam)
        .then(() => $state.go('classroom.exams', {}, { reload: true }))
        .catch((res) => toastr.error(res.data.message));
    }

  });

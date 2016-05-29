
angular
  .module('classroom')
  .controller('NewTeacherController', function ($scope, $state, $filter, $fancyModal, toastr, slug, Api) {
    $scope.course = slug.split('/')[1];
    $scope.teacher = {
      first_name: '',
      last_name: '',
      email: ''
    };

    $scope.addTeacher = () => {
      Api.updateTeacher($scope.course, $scope.teacher)
        .then(() => toastr.success($filter('translate')('added_teacher')))
        .catch((e) => toastr.error(e.data.message))
        .finally(() => $fancyModal.close())
    }

  });

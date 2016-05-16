
angular
  .module('classroom')
  .controller('PermissionsController', function ($scope, $state, $filter, $fancyModal, toastr, slug, Api) {
    $scope.course = slug.split('/')[1];
    $scope.email = '';

    $scope.addPermission = () => {
      Api.addPermission($scope.course, $scope.email)
        .then(() => toastr.success($filter('translate')('correct_permissions')))
        .catch((e) => toastr.error(e.data.message))
        .finally(() => $fancyModal.close())
    }

  });

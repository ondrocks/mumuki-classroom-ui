
angular
  .module('classroom')
  .controller('PermissionsController', function ($scope, $state, toastr, slug, Api) {
    $scope.course = slug.split('/')[1];
    $scope.email = '';

    $scope.addPermission = () => {
      Api.addPermission($scope.course, $scope.email)
        .then(() => toastr.success('Permiso asignado satisfactoriamente'))
        .catch((e) => toastr.error(e.data.message))
    }

  });

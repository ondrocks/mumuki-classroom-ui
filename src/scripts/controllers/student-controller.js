
angular
  .module('classroom')
  .controller('StudentController', function ($scope, $state, $stateParams, toastr, Auth, Api) {

    const EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

    $scope.student = {};

    $scope.isTextValid = (text) => {
      return !_.isEmpty((text || '').trim())
    };

    $scope.isEmailValid = (text) => {
      return $scope.isTextValid(text) && EMAIL_REGEX.test(text);
    };

    $scope.isValid = () =>
      $scope.isTextValid($scope.student.first_name) &&
      $scope.isTextValid($scope.student.last_name) &&
      $scope.isEmailValid($scope.student.email);

    $scope.update = () => {
      return Api
        .updateStudent($stateParams.course, $scope.student)
        .then(() => toastr.success('Gracias por cargar tus datos'))
        .catch((res) => toastr.error(res.data.message));
    }

    Auth.signin((profile) => {
      $scope.student = {
        name: profile.nickname,
        email: profile.email,
        image_url: profile.picture,
        social_id: profile.user_id
      }
    });

  });

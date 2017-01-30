
angular
  .module('classroom')
  .controller('StudentController', function ($scope, $state, $filter, $stateParams, $sce, toastr, Auth, Api, Domain, Organization, Breadcrumb) {
    $scope.isMultiple = false;
    $scope.csv = {
      content: null,
      header: true,
      headerVisible: true,
      separator: ',',
      result: null,
      uploadButtonLabel: "Seleccionar"
    };
    const EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

    Breadcrumb.setCourse($stateParams.course);
    $scope.student = {};

    $scope.isTextValid = (text) => {
      return !_.isEmpty((text || '').trim())
    };

    $scope.isEmailValid = (text) => {
      return $scope.isTextValid(text) && EMAIL_REGEX.test(text);
    };

    $scope.toggleMultiple = () => $scope.isMultiple = !$scope.isMultiple;

    $scope.isValid = () =>
      $scope.isTextValid($scope.student.first_name) &&
      $scope.isTextValid($scope.student.last_name) &&
      $scope.isEmailValid($scope.student.email);

    $scope.addStudent = () => {
      return Api
        .addStudent($stateParams.course, $scope.student)
        .then(() => $state.go('classroom.courses.course.guides', { course: $stateParams.course }))
        .catch((res) => toastr.error(res.data.message));
    };

    $scope.addStudents = () => {
      _.each($scope.csv.result, (s) => {
        return Api
          .addStudent($stateParams.course, s)
          .then(() => _.pullAllBy($scope.csv.result, [{'email': s.email}], 'email'))
          .then(() => {
            if($scope.csv.result.length === 0)
              $state.go('classroom.courses.course.guides', { course: $stateParams.course });
          })
          .catch((res) => toastr.error(res.data.message));
      })
    };

    $scope.trust = (html) => $sce.trustAsHtml(html);
    $scope.termAndConditions = $scope.trust($filter('translate')('term_and_conditions', { url: Organization.tosUrl() }));

  });

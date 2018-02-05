
angular
  .module('classroom')
  .controller('StudentController', function ($scope, $state, $filter, $location, $stateParams, $sce, toastr, Auth, Api, Domain, Organization, Breadcrumb) {
    $scope.isMultiple = false;
    $scope.csv = {
      content: null,
      header: true,
      headerVisible: true,
      separator: ',',
      result: null,
      uploadButtonLabel: "Seleccionar"
    };

    const $translate = $filter('translate');
    const EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    const exampleStudents = [
      { first_name: 'example_student_1_first_name', last_name: 'example_student_1_last_name', email: 'example_student_1_email', personal_id: '12345678' },
      { first_name: 'example_student_2_first_name', last_name: 'example_student_2_last_name', email: 'example_student_2_email', personal_id: '23456789' },
    ]

    Breadcrumb.setCourse($stateParams.course);

    const getCSVFile = () => {
      let csvData = exampleStudents.map((s) => `${$translate(s.first_name)},${$translate(s.last_name)},${$translate(s.email)},${s.personal_id}`);
      return 'first_name,last_name,email,personal_id\n' + csvData.join('\n');
    }

    $scope.student = {};

    $scope.getExampleCSVFile = () => {
      var link = document.createElement('a');
      link.download = `${$translate('example').toLowerCase()}.csv`;
      link.href = `data:text/csv;charset=utf-8;base64,${btoa(getCSVFile())}`;
      link.click();
    }

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
        .then(() => $state.go('classroom.courses.course.guides', $stateParams))
        .catch((res) => toastr.error(res.data.message));
    };

    $scope.addStudents = () => {
      _.each($scope.csv.result, (s) => {
        return Api
          .addStudent($stateParams.course, s)
          .then(() => _.pullAllBy($scope.csv.result, [{'email': s.email}], 'email'))
          .then(() => {
            if($scope.csv.result.length === 0)
              $state.go('classroom.courses.course.guides', $stateParams);
          })
          .catch((res) => toastr.error(res.data.message));
      })
    };

    $scope.trust = (html) => $sce.trustAsHtml(html);
    $scope.termAndConditions = $scope.trust($translate('term_and_conditions', { url: Organization.tosUrl() }));

  });

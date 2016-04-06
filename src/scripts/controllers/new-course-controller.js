
angular
  .module('classroom')
  .controller('NewCourseController', function ($scope, $state, $filter, toastr, Auth, Api) {

    $scope.isAdmin = Auth.isAdmin;
    $scope.course = {
      days: [],
      code: '',
      shifts: [],
      period: '',
      description: ''
    };

    $scope.isValidCode = () => !_.isEmpty(($scope.course.code || '').trim());
    $scope.isValidDays = () => !_.isEmpty($scope.course.days);
    $scope.isValidShifts = () => !_.isEmpty($scope.course.shifts);
    $scope.isValidPeriod = () => /^([0-9]{4})(-(1|2|4|6)[A-Z])?$/i.test(($scope.course.period || ''));
    $scope.isValidDescription = () => !_.isEmpty(($scope.course.description || '').trim());

    $scope.isValid = () =>
      $scope.isValidCode() &&
      $scope.isValidDays() &&
      $scope.isValidShifts() &&
      $scope.isValidPeriod() &&
      $scope.isValidDescription();

    $scope.days = [
      { name: 'day_monday', checked: false },
      { name: 'day_tuesday', checked: false },
      { name: 'day_wednesday', checked: false },
      { name: 'day_thursday', checked: false },
      { name: 'day_friday', checked: false },
      { name: 'day_saturday', checked: false },
      { name: 'day_sunday', checked: false },
    ]

    $scope.shifts = [
      { name: 'shift_morning', checked: false },
      { name: 'shift_afternoon', checked: false },
      { name: 'shift_night', checked: false },
    ]

    $scope.updateArray = (type) => $scope.course[type] = _.filter($scope[type], 'checked');

    $scope.getCheckedNames = (checkables) =>
      _(checkables)
        .filter((checkable) => checkable.checked)
        .map((checkable) => checkable.name)
        .map((name) => $filter('translate')(name))
        .value()

    $scope.getShiftsString = (course) => course.shifts.join('-');

    $scope.getCourseToPost = () => {
      const course  = _.cloneDeep($scope.course);
      course.days   = $scope.getCheckedNames(course.days);
      course.shifts = $scope.getCheckedNames(course.shifts);
      course.period = course.period.toLowerCase();
      course.slug   = `${Api.subdomain}/${course.period}-${course.code}`.toLowerCase();
      return course;
    }

    $scope.create = () => {
      const course = $scope.getCourseToPost();
      return Api
        .createCourse(course)
        .then(() => $state.go('classroom.courses', {}, { reload: true }))
        .then(() => toastr.success('Curso creado satisfactoriamente'))
        .catch((res) => toastr.error(res.data.message));
    }

  });

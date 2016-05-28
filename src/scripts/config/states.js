
angular
  .module('classroom')
  .config(function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;

    $stateProvider
      .state('classroom', {
        abstract: true,
        views: {
          '@': {
            templateUrl: 'views/layout.html'
          },
          'navbar@classroom': {
            templateUrl: 'views/navbar.html',
            controller: 'NavbarController'
          }
        }
      })
      .state('classroom.home', {
        url: '/home',
        authenticated: false,
        views: {
          'content@classroom': {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('classroom.students', {
        url: '/students/:course',
        authenticated: false,
        views: {
          'navbar@classroom': {},
          'content@classroom': {
            templateUrl: 'views/student.html',
            controller: 'StudentController'
          }
        }
      })
      .state('classroom.courses', {
        url: '/courses',
        authenticated: true,
        views: {
          'content@classroom': {
            templateUrl: 'views/select.html',
            controller: 'CoursesController',
            resolve: {
              courses: ($state, Api) => {
                return Api
                  .getCourses()
                  .catch(() => $state.go('classroom.home', {}, { location: 'replace' }));
              }
            }
          }
        }
      })
      .state('classroom.courses.new', {
        url: '/new',
        authenticated: true,
        views: {
          'content@classroom': {
            templateUrl: 'views/new-course.html',
            controller: 'NewCourseController'
          }
        }
      })
      .state('classroom.courses.course', {
        url: '/:course',
        abstract: true,
        authenticated: true,
        views: {
          'content@classroom': {
            templateUrl: 'views/course.html',
            controller: 'CourseController'
          }
        }
      })
      .state('classroom.courses.course.guides', {
        url: '/guides',
        authenticated: true,
        views: {
          'main@classroom.courses.course': {
            templateUrl: 'views/select.html',
            controller: 'GuidesController',
            resolve: {
              guides: ($state, $stateParams, Api) => {
                return Api
                  .getGuides($stateParams)
                  .catch(() => $state.go('classroom.courses', $stateParams, { location: 'replace' }));
              }
            }
          }
        }
      })
      .state('classroom.courses.course.guides.guide', {
        url: '/:org/:repo',
        authenticated: true,
        views: {
          'content@classroom': {
            templateUrl: 'views/guide-progress.html',
            controller: 'GuideProgressController',
            resolve: {
              data: ($state, $stateParams, Api) => {
                return Api
                  .getGuideProgress($stateParams)
                  .catch(() => $state.go('classroom.courses.course.guides', $stateParams, { location: 'replace' }));
              }
            }
          }
        }
      })
      .state('classroom.courses.course.guides.guide.students', {
        url: '/:student/:eid',
        authenticated: true,
        views: {
          'content@classroom': {
            templateUrl: 'views/exercise-progress.html',
            controller: 'ExerciseProgressController',
            resolve: {
              exercisesProgress: ($state, $stateParams, Api) => {
                return Api
                  .getExerciseProgress($stateParams)
                  .catch(() => $state.go('classroom.courses.course.guides.guide', $stateParams, { location: 'replace' }));
              }
            }
          }
        }
      })
      .state('classroom.courses.course.students', {
        url: '/students',
        authenticated: true,
        views: {
          'main@classroom.courses.course': {
            templateUrl: 'views/students.html',
            controller: 'StudentsController',
            resolve: {
              students: ($state, $stateParams, Api) => {
                return Api
                  .getStudents($stateParams)
                  .catch(() => $state.go('classroom.courses.course.guides', $stateParams, { location: 'replace' }));
              }
            }
          }
        }
      })
      .state('classroom.courses.course.teachers', {
        url: '/teachers',
        authenticated: true,
        views: {
          'main@classroom.courses.course': {
            templateUrl: 'views/teachers.html',
            controller: 'TeachersController',
            resolve: {
              teachers: ($state, $stateParams, Api) => {
                return Api
                  .getTeachers($stateParams)
                  .catch(() => $state.go('classroom.courses.course.guides', $stateParams, { location: 'replace' }));
              }
            }
          }
        }
      })
      .state('classroom.courses.course.exams', {
        url: '/exams',
        authenticated: true,
        views: {
          'main@classroom.courses.course': {
            templateUrl: 'views/exams.html',
            controller: 'ExamsController',
            resolve: {
              exams: ($state, $stateParams, Api) => {
                return Api
                  .getExams($stateParams)
                  .catch(() => $state.go('classroom.courses.course.guides', $stateParams, { location: 'replace' }));
              }
            }
          }
        }
      })
      .state('classroom.courses.course.exams.new', {
        url: '/new',
        authenticated: true,
        views: {
          'content@classroom': {
            templateUrl: 'views/exam.html',
            controller: 'NewExamController',
            resolve: {
              guides: ($state, $stateParams, Api) => {
                return Api
                  .getBibliothecaGuides($stateParams)
                  .catch(() => $state.go('classroom.courses.course.guides', $stateParams, { location: 'replace' }));
              }
            }
          }
        }
      })
      .state('classroom.courses.course.exams.edit', {
        url: '/:exam',
        authenticated: true,
        views: {
          'content@classroom': {
            templateUrl: 'views/exam.html',
            controller: 'EditExamController',
            resolve: {
              exam: ($state, $stateParams, Api) => {
                return Api
                  .getExam($stateParams)
                  .catch(() => $state.go('classroom.courses.course.guides', $stateParams, { location: 'replace' }));
              },
              students: ($state, $stateParams, Api) => {
                return Api
                  .getStudents($stateParams)
                  .catch(() => $state.go('classroom.courses.course.guides', $stateParams, { location: 'replace' }));
              }
            }
          }
        }
      });

    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('classroom.home', {}, { reload: true, location: 'replace' });
    });

  })
  .run(($rootScope, $state, Auth) => {

    $rootScope.$on('$stateChangeStart', function(ev, toState) {

      Auth.authenticateIfPossible();

      if(toState.authenticated && !Auth.isLoggedIn()) {
        $state.go('classroom.home', {}, { location: 'replace' });
        ev.preventDefault();
      }

      if(toState.name === 'classroom.home' && Auth.isLoggedIn()) {
        $state.go('classroom.courses', {}, { location: 'replace' });
        ev.preventDefault();
      }

    });

  });

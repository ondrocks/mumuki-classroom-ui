
angular
  .module('classroom')
  .service('Modal', function ($fancyModal) {

    this.newTeacher = (slug) => $fancyModal.open({
      templateUrl: 'views/modals/new_teacher.html',
      controller: 'NewTeacherController',
      resolve: {
        slug: _.constant(slug)
      }
    });

  });

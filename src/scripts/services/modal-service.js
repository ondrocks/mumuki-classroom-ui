
angular
  .module('classroom')
  .service('Modal', function ($fancyModal) {

    this.permissionsModal = (slug) => $fancyModal.open({
      templateUrl: 'views/modals/permissions.html',
      controller: 'PermissionsController',
      resolve: {
        slug: _.constant(slug)
      }
    });

  });

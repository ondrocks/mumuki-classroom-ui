
angular
  .module('classroom')
  .service('Modal', function ($fancyModal) {

    this.permissionsModal = (slug) => $fancyModal.open({
      template_url: 'views/modals/permissions.html',
      controller: 'PermissionsController',
      resolve: {
        slug: _.constant(slug)
      }
    });

  });

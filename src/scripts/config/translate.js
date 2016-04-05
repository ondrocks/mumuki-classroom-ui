
angular
  .module('classroom')
  .config(function ($translateProvider) {

    $translateProvider.translations('en', {});

    $translateProvider.translations('es', {});

    $translateProvider.preferredLanguage('es');

  });

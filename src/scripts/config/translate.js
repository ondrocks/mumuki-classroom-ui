
angular
  .module('classroom')
  .config(function ($translateProvider, LANG_EN, LANG_ES) {

    $translateProvider.translations('es', LANG_ES);
    $translateProvider.translations('en', LANG_EN);

    $translateProvider.preferredLanguage('es');

    $translateProvider.useSanitizeValueStrategy(null);

  });

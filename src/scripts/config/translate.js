
angular
  .module('classroom')
  .config(function ($translateProvider, LANG_EN) {

    $translateProvider.translations('en', LANG_EN);

    $translateProvider.preferredLanguage('en');

  });

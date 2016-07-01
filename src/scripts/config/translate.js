
angular
  .module('classroom')
  .config(function ($translateProvider, LANG_EN, LANG_ES) {

    const supportedLocales = ['es', 'en'];

    $translateProvider.translations('es', LANG_ES);
    $translateProvider.translations('en', LANG_EN);

    $translateProvider.determinePreferredLanguage(() => {
      const locale = $translateProvider.resolveClientLocale().split('_')[0];
      const isSupportedLocale = _.includes(supportedLocales, locale);
      return isSupportedLocale ? locale : 'en';
    });

    $translateProvider.useSanitizeValueStrategy(null);

  });

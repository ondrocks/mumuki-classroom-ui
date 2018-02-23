angular
  .module('classroom')
  .factory('Language', function($rootScope) {
    class Language {

      constructor(language) {
        _.merge(this, language);
      }

      setLayoutAssets(){
        $rootScope.language_layout_css_urls = this.layout_css_urls;
        $rootScope.language_layout_html_urls = this.layout_html_urls;
        $rootScope.language_layout_js_urls = this.layout_js_urls;
      }

      static from(language = {}) {
        return new Language(language);
      }

      static sortBy() {
        return ['name'];
      }

    }

    return Language;

  });

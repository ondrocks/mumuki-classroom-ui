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

      setEditorAssets(){
        $rootScope.language_editor_css_urls = this.editor_css_urls;
        $rootScope.language_editor_html_urls = this.editor_html_urls;
        $rootScope.language_editor_js_urls = this.editor_js_urls;
      }

      setAssets(){
        this.setLayoutAssets();
        this.setEditorAssets();
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

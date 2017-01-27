
angular
  .module('classroom')
  .service('Organization', function ($injector, $translate, $rootScope) {

    this.set = (org) => {
      this.organization = org;
      $translate.use(org.locale);
    }

    this.setCustomAssets = (org) => {
      $rootScope.customJsUrl = org.extension_javascript_url;
      $rootScope.customCssUrl = org.theme_stylesheet_url;
    };

    this.currentLocale = () => $translate.use();

    this.tosUrl = () => `http://mumuki.io/static/tos/tos-${this.currentLocale()}.txt`;

    this.getLockJson = () => {
      const promise = this.organization ?
        Promise.resolve() :
        $injector
          .get('Api')
          .getOrganization()
          .then((res) => {
            const org = res.data;

            this.setCustomAssets(org);
            this.set(org);
          })
      return promise.then(() => this.organization.lock_json);
    }
  });

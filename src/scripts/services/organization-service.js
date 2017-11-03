
angular
  .module('classroom')
  .service('Organization', function ($injector, $translate, $rootScope, Domain) {

    this.set = (org) => {
      this.organization = org;
      $translate.use(this.locale());
    };

    this.locale = () => {
      return _.includes(this.organization.locale, '-')
        ? this.organization.locale.split('-')[0]
        : this.organization.locale;
    };

    this.setCustomAssets = (org) => {
      $rootScope.customJsUrl = org.extension_javascript_url;
      $rootScope.customCssUrl = org.theme_stylesheet_url;
    };

    this.raiseHandEnabled = () => {
      return this.organization.raise_hand_enabled;
    }

    this.currentLocale = () => $translate.use();

    this.tosUrl = () => Domain.tosURL(this.currentLocale());

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

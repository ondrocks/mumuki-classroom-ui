
angular
  .module('classroom')
  .service('Organization', function ($injector, $translate) {

    this.set = (org) => {
      this.organization = org;
      $translate.use(org.locale);
    }

    this.currentLocale = () => $translate.use();

    this.tosUrl = () => `http://mumuki.io/static/tos/tos-${this.currentLocale()}.txt`;

    this.getLockJson = () => {
      const promise = this.organization ?
        Promise.resolve() :
        $injector
          .get('Api')
          .getOrganization()
          .then((res) => {
            this.set(res.data);
          })
      return promise.then(() => this.organization.lock_json);
    }

  });

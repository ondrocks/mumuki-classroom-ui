
angular
  .module('classroom')
  .service('Organization', function ($injector, $translate) {

    this.set = (org) => {
      this.organization = org;
      $translate.use(org.locale);
    }

    this.getLockJson = () => {
      const promise = this.organization ?
        Promise.resolve() :
        $injector
          .get('Api')
          .getOrganization()
          .then((res) => {
            this.set(res.data.organization);
          })
      return promise.then(() => this.organization.lock_json);
    }

  });

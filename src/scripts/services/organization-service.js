
angular
  .module('classroom')
  .service('Organization', function ($injector) {

    this.set = (org) => {
      this.organization = org;
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

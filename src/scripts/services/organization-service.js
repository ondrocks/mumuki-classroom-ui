
angular
  .module('classroom')
  .service('Organization', function ($injector, $translate, Domain) {

    this.set = (org) => {
      this.organization = org;
      $translate.use(this.locale());
    };

    this.locale = () => this.organization.profile.locale;;

    this.raiseHandEnabled = () => this.organization.settings.raise_hand_enabled;

    this.currentLocale = () => $translate.use();

    this.tosUrl = () => Domain.tosURL(this.currentLocale());

    this.fetchFromServer = () => {
      return this.organization ?
        Promise.resolve() :
        $injector
          .get('Api')
          .getOrganization()
          .then((res) => this.set(res.data));
    }

  });

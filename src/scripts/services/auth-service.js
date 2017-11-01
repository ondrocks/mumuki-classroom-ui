
angular
  .module('classroom')
  .service('Auth', function ($injector, $state, $location, $cookies, Permissions, CONFIG) {

    let profile = null;

    const updatePermissions = () => {
      $injector.get('Api')
        .getPermissions()
        .then((data) => Permissions.set(data.permissions))
    };

    this.signin = (callback) => {
      document.location.href = $injector.get('Api').getLoginUrl();
    };

    this.signout = () => {
      profile = null;
      document.location.href = $injector.get('Api').getLogoutUrl();
    };

    this.checkProfile = () => {
      let encodedProfile = $cookies.get('mucookie_profile');
      if (encodedProfile) {
        profile = JSON.parse(atob(encodedProfile));
      }
    };

    this.profile = () => _.defaults(profile, {email: profile.user_uid});

    this.imageUrl = () => {
      const image = this.profile().user_image_url;
      return _.startsWith(image, 'http') ? image : 'images/user_shape.png';
    }

    this.isLoggedIn = () => {
      if (profile === null) {
        this.checkProfile()
      }
      return profile !== null;
    };

    this.authenticateIfPossible = () => {
      if(this.isLoggedIn()) {
        if(Permissions.isEmpty()) {
          updatePermissions();
        }
      }
    };

  });

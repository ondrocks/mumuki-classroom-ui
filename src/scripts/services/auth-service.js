
angular
  .module('classroom')
  .service('Auth', function ($injector, $state, $location, auth, store, jwtHelper, Domain, Organization) {

    const subdomain = Domain.tenant();

    const regex = new RegExp(`^(\\\*|\\\*\\\/\\\*|${subdomain}\\\/\\\*)$`);

    this.permissions = (role) => {
      return _.get(store.get('permissions'), role, '').split(':');
    };

    this.ownerPermissions = () => {
      return  this.permissions('owner');
    };

    this.teacherPermissions = () => {
      return  this.permissions('teacher');
    };

    this.headmasterPermissions = () => {
      return  this.permissions('headmaster');
    };

    this.janitorPermissions = () => {
      return  this.permissions('janitor');
    };

    this.isOwner = () => {
      return _.some(this.ownerPermissions(), (p) => regex.test(p));
    };

    this.isJanitor = () => {
      console.log(_.some(this.janitorPermissions(), (p) => regex.test(p)) || this.isOwner());
      return _.some(this.janitorPermissions(), (p) => regex.test(p)) || this.isOwner();
    };

    this.isHeadmaster = () => {
      return _.some(this.headmasterPermissions(), (p) => regex.test(p)) || this.isJanitor();
    };

    this.isTeacher = () => {
      return _.some(this.teacherPermissions(), (p) => regex.test(p.split('/')[0])) || this.isHeadmaster();
    };

    this.profile = () => {
      return store.get('profile');
    };

    this.token = () => {
      return store.get('token');
    };


    this.signin = (callback) => {
      Organization
        .getLockJson()
        .then((modalJson) => {
          auth.signin(_.merge(modalJson, { icon: '/images/icon.png', authParams: { scope: 'openid email' } }), (profile, token) => {
            store.set('profile', profile);
            store.set('token', token);
            $injector
              .get('Api')
              .getPermissions()
              .then((res) => store.set('permissions', res.data.permissions));
            if (_.isFunction(callback)) callback(profile);
          });
        });
    };

    this.signout = () => {
      auth.signout();
      store.remove('token');
      store.remove('profile');
      $state.go('classroom.home');
    };

    this.isLoggedIn = () => {
      return auth.isAuthenticated;
    };

    this.isTokenExpired = () => {
      return _.isEmpty(this.token()) || jwtHelper.isTokenExpired(this.token());
    };

    this.authenticate = () => {
      auth.authenticate(this.profile(), this.token());
    };

    this.authenticateIfPossible = () => {
      if(!this.isTokenExpired() && !this.isLoggedIn()) {
        this.authenticate();
      }
    }

  });

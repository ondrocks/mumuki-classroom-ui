
angular
  .module('classroom')
  .service('Auth', function ($state, $location, auth, store, jwtHelper, Domain, Organization) {

    const subdomain = Domain.tenant();

    const adminRegex = new RegExp(`^(\\\*|\\\*\\\/\\\*|${subdomain}\\\/\\\*)$`);
    const teacherRegex = new RegExp(`^(\\\*|${subdomain})$`);

    this.permissions = () => {
      return _.get(this.profile(), 'classroom.permissions', '').split(':');
    }

    this.adminPermissions = () => {
      return  _.get(this.profile(), 'admin.permissions', '').split(':');
    }

    this.profile = () => {
      return store.get('profile');
    }

    this.token = () => {
      return store.get('token');
    }

    this.isAdmin = () => {
      return _.some(this.adminPermissions(), (p) => adminRegex.test(p));
    }

    this.isSuperUser = () => {
      return _.some(this.adminPermissions(), (p) => p === '*');
    }

    this.isTeacher = () => {
      return _.some(this.permissions(), (p) => teacherRegex.test(p.split('/')[0]));
    }

    this.signin = (callback) => {
      Organization
        .getLockJson()
        .then((modalJson) => {
          auth.signin(_.merge(modalJson, { icon: '/images/icon.png', authParams: { scope: 'openid email' } }), (profile, token) => {
            store.set('profile', profile);
            store.set('token', token);
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

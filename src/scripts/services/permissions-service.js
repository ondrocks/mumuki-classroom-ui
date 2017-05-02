
angular
  .module('classroom')
  .service('Permissions', function ($injector, store, Domain) {
    const regex = () => new RegExp(`^(\\\*|\\\*\\\/\\\*|${Domain.tenant()}\\\/\\\*)$`);
    const PERMISSIONS_KEY = 'permissions';
    const availableScopes = ['teacher', 'headmaster', 'janitor', 'owner'];

    this.set = (permissions = {}) => {
      store.set(PERMISSIONS_KEY, _.pick(permissions, availableScopes));
    };

    this.isEmpty = () => {
      return _.isEmpty(store.get(PERMISSIONS_KEY));
    };

    this.get = (role) => {
      return _.get(store.get(PERMISSIONS_KEY), role, '');
    };

    this.ownerPermissions = () => {
      return  this.get('owner');
    };

    this.teacherPermissions = () => {
      return this.get('teacher');
    };

    this.headmasterPermissions = () => {
      return this.get('headmaster');
    };

    this.janitorPermissions = () => {
      return this.get('janitor');
    };

    this.isOwner = () => {
      return _.some(this.ownerPermissions(), (p) => regex().test(p));
    };

    this.isJanitor = () => {
      return _.some(this.janitorPermissions(), (p) => regex().test(p)) || this.isOwner();
    };

    this.isHeadmaster = () => {
      return _.some(this.headmasterPermissions(), (p) => regex().test(p)) || this.isJanitor();
    };

    this.isTeacher = () => {
      return _.some(this.teacherPermissions(), (p) => regex().test(p.split('/')[0])) || this.isHeadmaster();
    };

  });

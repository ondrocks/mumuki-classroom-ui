
angular
  .module('classroom')
  .service('Permissions', function ($injector, store, Domain) {

    const PERMISSIONS_KEY = 'permissions';
    const availableScopes = ['teacher', 'headmaster', 'janitor', 'admin', 'owner'];

    class PermissionSlug {
      constructor(slug = '') {
        var [org, course] = slug.split('/');
        this.organization = org;
        this.course = course;
      }

      toString() {
        return `${this.organization}/${this.course}`;
      }

      hasPermission() {
        return this.organization === Domain.tenant() || this.organization === '*';
      }

      static from(slug) {
        return new PermissionSlug(slug);
      }
    }

    this.set = (permissions = {}) => {
      store.set(PERMISSIONS_KEY, _.pick(permissions, availableScopes));
    };

    this.isEmpty = () => {
      return _.isEmpty(store.get(PERMISSIONS_KEY));
    };

    this.get = (role) => {
      return _.get(store.get(PERMISSIONS_KEY), role, '').split(':');
    };

    this.ownerPermissions = () => {
      return this.get('owner');
    };

    this.adminPermissions = () => {
      return this.get('admin');
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
      return this.is('owner');
    };

    this.isAdmin = () => {
      return this.is('admin') || this.isOwner();
    };

    this.isJanitor = () => {
      return this.is('janitor') || this.isAdmin();
    };

    this.isHeadmaster = () => {
      return this.is('headmaster') || this.isJanitor();
    };

    this.isTeacher = () => {
      return this.is('teacher') || this.isHeadmaster();
    };

    this.is = (type) => {
      return _.some(this[`${type}Permissions`](), (p) => PermissionSlug.from(p).hasPermission());
    }

  });


angular
  .module('classroom')
  .provider('OrganizationMapper', function (CONFIG) {

    let location;

    this.current = () => {
      return this.organizationMappers[CONFIG.organizationMappingMode];
    }

    const tenantizedURL = (URL, tenant) => {
      const [protocol, host] = URL.split('://');
      return `${protocol}://${tenant}.${host}`;
    }

    const withOrigin = (callback_uri) => `?origin=${encodeURIComponent(callback_uri)}`

    const redirectURL = (tenant = '') => {
      const protocol = location.protocol();
      const host = location.host();
      const port = location.port();
      const portString = port ? `:${port}` : '';
      const path = _.isEmpty(tenant) ? '' : `/${tenant}`;
      return `${protocol}://${host}${portString}/#${path}/home`;
    }

    this.organizationMappers = {

      subdomain: {

        tenant() {
          var domain = CONFIG.classroom.url.replace(`${location.protocol()}://`, '');

          return location.host().split(`.${domain}`)[0].replace(`${location.protocol()}://`, '');
        },

        laboratoryURL() {
          return tenantizedURL(CONFIG.laboratory.url, this.tenant());
        },

        classroomApiURL() {
          return tenantizedURL(CONFIG.classroom.api_url, this.tenant());
        },

        bibliothecaApiURL() {
          return CONFIG.bibliotheca.url;
        },

        loginURL() {
          return `${this.classroomApiURL()}/login${withOrigin(location.absUrl())}`
        },

        logoutURL() {
          return `${this.classroomApiURL()}/logout${withOrigin(redirectURL())}`
        },

        stateUrl() {
          return '';
        }

      },

      path: {

        tenant() {
          return location.url().split('/')[1];
        },

        laboratoryURL() {
          return `${CONFIG.laboratory.url}/${this.tenant()}`;
        },

        classroomApiURL() {
          return `${CONFIG.classroom.api_url}/${this.tenant()}`;
        },

        bibliothecaApiURL() {
          return CONFIG.bibliotheca.url;
        },

        loginURL() {
          return `${CONFIG.classroom.api_url}/login${withOrigin(location.absUrl())}`
        },

        logoutURL() {
          return `${CONFIG.classroom.api_url}/logout${withOrigin(redirectURL(this.tenant()))}`
        },

        stateUrl() {
          return '/:tenant';
        }

      }
    }

    this.$get = ($location) => {
      location = $location;
      return this.current();
    }

  });

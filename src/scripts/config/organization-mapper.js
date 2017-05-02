
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

    this.organizationMappers = {

      subdomain: {

        tenant() {
          return location.host().split('.')[0];
        },

        laboratoryURL() {
          return tenantizedURL(CONFIG.laboratory.url, this.tenant());
        },

        classroomApiURL() {
          return tenantizedURL(CONFIG.classroom.url, this.tenant());
        },

        bibliothecaApiURL() {
          return CONFIG.bibliotheca.url;
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
          return `${CONFIG.classroom.url}/${this.tenant()}`;
        },

        bibliothecaApiURL() {
          return CONFIG.bibliotheca.url;
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

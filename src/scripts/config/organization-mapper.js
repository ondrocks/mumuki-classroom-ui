
angular
  .module('classroom')
  .provider('OrganizationMapper', function (CONFIG) {

    this.current = () => {
      return this.organizationMappers[CONFIG.organizationMappingMode];
    }

    this.organizationMappers = {

      subdomain: {

        tenant(location, stateParams) {
          return location.host().split('.')[0];
        },

        stateUrl(url) {
          return url;
        }

      },

      path: {

        tenant(location, stateParams) {
          console.log(stateParams);
          return stateParams.tenant;
        },

        stateUrl(url) {
          return '/:tenant';
        }

      }
    }

    this.$get = () => this.current();

  });

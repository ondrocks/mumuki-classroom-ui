
angular
  .module('classroom')
  .provider('OrganizationMapper', function (CONFIG) {

    let location;

    this.current = () => {
      return this.organizationMappers[CONFIG.organizationMappingMode];
    }

    this.organizationMappers = {

      subdomain: {

        tenant() {
          return location.host().split('.')[0];
        },

        classroomApiURL() {
          return `//${this.tenant()}.${CONFIG.classroom.url}`;
        },

        stateUrl() {
          return '';
        }

      },

      path: {

        tenant() {
          return location.url().split('/')[1];
        },

        classroomApiURL() {
          return `//${this.tenant()}.${CONFIG.classroom.url}`;
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

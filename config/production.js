
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: '<MUMUKI_CLASSROOM_API_URL>'
    },

    laboratory: {
      url: '<MUMUKI_LABORATORY_URL>'
    },

    bibliotheca: {
      url: '<MUMUKI_BIBLIOTHECA_API_URL>'
    },

    cookie: {
      domain: '<MUMUKI_COOKIES_DOMAIN>',
    },

    organizationMappingMode: '<MUMUKI_ORGANIZATION_MAPPING>'

  });

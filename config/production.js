
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: '<MUMUKI_CLASSROOM_API_URL>'
    },

    bibliotheca: {
      url: '<MUMUKI_BIBLIOTHECA_API_URL>'
    },

    cookie: {
      domain: '<MUMUKI_COOKIES_DOMAIN>',
      session: '_mumuki_classroom_session'
    },

    organizationMappingMode: '<MUMUKI_ORGANIZATION_MAPPING_MODE>'

  });

angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      api_url: process.env.MUMUKI_CLASSROOM_API_URL,
      url: process.env.MUMUKI_CLASSROOM_URL
    },

    laboratory: {
      url: process.env.MUMUKI_LABORATORY_URL
    },

    bibliotheca: {
      api_url: process.env.MUMUKI_BIBLIOTHECA_API_URL
    },

    cookie: {
      domain: process.env.MUMUKI_COOKIES_DOMAIN,
    },

    organizationMappingMode: process.env.MUMUKI_ORGANIZATION_MAPPING

  });

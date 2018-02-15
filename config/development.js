
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      api_url: 'http://0.0.0.0:3002',
      url: 'http://0.0.0.0:3001'
    },

    laboratory: {
      url: 'http://0.0.0.0:3000'
    },

    bibliotheca: {
      url: 'http://0.0.0.0:3004'
    },

    cookie: {
      domain: '0.0.0.0',
    },

    organizationMappingMode: 'path'

  });

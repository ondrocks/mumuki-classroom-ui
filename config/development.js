
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: 'http://0.0.0.0:3002'
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


angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: 'http://localhost:3002'
    },

    laboratory: {
      url: 'http://localhost:3000'
    },

    bibliotheca: {
      url: 'http://localhost:3004'
    },

    cookie: {
      domain: 'localhost',
      session: '_mumuki_classroom_session'
    },

    organizationMappingMode: 'subdomain'

  });

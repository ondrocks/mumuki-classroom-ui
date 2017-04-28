
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: 'http://classroom.localmumuki.io:4000'
    },

    laboratory: {
      url: 'http://localmumuki.io:3000'
    },

    bibliotheca: {
      url: 'http://bibliotheca-api.localmumuki.io:9292'
    },

    cookie: {
      domain: '.localmumuki.io',
      session: '_mumuki_classroom_session'
    },

    organizationMappingMode: 'path'

  });

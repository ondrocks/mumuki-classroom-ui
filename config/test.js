angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      api_url: 'http://classroom-api.localmumuki.io',
      url: 'http://classroom.localmumuki.io'
    },

    laboratory: {
      url: 'http://laboratory.localmumuki.io'
    },

    bibliotheca: {
      api_url: 'http://bibliotheca-api.localmumuki.io'
    },

    cookie: {
      domain: 'localmumuki',
    },

    organizationMappingMode: 'subdomain'

  });

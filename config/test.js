
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: 'http://classroom.localmumuki.io'
    },

    laboratory: {
      url: 'http://laboratory.localmumuki.io'
    },

    bibliotheca: {
      url: 'http://bibliotheca.localmumuki.io'
    },

    cookie: {
      domain: 'localmumuki',
    },

    organizationMappingMode: 'subdomain'

  });


angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: 'classroom-api.mumuki.io'
    },

    bibliotheca: {
      url: 'bibliotheca-api.mumuki.io'
    },

    cookie: {
      domain: '.localmumuki.io',
      session: '_mumuki_classroom_session'
    }
  });

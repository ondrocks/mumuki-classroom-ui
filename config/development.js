
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: 'classroom.localmumuki.io:4000'
    },

    bibliotheca: {
      url: 'bibliotheca-api.localmumuki.io:9292'
    },

    cookie: {
      domain: '.localmumuki.io',
      session: '_mumuki_classroom_session'
    }

  });

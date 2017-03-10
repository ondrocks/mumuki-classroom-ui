
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: 'classroom-api.mumuki.io'
    },

    bibliotheca: {
      url: 'bibliotheca-api.mumuki.io'
    },

    auth: {
      domain: 'mumuki.auth0.com',
      clientID: 'w3q8vwGkOmcOi6AEKKgu02iYBzRlea5Q'
    },

    cookie: {
      domain: '.localmumuki.io',
      session: '_mumuki_classroom_session'
    }
  });

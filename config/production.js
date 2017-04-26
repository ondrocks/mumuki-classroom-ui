
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: '<MUMUKI_CLASSROOM_API_URL>'
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

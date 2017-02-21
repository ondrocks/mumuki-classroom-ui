
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      url: 'classroom.localmumuki.io:4000'
    },

    auth: {
      domain: 'mumuki.auth0.com',
      clientID: 'WNmivh61DufjPRhuNZpa10J3LcxbbJmN'
    },

    cookie: {
      domain: '.localmumuki.io',
      session: '_mumuki_classroom_session'
    }
  });

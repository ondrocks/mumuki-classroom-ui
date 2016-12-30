
angular
  .module('classroom')
  .constant('ICONS', {
    'auth0': 'envelope-o',
    'github': 'github',
    'twitter': 'twitter',
    'facebook': 'facebook-square',
    'google-oauth2': 'google',
    'get': function (provider) {
      return this[provider] || this.auth0;
    },
  });

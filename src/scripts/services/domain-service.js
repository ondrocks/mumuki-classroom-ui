
angular
  .module('classroom')
  .service('Domain', function ($location, $window) {

    this.tenant = () => $location.host().split('classroom')[0].replace(/[.]$/g, '');

    this.openAtheneum = () => $window.open(`http://${this.tenant()}.mumuki.io`, '_self');

  });

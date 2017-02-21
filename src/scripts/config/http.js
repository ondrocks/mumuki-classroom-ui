angular
  .module('classroom')
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  });

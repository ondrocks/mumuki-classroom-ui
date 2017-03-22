
angular
  .module('classroom')
  .service('Scroll', function ($timeout) {

    this.bottom = (cssClass) => {
      $timeout(() => $(cssClass).scrollTop($(cssClass)[0].scrollHeight));
    };


  });


angular
  .module('classroom')
  .service('Scroll', function ($timeout) {

    const FIXED_OFFSET = 28;

    this.bottom = (cssClass) => {
      $timeout(() => $(cssClass).scrollTop($(cssClass)[0].scrollHeight));
    };

    this.holdContent = (cssClass, callback) => {
      const currentHeight = $(cssClass)[0].scrollHeight;
      callback();
      $timeout(() => $(cssClass).scrollTop($(cssClass)[0].scrollHeight - currentHeight - FIXED_OFFSET));
    }

  });

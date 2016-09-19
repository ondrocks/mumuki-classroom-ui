
angular
  .module('classroom')
  .service('Humanizer', function () {

    this.date = (date) => {
      return moment(date).fromNow();
    }
  });


angular
  .module('classroom')
  .service('Humanizer', function () {

    this.date = (date) => {
      return moment(date).fromNow();
    }

    this.shortDate = (date) => {
      return moment(date).fromNow(true);
    }
  });

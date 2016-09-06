
angular
  .module('classroom')
  .service('Humanizer', function ($filter) {

    this.date = (date) => {
      return moment(date).format($filter('translate')('solution_sent_at_format'));
    }
  });

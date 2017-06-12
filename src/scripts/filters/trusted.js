angular
  .module('classroom')
  .filter('trusted', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  })
  .filter('trustHtml', function ($sce) {
    return function(html) {
      return $sce.trustAsHtml(html);
    };
  })
  .filter('humanizeDate', function () {
    return function(date) {
      return moment(date).fromNow();
    }
  });

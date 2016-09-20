
angular
  .module('classroom')
  .directive('tooltip', () => {
    return {
      restrict: 'A',
      link: (scope, element) => {
        $(element).hover(() => {
          $(element).tooltip('show');
        }, () => {
          $(element).tooltip('hide');
        });
      }
    };
  });

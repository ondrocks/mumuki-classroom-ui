
angular
  .module('classroom')
  .directive('withDefault', function ($filter) {
    return {
      restrict: 'A',
      scope: {
        withDefault: '@'
      },
      link: (scope, element, attr) => {
        scope.$watch('withDefault', () => element.attr('src', scope.withDefault));
        element.attr('onerror', 'this.src = "images/avatar.svg"');
      }
    };
  });

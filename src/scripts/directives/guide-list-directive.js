
angular
  .module('classroom')
  .directive('guideList', function () {
    return {
      restrict: 'E',
      scope: { name: '@', list: '=', index: '=' },
      templateUrl: 'views/directives/guide-list.html'
    }
});
